import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';
import { Order } from '@/models/Order.model';

const BASE = 'https://front-end-task.bmbzr.ir';

export async function POST(req: NextRequest) {
  try {
    const body: Order = await req.json();

    const cookieStore = await cookies(); 
    const session    = cookieStore.get('session')?.value ?? '';

    const upstream = await axios.post(`${BASE}/order/completion/`, body, {
      headers: {
        Cookie: session,
      },
      validateStatus: () => true,
    });

    return NextResponse.json(upstream.data, { status: upstream.status });
  } catch (err) {
    console.error('[api/order] internal error', err);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
