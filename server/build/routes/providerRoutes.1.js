"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const providersController_1 = require("../controllers/providersController");
class ProviderRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', providersController_1.providerController.list);
        this.router.get('/:id', providersController_1.providerController.getOne);
        this.router.post('/', providersController_1.providerController.create);
        this.router.put('/:id', providersController_1.providerController.update);
        this.router.delete('/:id', providersController_1.providerController.delete);
    }
}
const providerRoutes = new ProviderRoutes();
exports.default = providerRoutes.router;
