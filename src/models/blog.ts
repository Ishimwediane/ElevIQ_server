import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './user';


interface BlogAttributes {
  id: number;
  title: string;
  content: string;
  userId?: number;
}


interface BlogCreationAttributes extends Optional<BlogAttributes, 'id'> {}

class Blog extends Model<BlogAttributes, BlogCreationAttributes> implements BlogAttributes {
  public id!: number;
  public title!: string;
  public content!: string;
  public userId?: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}


Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Blog',
    tableName: 'blogs',
  }
);


Blog.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Blog, { foreignKey: 'userId' });

export default Blog;
