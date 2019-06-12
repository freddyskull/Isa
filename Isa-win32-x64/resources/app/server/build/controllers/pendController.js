"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class PendController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const product_pnd = yield database_1.default.query('SELECT * FROM product_pnd');
            res.json(product_pnd);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const product_pnd = yield database_1.default.query('SELECT * FROM product_pnd WHERE id = ?', [id]);
            if (product_pnd.length > 0) {
                return res.json(product_pnd[0]);
            }
            res.status(404).json({ text: 'La venta pendiente: ' + req.params.id + ' no fué encontrado' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO product_pnd set ?', [req.body]);
            console.log(req.body);
            res.json({ message: 'Venta pendiente guardada' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE product_pnd SET ? WHERE id = ?', [req.body, id]);
            res.json({ text: 'La venta pendiente: ' + req.params.id + ' fué actualizado' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM product_pnd WHERE id = ?', [id]);
            res.json({ message: 'La venta pendiente se ha eliminado' });
        });
    }
}
exports.pendController = new PendController();
