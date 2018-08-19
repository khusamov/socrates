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
const express = require("express");
const cors = require("cors");
const app = express();
const sqlite = require("sqlite");
const PORT = 8081;
(() => __awaiter(this, void 0, void 0, function* () {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded());
    const db = yield sqlite.open(path.join(__dirname, '../../db/mscc.db'));
    app.get('/ProductGroup', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.json(yield db.all(`select * from ProductGroup`));
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
        yield db.exec(`delete ProductGroup where ID = ${req.params.id}`);
        res.json({
            success: true
        });
    }));
    app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}!`);
    });
}))();
//# sourceMappingURL=index.js.map