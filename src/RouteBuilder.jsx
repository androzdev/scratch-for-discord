import { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import Settings from "./components/Settings/Settings";
import Sidebar from "./components/Sidebar/Sidebar";
import Workspace from "./components/Workspace/Workspace";
import SlashWorkspace from "./components/Workspace/SlashWorkspace";
import ExtensionStore from "./components/ExtensionStore/ExtensionStore";

export default function RouteBuilder() {
    const [settings, setSettings] = useState([]);

    useEffect(() => {
        window.ScratchNative?.onceMessage("settings", (ev, settingsData) => {
            setSettings(settingsData);
        });

        window.ScratchNative?.sendMessage("settings");
    }, []);

    const get = (k) => {
        console.log(settings);
        return settings.find((x) => x.id === k)?.data;
    };

    return (
        <>
            <div className="flex w-screen select-none">
                {!get("sidebarIsRight") ? (
                    <>
                        <Sidebar />
                        <Switch>
                            <Route exact path="/" component={HomeScreen} />
                            <Route path="/settings" component={Settings} />
                            <Route path="/workspace" component={Workspace} />
                            <Route path="/slash" component={SlashWorkspace} />
                            <Route path="/store" component={ExtensionStore} />
                            <Redirect to="/" />
                        </Switch>
                    </>
                ) : (
                    <>
                        <Switch>
                            <Route exact path="/" component={HomeScreen} />
                            <Route path="/settings" component={Settings} />
                            <Route path="/workspace" component={Workspace} />
                            <Route path="/slash" component={SlashWorkspace} />
                            <Route path="/store" component={ExtensionStore} />
                            <Redirect to="/" />
                        </Switch>
                        <Sidebar />
                    </>
                )}
            </div>
        </>
    );
}
