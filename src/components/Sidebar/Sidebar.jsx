import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCog, faCode, faTerminal, faCubes } from "@fortawesome/free-solid-svg-icons";
import { useHistory, Link } from "react-router-dom";
import ICON from "../../assets/icon.base64.js";

export default function Sidebar() {
    const historyBucket = useHistory();

    return (
        <div className="bg-gray-900 w-20 border-r-2 border-gray-600">
            <div onClick={() => historyBucket.push("/")}>
                <img src={ICON} className="h-14 w-14 mx-auto mt-3 cursor-pointer p-1 border-b-2 border-gray-400" alt="logo" draggable="false" />
            </div>
            <div>
                <div>
                    <a href={window.ScratchNative?.DISCORD_INVITE} target="_blank" title="Discord Server">
                        <p className="text-4xl text-white opacity-90 hover:opacity-100 text-center mt-3 cursor-pointer">
                            <FontAwesomeIcon icon={faDiscord} />
                        </p>
                    </a>
                </div>
                <div className="border-b-2 pb-5 border-gray-400">
                    <a href="https://github.com/Androz2091/scratch-for-discord" target="_blank" title="Source Code">
                        <p className="text-4xl text-white opacity-90 hover:opacity-100 text-center mt-3 cursor-pointer">
                            <FontAwesomeIcon icon={faGithub} />
                        </p>
                    </a>
                </div>
                <div>
                    <Link to="/slash">
                        <p className="text-4xl text-white opacity-90 hover:opacity-100 text-center mt-3 cursor-pointer" title="Slash Commands">
                            <FontAwesomeIcon icon={faCode} />
                        </p>
                    </Link>
                </div>
                <div className="border-b-2 pb-5 border-gray-400">
                    <Link to="/store">
                        <p className="text-4xl text-white opacity-90 hover:opacity-100 text-center mt-3 cursor-pointer" title="Store">
                            <FontAwesomeIcon icon={faCubes} />
                        </p>
                    </Link>
                </div>
                <div>
                    <p className="text-4xl text-white opacity-90 hover:opacity-100 text-center mt-3 cursor-pointer" title="Developer Tools" onClick={() => window.ScratchNative?.sendMessage("toggleDevTools")}>
                        <FontAwesomeIcon icon={faTerminal} />
                    </p>
                </div>
                <div>
                    <Link to="/settings">
                        <p className="text-4xl text-white opacity-90 hover:opacity-100 text-center mt-3 cursor-pointer" title="App Settings">
                            <FontAwesomeIcon icon={faCog} />
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
