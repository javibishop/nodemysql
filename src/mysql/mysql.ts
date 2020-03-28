//singlenton pattern para tener una instancia sola de mysql

import mysql = require('mysql');

export default class MySQL{
    private static _instance: MySQL;
    con: mysql.Connection;
    conectado: boolean = false;

    constructor(){
        console.log('Clase inicializada! Singleton')
        this.con = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : 'mysql',
            database : 'sanmartin'
          });

          this.conectarDB();
    }

    public static get mysqlInstance(){
        //implementacion del singleton para la instancia
        return this._instance || (this._instance = new this());;
    }

    static ejecutarQuert(query: string, callback: Function){
        this.mysqlInstance.con.query(query, (err, results: Object[], fields ) => {
            if(err){
                console.log('error en query');
                console.log(err);
                //aviso de un error.
                return callback(err);
            }
            //no hubo error

            if(results.length === 0){
                console.log('el registro solicitado no existe');
                //aviso de un error.
                return callback('el registro solicitado no existe');
            }else{
                callback(null, results)
            }
        })
    }

    private conectarDB(){
        this.con.connect((err: mysql.MysqlError) => {
            if(err){
                console.log(err.message);
            }

            this.conectado = true;
            console.log('Base de datos conectada');
        })
    }
}