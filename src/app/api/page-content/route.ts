import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    const contents = await prisma.pageContent.findMany({
      orderBy: [
        { page: 'asc' },
        { section: 'asc' },
        { key: 'asc' }
      ]
    });
    return NextResponse.json(contents);
  } catch (error) {
    console.error('Failed to fetch page contents:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { updates } = body as { updates: { id: string, valueFr: string, valueAr: string }[] };

    if (!updates || !Array.isArray(updates)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    // Process updates in a transaction for safety
    await prisma.$transaction(
      updates.map((update) => 
        prisma.pageContent.update({
          where: { id: update.id },
          data: {
            valueFr: update.valueFr,
            valueAr: update.valueAr
          }
        })
      )
    );

    // Revalidate the root layouts to trigger a fresh dictionary load for all public pages
    revalidatePath('/', 'layout');
    revalidatePath('/[locale]', 'layout');

    return NextResponse.json({ success: true, updatedCount: updates.length });
  } catch (error) {
    console.error('Failed to update page contents:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
