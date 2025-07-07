import Users from '../models/user';
import QuizSession from '../models/QuizSession';
import QuestionRecord from '../models/QuestionRecord';
import ReviewQueue from '../models/ReviewQueue';
import Badge from '../models/Badge';
import UserBadge from '../models/UserBadge';

interface GenerateQuizParams {
  userId: number;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  reviewIds?: number[];
}

class QuizService {
  // Create a new quiz session and generate questions (mock example)
  static async generateQuiz(params: GenerateQuizParams) {
    const { userId, subject, difficulty, reviewIds } = params;

    // Create quiz session
    const session = await QuizSession.create({
      userId,
      subject,
      difficulty,
      startedAt: new Date(),
    });

    // TODO: Call AI to generate questions based on subject & difficulty
    // For now, return mock questions
    const questions = [
      {
        questionText: `Sample question on ${subject} (${difficulty})`,
        correctAnswer: 'Answer 1',
        topic: subject,
        difficulty,
      },
      // Add more questions...
    ];

    // Save question records linked to session (but without userAnswer yet)
    const questionRecords = await Promise.all(
      questions.map((q) =>
        QuestionRecord.create({
          sessionId: session.id,
          questionText: q.questionText,
          correctAnswer: q.correctAnswer,
          topic: q.topic,
          difficulty: q.difficulty,
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

    const correct = question.correctAnswer.toLowerCase() === userAnswer.toLowerCase();

    // Update record with user answer and correctness
    await question.update({ userAnswer, isCorrect: correct });

    // TODO: Optionally call AI for explanation

    return {
      correct,
      explanation: correct ? 'Correct answer!' : `Correct answer is: ${question.correctAnswer}`,
    };
  }

  // Other methods: get analytics, badges, review queue management, etc.
}

export default QuizService;
