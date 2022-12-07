import express, { Express, Request, Response } from 'express';

import validator from './validator';
import micromortModel from './micromortModel';

const app: Express = express();

app.use(express.json());
app.use(validator);

app.post('/', (req: Request, res: Response) => {
  const commuterID: string = req.body.commuterID
  const micromorts: number = micromortModel(req.body);

  res.status(200).send({
    commuterID,
    micromorts: micromorts ? micromorts : 'Unable to calculate micromorts based on sent data.'
  });
});

export default app;