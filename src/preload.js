const { ipcRenderer, shell, remote: ElectronRemote } = require("electron");

Object.defineProperties(window, {
    __scratch__: {
        value: {
            remote: ElectronRemote,
            closeWindow: () => ElectronRemote.getCurrentWindow().closable && ElectronRemote.getCurrentWindow().close(),
            appVersion: require(`${__dirname}/../package.json`).version || "1.1.2",
            ipc: {
                send: (...d) => ipcRenderer.send(...d),
                on: (...d) => ipcRenderer.on(...d)
            },
            openExternal: (u) => shell.openExternal(u),
            DISCORD_INVITE: "https://androz2091.fr/discord",
            Discord: require("discord.js")
        }
    }
});

window.document.addEventListener("keyup", (event) => {
    if (event.ctrlKey && event.keyCode === 192) {
        event.preventDefault();
        window.__scratch__.remote.getCurrentWindow().webContents.toggleDevTools();
    }
});