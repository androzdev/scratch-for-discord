import { useState, useEffect } from "react";
import Card from "./Card";
import { faFolder, faClock } from "@fortawesome/free-solid-svg-icons";
import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import ICON from "../../assets/icon.base64.js";

export default function HomeScreen() {
    const getTime = () => {
        const now = new Date().getHours();

        if (now >= 0 && now < 12) {
            return "Morning";
        } else if (now >= 12 && now < 17) {
            return "Afternoon";
        } else if (now >= 17 && now < 20) {
            return "Evening";
        } else if (now >= 20 && now <= 23) {
            return "Night";
        }
    };

    const [workspaces, setWorkspaces] = useState([]);
    const routeHistory = useHistory();

    useEffect(() => {
        console.log("[DEBUG] Loading recent workspace data...");
        window.ScratchNative?.onceMessage("recentWorkspace", (ev, data) => {
            setWorkspaces(Array.isArray(data) ? data : []);
        });
        window.ScratchNative?.sendMessage("recentWorkspace");

        window.ScratchNative?.onceMessage("openWorkspace", (ev, paths) => {
            if (paths.length) routeHistory.push(`/workspace?name=${paths[0]}`);
        });
    }, []);

    return (
        <div className="bg-gray-900 h-screen w-full">
            <div className="pt-5 px-20">
                <h1 className="text-white text-7xl">Good {getTime()}!</h1>
                <div className="mt-10 flex space-x-20 my-auto">
                    <div className="grid grid-cols-2 gap-4 my-auto">
                        <Card
                            icon={faFolder}
                            text="Open workspace"
                            onClick={() => {
                                window.ScratchNative?.sendMessage("openWorkspace");
                            }}
                        />
                        <Card
                            icon={faDiscord}
                            text="Join Discord"
                            onClick={() => {
                                window.ScratchNative?.openURL(window.ScratchNative?.DISCORD_INVITE);
                            }}
                        />
                        <Card
                            icon={faGithub}
                            text="Scratch For Discord"
                            onClick={() => {
                                window.ScratchNative?.openURL("https://github.com/scratch-for-discord/scratch-for-discord-app");
                            }}
                        />
                    </div>
                    <div className="text-white border-l-2 border-gray-500 my-auto">
                        <div className="ml-5">
                            <img src={ICON} alt="logo" className="h-32 w-32" draggable="false" />
                            <h1 className="text-5xl">Scratch For Discord</h1>
                            <p className="text-2xl opacity-70">v{window.ScratchNative?.version ?? "1.0.0"}</p>
                            <p className="text-2xl opacity-70">
                                Build {window.ScratchNative?.info.platform}-{window.ScratchNative?.version ?? "1.0.0"}-{window.ScratchNative?.info.versions.node}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-20">
                    <h1 className="text-5xl text-white">
                        <FontAwesomeIcon icon={faClock} /> Recent Workspace
                    </h1>
                    <div className="mt-5">
                        {!workspaces.length ? (
                            <h1 className="text-white opacity-90 text-1xl">No recent workspaces detected!</h1>
                        ) : (
                            workspaces.map((m, i) => (
                                <div key={i}>
                                    <h1 className="text-blurple-500 hover:text-blurple-600 text-xl cursor-pointer" onClick={() => routeHistory.push(`/workspace?name=${m}`)}>
                                        {m}
                                    </h1>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
