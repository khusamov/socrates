"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const cors = require("cors");
const express = require("express");
const sqlite = require("sqlite");
const app = express();
const PORT = 8081;
(() => __awaiter(this, void 0, void 0, function* () {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    const db = yield sqlite.open(path.join(__dirname, '../../db/mscc.db'));
    app.get('/ProductGroup/:id?', (req, res) => __awaiter(this, void 0, void 0, function* () {
        if (req.params.id) {
            const data = yield db.all(`select * from ProductGroup where ID = ${req.params.id}`);
            res.json(data[0]);
        }
        else {
            res.json(yield db.all(`select * from ProductGroup`));
        }
    }));
    app.post('/ProductGroup', (req, res) => __awaiter(this, void 0, void 0, function* () {
        yield db.exec(`insert into ProductGroup (Name) values ('${req.body.Name}')`);
        res.json({
            success: true
        });
    }));
    app.put('/ProductGroup/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        yield db.exec(`update ProductGroup set Name = '${req.body.Name}' where ID = ${req.params.id}`);
        res.json({
            success: true
        });
    }));
    app.delete('/ProductGroup/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        yield db.exec(`delete from ProductGroup where ID = ${req.params.id}`);
        res.json({
            success: true
        });
    }));
    app.listen(PORT, () => {
        console.log(`Application listening on port ${PORT}!`);
    });
}))();
//# sourceMappingURL=index.js.map