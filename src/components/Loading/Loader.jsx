import icon from "../../assets/icon.base64.js";

export default function Loader({ loadingMessage = "Loading..." }) {
    return (
        <div className="bg-gray-800 h-screen w-full flex">
            <div className="m-auto">
                <img src={icon} alt="icon" className="mx-auto h-52 w-52" draggable={false} />
                <h1 className="text-center text-white font-semibold text-5xl">Scratch For Discord</h1>
                <p className="text-center text-white font-semibold text-2xl">{loadingMessage}</p>
            </div>
        </div>
    );
}
