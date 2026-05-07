import {GetJobs, CreateJob, UpdateJob, DeleteJob} from '../controllers/jobController.js'
import express from 'express';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, GetJobs);

router.post('/', auth, CreateJob);

router.put('/:id', auth, UpdateJob);

router.delete('/:id', auth, DeleteJob);

export default router;