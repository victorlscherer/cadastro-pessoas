import express from 'express';
import { createClient, loginClient, getAllClients, deleteClient, getClientById } from '../controllers';

const router = express.Router();

router.post('/registration', createClient);
router.post('/login', loginClient);
router.get('/', getAllClients);
router.get('/client/:id', getClientById);
router.delete('/delete/:id', deleteClient);

export default router;