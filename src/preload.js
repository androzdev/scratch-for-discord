const { contextBridge, remote: ElectronRemote, ipcRenderer, shell } = require("electron");

contextBridge.exposeInMainWorld("__scratch__", {
    remote: ElectronRemote,
    closeWindow: () => ElectronRemote.getCurrentWindow().closable && ElectronRemote.getCurrentWindow().close(),
    appVersion: require(`${__dirname}/../package.json`).version || "1.1.2",
    ipc: ipcRenderer,
    openExternal: (u) => shell.openExternal(u),
    DISCORD_INVITE: "https://androz2091.fr/discord"
});
