const { contextBridge, ipcRenderer, shell } = require("electron");
const db = require("../core/storage/database");
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
    unregisterEvents: (events) => {
        if (!Array.isArray(events)) return;
        for (const event of events) {
            ipcRenderer.removeAllListeners(event);
        }
    },
    DISCORD_INVITE: "https://androz2091.fr/discord",
    DISCORD_COMMUNITY: "https://discord.gg/QemqGz63ju",
    openURL: (url) => void shell.openExternal(url),
    SCRATCH_SERVER() {
        return db.get("scratchServer") || "https://scratch-for-discord.netlify.app";
    },
    theme: () => {
        const isDark = db.get("darkMode") || false;
        if (isDark) {
            document.documentElement.classList.add("dark");
            document.body.style.backgroundColor = "#161719";
        } else {
            document.documentElement.classList.remove("dark");
            document.body.style.backgroundColor = "#FFFFFF";
        }
        return isDark;
    },
    donations: {
        patreon: "https://www.patreon.com/Androz2091",
        paypal: "https://paypal.me/devsnowflake"
    }
};

contextBridge.exposeInMainWorld("ScratchNative", ScratchNative);

document.addEventListener("keydown", (ev) => {
    if (ev.ctrlKey && ev.key.toLowerCase() === "r") {
        ev.preventDefault();
        window.location.reload();
    }

    if (ev.ctrlKey && ev.key.toLowerCase() === "`") {
        ev.preventDefault();
        ScratchNative.sendMessage("toggleDevTools");
    }
});
