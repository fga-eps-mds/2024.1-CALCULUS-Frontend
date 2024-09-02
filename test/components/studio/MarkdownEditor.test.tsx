import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MarkdownEditor from '@/components/studio/MarkdownEditor';

describe('MarkdownEditor', () => {
  const handleChange = jest.fn();
  const markdown = 'Test markdown';
  const textareaRef = React.createRef<HTMLTextAreaElement>();

  test('renders the textarea with the correct value', () => {
    render(
      <MarkdownEditor
        markdown={markdown}
        handleChange={handleChange}
        textareaRef={textareaRef}
      />
    );

    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveValue(markdown);
  });

  test('calls handleChange when the textarea value changes', () => {
    render(
      <MarkdownEditor
        markdown={markdown}
        handleChange={handleChange}
        textareaRef={textareaRef}
      />
    );

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'New markdown' } });

    expect(handleChange).toHaveBeenCalledWith('New markdown');
  });

  test('textarea ref is attached correctly', () => {
    render(
      <MarkdownEditor
        markdown={markdown}
        handleChange={handleChange}
        textareaRef={textareaRef}
      />
    );

    expect(textareaRef.current).not.toBeNull();
  });
});
