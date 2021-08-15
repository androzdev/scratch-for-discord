const { contextBridge, ipcRenderer, shell } = require("electron");
const load = (id) => {
    try {
        return require(id);
    } catch {
        return null;
    }
};
const projectMeta = load("../../package.json");
const ScratchNative = {
    version: projectMeta.version,
    info: {
        platform: process.platform,
        arch: process.arch,
        versions: {
            node: process.version,
            v8: process.versions.v8,
            electron: process.versions.electron
        }
    },
    sendMessage: (channel, ...data) => {
        ipcRenderer.send(channel, ...data);
    },
    sendMessageSync: (channel, ...data) => {
        return ipcRenderer.sendSync(channel, ...data);
    },
    onMessage: (channel, ...data) => {
        ipcRenderer.on(channel, ...data);
    },
    onceMessage: (channel, ...data) => {
        ipcRenderer.once(channel, ...data);
    },
    DISCORD_INVITE: "https://androz2091.fr/discord",
    openURL: (url) => void shell.openExternal(url)
};

contextBridge.exposeInMainWorld("ScratchNative", ScratchNative);
