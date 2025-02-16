import dbConnect from '@/app/lib/dbConnect';
import User from '@/app/models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const { email, password } = await req.json();

  await dbConnect();

  const user = await User.findOne({ email });

  if (!user || user.role !== 'admin') {
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
  }

  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return new Response(JSON.stringify({ token }), {
    status: 200,
    headers: {
      'Set-Cookie': `auth-token=${token}; HttpOnly; Path=/; Max-Age=3600`,
    },
  });
}