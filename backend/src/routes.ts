import { Router } from 'express';
import OrphanageController from './controllers/orphanagesController';

const routes = Router();

routes.post('/orphanages', OrphanageController.create);
routes.get('/orphanages',OrphanageController.index);

export default routes;