import {Request, Response} from 'express';

import database from '../database'


class PendController {

   public async list (req: Request, res: Response): Promise<void> { 
       const product_pnd = await database.query('SELECT * FROM product_pnd');
       res.json(product_pnd);
    }
    public async getOne (req: Request, res: Response): Promise<any> { 
        const { id } = req.params;
        const product_pnd = await database.query('SELECT * FROM product_pnd WHERE id = ?', [id]);
        if(product_pnd.length > 0){
            return res.json(product_pnd[0]);
        }
        res.status(404).json({text: 'La venta pendiente: '+ req.params.id +' no fué encontrado'})
     }
    public async create (req: Request, res: Response): Promise<void>  { 
        await database.query('INSERT INTO product_pnd set ?', [req.body]);
        console.log(req.body);
        res.json({message: 'Venta pendiente guardada'});

    }
    public async update (req: Request, res: Response): Promise<void>  { 
        const { id } = req.params;
        await database.query('UPDATE product_pnd SET ? WHERE id = ?', [req.body ,id])
        res.json({text: 'La venta pendiente: '+ req.params.id +' fué actualizado' });
    }
    public async delete (req: Request, res: Response): Promise<void> { 
        const { id } = req.params;
        await database.query('DELETE FROM product_pnd WHERE id = ?', [id])
        res.json({message: 'La venta pendiente se ha eliminado'}); 
    }
}

export const pendController = new PendController();