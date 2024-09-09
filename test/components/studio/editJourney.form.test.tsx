import { JourneyForm } from '@/components/forms/journey.form';
import { render } from '@testing-library/react';

describe('JourneyForm', () => {
  it('deve renderizar o componente (teste falso)', () => {
    render(<JourneyForm updateJourney={() => {}} journey={{ _id: '1234', title: 'Jornada', description: 'Descrição' }} setDialog={() => {}} />);
    expect(true).toBe(true); 
  });
});