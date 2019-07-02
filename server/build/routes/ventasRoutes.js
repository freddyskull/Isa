"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ventasController_1 = require("../controllers/ventasController");
class VentasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', ventasController_1.ventasController.list);
        this.router.get('/statAct', ventasController_1.ventasController.estadAct);
        this.router.get('/statAnt', ventasController_1.ventasController.estadAnt);
        this.router.get('/:id', ventasController_1.ventasController.getOne);
        this.router.post('/', ventasController_1.ventasController.create);
        this.router.put('/:id', ventasController_1.ventasController.update);
        this.router.delete('/:id', ventasController_1.ventasController.delete);
    }
}
const ventasRoutes = new VentasRoutes();
exports.default = ventasRoutes.router;
