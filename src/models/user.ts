import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

import QuizSession from './QuizSession';
import ReviewQueue from './ReviewQueue';
import Badge from './Badge';
import UserBadge from './UserBadge';


interface UserAttributes {
  id?: number;
  name?: string;
  email: string;
  password: string;
  role?: 'user' | 'admin';
  isVerified?: boolean;
  isActive?: boolean;
}

type UserCreationAttributes = Optional<UserAttributes, 'id' | 'role' | 'name'>;


class Users extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: 'user' | 'admin';
  public isVerified!: boolean;
  public isActive!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

 
  static associate: () => void;
}


Users.init(
  {
    name: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('user', 'admin'), defaultValue: 'user' },
    isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  {
    sequelize,
    modelName: 'Users',
    tableName: 'Users',
  }
);

Users.associate = () => {
  Users.hasMany(QuizSession, { foreignKey: 'userId' });
  Users.hasMany(ReviewQueue, { foreignKey: 'userId' });
  Users.belongsToMany(Badge, {
    through: UserBadge,
    foreignKey: 'userId',
    otherKey: 'badgeId',
  });
};

export default Users;
