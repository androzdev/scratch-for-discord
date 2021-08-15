import Logo from "../../assets/icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="bg-gray-900 w-20 border-r-2 border-gray-600">
            <div>
                <Link to="/">
                    <img src={Logo} className="h-14 w-14 mx-auto mt-3 cursor-pointer p-1 border-b-2 border-gray-600" srcSet={Logo} alt="logo" draggable="false" />
                </Link>
            </div>
            <div>
                <a href={window.ScratchNative?.DISCORD_INVITE} target="_blank">
                    <p className="text-4xl text-white opacity-90 hover:opacity-100 text-center mt-3 cursor-pointer">
                        <FontAwesomeIcon icon={faDiscord} />
                    </p>
                </a>
                <a href="https://github.com/Androz2091/scratch-for-discord" target="_blank">
                    <p className="text-4xl text-white opacity-90 hover:opacity-100 text-center mt-3 cursor-pointer">
                        <FontAwesomeIcon icon={faGithub} />
                    </p>
                </a>
                <Link to="/settings">
                    <p className="text-4xl text-white opacity-90 hover:opacity-100 text-center mt-3 cursor-pointer">
                        <FontAwesomeIcon icon={faCog} />
                    </p>
                </Link>
            </div>
        </div>
    );
}
