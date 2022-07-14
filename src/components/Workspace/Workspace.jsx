import { Component } from "react";
import Loader from "../Loading/Loader";

export default class Workspace extends Component {
    constructor(...props) {
        super(...props);

        this.state = {
            source: window.ScratchNative?.SCRATCH_SERVER() || "https://scratch-for-discord.netlify.app",
            ready: false,
            loadError: false
        };
    }

    componentWillUnmount() {
        console.log("[DEBUG] Destroying workspace...");
        window.ScratchNative?.sendMessage("disconnectFallbackServer");
    }

    componentDidMount() {
        console.log("[DEBUG] Loading workspace...");
        window.ScratchNative?.sendMessage("setActivity", "on S4D workspace");
        window.ScratchNative?.onceMessage("connectFallbackServer", (ev, port) => {
            if (!port) return;
            this.setState({
                ready: true,
                source: `http://localhost:${port}/s4d/index.html`
            });
        });

        window.ScratchNative?.onceMessage("connection", (ev, status) => {
            this.setState({
                ready: status
            });

            if (!status) window.ScratchNative?.sendMessage("connectFallbackServer");
        });

        window.ScratchNative?.sendMessage("connection");
    }

    render() {
        return (
            <div className="dark:bg-gray-900 bg-white h-screen w-full">
                {!this.state.ready ? <Loader loadingMessage={this.state.loadError ? "Error loading workspace!" : "Loading Scratch For Discord..."} /> : <iframe id="s4d-frame" src={this.state.source} frameBorder="0" className="w-full h-screen"></iframe>}
            </div>
        );
    }
}
