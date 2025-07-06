import User from "../models/user";
import bcrypt from "bcrypt";

export class AuthService {
async create(userData: { email: string; password: string; name?: string; role: 'admin' | 'user' }): Promise<User>
 {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  userData.password = hashedPassword;

  const user = await User.create(userData);
  return user;
}


  async login(email: string, password: string): Promise<User | null> {
    const user = await User.findOne({ where: { email } });
    if (!user) return null;

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) return null;

    return user;
  }
}
