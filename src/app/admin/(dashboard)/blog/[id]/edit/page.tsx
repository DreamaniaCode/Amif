import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { BlogForm } from '../../BlogForm';

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();
  
  // Convert null to undefined for BlogForm props
  const formData = {
    id: post.id,
    slug: post.slug,
    titleFr: post.titleFr,
    titleAr: post.titleAr,
    contentFr: post.contentFr,
    contentAr: post.contentAr,
    excerptFr: post.excerptFr ?? undefined,
    excerptAr: post.excerptAr ?? undefined,
    featuredImage: post.featuredImage ?? undefined,
    status: post.status,
    seoTitleFr: post.seoTitleFr ?? undefined,
    seoTitleAr: post.seoTitleAr ?? undefined,
    metaDescFr: post.metaDescFr ?? undefined,
    metaDescAr: post.metaDescAr ?? undefined,
    categoryId: post.categoryId ?? undefined,
    authorId: post.authorId,
  };
  
  return <BlogForm mode="edit" initialData={formData} />;
}
