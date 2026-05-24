import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orgName, contactPerson, email, phone, partnershipType, message } = body;

    if (!orgName || !contactPerson || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const partnership = await prisma.partnershipRequest.create({
      data: {
        orgName,
        contactPerson,
        email,
        phone: phone || null,
        partnershipType: partnershipType || null,
        message: message || null,
      },
    });

    return NextResponse.json({ success: true, id: partnership.id }, { status: 201 });
  } catch (error) {
    console.error('Partnership API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
