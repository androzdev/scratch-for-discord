const { app, BrowserWindow, shell, session, dialog, Tray, Menu } = require("electron");
const startDate = new Date();
const Updater = require("./updates/window");
const updater = new Updater();
const rpc = require("./RPC");
const store = require("./Database");
let version,
    mainWindow,
    tray = null;

try {
    version = require(`${__dirname}/../package.json`).version;
} catch (e) {
    version = "1.1.2";
}

app.on("ready", async () => {
    updater.create();
    const proc = await updater.init();
    if (!proc) return updater.close();

    session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
        details.requestHeaders["User-Agent"] = "";
        callback({ cancel: false, requestHeaders: details.requestHeaders });
    });

    mainWindow = new BrowserWindow({
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            webSecurity: false,
            preload: `${__dirname}/preload.js`
        },
        icon: `${__dirname}/assets/icon.png`
    });

    const mockedMenu = Menu.buildFromTemplate([]);
    Menu.setApplicationMenu(mockedMenu);

    mainWindow.loadFile(`${__dirname}/public/loader.html`);

    if (mainWindow.maximizable) mainWindow.maximize();

    mainWindow.on("ready-to-show", () => {
        mainWindow.show();
        updater.close();
    });

    tray = new Tray(`${__dirname}/assets/icon.png`);
    const contextMenu = Menu.buildFromTemplate([
        {
            label: "Discord Server",
            type: "normal",
            click: () => shell.openExternal("https://androz2091.fr/discord")
        },
        {
            label: "GitHub",
            type: "normal",
            click: () => shell.openExternal("https://github.com/Androz2091/scratch-for-discord")
        },
        {
            label: "Check for updates",
            type: "normal",
            click: () => {
                app.relaunch();
                app.quit();
            }
        },
        {
            label: "Version",
            type: "normal",
            click: () => {
                const info = `Scratch For Discord: ${version || "1.0.0"}\nElectron: ${process.versions.electron}\nv8: ${process.versions.v8}\nNode: ${process.versions.node}\nChromium: ${process.versions.chrome}\nDiscord.js: ${require("discord.js").version}`;

                dialog.showMessageBox(mainWindow, {
                    type: "none",
                    message: info,
                    title: "Scratch For Discord - App Version"
                });
            }
        },
        {
            label: "Settings",
            type: "normal",
            click: async () => {
                const response = await dialog.showMessageBox(mainWindow, {
                    title: "Scratch For Discord - Settings",
                    message: "App Settings",
                    buttons: ["Cancel", "Save"],
                    checkboxLabel: "Enable Discord RPC",
                    checkboxChecked: store.get("rpc") === true
                });

                if (response.response === 0) return;

                const rpcOn = response.checkboxChecked;
                store.set("rpc", rpcOn);

                if (!rpcOn) {
                    return rpc.destroy().catch(() => {});
                } else {
                    rpc.login(rpc.APP_ID);
                }
            }
        },
        {
            label: "Quit App",
            type: "normal",
            click: () => {
                mainWindow.destroy();
            }
        }
    ]);
    tray.setToolTip("Scratch For Discord");
    tray.setContextMenu(contextMenu);

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url);
        return {
            action: "deny"
        };
    });

    mainWindow.on("page-title-updated", createPresence);

    mainWindow.on("close", async (ev) => {
        ev.preventDefault();

        const response = await dialog.showMessageBox(mainWindow, {
            type: "question",
            buttons: ["Yes", "No"],
            title: "Confirm",
            message: "Do you really want to quit Scratch For Discord?"
        });

        if (response.response === 1) return;
        try {
            mainWindow.destroy();
        } catch (e) {}
    });

    mainWindow.webContents.on("dom-ready", () => {
        const appLink = store.get("scratch") || "https://scratch-for-discord.netlify.app";
        if (!mainWindow.webContents.getURL().includes(appLink)) {
            mainWindow.loadURL(appLink);
        } else {
            mainWindow.webContents.executeJavaScript(`
                try {
                    if (window.__scratch__) {
                        window.Discord = window.__scratch__.Discord;
                        window.DiscordJS = window.__scratch__.Discord;

                        const z = document.createElement("li");
                        z.classList.add("nav-item");
                        z.innerHTML = '<a href="#" class="nav-link" id="nav-close-window">Discord</a>';
                        document.querySelector("ul[class='navbar-nav']").appendChild(z);

                        z.addEventListener("click", (e) => {
                            e.preventDefault();
                            return window.__scratch__.openExternal(window.__scratch__.DISCORD_INVITE);
                        });

                        const y = document.createElement("li");
                        y.classList.add("nav-item");
                        y.innerHTML = '<a href="#" class="nav-link" id="nav-close-window">Exit</a>';
                        document.querySelector("ul[class='navbar-nav']").appendChild(y);

                        y.addEventListener("click", (e) => {
                            e.preventDefault();
                            return window.__scratch__.closeWindow();
                        });
                    }
                } catch {}
            `);
        }
    });
});

rpc.on("ready", () => createPresence());

function createPresence() {
    if (!store.get("rpc")) {
        rpc.destroy().catch(() => {});
        return;
    }
    const getTitle = () => {
        const title = mainWindow && mainWindow.webContents.getTitle();
        if (!title || !title.includes("-")) return "Starting...";
        const text = title.split("-")[1].trim();
        return text.toLowerCase() === "make your own bot using blocks" ? "Untitled document" : text;
    };

    const currentTitle = getTitle();

    if (currentTitle.length >= 2) {
        setTimeout(() => {
            rpc.request("SET_ACTIVITY", {
                pid: process.pid,
                activity: {
                    details: currentTitle,
                    timestamps: {
                        start: startDate.getTime()
                    },
                    assets: {
                        large_image: "large",
                        large_text: `Scratch For Discord - v${version}`
                    },
                    buttons: [
                        {
                            label: "Download",
                            url: "https://github.com/Androz2091/scratch-for-discord"
                        }
                    ]
                }
            });
        }, 1500);
    }
}

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
