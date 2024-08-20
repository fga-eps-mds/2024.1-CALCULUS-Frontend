'use client';

import MarkdownPage from '@/app/components/studio/MarkdownPage';
import { useParams } from 'next/navigation';
export default function StudioPage() {
  const { trailId } = useParams();

  return (
    <main>
      <MarkdownPage trailId={trailId as string} />
    </main>
  );
}
