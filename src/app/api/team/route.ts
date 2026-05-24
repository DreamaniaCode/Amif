import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const members = await prisma.teamMember.findMany({
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(members);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, roleFr, roleAr, bioFr, bioAr, photo, order, visible } = body;
    
    const member = await prisma.teamMember.create({
      data: { name, roleFr, roleAr, bioFr, bioAr, photo, order: order || 0, visible: visible ?? true }
    });
    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
