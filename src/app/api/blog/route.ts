import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const locale = searchParams.get('locale') || 'fr';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = { status: status || 'PUBLISHED' };
    if (category) where.categoryId = category;

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        include: { author: { select: { name: true } }, category: true, tags: true },
        orderBy: { publishedAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.blogPost.count({ where }),
    ]);

    return NextResponse.json({ posts, total, page, limit });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      slug, titleFr, titleAr, contentFr, contentAr,
      excerptFr, excerptAr, featuredImage, status,
      categoryId, authorId, seoTitleFr, seoTitleAr,
      metaDescFr, metaDescAr, tagIds
    } = body;

    const post = await prisma.blogPost.create({
      data: {
        slug, titleFr, titleAr, contentFr, contentAr,
        excerptFr, excerptAr, featuredImage,
        status: status || 'DRAFT',
        categoryId: categoryId || null,
        authorId,
        seoTitleFr, seoTitleAr, metaDescFr, metaDescAr,
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
        tags: tagIds ? { connect: tagIds.map((id: string) => ({ id })) } : undefined,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Blog POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
