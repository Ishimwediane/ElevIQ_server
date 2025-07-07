import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import QuizSession from './QuizSession';

interface QuestionRecordAttributes {
  id?: number;
  sessionId: number;
  questionText: string;
  correctAnswer: string;
  userAnswer?: string;
  isCorrect?: boolean;
  optionA?: string;
  optionB?: string;
  optionC?: string;
  optionD?: string;
  imageUrl?: string;
  altText?: string;
  responseTime?: number;
  explanation?: string;
  topic?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

type QuestionRecordCreationAttributes = Optional<
  QuestionRecordAttributes,
  | 'id'
  | 'userAnswer'
  | 'isCorrect'
  | 'optionA'
  | 'optionB'
  | 'optionC'
  | 'optionD'
  | 'imageUrl'
  | 'altText'
  | 'responseTime'
  | 'explanation'
  | 'topic'
  | 'difficulty'
>;

class QuestionRecord
  extends Model<QuestionRecordAttributes, QuestionRecordCreationAttributes>
  implements QuestionRecordAttributes
{
  public id!: number;
  public sessionId!: number;
  public questionText!: string;
  public correctAnswer!: string;
  public userAnswer!: string;
  public isCorrect!: boolean;
  public optionA!: string;
  public optionB!: string;
  public optionC!: string;
  public optionD!: string;
  public imageUrl!: string;
  public altText!: string;
  public responseTime!: number;
  public explanation!: string;
  public topic!: string;
  public difficulty!: 'easy' | 'medium' | 'hard';

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate: () => void;
}

QuestionRecord.init(
  {
    sessionId: { type: DataTypes.INTEGER, allowNull: false },
    questionText: { type: DataTypes.TEXT, allowNull: false },
    correctAnswer: { type: DataTypes.STRING, allowNull: false },
    userAnswer: { type: DataTypes.STRING },
    isCorrect: { type: DataTypes.BOOLEAN },

    optionA: { type: DataTypes.STRING },
    optionB: { type: DataTypes.STRING },
    optionC: { type: DataTypes.STRING },
    optionD: { type: DataTypes.STRING },

    imageUrl: { type: DataTypes.STRING },
    altText: { type: DataTypes.STRING },
    responseTime: { type: DataTypes.INTEGER },
    explanation: { type: DataTypes.TEXT },
    topic: { type: DataTypes.STRING },
    difficulty: {
      type: DataTypes.ENUM('easy', 'medium', 'hard'),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'QuestionRecord',
    tableName: 'QuestionRecords',
  }
);

QuestionRecord.associate = () => {
  QuestionRecord.belongsTo(QuizSession, { foreignKey: 'sessionId' });
};

export default QuestionRecord;
