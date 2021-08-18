module.exports = {
    extends: null,
    productName: "Scratch For Discord",
    appId: "com.scratchfordiscord.app",
    copyright: `Copyright © ${new Date().getFullYear()} Scratch For Discord`,
    files: [
        "environments/**/*",
        "build/**/*",
        "node_modules/**/*",
        "package.json",
        "!public/**/*",
        "!builds/**/*",
        "!src/**/*",
        "!.git/**/*",
        "!.prettierignore",
        "!.prettierrc",
        "!builder.js",
        "!craco.config.js",
        "!README.md",
        "!tailwind.config.js",
        "!yarn.lock",
        "!package-lock.json",
        "!.github/**/*"
    ],
    directories: {
        buildResources: "environments/assets",
        output: "builds/app"
    },
    extraMetadata: {
        main: "environments/main.js"
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
    mac: {
        target: "dmg",
        category: "public.app-category.utilities"
    },
    "protocols": {
        name: "s4d-protocol",
        schemes: [
            "s4d"
        ]
    },
    generateUpdatesFilesForAllChannels: true
};