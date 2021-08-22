const { ipcMain, app } = require("electron");
const S4D_NATIVE_GET_PATH = app.getAppPath();
let res = {};

/**
 * @param {BrowserWindow} mainWindow
 */
module.exports = (mainWindow) => {
    ipcMain.on("executeCode", async (ev, code) => {
        try {
            console.log(code);
            res = await eval(code);
            const client = {
                ...res.client.toJSON(),
                readyTimestamp: res.client.readyTimestamp
            };
            console.log(client);
            res.client.once("ready", (cl) => {
                ev.reply("clientReady", {
                    ...cl.toJSON(),
                    readyTimestamp: cl.readyTimestamp
                })
            });
            res.client.once("shardDisconnect", (cl) => {
                ev.reply("clientShardDisconnect");
            });
            ev.reply("executeCode", {
                codeError: null,
                s4d: {
                    tokenInvalid: res.tokenInvalid,
                    client
                }
            });
        } catch(e) {
            ev.reply("executeCode", {
                codeError: e.stack,
                s4d: res || {}
            });
        }
    })
};