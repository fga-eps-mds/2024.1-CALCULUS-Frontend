import React from 'react';

interface EditorProps {
    markdown: string;
    handleChange: (value: string) => void;
    textareaRef: React.RefObject<HTMLTextAreaElement>;
}

const MarkdownEditor: React.FC<EditorProps> = ({ markdown, handleChange, textareaRef }) => (
    <textarea
        ref={textareaRef}
        className="w-full h-full resize-none p-4 focus:outline-none"
        value={markdown}
        onChange={(e) => handleChange(e.target.value)}
    />
);

export default MarkdownEditor;
