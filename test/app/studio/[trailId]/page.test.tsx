import '@testing-library/jest-dom'; 
import { render, screen } from '@testing-library/react';
import StudioPage from '@/app/studio/[trailId]/page'; 
import { useParams } from 'next/navigation';

jest.mock('@/app/components/studio/MarkdownPage', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mock MarkdownPage</div>),
}));

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

describe('StudioPage', () => {
  it('renderiza o componente MarkdownPage com o trailId correto', () => {
    (useParams as jest.Mock).mockReturnValue({ trailId: '1234' });

    render(<StudioPage />);

    expect(screen.getByText('Mock MarkdownPage')).toBeInTheDocument();
  });
});
