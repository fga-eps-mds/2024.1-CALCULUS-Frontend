import { useRouter } from 'next/router';
import MarkdownPage from '@/app/components/studio/MarkdownPage';

export default function StudioPage() {
  const router = useRouter();
  const { trailId } = router.query;

  return (
    <main>
      <MarkdownPage trailId={trailId as string} />
    </main>
  );
}