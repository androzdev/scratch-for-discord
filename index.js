const { app, BrowserWindow, shell, session } = require("electron");
const DiscordRPC = require("discord-rpc");
const CLIENT_ID = "787309462415343667";
DiscordRPC.register(CLIENT_ID);
const rpc = new DiscordRPC.Client({ transport: "ipc" });
const startDate = new Date();
let version, mainWindow;

try {
    version = require(`${__dirname}/package.json`).version;
} catch(e) {
    version = "1.1.2";
}

app.on("ready", () => {
    session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
        details.requestHeaders["User-Agent"] = "";
        callback({ cancel: false, requestHeaders: details.requestHeaders });
    });
    mainWindow = new BrowserWindow({
        show: false,
        frame: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: true,
            webSecurity: false,
            preload: `${__dirname}/src/preload.js`
        }
    });

    mainWindow.loadFile(`${__dirname}/src/loader.html`);

    if (mainWindow.maximizable) mainWindow.maximize();
    mainWindow.show();

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url);
    });

    mainWindow.webContents.on("dom-ready", () => {
        if (!mainWindow.webContents.getURL().includes("scratch-for-discord.netlify.app")) {
            mainWindow.loadURL("https://scratch-for-discord.netlify.app");
        } else {
            mainWindow.webContents.executeJavaScript(`
                if (window.__scratch__) {
                    const y = document.createElement("li");
                    y.classList.add("nav-item");
                    y.innerHTML = '<a href="#" class="nav-link" id="nav-close-window">Exit</a>';
                    document.querySelector("ul[class='navbar-nav']").appendChild(y);

                    document.getElementById("nav-close-window").addEventListener("click", (e) => {
                        e.preventDefault();
                        return window.__scratch__.closeWindow();
                    });
                }
            `);
        }
    });
});

rpc.on("ready", () => {
    createPresence();
    setInterval(createPresence, 15000);
});

function createPresence() {
    const getTitle = () => {
        const title = mainWindow && mainWindow.webContents.getTitle();
        if (!title || !title.includes("-")) return "Untitled document";
        const text = title.split("-")[1].trim();
        return text.toLowerCase() === "make your own bot using blocks" ? "Untitled document" : text;
    };
    rpc.request("SET_ACTIVITY", {
        pid: process.pid,
        activity: {
            details: getTitle(),
            timestamps: {
                start: startDate.getTime()
            },
            assets: {
                large_image: "large",
                large_text: `Scratch For Discord - v${version}`
            },
            buttons: [
                {
                    label: "Download",
                    url: "https://github.com/Androz2091/scratch-for-discord"
                }
            ]
        }
    });
}

rpc.login({ clientId: CLIENT_ID }).catch(console.error);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
