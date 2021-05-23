module.exports = {
    productName: "Scratch For Discord",
    appId: "com.scratchfordiscord.app",
    copyright: `Copyright © ${new Date().getFullYear()} Scratch For Discord`,
    files: ["assets/**/*", "src/**/*", "node_modules/**/*", "package.json"],
    directories: {
        buildResources: "assets",
        output: "builds/app"
    },
    extraMetadata: {
        main: "src/index.js"
    },
    publish: ["github"],
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
    generateUpdatesFilesForAllChannels: true
};
