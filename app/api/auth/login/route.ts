import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (password === process.env.INVITE_PASSWORD) {
    const res = NextResponse.json({ message: 'ok', id: 'irawan-cindy' });
    res.cookies.set({
      name: 'session',
      value: 'true',
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });
    return res;
  } else if (password === process.env.INVITE_PASSWORD2) {
    const res = NextResponse.json({ message: 'ok', id: 'test' });
    res.cookies.set({
      name: 'session',
      value: 'true',
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });
    return res;
  } else {
    return NextResponse.json({ message: 'invalid' }, { status: 401 });
  }
}