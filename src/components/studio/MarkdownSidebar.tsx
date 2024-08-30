import React from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { Content } from '@/lib/interfaces/content.interface';

interface SidebarProps {
  contents: Content[];
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  selectedContentId: string | null;
  handleSelectContent: (id: string) => void;
  handleDelete: (id: string, trailId: string) => void;
  trailId: string;
}

const MarkdownSidebar: React.FC<SidebarProps> = ({
  contents,
  sidebarOpen,
  toggleSidebar,
  selectedContentId,
  handleSelectContent,
  handleDelete,
  trailId,
}) => {
  if (!sidebarOpen) return null;

  return (
    <>
      <Box
        className="fixed inset-0 bg-black opacity-50"
        onClick={toggleSidebar}
        style={{ zIndex: 1200 }}
      />
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
                  onClick={() => handleDelete(content._id, trailId)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemButton>
              {index < contents.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </>
  );
};

export default MarkdownSidebar;
