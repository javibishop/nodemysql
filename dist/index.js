"use strict";
//ts -> super set de js.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server/server"));
const router_1 = __importDefault(require("./router/router"));
const mysql_1 = __importDefault(require("./mysql/mysql"));
//sin singleton
const mysql = new mysql_1.default();
//con singleton 
//MySQL.instance;
const server = server_1.default.init(3000);
//importo las rutas
server.app.use(router_1.default);
server.start(() => {
    console.log('servidor corriendo en el puerto 3000');
});
