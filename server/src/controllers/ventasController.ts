import {Request, Response} from 'express';

import database from '../database'


class VentasController {

   public async list (req: Request, res: Response): Promise<void> { 
       const ventas = await database.query('SELECT * FROM ventas');
       res.json(ventas);
    }
    public async getOne (req: Request, res: Response): Promise<any> { 
        const { id } = req.params;
        const ventas = await database.query('SELECT * FROM ventas WHERE id = ?', [id]);
        if(ventas.length > 0){
            return res.json(ventas[0]);
        }
        res.status(404).json({text: 'La venta: '+ req.params.id +' no fué encontrado'})
     }
    public async create (req: Request, res: Response): Promise<void>  { 
        await database.query('INSERT INTO ventas set ?', [req.body]);
        console.log(req.body);
        res.json({message: 'Venta guardada'});

    }
    public async update (req: Request, res: Response): Promise<void>  { 
        const { id } = req.params;
        await database.query('UPDATE ventas SET ? WHERE id = ?', [req.body ,id])
        res.json({text: 'La venta: '+ req.params.id +' fué actualizado' });
    }
    public async delete (req: Request, res: Response): Promise<void> { 
        const { id } = req.params;
        await database.query('DELETE FROM ventas WHERE id = ?', [id])
        res.json({message: 'La venta se ha eliminado'}); 
    }

    public async estadAct (req: Request, res: Response): Promise<void> { 
        const ventas = await database.query('SELECT * FROM `ventas` WHERE MONTH(date)=MONTH(CURDATE())');
        res.json(ventas);
     }

     public async estadAnt (req: Request, res: Response): Promise<void> { 
        const ventas = await database.query('SELECT * FROM `ventas` WHERE MONTH(date) = MONTH(DATE_ADD(CURDATE(),INTERVAL -1 MONTH))');
        res.json(ventas);
     }

}

export const ventasController = new VentasController();