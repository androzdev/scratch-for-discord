import Loader from "../Loading/Loader";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faNetworkWired, faPaintRoller, faBars } from "@fortawesome/free-solid-svg-icons";

export default function Settings() {
    const URL_VERIFY_REGEX = /^(http(s)?):\/\/((deploy-preview-(\d+)--)?scratch-for-discord.netlify.app|localhost:(\d+))(\/)?$/;
    const [settings, setSettings] = useState(null);

    function refresh() {
        window.ScratchNative?.sendMessage("setActivity", "on settings");
        console.log("[DEBUG] Loading settings...");
        const scratch = window.ScratchNative;

        scratch?.onceMessage("settings", (ev, settingsData) => {
            setSettings(settingsData);
        });

        scratch?.sendMessage("settings");
    }

    useEffect(refresh, []);

    const get = (k) => settings.find((x) => x.id === k)?.data;

    return (
        <>
            {settings ? (
                <div className="dark:bg-gray-900 bg-white h-screen w-full">
                    <div className="pt-5 px-20">
                        <h1 className="dark:text-white text-black text-7xl">Settings</h1>
                        <div className="mt-5">
                            <div className="flex flex-col space-y-7">
                                <div className="space-y-3">
                                    <label htmlFor="rpcSettings" className="text-xl dark:text-white text-black opacity-90">
                                        <FontAwesomeIcon icon={faPaperclip} /> Discord RPC
                                    </label>
                                    <br />
                                    <select
                                        id="rpcSettings"
                                        defaultValue={get("rpcEnabled") ? "on" : "off"}
                                        className="form-select px-4 py-1 w-1/2 mt-1 rounded-md bg-gray-100 border-transparent focus:border-gray-500 dark:focus:bg-white focus:ring-0"
                                        onChange={(e) => {
                                            window.ScratchNative?.sendMessage("toggleRPC", e.target.value === "on");
                                            if (e.target.value !== "on") window.ScratchNative?.sendMessage("destroyRPC");
                                            else if (e.target.value === "on") window.ScratchNative?.sendMessage("reconnectRPC");
                                            refresh();
                                        }}
                                    >
                                        <option value="on">Enable</option>
                                        <option value="off">Disable</option>
                                    </select>
                                </div>

                                <div className="space-y-3">
                                    <label htmlFor="scratchSourceUrl" className="text-xl dark:text-white text-black opacity-90">
                                        <FontAwesomeIcon icon={faNetworkWired} /> Scratch Server
                                    </label>
                                    <input
                                        type="url"
                                        id="scratchSourceUrl"
                                        autoComplete="false"
                                        className="w-1/2 px-4 py-1 form-input block rounded-md text-blurple-400 font-semibold bg-gray-100 border-transparent focus:border-gray-500 dark:focus:bg-white focus:ring-0"
                                        placeholder="Ex: https://scratch-for-discord.netlify.app"
                                        defaultValue={get("scratchServer")}
                                        onKeyUp={(e) => {
                                            if (e.keyCode === 13) {
                                                e.preventDefault();
                                                const content = e.target.value || "";
                                                if (content && !URL_VERIFY_REGEX.test(content)) return alert("Unsupported server!");
                                                window.ScratchNative?.sendMessage("setServer", content);
                                                refresh();
                                                e.target.focus();
                                                e.target.readOnly = false;
                                            }
                                        }}
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label htmlFor="sidebarSettings" className="text-xl dark:text-white text-black opacity-90">
                                        <FontAwesomeIcon icon={faBars} /> Sidebar Position
                                    </label>
                                    <br />
                                    <select
                                        id="sidebarSettings"
                                        defaultValue={get("sidebarIsRight") ? "right" : "left"}
                                        className="form-select px-4 py-1 w-1/2 mt-1 rounded-md bg-gray-100 border-transparent focus:border-gray-500 dark:focus:bg-white focus:ring-0"
                                        onChange={(e) => {
                                            window.ScratchNative?.sendMessage("setSidebarRight", e.target.value === "right");
                                            refresh();
                                        }}
                                    >
                                        <option value="left">Left</option>
                                        <option value="right">Right</option>
                                    </select>
                                </div>

                                <div className="space-y-3">
                                    <label htmlFor="themeSettings" className="text-xl dark:text-white text-black opacity-90">
                                        <FontAwesomeIcon icon={faPaintRoller} /> Theme
                                    </label>
                                    <br />
                                    <select
                                        id="themeSettings"
                                        defaultValue={get("darkMode") ? "dark" : "light"}
                                        className="form-select px-4 py-1 w-1/2 mt-1 rounded-md bg-gray-100 border-transparent focus:border-gray-500 dark:focus:bg-white focus:ring-0"
                                        onChange={(e) => {
                                            window.ScratchNative?.sendMessage("setTheme", e.target.value === "dark");
                                            refresh();
                                        }}
                                    >
                                        <option value="dark">Dark Theme</option>
                                        <option value="light">Light Theme</option>
                                    </select>
                                </div>

                                <div className="mt-15">
                                    <button
                                        className="bg-blurple-500 hover:bg-blurple-600 text-white hover:text-gray-50 text-xl p-2 rounded-md"
                                        onClick={() => {
                                            window.ScratchNative?.theme();
                                            window.location.reload();
                                        }}
                                    >
                                        Apply Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Loader loadingMessage="Loading settings..." />
            )}
        </>
    );
}
