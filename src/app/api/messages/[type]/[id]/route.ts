import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ type: string; id: string }> }
) {
  const { type, id } = await params;
  const body = await request.json();
  const { status } = body;

  try {
    if (type === 'contact') {
      await prisma.contactMessage.update({ where: { id }, data: { status } });
    } else if (type === 'membership') {
      await prisma.membershipRequest.update({ where: { id }, data: { status } });
    } else if (type === 'partnership') {
      await prisma.partnershipRequest.update({ where: { id }, data: { status } });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
