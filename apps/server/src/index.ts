import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = 8080;

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hello World!');
});

app.listen(port, 'localhost', () => {
  console.log(`Development Server Started ${port}`);
});
