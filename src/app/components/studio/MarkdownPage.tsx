"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Box, AppBar, Toolbar } from '@mui/material';
import MarkdownToolbar from './MarkdownToolbar';
import MarkdownSidebar from './MarkdownSidebar';
import MarkdownEditor from './MarkdownEditor';
import MarkdownPreview from './MarkdownPreview';
import useMarkdownEditor from './hooks/useMarkdownEditor';
import { fetchContents } from './utils/api';

export interface Content {
  _id: string;
  title: string;
  body: string;
  user: string;
}

const MarkdownPage: React.FC = () => {
  const {
    markdown,
    setMarkdown,
    sidebarOpen,
    setSidebarOpen,
    contents,
    selectedContentId,
    textareaRef,
    toggleSidebar,
    handleChange,
    insertTextAtSelection,
    insertImage,
    handleSave,
    handleDelete,
    handleSelectContent,
  } = useMarkdownEditor();

  useEffect(() => {
    fetchContents();
  }, []);

  const handleInsertTextAtSelection = (before: string, after: string, defaultText: string) => {
    insertTextAtSelection(textareaRef, markdown, setMarkdown, before, after, defaultText);
  };

  return (
    <Box className="relative flex flex-col h-screen">
      <AppBar position="static" className="bg-[#f8f3f3] border-b border-[#D9D9D9]">
        <Toolbar className="flex justify-between items-center">
          <MarkdownToolbar
            toggleSidebar={toggleSidebar}
            insertTextAtSelection={handleInsertTextAtSelection}
            insertImage={insertImage}
            handleSave={handleSave}
          />
        </Toolbar>
      </AppBar>
      <Box className="relative flex flex-1 h-full">
        <MarkdownSidebar
          contents={contents}
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          selectedContentId={selectedContentId}
          handleSelectContent={handleSelectContent}
          handleDelete={handleDelete}
        />
        <Box className="editor flex-1 flex bg-[#FFFAFA] border-r border-[#E0E0E0] relative">
          <MarkdownEditor markdown={markdown} handleChange={handleChange} textareaRef={textareaRef} />
        </Box>
        <Box className="preview flex-1 overflow-y-auto p-4 bg-white">
          <MarkdownPreview markdown={markdown} />
        </Box>
      </Box>
    </Box>
  );
};

export default MarkdownPage;
