import Path from 'path';
import Koa from 'koa';
import Cors from '@koa/cors';
import Sqlite from 'sqlite';
import IExtContext from './IExtContext';
import {productGroupRouter} from './productGroupRouter';

const PORT = 8081;
const databaseFilePath = Path.join(__dirname, '../../db/mscc.db');

(async () => {

	const app = new Koa;

	// Наполнение контекста всех запросов.
	(app.context as IExtContext).db = await Sqlite.open(databaseFilePath);

	// Разрешить все CORS для отладки.
	app.use(Cors());

	// Подключение всех ресурсов.
	app.use(productGroupRouter.routes());

	// Запуск сервера.
	app.listen(PORT, () => {
		console.log(`Koa application listening on port ${PORT}!`);
	});

})();