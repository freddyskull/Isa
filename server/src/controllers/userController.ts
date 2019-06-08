import {Request, Response} from 'express';

import database from '../database'


class UserController {

   public async list (req: Request, res: Response): Promise<void> { 
       const users = await database.query('SELECT * FROM users');
       res.json(users);
    }
    public async getOne (req: Request, res: Response): Promise<any> { 
        const { id } = req.params;
        const users = await database.query('SELECT * FROM users WHERE id = ?', [id]);
        if(users.length > 0){
            return res.json(users[0]);
        }
        res.status(404).json({text: 'El proveedor: '+ req.params.id +' no fué encontrado'})
     }
    public async create (req: Request, res: Response): Promise<void>  { 
        await database.query('INSERT INTO users set ?', [req.body]);
        console.log(req.body);
        res.json({message: 'proveedor guardado'});

    }
    public async update (req: Request, res: Response): Promise<void>  { 
        const { id } = req.params;
        await database.query('UPDATE users SET ? WHERE id = ?', [req.body ,id])
        res.json({text: 'El proveedor: '+ req.params.id +' fué actualizado' });
    }
    public async delete (req: Request, res: Response): Promise<void> { 
        const { id } = req.params;
        await database.query('DELETE FROM users WHERE id = ?', [id])
        res.json({message: 'El proveedor se ha eliminado'}); 
    }

}

export const userController = new UserController();