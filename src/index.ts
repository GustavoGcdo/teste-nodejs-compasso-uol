import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { makeGetCityController } from './factories/GetCityController.factory';
import { adaptRoute } from './infra/adapter/ExpressAdapter';
import { makeCreateCityController } from './factories/CreateCityController.factory';
import { makeCreateClientController } from './factories/CreateClientController.factory';
import { makeGetClientController } from './factories/GetClientController.factory';
import { makeRemoveClientController } from './factories/RemoveClientController.factory';
import { makeUpdateClientController } from './factories/UpdateClientController.factory';

dotenv.config();
const app = express();
app.use(express.json());

app.get('/cities', adaptRoute(makeGetCityController()));
app.post('/cities', adaptRoute(makeCreateCityController()));

app.get('/clients', adaptRoute(makeGetClientController()));
app.post('/clients', adaptRoute(makeCreateClientController()));
app.delete('/clients/:id', adaptRoute(makeRemoveClientController()));
app.patch('/clients/:id', adaptRoute(makeUpdateClientController()));

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('conected on database');
    app.listen(process.env.PORT, () => {
      console.log('api listen on port', process.env.PORT);
    });
  });
