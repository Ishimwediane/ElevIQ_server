import express from 'express';
import { getAll, getById, create, update,  deleteblog } from '../controllers/blogController';
import { authenticated } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', authenticated, create);
router.put('/:id', authenticated, update);
router.delete('/:id', authenticated, deleteblog);

export default router;
