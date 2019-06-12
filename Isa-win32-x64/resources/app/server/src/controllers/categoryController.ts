import {Request, Response} from 'express';

import database from '../database'


class CategoryController {

   public async list (req: Request, res: Response): Promise<void> { 
       const category = await database.query('SELECT * FROM category');
       res.json(category);
    }
    public async getOne (req: Request, res: Response): Promise<any> { 
        const { id } = req.params;
        const category = await database.query('SELECT * FROM category WHERE id = ?', [id]);
        if(category.length > 0){
            return res.json(category[0]);
        }
        res.status(404).json({text: 'El proveedor: '+ req.params.id +' no fué encontrado'})
     }
    public async create (req: Request, res: Response): Promise<void>  { 
        await database.query('INSERT INTO category set ?', [req.body]);
        console.log(req.body);
        res.json({message: 'proveedor guardado'});

    }
    public async update (req: Request, res: Response): Promise<void>  { 
        const { id } = req.params;
        await database.query('UPDATE category SET ? WHERE id = ?', [req.body ,id])
        res.json({text: 'El proveedor: '+ req.params.id +' fué actualizado' });
    }
    public async delete (req: Request, res: Response): Promise<void> { 
        const { id } = req.params;
        await database.query('DELETE FROM category WHERE id = ?', [id])
        res.json({message: 'El proveedor se ha eliminado'}); 
    }

}

export const categoryController = new CategoryController();