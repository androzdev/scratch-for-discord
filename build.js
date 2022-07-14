const productMeta = require("./product.json");

/** @type {import("electron-builder").Configuration} */
module.exports = {
    extends: null,
    productName: productMeta.productName,
    appId: productMeta.productId,
    copyright: `Copyright © ${new Date().getFullYear()} ${productMeta.copyrightOwner}`,
    files: [
        "./dist",
        "./app",
        "./public",
        "./package.json",
        "./product.json"
    ],
    directories: {
        buildResources: "public",
        output: "builds/app"
    },
    extraMetadata: {
        main: "app/app.js"
    },
    publish: ["github"],
    detectUpdateChannel: true,
    win: {
        target: "nsis"
    },
    nsis: {
        oneClick: false,
        allowToChangeInstallationDirectory: true
    },
    linux: {
        target: "AppImage"
    },
    mac: {
        target: "dmg",
        category: "public.app-category.utilities"
    },
    protocols: {
        name: "s4d-protocol",
        schemes: productMeta.protocols
    },
    generateUpdatesFilesForAllChannels: true
};