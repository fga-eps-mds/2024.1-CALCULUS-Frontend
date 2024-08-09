'use client';
import '../../styles/creation.css';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import React from 'react';
import Box from '@mui/material/Box';

export default function CreationStudio() {
  const [input, setInput] = React.useState('');

  return (
    <Box className="h-screen w-screen overflow-hidden">
      <Box
        id="botoes"
        className="bg-[#f8f3f3] border-2 border-solid border-[#D9D9D9]"
      >
        <button>
          <strong>N</strong>
        </button>
        <button>
          <strong>
            <em>S</em>
          </strong>
        </button>
        <button>
          <strong>
            <s>S</s>
          </strong>
        </button>
      </Box>
      <Box className="grid grid-cols-2 h-full">
        <textarea
          autoFocus
          className="bg-[#fffafa] px-5 py-3 leading-2 border"
          id="editor"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <Box className="bg-[#f8f3f3] px-5 py-3 border-2 border-solid border-[#D9D9D9]">
          <Markdown
            className="leading-2"
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {input}
          </Markdown>
        </Box>
      </Box>
    </Box>
  );
}
