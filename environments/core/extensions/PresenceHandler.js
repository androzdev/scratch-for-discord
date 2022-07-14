const { ipcMain, BrowserWindow } = require("electron");
const RPC = require("../rpc/RPC");

/**
 * @param {BrowserWindow} mainWindow
 */
module.exports = (mainWindow) => {
    ipcMain.on("setActivity", async (ev, name) => {
        if (!RPC.ready) await RPC.login();
        if (RPC.ready) RPC.setActivity(name);
    });

    ipcMain.on("destroyRPC", (ev) => {
        if (RPC.ready) RPC.logout();
    });

    ipcMain.on("reconnectRPC", async (ev) => {
        if (RPC.ready) return;
        const success = await RPC.login();
        if (success) RPC.setActivity();
    });
};
