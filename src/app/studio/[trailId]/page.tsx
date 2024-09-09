'use client';

import MarkdownPage from '@/components/studio/MarkdownPage';
import { useParams } from 'next/navigation';
export default function StudioPage() {
  const { trailId } = useParams();

  return (
    <main>
      <MarkdownPage trailId={trailId as string} />
    </main>
  );
}
