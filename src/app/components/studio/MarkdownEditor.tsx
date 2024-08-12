'use client';

import {
  FormatBold as BoldIcon,
  Folder as FolderIcon,
  Functions as FunctionsIcon,
  Image as ImageIcon,
  FormatItalic as ItalicIcon,
  Save as SaveIcon,
  Title as TitleIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import {
  AppBar,
  Box,
  Divider,
  IconButton,
  Toolbar,
  Tooltip,
} from '@mui/material';
import 'katex/dist/katex.min.css';
import React, { useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

const MarkdownEditor: React.FC = () => {
  const [markdown, setMarkdown] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleChange = (value: string) => {
    setMarkdown(value);
  };

  const insertTextAtSelection = (
    before: string,
    after: string,
    defaultText: string,
  ) => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const selectedText = markdown.substring(start, end);

      const textToInsert = selectedText || defaultText;
      const newText =
        markdown.substring(0, start) +
        before +
        textToInsert +
        after +
        markdown.substring(end);

      setMarkdown(newText);

      setTimeout(() => {
        textareaRef.current!.selectionStart = start + before.length;
        textareaRef.current!.selectionEnd =
          start + before.length + textToInsert.length;
        textareaRef.current!.focus();
      }, 0);
    }
  };

  const insertImage = () => {
    const url = prompt('Insira o URL da imagem');
    if (url) {
      insertTextAtSelection(`![`,`](${url})`, 'Descrição da imagem');
    }
  };

  const handleSave = () => {
    alert('Conteúdo salvo!');
  };

  return (
    <Box className="relative flex flex-col h-screen">
      <AppBar
        position="static"
        className="bg-[#f8f3f3] border-b border-[#D9D9D9]"
      >
        <Toolbar className="flex justify-between items-center">
          <Box className="flex items-center gap-2">
            <Tooltip title="Arquivos">
              <IconButton className="text-[#6667AB]" onClick={toggleSidebar}>
                <FolderIcon sx={{ fontSize: 32 }} />
              </IconButton>
            </Tooltip>

            <Divider orientation="vertical" flexItem className="bg-[#D9D9D9]" />

            <Tooltip title="Imagem">
              <IconButton onClick={insertImage}>
                <ImageIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Negrito">
              <IconButton
                onClick={() =>
                  insertTextAtSelection('*', '*', 'texto em negrito')
                }
              >
                <BoldIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Itálico">
              <IconButton
                onClick={() =>
                  insertTextAtSelection('', '', 'texto em itálico')
                }
              >
                <ItalicIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Título">
              <IconButton
                onClick={() => insertTextAtSelection('# ', '\n', 'Título')}
              >
                <TitleIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Lista">
              <IconButton
                onClick={() =>
                  insertTextAtSelection('- ', '\n', 'Item da lista')
                }
              >
                <FormatListBulletedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="LaTeX">
              <IconButton
                onClick={() => insertTextAtSelection('$$', '$$\n', 'E = mc^2')}
              >
                <FunctionsIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Tooltip title="Salvar">
            <IconButton className="text-[#515287]" onClick={handleSave}>
              <SaveIcon sx={{ fontSize: 35 }} />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Box className="relative flex flex-1 h-full">
        {sidebarOpen && (
          <Box
            className="fixed inset-0 bg-black opacity-50"
            onClick={toggleSidebar}
            style={{ zIndex: 1200 }}
          />
        )}
        {sidebarOpen && (
          <Box
            className="fixed top-[64px] left-0 bg-[#F0F0F0] border-r border-[#D9D9D9] h-[calc(100vh-64px)] w-64 p-4 overflow-y-auto"
            style={{ zIndex: 1300 }}
          >
            <IconButton
              className="absolute top-2 right-2 text-[#6667AB]"
              onClick={toggleSidebar}
            >
              <CloseIcon />
            </IconButton>
            {/* Conteúdo da sidebar */}
          </Box>
        )}
        <Box className="editor flex-1 flex bg-[#FFFAFA] border-r border-[#E0E0E0] relative">
          <textarea
            ref={textareaRef}
            value={markdown}
            onChange={(e) => handleChange(e.target.value)}
            className="w-full h-full text-lg box-border border-none resize-none"
            style={{ whiteSpace: 'pre-wrap' }}
          />
        </Box>
        <Box className="preview flex-1 p-5 box-border overflow-y-auto bg-[#FFF5EE]">
          <ReactMarkdown
            remarkPlugins={[remarkMath, remarkGfm]}
            rehypePlugins={[rehypeKatex]}
          >
            {markdown}
          </ReactMarkdown>
        </Box>
      </Box>
    </Box>
  );
};

export default MarkdownEditor;
