import dbConnect from '@/app/lib/dbConnect';
import User from '@/app/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  const { email, password } = await req.json();

  await dbConnect();

  console.log('Received login request for email:', email);

  const user = await User.findOne({ email });

  if (!user) {
    console.log('User not found');
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
  }

  // if (user.role !== 'admin') {
  //   console.log('User is not an admin');
  //   return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
  // }

  // const isPasswordValid = await bcrypt.compare("Test@123", "$2b$10$2ucyWrMrP8rqn/172gPtvOtFVHaM2Q7H6AMyCIyXEjpXuFkqkeUle");

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if(isPasswordValid) {
    return new Response(JSON.stringify({ message: 'Password is valid' }), { status: 200 });
  }

  
  if (!isPasswordValid) {
    console.log('Password is invalid');
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
  }
  
  console.log('Login successful');

  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });


  return new Response(JSON.stringify({ message: 'end of the route' }), {status: 200});


  // return new Response(JSON.stringify({ token }), {
  //   status: 200,
  //   headers: {
  //     'Set-Cookie': `auth-token=${token}; HttpOnly; Path=/; Max-Age=3600`,
  //   },
  // });
}