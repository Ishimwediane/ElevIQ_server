import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Users from './user'

interface ReviewQueueAttributes {
  id?: number;
  userId: number;
  questionText: string;
  correctAnswer: string;
  imageUrl?: string;
  altText?: string;
  explanation?: string;
  topic?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  timesSeen?: number;
  lastSeen?: Date;
}

type ReviewQueueCreationAttributes = Optional<
  ReviewQueueAttributes,
  'id' | 'imageUrl' | 'altText' | 'explanation' | 'topic' | 'difficulty' | 'timesSeen' | 'lastSeen'
>;

class ReviewQueue
  extends Model<ReviewQueueAttributes, ReviewQueueCreationAttributes>
  implements ReviewQueueAttributes
{
  public id!: number;
  public userId!: number;
  public questionText!: string;
  public correctAnswer!: string;
  public imageUrl!: string;
  public altText!: string;
  public explanation!: string;
  public topic!: string;
  public difficulty!: 'easy' | 'medium' | 'hard';
  public timesSeen!: number;
  public lastSeen!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate:()=>void
}

ReviewQueue.init(
  {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    questionText: { type: DataTypes.TEXT, allowNull: false },
    correctAnswer: { type: DataTypes.STRING, allowNull: false },
    imageUrl: { type: DataTypes.STRING },
    altText: { type: DataTypes.STRING },
    explanation: { type: DataTypes.TEXT },
    topic: { type: DataTypes.STRING },
    difficulty: {
      type: DataTypes.ENUM('easy', 'medium', 'hard'),
      allowNull: true,
    },
    timesSeen: { type: DataTypes.INTEGER, defaultValue: 1 },
    lastSeen: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    modelName: 'ReviewQueue',
    tableName: 'ReviewQueues',
  }
);
ReviewQueue.associate = () => {
  ReviewQueue.belongsTo(Users, { foreignKey: 'userId' });
};

export default ReviewQueue;
