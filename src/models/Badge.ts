import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Users from './user'
import UserBadge from './UserBadge';

interface BadgeAttributes {
  id?: number;
  name: string;
  description?: string;
  icon?: string;
}

type BadgeCreationAttributes = Optional<BadgeAttributes, 'id' | 'description' | 'icon'>;

class Badge extends Model<BadgeAttributes, BadgeCreationAttributes>
  implements BadgeAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public icon!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate:()=>void
}

Badge.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    icon: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: 'Badge',
    tableName: 'Badges',
  }
);
Badge.associate = () => {
  Badge.belongsToMany(Users, {
    through: UserBadge,
    foreignKey: 'badgeId',
    otherKey: 'userId',
  });
};

export default Badge;
