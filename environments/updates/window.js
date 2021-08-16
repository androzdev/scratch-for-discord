const { BrowserWindow } = require("electron");
const updater = require("electron-updater").autoUpdater;
const isDev = require("electron-is-dev");

class Updater {
    constructor() {
        /** @type {BrowserWindow} */
        this.win = null;
        this.updater = updater;
        this.updater.autoDownload = false;
        this.updater.channel = "latest";
        this.updater.allowDowngrade = false;
        this.updater.autoInstallOnAppQuit = true;

        if (isDev) {
            this.updater.updateConfigPath = `${__dirname}/dev-mock-update.yml`;
        }
    }

    create() {
        this.win = new BrowserWindow({
            width: 300,
            height: 330,
            resizable: false,
            webPreferences: {
                contextIsolation: true,
                nodeIntegration: false,
                enableRemoteModule: true,
                preload: `${__dirname}/script.js`,
                devTools: false
            },
            frame: false,
            transparent: true,
            icon: `${__dirname}/../assets/icon.png`
        });

        this.win.webContents.on("devtools-opened", () => {
            this.win.webContents.closeDevTools();
        });

        this.win.loadFile(`${__dirname}/updater.html`);
    }

    init() {
        return new Promise(async (resolve) => {
            const rsx = await this.updater.checkForUpdates().catch((e) => `ERROR: ${e.message || e}`);
            if (typeof rsx === "string" && rsx.startsWith("ERROR: ")) {
                this.win.webContents.send("error", rsx.replace("ERROR: ", ""));
                return resolve(true);
            }

            this.updater.on("update-not-available", () => {
                resolve(true);
            });

            this.updater.on("update-downloaded", () => {
                this.win.webContents.send("update-downloaded");
                this.updater.quitAndInstall();
                resolve(false);
            });

            this.updater.on("checking-for-update", () => {
                this.win.webContents.send("checking-for-update");
            });

            this.updater.on("update-available", (info) => {
                this.win.webContents.send("new-update", info.version);
                this.updater.downloadUpdate();
            });

            this.updater.on("download-progress", (progress) => {
                const total = progress.total;
                const current = progress.transferred;

                this.win.webContents.send("download-progress", { total, current });
            });

            this.updater.on("error", (err) => {
                this.win.webContents.send("error", err && err.message ? err.message : err);
                resolve(true);
            });

            const rsy = await this.updater.checkForUpdates().catch((e) => `ERROR: ${e.message || e}`);
            if (typeof rsy === "string" && rsy.startsWith("ERROR: ")) {
                this.win.webContents.send("error", rsy.replace("ERROR: ", ""));
                return resolve(true);
            }
        });
    }

    close() {
        try {
            if (this.win) {
                this.win.destroy();
            }
        } catch {}
    }
}

module.exports = Updater;
