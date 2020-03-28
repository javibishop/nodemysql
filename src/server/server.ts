//la misma config que usaba en node pero con ts.

import express = require('express');
import path  = require('path');
//como si fuera module.export = server
//tengo q tener instalado @types/express para que me de intelisens de express 
export default class Server {
    public app: express.Application;
    public puerto: number;

    constructor(port: number){
        this.puerto = port;
        this.app = express();
    }

    private publicFolder(){
        const publicPath = path.resolve(__dirname, '../public')

        //configuro la carpeta publica
        this.app.use(express.static(publicPath));
    }

    ///singleton de express
    static init (puerto: number) {
        //sino le pongo el return, en el index.ts cuando hago el const server = Server.init(3000); y accedo a server.start no encuentra
        //nada, pq no tengo aca el return.
        return new Server(puerto);
    }

     public start(callback: any){
        this.app.listen(this.puerto, callback);
        this.publicFolder();
    }
}
