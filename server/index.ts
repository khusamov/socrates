import Path from 'path';
import Cors from '@koa/cors';
import Sqlite from 'sqlite';
import Koa, {Context} from 'koa';
import Router from 'koa-router';
import KoaBody from 'koa-body';

const PORT = 8081;
const app = new Koa();

(async () => {

	const db = await Sqlite.open(Path.join(__dirname, '../../db/mscc.db'));

	app.use(Cors());

	const productGroupRouter = new Router();

	productGroupRouter.get('/ProductGroup/:id?', async (ctx: Context) => {
		if (ctx.params.id) {
			const data = await db.all(`select * from ProductGroup where ID = ${ctx.params.id}`);
			const record = data[0];
			if (record) {
				ctx.body = record;
			} else {
				ctx.body = {};
				ctx.status = 204;
			}
		} else {
			const data = await db.all(`select * from ProductGroup`);
			if (data.length) {
				ctx.body = data;
			} else {
				ctx.body = [];
				ctx.status = 204;
			}
		}
	});

	productGroupRouter.post('/ProductGroup', KoaBody(), async (ctx: Context) => {
		await db.exec(`insert into ProductGroup (Name) values ('${ctx.request.body.Name}')`);
		ctx.status = 201;
	});

	productGroupRouter.put('/ProductGroup/:id', KoaBody(), async (ctx: Context) => {
		await db.exec(`update ProductGroup set Name = '${ctx.request.body.Name}' where ID = ${ctx.params.id}`);
		ctx.status = 204;
	});

	productGroupRouter.delete('/ProductGroup/:id', async (ctx: Context) => {
		await db.exec(`delete from ProductGroup where ID = ${ctx.params.id}`);
		ctx.status = 204;
	});

	app.use(productGroupRouter.routes());

	app.listen(PORT, () => {
		console.log(`Koa application listening on port ${PORT}!`);
	});

})();