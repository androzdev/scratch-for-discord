import { Component } from "react";
import Loader from "./components/Loading/Loader";
import { HashRouter as Router } from "react-router-dom";
import RouteBuilder from "./RouteBuilder";

export default class App extends Component {
    constructor(...props) {
        super(...props);

        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        if (!this.state.loading) return;

        this.setState({ loading: false });
    }

    render() {
        return <Router>{this.state.loading ? <Loader /> : <RouteBuilder />}</Router>;
    }
}
