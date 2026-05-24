import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowRight } from 'lucide-react';
import type { Dictionary, Locale } from '@/types';

interface BlogPreviewProps {
  dict: Dictionary;
  locale: Locale;
}

// Sample preview posts with professional photographs
const samplePosts = [
  {
    slug: 'inclusion-financiere-maroc-2024',
    titleFr: "L'inclusion financière au Maroc : état des lieux et perspectives 2024",
    titleAr: "الإدماج المالي بالمغرب: الواقع والآفاق 2024",
    excerptFr: "Analyse de l'évolution de l'inclusion financière au Maroc, des progrès réalisés et des défis à relever pour une couverture financière universelle.",
    excerptAr: "تحليل تطور الإدماج المالي بالمغرب والمكتسبات المحققة والتحديات المطروحة لتحقيق تغطية مالية شاملة.",
    date: '2024-01-15',
    author: 'Hicham MARZOUK',
    category: 'Inclusion financière',
    image: '/blog_post1.png'
  },
  {
    slug: 'entrepreneuriat-cooperatives-maroc',
    titleFr: "Coopératives et entrepreneuriat social : moteurs de l'économie inclusive",
    titleAr: "التعاونيات والمقاولة الاجتماعية: محركات الاقتصاد الشامل",
    excerptFr: "Comment les coopératives marocaines contribuent au développement économique local et à l'inclusion des populations vulnérables.",
    excerptAr: "كيف تساهم التعاونيات المغربية في التنمية الاقتصادية المحلية وإدماج الفئات الهشة.",
    date: '2024-02-08',
    author: 'Pr. Abdelaziz ELABJANI',
    category: 'Coopératives',
    image: '/blog_post2.png'
  },
  {
    slug: 'financement-startup-pme',
    titleFr: "Financement des start-up et PME : nouveaux mécanismes et opportunités",
    titleAr: "تمويل الشركات الناشئة والمقاولات الصغيرة: آليات وفرص جديدة",
    excerptFr: "Tour d'horizon des solutions de financement disponibles pour les entrepreneurs marocains : crédits, subventions, crowdfunding et capital-risque.",
    excerptAr: "جولة في حلول التمويل المتاحة للمقاولين المغاربة: قروض، منح، تمويل جماعي ورأس المال المخاطر.",
    date: '2024-03-20',
    author: 'Mohamed EL HYANI',
    category: 'Financement',
    image: '/blog_post3.png'
  },
];

export function BlogPreview({ dict, locale }: BlogPreviewProps) {
  const isAr = locale === 'ar';

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-light" id="blog">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <span className="inline-block px-3 py-1 bg-primary-50 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
              {dict.blog.tag}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-dark tracking-tight">
              {dict.blog.title}
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
            <p className="text-sm md:text-base text-medium leading-relaxed">
              {dict.blog.subtitle}
            </p>
          </div>
          
          <Link 
            href={`/${locale}/blog`} 
            className="self-start lg:self-end inline-flex items-center justify-center gap-2 px-6 py-3 border border-dark hover:bg-dark hover:text-white text-dark font-semibold rounded-full text-sm transition-all duration-300 hover:-translate-y-0.5"
          >
            <span>{dict.blog.allPosts}</span>
            <ArrowRight size={16} className={`${isAr ? 'rotate-180' : ''}`} />
          </Link>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {samplePosts.map((post) => (
            <article 
              key={post.slug} 
              className="bg-white border border-border-custom rounded-3xl overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col group hover:-translate-y-1"
            >
              {/* Category/Image Header with real photograph */}
              <div className="h-48 relative overflow-hidden">
                <Image 
                  src={post.image}
                  alt={isAr ? post.titleAr : post.titleFr}
                  fill
                  sizes="(max-w-md) 100vw, 350px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border border-border-custom/50 px-3 py-1 rounded-full text-xs font-bold text-dark shadow-sm">
                  {post.category}
                </span>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between gap-6">
                <div className="space-y-3">
                  
                  {/* Meta items */}
                  <div className="flex items-center gap-4 text-xs font-semibold text-medium">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-primary" />
                      <span>
                        {new Date(post.date).toLocaleDateString(isAr ? 'ar-MA' : 'fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User size={13} className="text-secondary" />
                      <span>{post.author}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-extrabold text-dark group-hover:text-primary transition-colors leading-snug line-clamp-2">
                    {isAr ? post.titleAr : post.titleFr}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs md:text-sm text-medium font-medium leading-relaxed line-clamp-3">
                    {isAr ? post.excerptAr : post.excerptFr}
                  </p>

                </div>

                {/* Read More link */}
                <div className="pt-4 border-t border-border-custom/50 flex items-center">
                  <Link 
                    href={`/${locale}/blog/${post.slug}`} 
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-secondary hover:text-secondary-dark transition-colors"
                  >
                    <span>{dict.blog.readMore}</span>
                    <ArrowRight size={14} className={`${isAr ? 'rotate-180' : ''}`} />
                  </Link>
                </div>

              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
