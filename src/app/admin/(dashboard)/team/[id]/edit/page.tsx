import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { TeamForm } from '../../TeamForm';

export default async function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = await prisma.teamMember.findUnique({ where: { id } });
  if (!member) notFound();
  
  const formData = {
    id: member.id,
    name: member.name,
    roleFr: member.roleFr,
    roleAr: member.roleAr,
    bioFr: member.bioFr ?? undefined,
    bioAr: member.bioAr ?? undefined,
    photo: member.photo ?? undefined,
    order: member.order,
    visible: member.visible,
  };
  
  return <TeamForm mode="edit" initialData={formData} />;
}
