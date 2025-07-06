import { DataTypes, Model,Optional } from 'sequelize';
import sequelize from '../config/database';

interface UserAttributes {
  id?: number;
  name?:string;
  email: string;
  password: string;
  role?: 'user' | 'admin';
   isVerified?: boolean;
   isActive?: boolean;
}
type UserCreationAttributes = Optional<UserAttributes, 'id' | 'role' | 'name' >;

class Users extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public name!:string
  public email!: string;
  public password!: string;
  public role!: 'user' | 'admin';
  public isVerified!: boolean;
  public isActive!: boolean;
    public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Users.init(
  {
    name:{type:DataTypes.STRING,allowNull:true},
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('user', 'admin'), defaultValue: 'user' },
    isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  {
    sequelize,
    modelName: 'Users',
    tableName:'Users'
  }
);

export default Users;
