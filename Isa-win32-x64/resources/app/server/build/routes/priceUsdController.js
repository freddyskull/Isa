"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const permissController_1 = require("../controllers/permissController");
class priceUsdRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', permissController_1.priceUsdController.list);
        this.router.get('/:id', permissController_1.priceUsdController.getOne);
        this.router.put('/:id', permissController_1.priceUsdController.update);
    }
}
const priceusdRoutes = new priceUsdRoutes();
exports.default = priceusdRoutes.router;
