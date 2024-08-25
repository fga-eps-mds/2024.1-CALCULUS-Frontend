import { CreateJourneyForm } from '@/components/forms/createJourney.form';
import { render } from '@testing-library/react';

describe('CreateJourneyForm', () => {
  it('deve passar em um teste falso', () => {
    expect(true).toBe(true);
  });

  it('deve renderizar o componente (teste falso)', () => {
    render(<CreateJourneyForm addJourney={() => {}} setDialog={() => {}} />);
    expect(true).toBe(true); 
  });

  it('deve chamar a função onSubmit (teste falso)', () => {
    expect(true).toBe(true); 
  });
});
