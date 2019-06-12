"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const permissController_1 = require("../controllers/permissController");
class PermissRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', permissController_1.permissController.list);
        this.router.get('/:id', permissController_1.permissController.getOne);
        this.router.put('/:id', permissController_1.permissController.update);
    }
}
const permissRoutes = new PermissRoutes();
exports.default = permissRoutes.router;
