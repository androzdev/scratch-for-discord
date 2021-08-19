const { ipcMain, BrowserWindow, dialog } = require("electron");
const { existsSync, statSync } = require("fs");
const db = require("../storage/database");
const S4D_REGEX = /^(http(s)?):\/\/((deploy-preview-(\d+)--)?scratch-for-discord.netlify.app|localhost:(\d+))(\/)?$/;

/**
 * @param {BrowserWindow} mainWindow
 */
module.exports = (mainWindow) => {
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
            db.set("recentWorkspace", [...new Set(lastData)].slice(0, 5));
        }

        event.reply("openWorkspace", response || []);
    });

    ipcMain.on("toggleRPC", (event, enable) => {
        const mode = Boolean(enable);
        db.set("rpcEnabled", mode);
        if (mode) {
            ipcMain.emit("setActivity");
        } else {
            ipcMain.emit("destroyRPC");
        }
    });

    ipcMain.on("setSidebarRight", (event, isRight) => {
        const enabled = Boolean(isRight);
        db.set("sidebarIsRight", enabled);
    });

    ipcMain.on("setTheme", (event, isRight) => {
        const enabled = Boolean(isRight);
        db.set("darkMode", enabled);
    });

    ipcMain.on("setServer", (event, url) => {
        const matches = S4D_REGEX.test(url);
        db.set("scratchServer", matches ? url : "https://scratch-for-discord.netlify.app");
    });

    ipcMain.on("settings", (event) => {
        const data = db.all();
        event.reply("settings", data);
    });
};
