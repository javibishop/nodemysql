import {Router, Request, Response} from 'express';
import MySQL from '../mysql/mysql';

const router = Router();

router.get('/', (req : Request, res: Response) =>{
    res.json({
        ok: true,
        mensaje: 'hola a todos'
    });
});

router.get('/heroes/:id', (req : Request, res: Response) =>{
    let id = req.params.id;
    //para evitar inyexxion de codigo sql, se usa escaping query values, en la doc d emysql
    const escapedId = MySQL.mysqlInstance.con.escape(id);

    const query = `
    select 
    * 
    from alumnos
    where id = ${escapedId} `;
        MySQL.ejecutarQuert(query, (err: any, alumnos: Object[]) =>{
            if(err){
                res.status(400).json({
                    ok: false,
                    error: err
                });
                }else{
                    res.json({
                        ok: true,
                        alumnos: alumnos
                    })
                }
            }
        );
});

export default router;