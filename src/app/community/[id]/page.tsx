import CommunityDetailClient from '@/app/community/_components/CommunityDetailClient';

export default function CommunityDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-4">
      <CommunityDetailClient playlistId={params.id} />
    </div>
  );
}
