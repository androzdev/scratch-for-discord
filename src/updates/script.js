const ipcRenderer = require("electron").ipcRenderer;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("currentVersion").innerText = require(`${__dirname}/../../package.json`).version || "1.1.2";

    const state = document.getElementById("status");

    ipcRenderer.on("checking-for-update", (e) => {
        state.innerHTML = "Checking for updates...";
    });

    ipcRenderer.on("new-update", (e, version) => {
        state.innerHTML = `Update found <b>${version}</b>!`;
    });

    ipcRenderer.on("download-progress", (e, progress) => {
        const perc = (progress.total / progress.current) * 100;
        state.innerHTML = `<progress max="100" value="${perc}"></progress>`;
    });

    ipcRenderer.on("update-downloaded", (e) => {
        state.innerHTML = "Finished downloading the update!";
    });

    ipcRenderer.on("error", (e, err) => {
        state.innerHTML = `Error Downloading Update: <b>${err}</b>!`;
    });
});
