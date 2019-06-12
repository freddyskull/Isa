import { Router } from 'express';

import { permissController } from '../controllers/permissController';

class PermissRoutes {
    public router: Router = Router();

    constructor(){
        this.config()
    }
    config(): void {
         this.router.get('/',permissController.list );
         this.router.get('/:id', permissController.getOne );
         this.router.put('/:id', permissController.update);
    }
}

const permissRoutes = new PermissRoutes();
export default permissRoutes.router;