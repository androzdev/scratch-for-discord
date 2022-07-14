import { app, BrowserWindow } from "electron";

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    });

    if (!app.isPackaged) {
        win.loadURL("http://localhost:3000");
    } else {
        win.loadFile(`${__dirname}/../dist/index.html`);
    }
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
