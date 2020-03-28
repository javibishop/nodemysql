//ts -> super set de js.

import Server from './server/server';
import router from './router/router';
import MySQL from './mysql/mysql';

//sin singleton
const mysql = new MySQL();

//con singleton 
//MySQL.instance;

const server = Server.init(3000);
//importo las rutas
server.app.use(router);

server.start(() => {
    console.log('servidor corriendo en el puerto 3000');
})
