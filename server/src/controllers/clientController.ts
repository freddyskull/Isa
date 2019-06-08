import {Request, Response} from 'express';

import database from '../database'


class ClientController {

   public async list (req: Request, res: Response): Promise<void> { 
       const client = await database.query('SELECT * FROM client');
       res.json(client);
    }
    public async getOne (req: Request, res: Response): Promise<any> { 
        const { id } = req.params;
        const client = await database.query('SELECT * FROM client WHERE id = ?', [id]);
        if(client.length > 0){
            return res.json(client[0]);
        }
        res.status(404).json({text: 'El proveedor: '+ req.params.id +' no fué encontrado'})
     }
    public async create (req: Request, res: Response): Promise<void>  { 
        await database.query('INSERT INTO client set ?', [req.body]);
        console.log(req.body);
        res.json({message: 'proveedor guardado'});

    }
    public async update (req: Request, res: Response): Promise<void>  { 
        const { id } = req.params;
        await database.query('UPDATE client SET ? WHERE id = ?', [req.body ,id])
        res.json({text: 'El proveedor: '+ req.params.id +' fué actualizado' });
    }
    public async delete (req: Request, res: Response): Promise<void> { 
        const { id } = req.params;
        await database.query('DELETE FROM client WHERE id = ?', [id])
        res.json({message: 'El proveedor se ha eliminado'}); 
    }

}

export const clientController = new ClientController();