const { readdir } = require("fs").promises;
const noop = () => {};

module.exports = class ExtensionLoader {
    collection = new Map();
    loaded = false;

    constructor(MainWindow) {
        this.mainWindow = MainWindow;

        this._instantiateExtensions();
    }

    _instantiateExtensions() {
        if (this.loaded) return;
        readdir(`${__dirname}/extensions`).then((data) => {
            for (const extension of data) {
                if (extension.startsWith("_")) continue;
                this.collection.set(extension, require(`${__dirname}/extensions/${extension}`)(this.mainWindow));
            }

            this.loaded = true;
        }, noop);
    }
};
