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
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("@koa/cors"));
const sqlite_1 = __importDefault(require("sqlite"));
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_body_1 = __importDefault(require("koa-body"));
const PORT = 8081;
const app = new koa_1.default;
(() => __awaiter(this, void 0, void 0, function* () {
    const db = yield sqlite_1.default.open(path_1.default.join(__dirname, '../../db/mscc.db'));
    app.use(cors_1.default());
    const productGroupRouter = new koa_router_1.default;
    productGroupRouter.get('/productGroup/:id?', (ctx) => __awaiter(this, void 0, void 0, function* () {
        if (ctx.params.id) {
            const data = yield db.all(`select * from productGroup where id = ${ctx.params.id}`);
            const record = data[0];
            if (record) {
                ctx.body = record;
            }
            else {
                ctx.body = {};
                ctx.status = 204; // 204 No Content https://goo.gl/JduZSV
            }
        }
        else {
            const data = yield db.all(`select * from productGroup`);
            if (data.length) {
                ctx.body = data;
            }
            else {
                ctx.body = [];
                ctx.status = 204; // 204 No Content https://goo.gl/JduZSV
            }
        }
    }));
    productGroupRouter.post('/productGroup', koa_body_1.default(), (ctx) => __awaiter(this, void 0, void 0, function* () {
        yield db.exec(`insert into productGroup (name) values ('${ctx.request.body.name}')`);
        const id = yield db.run('select last_insert_rowid()');
        ctx.status = 201; // 201 Created https://goo.gl/JduZSV
        ctx.body = yield db.get(`select * from productGroup where id = ${id}`);
    }));
    productGroupRouter.put('/productGroup/:id', koa_body_1.default(), (ctx) => __awaiter(this, void 0, void 0, function* () {
        yield db.exec(`update productGroup set name = '${ctx.request.body.name}' where id = ${ctx.params.id}`);
        ctx.status = 204; // 204 No Content https://goo.gl/JduZSV
    }));
    productGroupRouter.delete('/productGroup/:id', (ctx) => __awaiter(this, void 0, void 0, function* () {
        yield db.exec(`delete from productGroup where id = ${ctx.params.id}`);
        ctx.status = 204; // 204 No Content https://goo.gl/JduZSV
    }));
    app.use(productGroupRouter.routes());
    app.listen(PORT, () => {
        console.log(`Koa application listening on port ${PORT}!`);
    });
}))();
//# sourceMappingURL=index.js.map