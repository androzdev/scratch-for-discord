const { contextBridge, remote: ElectronRemote } = require("electron");

contextBridge.exposeInMainWorld("__scratch__", {
    remote: ElectronRemote,
    closeWindow: () => ElectronRemote.getCurrentWindow().closable && ElectronRemote.getCurrentWindow().close()
});