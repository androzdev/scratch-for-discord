module.exports = {
    productName: "Scratch For Discord",
    appId: "com.scratchfordiscord.app",
    copyright: "Copyright © 2021 Scratch For Discord",
    files: ["index.js", "assets/**/*", "html/**/*", "node_modules/**/*", "package.json"],
    directories: {
        buildResources: "assets",
        output: "builds/app",
    },
    extraMetadata: {
        main: "index.js",
    },
    target: "nsis",
    publish: [],
    nsis: {
        oneClick: false,
        allowToChangeInstallationDirectory: true,
    },
    generateUpdatesFilesForAllChannels: true,
};
