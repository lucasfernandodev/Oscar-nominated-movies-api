import SyncDatabase from './database/index.js';
import express from "express";
import routes from "./server/routes.js";
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import { readFile } from 'fs/promises';

const json = JSON.parse(
  await readFile(
    new URL('./swagger.json', import.meta.url)
  )
);

SyncDatabase();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/docs', swaggerUI.serve, swaggerUI.setup(json))
app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});


app.use(routes);
app.listen(3333)


