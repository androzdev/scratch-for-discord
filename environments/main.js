const { app, BrowserWindow, shell, dialog, session, Menu } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const Updater = require("./updates/window");
const updater = new Updater();
require("./core/storage/database");

async function createWindow() {
    updater.create();
    const proc = await updater.init();
    if (!proc) return updater.close();

    session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
        details.requestHeaders["User-Agent"] = "";
        callback({ cancel: false, requestHeaders: details.requestHeaders });
    });

    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        backgroundColor: "#FFFFFF",
        darkTheme: false,
        hasShadow: true,
        webPreferences: {
            nodeIntegration: false,
            preload: `${__dirname}/scripts/preload.js`,
            contextIsolation: true
        },
        icon: `file://${path.join(__dirname, "/assets/icon.png")}`
    });

    const mockedMenu = Menu.buildFromTemplate([]);
    Menu.setApplicationMenu(mockedMenu);

    const startUrl = isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "..", "build", "index.html")}`;
    mainWindow.loadURL(startUrl);
    if (isDev) mainWindow.webContents.openDevTools();

    mainWindow.once("ready-to-show", () => {
        mainWindow.show();
        updater.close();
        if (mainWindow.maximizable) mainWindow.maximize();
        // load extensions
        new (require("./core/ExtensionsLoader"))(mainWindow);
        const rpc = require("./core/rpc/RPC");
        rpc.login().then(() => rpc.setActivity());
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

app.on("ready", createWindow);

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
