import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownRender {
    markdown: string;
}

const MarkdownRender: React.FC<MarkdownRender> = ({ markdown }) => (
    <div className='markdown-body'>
        <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
);

export default MarkdownRender;