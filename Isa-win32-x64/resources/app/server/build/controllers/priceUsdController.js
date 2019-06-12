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
class priceUsdController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const priceusd = yield database_1.default.query('SELECT * FROM priceusd');
            res.json(priceusd);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const priceusd = yield database_1.default.query('SELECT * FROM priceusd WHERE id = ?', [id]);
            if (priceusd.length > 0) {
                return res.json(priceusd[0]);
            }
            res.status(404).json({ text: 'La venta: ' + req.params.id + ' no fué encontrado' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO priceusd set ?', [req.body]);
            console.log(req.body);
            res.json({ message: 'Precio guardada' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE priceusd SET ? WHERE id = ?', [req.body, id]);
            res.json({ text: 'El del dolar fue editado: ' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM priceusd WHERE id = ?', [id]);
            res.json({ message: 'La el dolar se ha eliminado' });
        });
    }
}
exports.priceusdController = new priceUsdController();
