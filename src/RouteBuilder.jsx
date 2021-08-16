import { Switch, Route, Redirect } from "react-router-dom";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import Settings from "./components/Settings/Settings";
import Sidebar from "./components/Sidebar/Sidebar";
import Workspace from "./components/Workspace/Workspace";

export default function RouteBuilder() {
    return (
        <>
            <div className="flex w-screen select-none">
                <Sidebar />
                <Switch>
                    <Route exact path="/" component={HomeScreen} />
                    <Route path="/settings" component={Settings} />
                    <Route path="/workspace" component={Workspace} />
                    <Redirect to="/" />
                </Switch>
            </div>
        </>
    );
}
