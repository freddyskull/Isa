"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const priceUsdController_1 = require("../controllers/priceUsdController");
class PermissRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', priceUsdController_1.priceusdController.list);
        this.router.get('/:id', priceUsdController_1.priceusdController.getOne);
        this.router.put('/:id', priceUsdController_1.priceusdController.update);
    }
}
const permissRoutes = new PermissRoutes();
exports.default = permissRoutes.router;
