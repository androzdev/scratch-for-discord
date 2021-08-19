const ElectronStore = require("electron-store");

class Store extends ElectronStore {
    all() {
        const data = [];

        for (const item of this) {
            data.push({
                id: item[0],
                data: item[1]
            });
        }

        return data;
    }
}

const store = new Store({
    fileExtension: "s4d.dat",
    name: ".scratchfordiscord.config",
    encryptionKey: Buffer.from("2dc31b6372af548e4272a1b76dd641bc934077e9b641c277a6e7c66ec41eb9d6", "hex"),
    accessPropertiesByDotNotation: true,
    schema: {
        recentWorkspace: {
            type: "array",
            default: []
        },
        rpcEnabled: {
            type: "boolean",
            default: true
        },
        scratchServer: {
            type: "string",
            default: "https://scratch-for-discord.netlify.app"
        },
        sidebarIsRight: {
            type: "boolean",
            default: false
        },
        darkMode: {
            type: "boolean",
            default: true
        }
    }
});

module.exports = store;
