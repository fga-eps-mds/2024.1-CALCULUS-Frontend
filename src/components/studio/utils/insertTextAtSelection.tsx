export const insertTextAtSelection = (
  textareaRef: React.RefObject<HTMLTextAreaElement>,
  markdown: string,
  setMarkdown: (value: string) => void,
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
