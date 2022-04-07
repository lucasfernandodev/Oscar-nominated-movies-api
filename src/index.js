import SyncDatabase from './database/index.js';
import express from "express";
import routes from "./server/routes.js";
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import { readFile } from 'fs/promises';
import compression from 'compression';
const json = JSON.parse(
  await readFile(
    new URL('./swagger.json', import.meta.url)
  )
);

SyncDatabase();

const app = express();
app.use(cors({ origin: "https://lucasfernandodev.github.io/Oscar-nominated/", credentials: true }))
app.use(compression());


app.use(express.json());

app.use('/docs', swaggerUI.serve, swaggerUI.setup(json))

app.use(routes);
app.listen(3333)


// Impede que a aplicação não quebre caso um erro não tratado aconteça
process.on('uncaughtException', (error) => console.log(`unhandledRejection happened: ${error.stack || error}`));
process.on('unhandledRejection', (error) => console.log(`unhandledRejection happened: ${error.stack || error}`))


