"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productControllers_1 = require("../controllers/productControllers");
class ProductRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', productControllers_1.productController.list);
        this.router.get('/:id', productControllers_1.productController.getOne);
        this.router.post('/', productControllers_1.productController.create);
        this.router.put('/:id', productControllers_1.productController.update);
        this.router.delete('/:id', productControllers_1.productController.delete);
    }
}
const productRoutes = new ProductRoutes();
exports.default = productRoutes.router;
