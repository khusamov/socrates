import * as path from 'path';
import * as express from 'express';
const app = express();
import {Request, Response} from 'express';
import * as sqlite from 'sqlite';
const PORT = 8081;
  
(async () => {

  app.use(express.json());
  app.use(express.urlencoded());
  
  const db = await sqlite.open(path.join(__dirname, '../../db/mscc.db'));

  app.get('/ProductGroup', async (req: Request, res: Response) => {
    res.json(await db.all(`select * from ProductGroup`));
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
    await db.exec(`delete ProductGroup where ID = ${req.params.id}`);
    res.json({
      success: true
    });
  });
  
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
  });
  
})();




