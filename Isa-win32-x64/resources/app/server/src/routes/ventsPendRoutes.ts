import { Router } from 'express';

import { pendController } from '../controllers/pendController';

class VentasPendRoutes {
    public router: Router = Router();

    constructor(){
        this.config()
    }
    config(): void {
         this.router.get('/', pendController.list );
         this.router.get('/:id', pendController.getOne );
         this.router.post('/', pendController.create);
         this.router.put('/:id', pendController.update);
         this.router.delete('/:id',pendController.delete);
    }
}

const ventasPendRoutes = new VentasPendRoutes();
export default ventasPendRoutes.router;