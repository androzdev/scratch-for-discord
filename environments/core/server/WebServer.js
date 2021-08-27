const { EventEmitter } = require("events");
const httpServer = require("http-server").createServer;

class WebServer extends EventEmitter {
    constructor() {
        super();

        this.port = 8945;
        this.ready = false;

        this.server = httpServer({
            root: `${__dirname}/sources`,
            port: this.port
        });

        // do not start at the beginning
        if (this.server.listening) this.disconnect(false);
    }

    connect(emit = true) {
        return new Promise((resolve) => {
            if (this.ready) return resolve(false);

            this.server.listen(this.port, () => {
                if (emit) this.emit("connected", this.port);
                this.ready = true;
                resolve(this.port);
            });
        });
    }

    disconnect(emit = true) {
        return new Promise((resolve) => {
            if (!this.ready) return resolve(false);
            this.server.close(() => {
                this.ready = false;
                if (emit) this.emit("closed");
                resolve(true);
            });
        });
    }
}

module.exports = WebServer;
