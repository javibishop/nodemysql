"use strict";
//singlenton pattern para tener una instancia sola de mysql
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MySQL {
    constructor() {
        this.conectado = false;
        console.log('Clase inicializada! Singleton');
        this.con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'mysql',
            database: 'sanmartin'
        });
        this.conectarDB();
    }
    static get mysqlInstance() {
        //implementacion del singleton para la instancia
        return this._instance || (this._instance = new this());
        ;
    }
    static ejecutarQuert(query, callback) {
        this.mysqlInstance.con.query(query, (err, results, fields) => {
            if (err) {
                console.log('error en query');
                console.log(err);
                //aviso de un error.
                return callback(err);
            }
            //no hubo error
            if (results.length === 0) {
                console.log('el registro solicitado no existe');
                //aviso de un error.
                return callback('el registro solicitado no existe');
            }
            else {
                callback(null, results);
            }
        });
    }
    conectarDB() {
        this.con.connect((err) => {
            if (err) {
                console.log(err.message);
            }
            this.conectado = true;
            console.log('Base de datos conectada');
        });
    }
}
exports.default = MySQL;
