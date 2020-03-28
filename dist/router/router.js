"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const router = express_1.Router();
router.get('/', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'hola a todos'
    });
});
router.get('/heroes/:id', (req, res) => {
    let id = req.params.id;
    //para evitar inyexxion de codigo sql, se usa escaping query values, en la doc d emysql
    const escapedId = mysql_1.default.mysqlInstance.con.escape(id);
    const query = `
    select 
    * 
    from alumnos
    where id = ${escapedId} `;
    mysql_1.default.ejecutarQuert(query, (err, alumnos) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                alumnos: alumnos
            });
        }
    });
});
exports.default = router;
