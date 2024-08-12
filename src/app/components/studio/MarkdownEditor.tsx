'use client';

import {
  FormatBold as BoldIcon,
  Folder as FolderIcon,
  Functions as FunctionsIcon,
  Image as ImageIcon,
  FormatItalic as ItalicIcon,
  Save as SaveIcon,
  Title as TitleIcon,
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
import React, { useRef, useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

const MarkdownEditor: React.FC = () => {
  const [markdown, setMarkdown] = useState('');
  const [lineNumbers, setLineNumbers] = useState<number[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Atualiza o contador de linhas com base nos "enters" no texto
  useEffect(() => {
    const totalLines = markdown.split('\n').length;
    setLineNumbers(Array.from({ length: totalLines }, (_, i) => i + 1));
  }, [markdown]);

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
      insertTextAtSelection(`![`, `](${url})`, 'Descrição da imagem');
    }
  };

  const handleSave = () => {
    alert('Conteúdo salvo!');
  };

  return (
    <Box className="flex flex-col h-screen">
      <AppBar
        position="static"
        className="bg-[#f8f3f3] border-b border-[#D9D9D9]"
      >
        <Toolbar className="flex justify-between items-center">
          <Box className="flex items-center gap-2">
            <Tooltip title="Arquivos">
              <IconButton className="text-[#6667AB]">
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

          <Tooltip title="Save">
            <IconButton className="text-[#515287]">
              <SaveIcon sx={{ fontSize: 35 }} />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Box className="flex flex-1">
        <Box className="editor flex-1 flex bg-[#FFFAFA] border-r border-[#E0E0E0] relative">
          <Box
            className="line-numbers text-center text-lg py-2 bg-[#F8F3F3] text-[#1F1F1F] border-2 border-solid absolute left-0 top-0 h-full"
            style={{ width: '40px' }}
          >
            {lineNumbers.map((lineNumber, index) => (
              <div key={index}>{lineNumber}</div>
            ))}
          </Box>
          <textarea
            ref={textareaRef}
            value={markdown}
            onChange={(e) => handleChange(e.target.value)}
            className="w-full h-full text-lg box-border border-none resize-none"
            style={{ marginLeft: '40px', whiteSpace: 'pre' }}
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