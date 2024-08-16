import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import 'katex/dist/katex.min.css';

interface PreviewProps {
    markdown: string;
}

const MarkdownPreview: React.FC<PreviewProps> = ({ markdown }) => (
    <ReactMarkdown
        className="prose prose-lg"
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeKatex]}
    >
        {markdown}
    </ReactMarkdown>
);

export default MarkdownPreview;
