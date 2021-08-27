const { ipcMain, BrowserWindow, dialog } = require("electron");
const { readdir, readFile } = require("fs").promises;
const isOnline = require("is-online");
const WebServer = require("../server/WebServer");
const ws = new WebServer();
const fetch = require("node-fetch").default;

/**
 * @param {BrowserWindow} mainWindow
 */
module.exports = (mainWindow) => {
    ws.on("connected", (port) => {
        mainWindow.webContents.send("connectFallbackServer", port);
    });

    ws.on("disconnected", () => {
        mainWindow.webContents.send("disconnectFallbackServer", true);
    });

    ipcMain.on("exitApp", () => {
        if (mainWindow.closable) mainWindow.close();
    });

    ipcMain.on("saveAs", async (event) => {
        const response = await dialog
            .showSaveDialog(mainWindow, {
                title: "Scratch For Discord",
                properties: ["dontAddToRecent", "showOverwriteConfirmation"]
            })
            .then(
                (data) => {
                    if (data.canceled) return null;
                    return data.filePath;
                },
                () => null
            );

        event.reply("saveAs", response);
    });

    ipcMain.on("readDirectory", async (event, path) => {
        readdir(path)
            .then((res) => {
                event.reply("readDirectory", res);
            })
            .catch(() => event.reply("readDirectory", null));
    });

    ipcMain.on("readFile", async (event, path) => {
        readFile(path, "utf-8")
            .then((res) => {
                event.reply("readFile", res);
            })
            .catch(() => event.reply("readFile", null));
    });

    ipcMain.on("connection", async (event, runFallbackServer = false) => {
        const status = await isOnline().catch(() => false);
        if (runFallbackServer && !status) await ws.connect();
        event.reply("connection", status);
    });

    ipcMain.on("connectFallbackServer", async (event) => {
        const result = await ws.connect(false);
        event.reply("connectFallbackServer", result);
    });

    ipcMain.on("disconnectFallbackServer", async (event) => {
        const result = await ws.disconnect(false);
        event.reply("killFallbackServer", result);
    });

    ipcMain.on("toggleDevTools", (ev) => {
        mainWindow.webContents.toggleDevTools();
    });

    ipcMain.on("fetchStore", (ev) => {
        fetch("https://raw.githubusercontent.com/scratch-for-discord/blocks/main/metadata.json")
            .then((res) => res.json())
            .then((data) => {
                ev.reply("fetchStore", data);
            })
            .catch(() => {
                ev.reply("fetchStore", null);
            });
    });
};
