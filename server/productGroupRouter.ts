import Router, {IRouterContext} from 'koa-router';
import KoaBody from 'koa-body';
import IExtRouterContext from './IExtRouterContext';

export const productGroupRouter = new Router;

productGroupRouter.get('/productGroup/:id?', async (ctx: IExtRouterContext) => {
	const db = ctx.db;
	if (ctx.params.id) {
		const record = await db.get(`select * from productGroup where id = ?`, ctx.params.id);
		if (record) {
			ctx.body = record;
		} else {
			ctx.body = {};
			ctx.status = 204; // 204 No Content https://goo.gl/JduZSV
		}
	} else {
		const data = await db.all(`select * from productGroup`);
		if (data.length) {
			ctx.body = data;
		} else {
			ctx.body = [];
			ctx.status = 204; // 204 No Content https://goo.gl/JduZSV
		}
	}
});

productGroupRouter.post('/productGroup', KoaBody(), async (ctx: IExtRouterContext) => {
	const db = ctx.db;
	await db.exec(`insert into productGroup (name) values ('${ctx.request.body.name}')`);
	const id = (await db.get('select last_insert_rowid() as id')).id;
	ctx.status = 201; // 201 Created https://goo.gl/JduZSV
	ctx.body = await db.get(`select * from productGroup where id = ${id}`);
});

productGroupRouter.put('/productGroup/:id', KoaBody(), async (ctx: IExtRouterContext) => {
	const db = ctx.db;
	await db.exec(`update productGroup set name = '${ctx.request.body.name}' where id = ${ctx.params.id}`);
	ctx.status = 200;
});

productGroupRouter.delete('/productGroup/:id', async (ctx: IExtRouterContext) => {
	const db = ctx.db;
	await db.exec(`delete from productGroup where id = ${ctx.params.id}`);
	ctx.status = 200;
});