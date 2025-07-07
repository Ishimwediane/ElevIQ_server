import { Router } from 'express';
import QuizController from '../controllers/quizController';
import { authenticated } from '../middleware/authMiddleware';

const router = Router();

router.post('/generate', authenticated, QuizController.generateQuiz);


router.post('/evaluate', authenticated,QuizController.evaluateAnswer);



export default router;
