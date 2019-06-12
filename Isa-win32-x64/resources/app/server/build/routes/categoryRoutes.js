"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryController_1 = require("../controllers/categoryController");
class CategoryRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', categoryController_1.categoryController.list);
        this.router.get('/:id', categoryController_1.categoryController.getOne);
        this.router.post('/', categoryController_1.categoryController.create);
        this.router.put('/:id', categoryController_1.categoryController.update);
        this.router.delete('/:id', categoryController_1.categoryController.delete);
    }
}
const categoryRoutes = new CategoryRoutes();
exports.default = categoryRoutes.router;
