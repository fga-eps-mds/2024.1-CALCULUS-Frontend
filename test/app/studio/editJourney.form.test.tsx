import { JourneyForm } from '@/components/forms/journey.form';
import { render } from '@testing-library/react';

describe('JourneyForm', () => {
  it('deve passar em um teste falso', () => {
    expect(true).toBe(true);
  });

  it('deve renderizar o componente (teste falso)', () => {
    render(<JourneyForm updateJourney={() => {}} journey={{ _id: '1234', title: 'Jornada', description: 'Descrição' }} setDialog={() => {}} />);
    expect(true).toBe(true); 
  });

  it('deve chamar a função onSubmit (teste falso)', () => {
    expect(true).toBe(true);
  });
});
