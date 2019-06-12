"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
    index(req, res) {
        res.json({
            author: "Freddy black Codex, sistema de api para administración de medicamentos e insumos",
            dir1: 'API de clientes está en la dirección: /api/client',
            dir2: 'API de proveedores está en la dirección: /api/provider',
            dir3: 'API de productos está en la dirección: /api/product',
        });
    }
}
exports.indexController = new IndexController();
