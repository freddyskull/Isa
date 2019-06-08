import {Request, Response} from 'express';

import database from '../database'


class ProviderController {

   public async list (req: Request, res: Response): Promise<void> { 
       const provider = await database.query('SELECT * FROM provider');
       res.json(provider);
    }
    public async getOne (req: Request, res: Response): Promise<any> { 
        const { id } = req.params;
        const provider = await database.query('SELECT * FROM provider WHERE id = ?', [id]);
        if(provider.length > 0){
            return res.json(provider[0]);
        }
        res.status(404).json({text: 'El proveedor: '+ req.params.id +' no fué encontrado'})
     }
    public async create (req: Request, res: Response): Promise<void>  { 
        await database.query('INSERT INTO provider set ?', [req.body]);
        console.log(req.body);
        res.json({message: 'proveedor guardado'});

    }
    public async update (req: Request, res: Response): Promise<void>  { 
        const { id } = req.params;
        await database.query('UPDATE provider SET ? WHERE id = ?', [req.body ,id])
        res.json({text: 'El proveedor: '+ req.params.id +' fué actualizado' });
    }
    public async delete (req: Request, res: Response): Promise<void> { 
        const { id } = req.params;
        await database.query('DELETE FROM provider WHERE id = ?', [id])
        res.json({message: 'El proveedor se ha eliminado'}); 
    }

}

export const providerController = new ProviderController();