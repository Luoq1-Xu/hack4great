import { NextRequest, NextResponse } from 'next/server';
import { createUserTest } from '@/lib/auth'; // Adjust the import path as needed

export async function POST(req: NextRequest) {
  const { username, password, user_type } = await req.json();
  try {
    await createUserTest(username, password, user_type);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}