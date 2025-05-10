import { NextResponse } from 'next/server';
import axios from 'axios';

const BASE = 'https://front-end-task.bmbzr.ir';

export async function GET() {
  const upstream = await axios.get(`${BASE}/my-addresses`);
  const upstreamCookie = upstream.headers['set-cookie']?.toString();

  const response = NextResponse.json(upstream.data, {
    status: upstream.status,
  });

  if (upstreamCookie) {
    const [nameValue, ...rest] = upstreamCookie.split(';');
    const [name, value] = nameValue.split('=');

    response.cookies.set({
      name,
      value,
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: 'lax',
    });
  }

  return response;
}
