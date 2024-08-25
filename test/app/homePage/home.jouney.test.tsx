import React from 'react';
import { render, screen } from '@testing-library/react';
import JourneyCard from '@/components/home/homeJourneyCard';
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

describe('JourneyCard Component', () => {
    it('renders emAndamento type correctly', () => {
        render(
            <JourneyCard
                type="emAndamento"
                title="Journey in Progress"
                image="/path/to/image.jpg"
            />
        );

        const title = screen.getByText('Journey in Progress');
        const image = screen.getByAltText('Journey in Progress');

        expect(title).toBeInTheDocument();
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', '/path/to/image.jpg');
    });

    it('renders geral type correctly', () => {
        render(
            <JourneyCard
                type="geral"
                title="General Journey"
                image="/path/to/general-image.jpg"
                description="This is a general journey description."
                URL="/path/to/journey"
            />
        );

        const title = screen.getByText('General Journey');
        const image = screen.getByAltText('General Journey');
        const description = screen.getByText('This is a general journey description.');
        const button = screen.getByText('VER TRILHAS');

        expect(title).toBeInTheDocument();
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', '/path/to/general-image.jpg');
        expect(description).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    it('does not render description when not provided for geral type', () => {
        render(
            <JourneyCard
                type="geral"
                title="General Journey"
                image="/path/to/general-image.jpg"
            />
        );

        const title = screen.getByText('General Journey');
        const image = screen.getByAltText('General Journey');
        const description = screen.queryByText('This is a general journey description.');
        const button = screen.getByText('VER TRILHAS');

        expect(title).toBeInTheDocument();
        expect(image).toBeInTheDocument();
        expect(description).not.toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });
});
