import React from 'react';
import { render, screen } from '@testing-library/react';
import JourneyCard from '@/components/home/JourneyCard';
import StartCard from '@/components/home/StartPointsCard';
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ src, alt }: { src: string; alt: string }) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} />
    ),
}));

jest.mock('@/components/ui/buttons/myButton.component', () => ({
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => (
        <button>{children}</button>
    ),
}));

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

describe('JourneyCard Component', () => {
    it('renders emAndamento type correctly', () => {
        render(
            <JourneyCard
                title="Journey in Progress"
                image="/path/to/image.jpg"
                Id="1"
              />
        );

        const title = screen.getByText('Journey in Progress');
        const image = screen.getByAltText('Journey in Progress');

        expect(title).toBeInTheDocument();
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', '/path/to/image.jpg');
    });

    it('renders Start Points type correctly', () => {
        render(
            <StartCard
              title="General Journey"
              description="This is a general journey description."
              image="/path/to/general-image.jpg"
              Id="1"
            />
        );

        const title = screen.getByText('General Journey');
        const image = screen.getByAltText('General Journey');
        const description = screen.getByText('This is a general journey description.');

        expect(title).toBeInTheDocument();
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', '/path/to/general-image.jpg');
        expect(description).toBeInTheDocument();
    });

    it('does not render description when not provided for Start Point type', () => {
        render(
            <StartCard
              title="General Journey"
              image="/path/to/general-image.jpg"
              Id="1"
            />
        );

        const title = screen.getByText('General Journey');
        const image = screen.getByAltText('General Journey');
        const description = screen.queryByText('This is a general journey description.');

        expect(title).toBeInTheDocument();
        expect(image).toBeInTheDocument();
        expect(description).not.toBeInTheDocument();
    });
});
