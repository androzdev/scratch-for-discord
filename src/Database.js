const Store = require("electron-store");
const store = new Store({
    defaults: {
        scratch: "https://scratch-for-discord.netlify.app",
        rpc: true
    }
});

module.exports = store;
