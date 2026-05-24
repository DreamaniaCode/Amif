import { prisma } from '../src/lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  console.log('🌱 Seeding AMIF database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('Admin@AMIF2024!', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@amif.ma' },
    update: {},
    create: {
      id: 'seed-admin-id',
      email: 'admin@amif.ma',
      password: hashedPassword,
      name: 'Admin AMIF',
      role: 'SUPER_ADMIN',
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({ where: { slug: 'inclusion-financiere' }, update: {}, create: { nameFr: 'Inclusion financière', nameAr: 'الإدماج المالي', slug: 'inclusion-financiere' } }),
    prisma.category.upsert({ where: { slug: 'entrepreneuriat' }, update: {}, create: { nameFr: 'Entrepreneuriat', nameAr: 'المقاولة', slug: 'entrepreneuriat' } }),
    prisma.category.upsert({ where: { slug: 'formation' }, update: {}, create: { nameFr: 'Formation', nameAr: 'التكوين', slug: 'formation' } }),
    prisma.category.upsert({ where: { slug: 'cooperatives' }, update: {}, create: { nameFr: 'Coopératives', nameAr: 'التعاونيات', slug: 'cooperatives' } }),
    prisma.category.upsert({ where: { slug: 'financement' }, update: {}, create: { nameFr: 'Financement', nameAr: 'التمويل', slug: 'financement' } }),
    prisma.category.upsert({ where: { slug: 'recherche' }, update: {}, create: { nameFr: 'Recherche & développement', nameAr: 'البحث والتطوير', slug: 'recherche' } }),
    prisma.category.upsert({ where: { slug: 'actualites-amif' }, update: {}, create: { nameFr: 'Actualités AMIF', nameAr: 'أخبار الجمعية', slug: 'actualites-amif' } }),
    prisma.category.upsert({ where: { slug: 'afrique-partenariats' }, update: {}, create: { nameFr: 'Afrique & partenariats', nameAr: 'إفريقيا والشراكات', slug: 'afrique-partenariats' } }),
  ]);
  console.log('✅ Categories created:', categories.length);

  // Create team members
  const teamData = [
    { name: 'Hicham MARZOUK', roleFr: 'Président & Fondateur — Directeur d\'agence bancaire, formateur vacataire OFPPT et spécialiste en entrepreneuriat', roleAr: 'رئيس مؤسس — مدير وكالة بنكية، مكون في OFPPT ومتخصص في المقاولة', order: 1 },
    { name: 'Pr. Abdelaziz ELABJANI', roleFr: 'Vice Doyen et Professeur, Faculté de l\'Économie Cadi Ayyad', roleAr: 'نائب العميد وأستاذ، كلية الاقتصاد القاضي عياض', order: 2 },
    { name: 'Mohamed LHAROUAL', roleFr: 'Professeur de Droit, Université Cadi Ayyad', roleAr: 'أستاذ القانون، جامعة القاضي عياض', order: 3 },
    { name: 'Mohamed ECCHEBANY', roleFr: 'Enseignant chercheur, Université Privée de Marrakech', roleAr: 'أستاذ باحث، الجامعة الخاصة بمراكش', order: 4 },
    { name: 'Maître Mohamed ANOUARANI', roleFr: 'Cadre, Direction Régionale des Impôts', roleAr: 'إطار، المديرية الجهوية للضرائب', order: 5 },
    { name: 'Amal SAMIR', roleFr: 'Agent Général, AXA Assurances', roleAr: 'وكيل عام، AXA للتأمين', order: 6 },
    { name: 'Amal OULKADI', roleFr: 'Cadre, Al Amana Microfinance', roleAr: 'إطار، الأمانة للتمويل الصغير', order: 7 },
    { name: 'Aminata ABDOUL BOSSO', roleFr: 'Guest Experience, Riad Les Yeux Bleus', roleAr: 'استقبال الضيوف، رياض لي يو بلو', order: 8 },
    { name: 'Ahmed AAOUINATY', roleFr: 'Ex Directeur de Complexe OFPPT, formateur ISTA, doctorant en économie', roleAr: 'مدير مجمع OFPPT السابق، مكون بالمعهد، دكتوراه في الاقتصاد', order: 9 },
    { name: 'Mohamed EL HYANI', roleFr: 'Ex Directeur d\'Agence Bancaire et Professeur en Économie', roleAr: 'مدير وكالة بنكية سابق وأستاذ الاقتصاد', order: 10 },
    { name: 'Jassim EL BELKANI', roleFr: 'Architecte d\'Intérieur et Professeur à l\'Université Privée de Marrakech', roleAr: 'مهندس ديكور وأستاذ بالجامعة الخاصة بمراكش', order: 11 },
    { name: 'Hicham KHALIS', roleFr: 'Directeur AB Serve Maroc et AB Serve Free Zone, ex DRH GTech Maroc', roleAr: 'مدير AB Serve المغرب والمنطقة الحرة، مدير الموارد البشرية السابق لـ GTech', order: 12 },
    { name: 'Abdelaali JALAL MANSOUR', roleFr: 'Ex Directeur de Groupe BMCE Bank, Directeur de Bank Alyousr', roleAr: 'مدير مجموعة BMCE البنك السابق، مدير بنك اليسر', order: 13 },
    { name: 'Ali MAACHOUK', roleFr: 'Directeur de Groupe Al Barid Bank', roleAr: 'مدير مجموعة البريد بنك', order: 14 },
    { name: 'Tarik BELHAJ', roleFr: 'Consultant en Ressources Humaines', roleAr: 'مستشار في الموارد البشرية', order: 15 },
    { name: 'Mohamed AHADDAR', roleFr: 'Formateur Permanent à l\'ISTA', roleAr: 'مكون دائم بالمعهد التخصصي للتكنولوجيا التطبيقية', order: 16 },
    { name: 'Taoufik LAGHDAF', roleFr: 'Directeur Régional, Filiale OCP', roleAr: 'مدير جهوي، فرع المكتب الشريف للفوسفات', order: 17 },
  ];

  for (const member of teamData) {
    await prisma.teamMember.upsert({
      where: { id: `member-${member.order}` },
      update: {},
      create: { id: `member-${member.order}`, ...member, visible: true },
    });
  }
  console.log('✅ Team members created:', teamData.length);

  // Sample blog post
  await prisma.blogPost.upsert({
    where: { slug: 'bienvenue-amif-inclusion-financiere' },
    update: {},
    create: {
      slug: 'bienvenue-amif-inclusion-financiere',
      titleFr: "Bienvenue à l'AMIF — Association Marocaine pour l'Inclusion Financière",
      titleAr: "مرحبًا بكم في الجمعية المغربية للإدماج المالي",
      contentFr: `L'AMIF est fière d'annoncer son lancement officiel. Notre association est dédiée à la promotion de l'inclusion financière au Maroc et en Afrique.

Nous rassemblons des experts du secteur bancaire, de l'enseignement supérieur, du droit, et du développement économique pour créer un écosystème favorable à l'entrepreneuriat inclusif.

Notre mission est d'accompagner, former et connecter les porteurs de projets, entrepreneurs, jeunes diplômés, coopératives et acteurs économiques pour une inclusion financière durable.`,
      contentAr: `يسعد الجمعية المغربية للإدماج المالي الإعلان عن انطلاقتها الرسمية. جمعيتنا مكرسة لتعزيز الإدماج المالي بالمغرب وإفريقيا.

نجمع خبراء القطاع البنكي والتعليم العالي والقانون والتنمية الاقتصادية لخلق بيئة مواتية للمقاولة الشاملة.

مهمتنا هي مواكبة وتكوين وربط حاملي المشاريع والمقاولين الشباب والتعاونيات والفاعلين الاقتصاديين من أجل إدماج مالي مستدام.`,
      excerptFr: "L'AMIF annonce son lancement officiel et présente sa vision pour l'inclusion financière au Maroc et en Afrique.",
      excerptAr: "الجمعية المغربية للإدماج المالي تعلن عن انطلاقتها الرسمية وتقدم رؤيتها للإدماج المالي بالمغرب وإفريقيا.",
      status: 'PUBLISHED',
      publishedAt: new Date(),
      authorId: admin.id,
      categoryId: categories[6].id, // Actualités AMIF
      seoTitleFr: "Lancement de l'AMIF — Association Marocaine pour l'Inclusion Financière",
      seoTitleAr: "إطلاق الجمعية المغربية للإدماج المالي",
      metaDescFr: "L'AMIF lance ses activités pour promouvoir l'inclusion financière, l'entrepreneuriat et le développement économique au Maroc et en Afrique.",
      metaDescAr: "تنطلق الجمعية المغربية للإدماج المالي لتعزيز الإدماج المالي والمقاولة والتنمية الاقتصادية بالمغرب وإفريقيا.",
    },
  });

  console.log('✅ Sample blog post created');
  console.log('');
  console.log('🎉 Database seeding complete!');
  console.log('');
  console.log('📋 Admin credentials:');
  console.log('   Email:    admin@amif.ma');
  console.log('   Password: Admin@AMIF2024!');
  console.log('   URL:      http://localhost:3000/admin');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
