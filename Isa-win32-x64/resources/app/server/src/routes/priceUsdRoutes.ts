import { Router } from 'express';

import { priceusdController } from '../controllers/priceUsdController';

class PermissRoutes {
    public router: Router = Router();

    constructor(){
        this.config()
    }
    config(): void {
         this.router.get('/',priceusdController.list );
         this.router.get('/:id', priceusdController.getOne );
         this.router.put('/:id', priceusdController.update);
         this.router.post('/', priceusdController.create);
    }
}

const permissRoutes = new PermissRoutes();
export default permissRoutes.router;