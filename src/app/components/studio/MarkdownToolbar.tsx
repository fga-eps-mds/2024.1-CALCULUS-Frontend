import React from 'react';
import {
  IconButton,
  Tooltip,
  Divider,
  Box,
  Toolbar,
  AppBar,
} from '@mui/material';
import {
  FormatBold as BoldIcon,
  FormatItalic as ItalicIcon,
  Title as TitleIcon,
  Image as ImageIcon,
  Functions as FunctionsIcon,
  Save as SaveIcon,
  FormatListBulleted as FormatListBulletedIcon,
  Folder as FolderIcon,
} from '@mui/icons-material';

interface ToolbarProps {
  toggleSidebar: () => void;
  insertTextAtSelection: (
    before: string,
    after: string,
    defaultText: string,
  ) => void;
  insertImage: () => void;
  handleSave: (trailId: string) => void;
  trailId: string;
}

const MarkdownToolbar: React.FC<ToolbarProps> = ({
  toggleSidebar,
  insertTextAtSelection,
  insertImage,
  handleSave,
  trailId,
}) => (
  <>
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
            onClick={() => insertTextAtSelection('*', '*', 'texto em itálico')}
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
            onClick={() => insertTextAtSelection('- ', '\n', 'Item da lista')}
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
    </Toolbar>
    <Box>
      <Tooltip title="Salvar">
        <IconButton
          className="text-[#515287]"
          onClick={() => handleSave(trailId)}
        >
          <SaveIcon sx={{ fontSize: 35 }} />
        </IconButton>
      </Tooltip>
    </Box>
  </>
);

export default MarkdownToolbar;
