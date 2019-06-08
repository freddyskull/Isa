import {Request, Response} from 'express';

import database from '../database'


class PermissController {

   public async list (req: Request, res: Response): Promise<void> { 
       const permiss = await database.query('SELECT * FROM permiss');
       res.json(permiss);
    }
    public async getOne (req: Request, res: Response): Promise<any> { 
        const { id } = req.params;
        const permiss = await database.query('SELECT * FROM permiss WHERE id = ?', [id]);
        if(permiss.length > 0){
            return res.json(permiss[0]);
        }
        res.status(404).json({text: 'La venta: '+ req.params.id +' no fué encontrado'})
     }
    public async create (req: Request, res: Response): Promise<void>  { 
        await database.query('INSERT INTO permiss set ?', [req.body]);
        console.log(req.body);
        res.json({message: 'Venta guardada'});

    }
    public async update (req: Request, res: Response): Promise<void>  { 
        const { id } = req.params;
        await database.query('UPDATE permiss SET ? WHERE id = ?', [req.body ,id])
        res.json({text: 'El permiso fue editado: '});
    }
    public async delete (req: Request, res: Response): Promise<void> { 
        const { id } = req.params;
        await database.query('DELETE FROM permiss WHERE id = ?', [id])
        res.json({message: 'La venta se ha eliminado'}); 
    }

}

export const permissController = new PermissController();