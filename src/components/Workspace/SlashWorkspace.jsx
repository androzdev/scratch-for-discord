import { Component } from "react";
import Loader from "../Loading/Loader";

export default class Workspace extends Component {
    constructor(...props) {
        super(...props);

        this.state = {
            source: "http://slash-commands-gui.netlify.app",
            ready: false,
            noNet: false
        };
    }

    componentDidMount() {
        console.log("[DEBUG] Loading workspace...");
        window.ScratchNative?.sendMessage("setActivity", "on Slash Commands GUI");
        window.ScratchNative?.onceMessage("connection", (ev, status) => {
            this.setState({
                ready: status,
                noNet: !status
            });
        });

        window.ScratchNative?.sendMessage("connection");
    }

    render() {
        return (
            <div className="dark:bg-gray-900 bg-white h-screen w-full">
                {!this.state.ready ? <Loader loadingMessage={this.state.noNet ? "Waiting for network..." : "Loading Slash Commands GUI..."} /> : <iframe id="slash-frame" src={this.state.source} frameBorder="0" className="w-full h-screen"></iframe>}
            </div>
        );
    }
}
