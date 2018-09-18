import Router, {IRouterContext} from 'koa-router';
import KoaBody from 'koa-body';
import IExtRouterContext from './IExtRouterContext';
import HttpStatus from 'http-status';

export const router = new Router({prefix: '/jobCategory'});

router.get(`/:id?`, async (ctx: IExtRouterContext) => {
	const db = ctx.db;
	if (ctx.params.id) {
		const record = await db.get(`select * from jobCategory where id = ?`, ctx.params.id);
		if (record) {
			ctx.body = record;
		} else {
			ctx.body = {};
			ctx.status = HttpStatus.NO_CONTENT;
		}
	} else {
		const data = await db.all(`select * from jobCategory`);
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
	await db.exec(`
		insert into jobCategory (name, hourNormCost) 
		values ('${ctx.request.body.name}', ${ctx.request.body.hourNormCost})
	`);
	const id = (await db.get('select last_insert_rowid() as id')).id;
	ctx.status = HttpStatus.CREATED;
	ctx.body = await db.get(`select * from jobCategory where id = ${id}`);
});

router.put(`/:id`, KoaBody(), async (ctx: IExtRouterContext) => {
	const db = ctx.db;
	await db.exec(`
		update jobCategory set name = '${ctx.request.body.name}', hourNormCost = ${ctx.request.body.hourNormCost}  
		where id = ${ctx.params.id}
	`);
	ctx.status = HttpStatus.OK;
});

router.delete(`/:id`, async (ctx: IExtRouterContext) => {
	const db = ctx.db;
	await db.exec(`delete from jobCategory where id = ${ctx.params.id}`);
	ctx.status = HttpStatus.OK;
});