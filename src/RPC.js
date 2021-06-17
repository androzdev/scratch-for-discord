const DiscordRPC = require("discord-rpc");
const CLIENT_ID = "787309462415343667";
DiscordRPC.register(CLIENT_ID);
const rpc = new DiscordRPC.Client({ transport: "ipc" });

rpc.login({ clientId: CLIENT_ID }).catch(() => {});

module.exports = rpc;
module.exports.APP_ID = CLIENT_ID;
