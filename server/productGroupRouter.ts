import Router, {IRouterContext} from 'koa-router';
import KoaBody from 'koa-body';
import IExtRouterContext from './IExtRouterContext';
import HttpStatus from 'http-status';

export const router = new Router({prefix: '/productGroup'});

router.get(`/:id?`, async (ctx: IExtRouterContext) => {
	const db = ctx.db;
	if (ctx.params.id) {
		const record = await db.get(`select * from productGroup where id = ?`, ctx.params.id);
		if (record) {
			ctx.body = record;
		} else {
			ctx.body = {};
			ctx.status = HttpStatus.NO_CONTENT;
		}
	} else {
		const data = await db.all(`select * from productGroup`);
		if (data.length) {
			ctx.body = data;
		} else {
			ctx.body = [];
			ctx.status = HttpStatus.NO_CONTENT;
		}
	}
});

router.post(`/`, KoaBody(), async (ctx: IExtRouterContext) => {
	const db = ctx.db;
	await db.exec(`insert into productGroup (name) values ('${ctx.request.body.name}')`);
	const id = (await db.get('select last_insert_rowid() as id')).id;
	ctx.status = HttpStatus.CREATED;
	ctx.body = await db.get(`select * from productGroup where id = ${id}`);
});

router.put(`/:id`, KoaBody(), async (ctx: IExtRouterContext) => {
	const db = ctx.db;
	await db.exec(`update productGroup set name = '${ctx.request.body.name}' where id = ${ctx.params.id}`);
	ctx.status = HttpStatus.OK;
});

router.delete(`/:id`, async (ctx: IExtRouterContext) => {
	const db = ctx.db;
	await db.exec(`delete from productGroup where id = ${ctx.params.id}`);
	ctx.status = HttpStatus.OK;
});