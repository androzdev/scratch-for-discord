const { ipcMain, BrowserWindow } = require("electron");
const RPC = require("../rpc/RPC");

/**
 * @param {BrowserWindow} mainWindow
 */
module.exports = (mainWindow) => {
    ipcMain.on("setActivity", async (ev, name) => {
        console.log("Activity Call");
        if (!RPC.ready) await RPC.login();
        RPC.setActivity(name);
    });

    ipcMain.on("destroyRPC", (ev) => {
        RPC.logout();
    });

    ipcMain.on("reconnectRPC", (ev) => {
        RPC.login();
    });
};
