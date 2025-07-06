import jwt from 'jsonwebtoken';
import Users from '../models/user';

interface JWTPayload {
  id: number;
  email: string;
  name: string;
  role: string;
}

interface VerifyPayload {
  userId: number;
  email: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your token';
if (!JWT_SECRET) {
  throw new Error('Missing JWT_SECRET in environment');
}

export function generateJWT(user: Users): string {
  const payload: JWTPayload = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

export const generateResetToken = (email: string): string => {
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: '1m' });
};

export function generateVerifyToken(payload: VerifyPayload): string {
  return jwt.sign(
    { userId: payload.userId, email: payload.email },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

export function verifyVerifyToken(token: string): VerifyPayload {
  return jwt.verify(token, JWT_SECRET) as VerifyPayload;
}
