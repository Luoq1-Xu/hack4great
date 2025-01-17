import { NextRequest, NextResponse } from 'next/server';
import { getUsers } from '@/lib/db'; // Adjust the import path as needed

export async function GET(req: NextRequest) {
  try {
    const users = await getUsers();
    return NextResponse.json({ success: true, users });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}