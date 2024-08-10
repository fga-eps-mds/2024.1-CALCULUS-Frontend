'use client';

import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { AppBar, Toolbar, IconButton, Tooltip, Box, Button, Divider } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Save as SaveIcon, Folder as FolderIcon, Functions as FunctionsIcon, FormatBold as BoldIcon, FormatItalic as ItalicIcon, Title as TitleIcon} from '@mui/icons-material';


const MarkdownEditor: React.FC = () => {
  const [markdown, setMarkdown] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (value: string) => {
    setMarkdown(value);
  };

  const insertTextAtSelection = (before: string, after: string, defaultText: string) => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const selectedText = markdown.substring(start, end);

      const textToInsert = selectedText || defaultText;
      const newText = markdown.substring(0, start) + before + textToInsert + after + markdown.substring(end);

      setMarkdown(newText);

      setTimeout(() => {
        textareaRef.current!.selectionStart = start + before.length;
        textareaRef.current!.selectionEnd = start + before.length + textToInsert.length;
        textareaRef.current!.focus();
      }, 0);
    }
  };

  const handleSave = () => {
    alert('Conteúdo salvo!');
  };

  return (
    <Box className="flex flex-col h-screen">
      <AppBar position="static" className="bg-[#f8f3f3] border-b border-[#D9D9D9]">
        <Toolbar className="flex justify-between items-center">
          <Box className="flex items-center gap-2">

          <Tooltip title="Arquivos">
              <IconButton className="text-[#6667AB]">
                <FolderIcon sx={{fontSize:32}} />
              </IconButton>
            </Tooltip>

            <Divider orientation="vertical" flexItem className="bg-[#D9D9D9]" />

            <Tooltip title="Negrito">
              <IconButton onClick={() => insertTextAtSelection('**', '**', 'texto em negrito')}>
                <BoldIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Itálico">
              <IconButton onClick={() => insertTextAtSelection('*', '*', 'texto em itálico')}>
                <ItalicIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Título">
              <IconButton onClick={() => insertTextAtSelection('# ', '\n', 'Título')}>
                <TitleIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Lista">
              <IconButton onClick={() => insertTextAtSelection('- ', '\n', 'Item da lista')}>
                <FormatListBulletedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="LaTeX">
              <IconButton onClick={() => insertTextAtSelection('$$', '$$\n', 'E = mc^2')}>
                <FunctionsIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Tooltip title="Save">
              <IconButton className="text-[#515287]">
                <SaveIcon sx={{fontSize:35}}/>
              </IconButton>
            </Tooltip>

        </Toolbar>
      </AppBar>
      <Box className="flex flex-1">
        <Box className="editor flex-1 bg-[#FFFAFA] border-r border-[#E0E0E0]">
          <textarea
            ref={textareaRef}
            value={markdown}
            onChange={(e) => handleChange(e.target.value)}
            className="w-full h-full p-2 text-lg box-border border-none"
          />
        </Box>
        <Box className="preview flex-1 p-5 box-border overflow-y-auto bg-[#FFF5EE]">
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
          >
            {markdown}
          </ReactMarkdown>
        </Box>
      </Box>
          {/* Botão do protótipo */}
          {/* <Button
            onClick={handleSave}
            className="fixed bottom-4 right-4 bg-[#6667AB] text-[#FFFAFA] font-bold rounded-full px-8 py-2 text-lg"
          >
            Salvar
          </Button> */}
    </Box>
  );
};

export default MarkdownEditor;
