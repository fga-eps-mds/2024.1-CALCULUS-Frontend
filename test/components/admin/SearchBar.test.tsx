import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '@/components/admin/SearchBar'; 

describe('SearchBar', () => {
  test('renders the search bar with the correct value', () => {
    const mockOnChange = jest.fn();
    render(<SearchBar value="test query" onChange={mockOnChange} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('test query');
  });

  test('calls onChange when the input value changes', () => {
    const mockOnChange = jest.fn();
    render(<SearchBar value="" onChange={mockOnChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new query' } });

    expect(mockOnChange).toHaveBeenCalledWith('new query');
  });

  test('renders the search icon in the input', () => {
    const mockOnChange = jest.fn();
    render(<SearchBar value="" onChange={mockOnChange} />);

    const searchIcon = screen.getByRole('button');
    expect(searchIcon).toBeInTheDocument();
  });
});
