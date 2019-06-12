"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientController_1 = require("../controllers/clientController");
class ClientRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', clientController_1.clientController.list);
        this.router.get('/:id', clientController_1.clientController.getOne);
        this.router.post('/', clientController_1.clientController.create);
        this.router.put('/:id', clientController_1.clientController.update);
        this.router.delete('/:id', clientController_1.clientController.delete);
    }
}
const clientRoutes = new ClientRoutes();
exports.default = clientRoutes.router;
