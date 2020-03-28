"use strict";
//la misma config que usaba en node pero con ts.
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
//como si fuera module.export = server
//tengo q tener instalado @types/express para que me de intelisens de express 
class Server {
    constructor(port) {
        this.puerto = port;
        this.app = express();
    }
    publicFolder() {
        const publicPath = path.resolve(__dirname, '../public');
        //configuro la carpeta publica
        this.app.use(express.static(publicPath));
    }
    ///singleton de express
    static init(puerto) {
        //sino le pongo el return, en el index.ts cuando hago el const server = Server.init(3000); y accedo a server.start no encuentra
        //nada, pq no tengo aca el return.
        return new Server(puerto);
    }
    start(callback) {
        this.app.listen(this.puerto, callback);
        this.publicFolder();
    }
}
exports.default = Server;
