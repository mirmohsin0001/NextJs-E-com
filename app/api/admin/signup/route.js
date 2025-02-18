import dbConnect from '@/app/lib/dbConnect';
import User from '@/app/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const { email, password, role } = await req.json();

  await dbConnect();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return new Response(JSON.stringify({ message: 'User already exists' }), { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  
  const user = new User({ email, password: hashedPassword, role });

  await user.save();

  return new Response(JSON.stringify({ message: 'User created successfully' }), { status: 201 });
}