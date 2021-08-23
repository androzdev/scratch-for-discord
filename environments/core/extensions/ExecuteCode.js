const { ipcMain, app } = require("electron");
const S4D_NATIVE_GET_PATH = app.getAppPath();
const __E_IS_DEV = require("electron-is-dev");
let res = {};

/**
 * @param {BrowserWindow} mainWindow
 */
module.exports = (mainWindow) => {
    ipcMain.on("destroyClient", async (ev) => {
        try {
            res.client.destroy();
        } catch {}
    });

    ipcMain.on("executeCode", async (ev, code) => {
        try {
            res = await eval(code);
            res.client.once("ready", (cl) => {
                ev.reply("clientReady", {
                    ...cl.user?.toJSON(),
                    readyTimestamp: cl.readyTimestamp
                });
            });

            res.client.once("shardDisconnect", () => {
                ev.reply("clientShardDisconnect");
            });

            res.client.on("debug", (msg) => {
                ev.reply("clientDebug", msg);
            });

            res.client.on("warn", (msg) => {
                ev.reply("clientWarn", msg);
            });

            res.client.on("error", (msg) => {
                ev.reply("clientError", msg);
            });

            ev.reply("executeCode", {
                codeError: null,
                s4d: {
                    devMode: __E_IS_DEV,
                    tokenInvalid: res.tokenInvalid,
                    tokenError: res.tokenError,
                    reply: res.reply,
                    joiningMember: res.joiningMember,
                    client: null
                }
            });
        } catch (e) {
            ev.reply("executeCode", {
                codeError: e.message,
                s4d: res || {
                    devMode: __E_IS_DEV
                }
            });
        }
    });
};
