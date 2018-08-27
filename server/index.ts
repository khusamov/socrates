import * as path from 'path';
import * as cors from 'cors';
import * as express from 'express';
import {Request, Response} from 'express';
import * as sqlite from 'sqlite';

const app = express();
const PORT = 8081;

(async () => {

	app.use(cors());
	app.use(express.json());
	app.use(express.urlencoded({extended: true}));

	const db = await sqlite.open(path.join(__dirname, '../../db/mscc.db'));

	app.get('/ProductGroup/:id?', async (req: Request, res: Response) => {
		if (req.params.id) {
			const data = await db.all(`select * from ProductGroup where ID = ${req.params.id}`);
			res.json(data[0]);
		} else {
			res.json(await db.all(`select * from ProductGroup`));
		}
	});

	app.post('/ProductGroup', async (req: Request, res: Response) => {
		await db.exec(`insert into ProductGroup (Name) values ('${req.body.Name}')`);
		res.json({
			success: true
		});
	});

	app.put('/ProductGroup/:id', async (req: Request, res: Response) => {
		await db.exec(`update ProductGroup set Name = '${req.body.Name}' where ID = ${req.params.id}`);
		res.json({
			success: true
		});
	});

	app.delete('/ProductGroup/:id', async (req: Request, res: Response) => {
		await db.exec(`delete from ProductGroup where ID = ${req.params.id}`);
		res.json({
			success: true
		});
	});

	app.listen(PORT, () => {
		console.log(`Application listening on port ${PORT}!`);
	});

})();




