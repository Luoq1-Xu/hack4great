import { NextRequest, NextResponse } from 'next/server';
import { signInTest } from '@/lib/auth'; // Adjust the import path as needed

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  try {
    const user = await signInTest({ username, password });
    const token = 'your-generated-token'; // Generate a token for the user
    return NextResponse.json({ success: true, token, user_type: user.user_type });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Invalid username or password' }, { status: 401 });
  }
}