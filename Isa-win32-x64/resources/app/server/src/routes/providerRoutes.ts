import { Router } from 'express';

import { providerController } from '../controllers/providersController';

class ProviderRoutes {
    public router: Router = Router();

    constructor(){
        this.config()
    }
    config(): void {
         this.router.get('/', providerController.list );
         this.router.get('/:id', providerController.getOne );
         this.router.post('/', providerController.create);
         this.router.put('/:id', providerController.update);
         this.router.delete('/:id',providerController.delete);
    }
}

const providerRoutes = new ProviderRoutes();
export default providerRoutes.router;