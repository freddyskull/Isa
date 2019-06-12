import {Request, Response} from 'express';

import database from '../database'


class ProductController {

   public async list (req: Request, res: Response): Promise<void> { 
       const product = await database.query('SELECT * FROM product');
       res.json(product);
    }
    public async getOne (req: Request, res: Response): Promise<any> { 
        const { id } = req.params;
        const product = await database.query('SELECT * FROM product WHERE id = ?', [id]);
        if(product.length > 0){
            return res.json(product[0]);
        }
        res.status(404).json({text: 'El producto: '+ req.params.id +' no fué encontrado'})
     }
    public async create (req: Request, res: Response): Promise<void>  { 
        await database.query('INSERT INTO product set ?', [req.body]);
        console.log(req.body);
        res.json({message: 'Producto guardado'});

    }
    public async update (req: Request, res: Response): Promise<void>  { 
        const { id } = req.params;
        await database.query('UPDATE product SET ? WHERE id = ?', [req.body ,id])
        res.json({text: 'El producto '+ req.params.id +' fué actualizado' });
    }
    public async delete (req: Request, res: Response): Promise<void> { 
        const { id } = req.params;
        await database.query('DELETE FROM product WHERE id = ?', [id])
        res.json({message: 'El producto se ha eliminado'}); 
    }

}

export const productController = new ProductController();