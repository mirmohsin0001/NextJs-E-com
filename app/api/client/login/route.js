import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dbConnect from '@/app/lib/dbConnect';
import User from '@/app/models/User';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  await dbConnect();

  const user = await User.findOne({ email });

  if (!user || user.role !== 'client') {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.setHeader('Set-Cookie', `auth-token=${token}; HttpOnly; Path=/; Max-Age=3600`);

  res.status(200).json({ message: 'Login successful' });
}