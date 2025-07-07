import { Request, Response } from 'express';
import QuizService from '../services/quizService';

const QuizController = {
  // POST /quiz/generate
  generateQuiz: async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId, subject, difficulty, reviewIds } = req.body;

      if (!userId || !subject || !difficulty) {
        res.status(400).json({ message: 'Missing required fields' });
        return;
      }

      const quiz = await QuizService.generateQuiz({
        userId,
        subject,
        difficulty,
        reviewIds,
      });

      res.status(201).json(quiz);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to generate quiz' });
    }
  },

  // POST /quiz/evaluate
  evaluateAnswer: async (req: Request, res: Response): Promise<void> => {
    try {
      const { questionId, userAnswer } = req.body;

      if (!questionId || !userAnswer) {
        res.status(400).json({ message: 'Missing questionId or userAnswer' });
        return;
      }

      const result = await QuizService.evaluateAnswer(questionId, userAnswer);

      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to evaluate answer' });
    }
  },
};

export default QuizController;
