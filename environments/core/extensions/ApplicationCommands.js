const { ipcMain, BrowserWindow, dialog } = require("electron");
const { readdir, readFile } = require("fs").promises;
const { existsSync, statSync } = require("fs");
const db = require("../storage/database");

/**
 * @param {BrowserWindow} mainWindow
 */
module.exports = (mainWindow) => {
    ipcMain.on("exitApp", () => {
        if (mainWindow.closable) mainWindow.close();
    });

    ipcMain.on("recentWorkspace", (event) => {
        const data = db.get("recentWorkspace", []);
        const workspaces = [];

        for (const item of data) {
            if (existsSync(item) && statSync(item).isDirectory()) workspaces.push(item);
        }

        event.reply("recentWorkspace", workspaces);
    });

    ipcMain.on("openWorkspace", async (event) => {
        const response = await dialog
            .showOpenDialog(mainWindow, {
                title: "Scratch For Discord",
                properties: ["dontAddToRecent", "openDirectory"]
            })
            .then(
                (data) => {
                    if (data.canceled) return null;
                    return data.filePaths;
                },
                () => null
            );

        if (response != null) {
            const lastData = db.get("recentWorkspace", []);
            lastData.unshift(...response);
            db.set("recentWorkspace", lastData.slice(0, 5));
        }

        event.reply("openWorkspace", response);
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

    ipcMain.on("toggleRPC", (event, enable) => {
        const mode = Boolean(enable);
        db.set("rpcEnabled", mode);
    });

    ipcMain.on("settings", (event) => {
        const data = db.all();
        event.reply("settings", data);
    });
};
