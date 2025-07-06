import { Op } from 'sequelize';

import User from '../models/user';
import bcrypt from 'bcrypt';

export class UserService {
  async findAll(): Promise<User[]> {
    return await User.findAll();
  }

  async findById(id: number): Promise<User | null> {
    return await User.findByPk(id);
  }

  async findByName(name: string): Promise<User[]> {
    return await User.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`, // case-insensitive like
        },
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await User.findOne({ where: { email } });
  }

  async update(id: number, updatedData: Partial<User>): Promise<User | null> {
    const user = await User.findByPk(id);
    if (!user) return null;

    // Hash password if it's being updated
    if (updatedData.password) {
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }

    await user.update(updatedData);
    return user;
  }

  async delete(id: number): Promise<boolean> {
    const deletedCount = await User.destroy({ where: { id } });
    return deletedCount > 0;
  }
}
