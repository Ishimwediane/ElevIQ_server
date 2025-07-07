import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import QuestionRecord from './QuestionRecord';
import Users from './user';

interface QuizSessionAttributes {
  id?: number;
  userId: number;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  score?: number;
  startedAt?: Date;
  endedAt?: Date;
}

type QuizSessionCreationAttributes = Optional<
  QuizSessionAttributes,
  'id' | 'score' | 'startedAt' | 'endedAt'
>;

class QuizSession
  extends Model<QuizSessionAttributes, QuizSessionCreationAttributes>
  implements QuizSessionAttributes
{
  public id!: number;
  public userId!: number;
  public subject!: string;
  public difficulty!: 'easy' | 'medium' | 'hard';
  public score!: number;
  public startedAt!: Date;
  public endedAt!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

   static associate: () => void;
}

QuizSession.init(
  {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    subject: { type: DataTypes.STRING, allowNull: false },
    difficulty: {
      type: DataTypes.ENUM('easy', 'medium', 'hard'),
      allowNull: false,
    },
    score: { type: DataTypes.INTEGER, defaultValue: 0 },
    startedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    endedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    modelName: 'QuizSession',
    tableName: 'QuizSessions',
  }
);
QuizSession.associate = () => {
  QuizSession.belongsTo(Users, { foreignKey: 'userId' });
  QuizSession.hasMany(QuestionRecord, { foreignKey: 'sessionId' });
};

export default QuizSession;
