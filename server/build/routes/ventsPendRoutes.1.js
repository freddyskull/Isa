"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pendController_1 = require("../controllers/pendController");
class VentasPendRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', pendController_1.pendController.list);
        this.router.get('/:id', pendController_1.pendController.getOne);
        this.router.post('/', pendController_1.pendController.create);
        this.router.put('/:id', pendController_1.pendController.update);
        this.router.delete('/:id', pendController_1.pendController.delete);
    }
}
const ventasPendRoutes = new VentasPendRoutes();
exports.default = ventasPendRoutes.router;
