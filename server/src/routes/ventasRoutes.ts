import { Router } from 'express';

import { ventasController } from '../controllers/ventasController';

class VentasRoutes {
    public router: Router = Router();

    constructor(){
        this.config()
    }
    config(): void {
         this.router.get('/', ventasController.list );
         this.router.get('/statAct', ventasController.estadAct );
         this.router.get('/statAnt', ventasController.estadAnt );
         this.router.get('/:id', ventasController.getOne );
         this.router.post('/', ventasController.create);
         this.router.put('/:id', ventasController.update);
         this.router.delete('/:id',ventasController.delete);
    }
}

const ventasRoutes = new VentasRoutes();
export default ventasRoutes.router;