import {Request, Response} from 'express';

import database from '../database'


class priceUsdController {

   public async list (req: Request, res: Response): Promise<void> { 
       const priceusd = await database.query('SELECT * FROM priceusd');
       res.json(priceusd);
    }
    public async getOne (req: Request, res: Response): Promise<any> { 
        const { id } = req.params;
        const priceusd = await database.query('SELECT * FROM priceusd WHERE id = ?', [id]);
        if(priceusd.length > 0){
            return res.json(priceusd[0]);
        }
        res.status(404).json({text: 'La venta: '+ req.params.id +' no fué encontrado'})
     }
    public async create (req: Request, res: Response): Promise<void>  { 
        await database.query('INSERT INTO priceusd set ?', [req.body]);
        console.log(req.body);
        res.json({message: 'Precio guardada'});

    }
    public async update (req: Request, res: Response): Promise<void>  { 
        const { id } = req.params;
        await database.query('UPDATE priceusd SET ? WHERE id = ?', [req.body ,id])
        res.json({text: 'El del dolar fue editado: '});
    }
    public async delete (req: Request, res: Response): Promise<void> { 
        const { id } = req.params;
        await database.query('DELETE FROM priceusd WHERE id = ?', [id])
        res.json({message: 'La el dolar se ha eliminado'}); 
    }

}

export const priceusdController = new priceUsdController();