import Loader from "../Loading/Loader";
import { useState, useEffect } from "react";

export default function Settings() {
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        console.log("[DEBUG] Loading settings...");
        const scratch = window.ScratchNative;

        scratch?.onceMessage("settings", (ev, settingsData) => {
            setSettings(settingsData);
        });

        scratch?.sendMessage("settings");
    }, []);

    const get = (k) => settings.find((x) => x.id === k)?.data;

    return (
        <>
            {settings ? (
                <div className="bg-gray-900 h-screen w-full">
                    <div className="pt-5 px-20">
                        <h1 className="text-white text-7xl">Settings</h1>
                        <div className="mt-5">
                            <div className="space-x-3">
                                <label htmlFor="rpcSettings" className="text-xl text-white opacity-90">
                                    Discord RPC
                                </label>
                                <select
                                    id="rpcSettings"
                                    defaultValue={get("rpcEnabled") ? "on" : "off"}
                                    className="form-select px-4 py-1 w-52 mt-1 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                                    onChange={(e) => window.ScratchNative?.sendMessage("toggleRPC", e.target.value === "on")}
                                >
                                    <option value="on">Enable</option>
                                    <option value="off">Disable</option>
                                </select>
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
