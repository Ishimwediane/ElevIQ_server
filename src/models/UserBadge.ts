import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface UserBadgeAttributes {
  userId: number;
  badgeId: number;
  earnedAt?: Date;
}

type UserBadgeCreationAttributes = Optional<UserBadgeAttributes, 'earnedAt'>;

class UserBadge extends Model<UserBadgeAttributes, UserBadgeCreationAttributes>
  implements UserBadgeAttributes {
  public userId!: number;
  public badgeId!: number;
  public earnedAt!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserBadge.init(
  {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    badgeId: { type: DataTypes.INTEGER, allowNull: false },
    earnedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    modelName: 'UserBadge',
    tableName: 'UserBadges',
  }
);

export default UserBadge;
