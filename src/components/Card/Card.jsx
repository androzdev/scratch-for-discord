import S4D from "../../assets/icon.base64";

export default function Card({ data = {} }) {
    return (
        <div className="transform hover:-translate-y-1 border border-gray-300 shadow-lg rounded-md p-4 max-w-sm w-full mx-auto duration-300 cursor-pointer">
            <div className="flex space-x-4">
                <img src={data.icon || S4D} alt="icon" className="rounded-sm h-20 w-20" draggable="false" />
                <div className="flex-1 space-y-2 py-1">
                    <h1 className="text-2xl font-semibold dark:text-white text-black">{data.info.name}</h1>
                    <div className="space-y-1">
                        <p className="text-lg dark:text-gray-200 text-black">{data.info.description}</p>
                        <h1 className="text-lg dark:text-gray-200 text-black">
                            by{" "}
                            <b className="text-blurple-500 cursor-pointer hover:text-blurple-600" onClick={() => window.ScratchNative?.openURL(data.info.author.url || "https://scratch-for-discord.netlify.app")}>
                                {data.info.author.name}
                            </b>
                        </h1>
                        <p className="text-lg dark:text-gray-200 text-black opacity-90">Blocks Count: {data.blocks.length.toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
