const { contextBridge, remote: ElectronRemote, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("__scratch__", {
    remote: ElectronRemote,
    closeWindow: () => ElectronRemote.getCurrentWindow().closable && ElectronRemote.getCurrentWindow().close(),
    appVersion: require(`${__dirname}/../package.json`).version || "1.1.2",
    ipc: ipcRenderer
});
