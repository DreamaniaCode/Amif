import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, profession, city, motivation } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const membership = await prisma.membershipRequest.create({
      data: { name, email, phone: phone || null, profession: profession || null, city: city || null, motivation: motivation || null },
    });

    return NextResponse.json({ success: true, id: membership.id }, { status: 201 });
  } catch (error) {
    console.error('Membership API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
