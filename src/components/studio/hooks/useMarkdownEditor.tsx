import { useState, useRef } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useSession } from 'next-auth/react';
import { insertTextAtSelection } from '../utils/insertTextAtSelection';
import { Content } from '@/lib/interfaces/content.interface';
import { toast } from 'sonner';
import {
  getContentById,
  getContentsByTrailId,
} from '@/services/studioMaker.service';

const useMarkdownEditor = () => {
  const { data: session } = useSession();
  const [markdown, setMarkdown] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [contents, setContents] = useState<Content[]>([]);
  const [selectedContentId, setSelectedContentId] = useState<string | null>(
    null,
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleChange = (value: string) => {
    setMarkdown(value);
  };

  const insertImage = () => {
    const url = prompt('Insira o URL da imagem');
    if (url) {
      insertTextAtSelection(
        textareaRef,
        markdown,
        setMarkdown,
        `![`,
        `](${url})`,
        'Descrição da imagem',
      );
    }
  };

  const handleSave = async () => {
    if (!session || !selectedContentId) {
      toast.error(
        'Você precisa estar logado e selecionar um conteúdo para salvar.',
      );
      return;
    }

    const content = markdown;

    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL_STUDIO}/contents/${selectedContentId}`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        },
      );
      toast.success('Conteúdo atualizado!');
    } catch (error) {
      console.error('Erro ao salvar conteúdo:', error);
      toast.error('Erro ao salvar conteúdo.');
    }
  };

  const handleCreateContent = async (title: string, trailId: string) => {
    if (!session) {
      toast.error('Você precisa estar logado para criar um novo conteúdo.');
      return;
    }

    try {
      const contentResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL_STUDIO}/contents`,
        { title: title, content: ' ', trailId: trailId },
        {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        },
      );

      const newContentId = contentResponse.data._id;

      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL_STUDIO}/trails/${trailId}/addContent`,
        { contentId: newContentId },
        {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        },
      );

      toast.success('Novo conteúdo criado e adicionado à trilha!');
      fetchContents(trailId);
      setSelectedContentId(newContentId);
      setMarkdown('');
    } catch (error) {
      console.error('Erro ao criar e adicionar conteúdo à trilha:', error);
      toast.error('Erro ao criar e adicionar conteúdo à trilha.');
    }
  };

  const handleDelete = async (id: string, trailId: string) => {
    if (!trailId) {
      toast.error('Trilha não definida.');
      return;
    }

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL_STUDIO}/trails/${trailId}/removeContent`,
        { contentId: id },
        {
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        },
      );

      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL_STUDIO}/contents/${id}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        },
      );

      toast.success('Conteúdo deletado e removido da trilha!');
      setMarkdown('');
      setSelectedContentId(null);
      fetchContents(trailId);
    } catch (error) {
      console.error('Erro ao deletar conteúdo:', error);
      toast.error('Erro ao deletar conteúdo.');
    }
  };

  const fetchContents = async (trailId: string) => {
    if (!session) return;

    const response = await getContentsByTrailId(trailId);

    if (response.error) {
      toast.error(
        'Erro ao buscar conteúdos vinculados a trilha. Reinicia página',
      );
      return;
    }
    const contents: Content[] = response.data;
    setContents(contents.sort((a, b) => a.order - b.order));
  };

  const handleSelectContent = async (id: string) => {
    const response = await getContentById(id);
    if (response.error) {
      toast.error('Erro ao buscar conteúdo. Tente novamente');
      return;
    }
    setMarkdown(response.data.content);
    setSelectedContentId(id);
  };

  return {
    markdown,
    setMarkdown,
    sidebarOpen,
    setSidebarOpen,
    contents,
    setContents,
    selectedContentId,
    textareaRef,
    toggleSidebar,
    handleChange,
    insertTextAtSelection,
    insertImage,
    handleSave,
    handleCreateContent,
    handleDelete,
    handleSelectContent,
    fetchContents,
  };
};

export default useMarkdownEditor;
