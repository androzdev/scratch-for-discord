import { useEffect, Component } from "react";
import Loader from "../Loading/Loader";

export default class Workspace extends Component {
    constructor(...props) {
        super(...props);

        this.state = {
            source: "https://scratch-for-discord.netlify.app",
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
        window.ScratchNative?.onceMessage("connectFallbackServer", (ev, port) => {
            if (!port) return;
            this.setState({
                ready: true,
                source: `http://localhost:${port}/index.html`
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
        return <div className="bg-gray-900 h-screen w-full">{!this.state.ready ? <Loader loadingMessage={this.state.loadError ? "Error loading workspace!" : "Loading Scratch For Discord..."} /> : <iframe src={this.state.source} frameBorder="0" className="w-full h-screen"></iframe>}</div>;
    }
}
