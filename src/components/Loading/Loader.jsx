import icon from "../../assets/icon.base64.js";

export default function Loader({ loadingMessage = "Loading..." }) {
    return (
        <div className="dark:bg-gray-800 bg-white h-screen w-full flex">
            <div className="m-auto">
                <img src={icon} alt="icon" className="mx-auto h-52 w-52" draggable={false} />
                <h1 className="text-center dark:text-white text-gray-600 font-semibold text-5xl">Scratch For Discord</h1>
                <p className="text-center dark:text-white text-gray-600 font-semibold text-lg opacity-90">v{window.ScratchNative?.version || "2.0.0-dev"}</p>
                <p className="text-center dark:text-white text-gray-600 font-semibold text-2xl">{loadingMessage}</p>
            </div>
        </div>
    );
}
