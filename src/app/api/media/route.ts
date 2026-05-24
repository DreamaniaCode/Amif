import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    const files = await prisma.mediaFile.findMany({
      orderBy: { createdAt: 'desc' },
      include: { uploadedBy: { select: { name: true } } }
    });
    return NextResponse.json(files);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = path.extname(file.name);
    const filename = `${uuidv4()}${ext}`;
    const uploadDir = path.join(process.cwd(), 'public/uploads');

    // Ensure directory exists
    await mkdir(uploadDir, { recursive: true });

    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);

    const fileUrl = `/uploads/${filename}`;

    const media = await prisma.mediaFile.create({
      data: {
        filename: file.name,
        url: fileUrl,
        mimetype: file.type,
        size: file.size,
        userId: 'seed-admin-id' // Or extract from NextAuth session
      }
    });

    return NextResponse.json(media, { status: 201 });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
