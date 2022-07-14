const { app, BrowserWindow, shell, dialog, session, Menu, Tray } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const Updater = require("./updates/window");
const updater = new Updater();
const rpc = require("./core/rpc/RPC");
require("./core/storage/database");
const S4D_PROTOCOL = "s4d";
let tray = null,
    mainWindow;

app.commandLine.appendSwitch("disable-site-isolation-trials");

if (process.defaultApp) {
    if (process.argv.length >= 2) {
        app.setAsDefaultProtocolClient(S4D_PROTOCOL, process.execPath, [path.resolve(process.argv[1])]);
    }
} else {
    app.setAsDefaultProtocolClient(S4D_PROTOCOL);
}

const gotTheLock = app.requestSingleInstanceLock();

async function createWindow() {
    updater.create();
    const proc = await updater.init();
    if (!proc) return updater.close();

    session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
        details.requestHeaders["User-Agent"] = "";
        callback({ cancel: false, requestHeaders: details.requestHeaders });
    });

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        backgroundColor: "#FFFFFF",
        darkTheme: false,
        hasShadow: true,
        webPreferences: {
            nodeIntegration: false,
            preload: `${__dirname}/scripts/preload.js`,
            contextIsolation: true,
            webSecurity: false
        },
        icon: `file://${path.join(__dirname, "/assets/icon.png")}`
    });

    const mockedMenu = Menu.buildFromTemplate([]);
    Menu.setApplicationMenu(mockedMenu);

    const startUrl = isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "..", "build", "index.html")}`;
    mainWindow.loadURL(startUrl);
    if (isDev) mainWindow.webContents.openDevTools();

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
            label: "Quit App",
            type: "normal",
            click: () => {
                mainWindow.destroy();
            }
        }
    ]);
    tray.setToolTip("Scratch For Discord");
    tray.setContextMenu(contextMenu);

    mainWindow.once("ready-to-show", () => {
        mainWindow.show();
        updater.close();
        if (mainWindow.maximizable) mainWindow.maximize();
        // load extensions
        new (require("./core/ExtensionsLoader"))(mainWindow);
        rpc.login().then((success) => (success ? rpc.setActivity() : console.log("Could not start RPC")));
    });

    mainWindow.webContents.setWindowOpenHandler((handler) => {
        shell.openExternal(handler.url);

        return { action: "deny" };
    });

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
        } catch {}
    });
}

if (!gotTheLock) {
    app.quit();
} else {
    app.on("second-instance", (event, commandLine, workingDirectory) => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    });

    app.whenReady().then(() => {
        createWindow();
    });

    app.on("window-all-closed", function () {
        if (process.platform !== "darwin") app.quit();
    });

    app.on("activate", function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
}
