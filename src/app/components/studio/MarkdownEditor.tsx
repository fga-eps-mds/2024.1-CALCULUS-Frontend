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
  Delete as DeleteIcon,
} from '@mui/icons-material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import {
  AppBar,
  Box,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Tooltip,
} from '@mui/material';
import 'katex/dist/katex.min.css';
import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import axios from 'axios';
import { useSession } from 'next-auth/react';

interface Content {
  _id: string;
  title: string;
  body: string;
  user: string;
}

const MarkdownEditor: React.FC = () => {
  const { data: session } = useSession();
  const [markdown, setMarkdown] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [contents, setContents] = useState<Content[]>([]);
  const [selectedContentId, setSelectedContentId] = useState<string | null>(null);
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

  const handleSave = async () => {
    if (!session) {
      alert('Você precisa estar logado para salvar o conteúdo.');
      return;
    }

    const lines = markdown.split('\n');
    const titleLine = lines.find((line) => line.startsWith('# '));
    const title = titleLine ? titleLine.substring(2) : 'Sem Título';
    const body = markdown;

    try {
      const existingContent = contents.find(content => content.title === title);

      if (existingContent) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API2_URL}contents/${existingContent._id}`,
          { title, body },
          {
            headers: {
              Authorization: `Bearer ${session.user.accessToken}`,
            },
          }
        );
        alert('Conteúdo atualizado!');
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API2_URL}contents`,
          { title, body },
          {
            headers: {
              Authorization: `Bearer ${session.user.accessToken}`,
            },
          }
        );
        alert('Conteúdo salvo!');
      }
      fetchContents(); 
    } catch (error) {
      console.error('Erro ao salvar conteúdo:', error);
      alert('Erro ao salvar conteúdo.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API2_URL}contents/${id}`, {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      });
      alert('Conteúdo deletado!');
      setMarkdown('');
      setSelectedContentId(null);
      fetchContents();
    } catch (error) {
      console.error('Erro ao deletar conteúdo:', error);
      alert('Erro ao deletar conteúdo.');
    }
  };

  const fetchContents = async () => {
    if (!session) return;
    try {
      const response = await axios.get<Content[]>(`${process.env.NEXT_PUBLIC_API2_URL}contents`);
      const userId = session.user.id; 
      const filteredContents = response.data.filter(content => content.user === userId);
      setContents(filteredContents);
    } catch (error) {
      console.error('Erro ao buscar conteúdos:', error);
    }
  };

  const handleSelectContent = async (id: string) => {
    try {
      const response = await axios.get<Content>(`${process.env.NEXT_PUBLIC_API2_URL}contents/${id}`);
      setMarkdown(response.data.body);
      setSelectedContentId(id);
    } catch (error) {
      console.error('Erro ao carregar conteúdo:', error);
    }
  };

  useEffect(() => {
    fetchContents(); 
  }, [session]);

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
                  insertTextAtSelection('**', '**', 'texto em negrito')
                }
              >
                <BoldIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Itálico">
              <IconButton
                onClick={() =>
                  insertTextAtSelection('*', '*', 'texto em itálico')
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
                onClick={() => insertTextAtSelection('$$\n', '\n$$\n', 'E = mc^2')}
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
            <Box mt={4} /> 
            <List>
              {contents.map((content, index) => (
                <React.Fragment key={content._id}>
                  <ListItemButton
                    selected={selectedContentId === content._id}
                    onClick={() => handleSelectContent(content._id)}
                  >
                    <ListItemText primary={content.title} />
                    <IconButton
                      className="text-red-500"
                      onClick={() => handleDelete(content._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemButton>
                  {index < contents.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Box>
        )}
        <Box className="editor flex-1 flex bg-[#FFFAFA] border-r border-[#E0E0E0] relative">
          <textarea
            ref={textareaRef}
            className="w-full h-full resize-none p-4 focus:outline-none"
            value={markdown}
            onChange={(e) => handleChange(e.target.value)}
          />
        </Box>
        <Box className="preview flex-1 overflow-y-auto p-4 bg-white">
          <ReactMarkdown
            className="prose prose-lg"
            remarkPlugins={[remarkGfm, remarkMath]}
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
