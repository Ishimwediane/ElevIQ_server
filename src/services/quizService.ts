import Users from '../models/user';
import QuizSession from '../models/QuizSession';
import QuestionRecord from '../models/QuestionRecord';
import ReviewQueue from '../models/ReviewQueue';
import Badge from '../models/Badge';
import UserBadge from '../models/UserBadge';
import { generateQuestionsWithAI } from '../lib/gemini';

interface GenerateQuizParams {
  userId: number;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  reviewIds?: number[];
}

class QuizService {
  // Create a new quiz session and generate AI-powered questions
  static async generateQuiz(params: GenerateQuizParams) {
    const { userId, subject, difficulty, reviewIds } = params;

    // 1. Create quiz session
    const session = await QuizSession.create({
      userId,
      subject,
      difficulty,
      startedAt: new Date(),
    });

    // 2. Call Gemini to generate questions
    const questions = await generateQuestionsWithAI({
      subject,
      difficulty,
      count: 5,
    });

    // 3. Save questions to DB
    const questionRecords = await Promise.all(
      questions.map((q: any) =>
        QuestionRecord.create({
          sessionId: session.id,
          questionText: q.questionText,
          correctAnswer: q.correctAnswer,
          optionA: q.options?.A,
          optionB: q.options?.B,
          optionC: q.options?.C,
          optionD: q.options?.D,
          topic: q.topic || subject,
          difficulty,
          imageUrl: q.imageUrl || null,
          altText: q.altText || null,
        })
      )
    );

    return { session, questions: questionRecords };
  }

  // Evaluate a user's answer to a question
  static async evaluateAnswer(
    questionId: number,
    userAnswer: string
  ): Promise<{ correct: boolean; explanation?: string }> {
    const question = await QuestionRecord.findByPk(questionId);
    if (!question) throw new Error('Question not found');

    const correct =
      question.correctAnswer.trim().toLowerCase() === userAnswer.trim().toLowerCase();

    await question.update({
      userAnswer,
      isCorrect: correct,
    });

    return {
      correct,
      explanation: correct
        ? 'Correct answer!'
        : `Correct answer is: ${question.correctAnswer}`,
    };
  }

  // Other methods to be added: analytics, review queue, badges, etc.
}

export default QuizService;
