import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import React, {useState, useRef} from 'react';
import MarkdownEditor from '../../../src/app/studio/page';
'use client';

jest.mock('react-markdown', () => () => <div>Mocked Markdown</div>);
jest.mock('rehype-katex', () => jest.fn());
jest.mock('remark-gfm', () => jest.fn());
jest.mock('remark-math', () => jest.fn());

describe('MardownEditor', () => {
    it('renders the Mark Down Editor', () => {
        render(<MarkdownEditor/>);

        expect(screen.getByRole('button', {name:"Imagem"})).toBeInTheDocument();

        expect(screen.getByRole('button', { name:"Negrito"})).toBeInTheDocument();

        expect(screen.getByRole('button', { name:"Itálico"})).toBeInTheDocument();

        expect(screen.getByRole('button', { name:"Título"})).toBeInTheDocument();

        expect(screen.getByRole('button', { name:"Lista"})).toBeInTheDocument();

        expect(screen.getByRole('button', { name:"LaTeX"})).toBeInTheDocument();

        expect(screen.getByRole('button', { name:"Salvar"})).toBeInTheDocument();
    })


    // negrito
    it('Negrito button should work', () =>{
        render(<MarkdownEditor />);
  
        
        const textareaRef = screen.getByRole('textbox');
        fireEvent.change(textareaRef, { target: { value: 'Title, bold, italic' } });
        
        
        const negrito = screen.getByRole('button', { name:"Negrito"});
        textareaRef.setSelectionRange(7, 11);
        fireEvent.click(negrito);
        expect(textareaRef).toHaveValue('Title, **bold**, italic');
    })


    // italico
    it('Italico button should work', () =>{
        render(<MarkdownEditor />);
        const textareaRef = screen.getByRole('textbox');
        fireEvent.change(textareaRef, { target: { value: 'Title, bold, italic' } });
        
        const italic = screen.getByRole('button', { name:"Itálico"});
        textareaRef.setSelectionRange(13, 19);
        fireEvent.click(italic);

        expect(textareaRef).toHaveValue(`Title, bold, *italic*`);
    })

    // Título
    it('Title button should work', () =>{
        render(<MarkdownEditor />);
        const textareaRef = screen.getByRole('textbox');
        fireEvent.change(textareaRef, { target: { value: 'Title, bold, italic' } });
        
        
        textareaRef.setSelectionRange(0, 5);
        const title = screen.getByRole('button', { name:"Título"});
        fireEvent.click(title);
        expect(textareaRef).toHaveValue(
`# Title
, bold, italic`);
    })

    // Lista
    it('Lista button should work', () =>{
        render(<MarkdownEditor />);
        const textareaRef = screen.getByRole('textbox');
        fireEvent.change(textareaRef, { target: { value: 
`Title,
bold,
italic` } });

        textareaRef.setSelectionRange(0, 19);
        const title = screen.getByRole('button', { name:"Lista"});
        fireEvent.click(title);
        expect(textareaRef).toHaveValue(
`- Title,
bold,
italic
`);
    })

    it('Latex button should work', () =>{
        render(<MarkdownEditor />);
        const textareaRef = screen.getByRole('textbox');
        fireEvent.change(textareaRef, { target: { value: 
`Title,
bold,
italic` } });
        
        // LaTex
        textareaRef.setSelectionRange(0, 19);
        const title = screen.getByRole('button', { name:"LaTeX"});
        fireEvent.click(title);
        expect(textareaRef).toHaveValue(
`$$
Title,
bold,
italic
$$
`);
    })

    it('get the URL of the image and render image', () =>{
        global.prompt = jest.fn().mockReturnValue(
'https://i0.wp.com/thecaninebuddy.com/wp-content/uploads/2021/08/crying-cat-meme.jpg?resize=1024%2C576&ssl=1'
        );

        render(<MarkdownEditor />);
        

        const image = screen.getByRole('button', {name:"Imagem"});
        
        const textareaRef = screen.getByRole('textbox');

        fireEvent.click(image);


        expect(textareaRef).toHaveValue(
"![Descrição da imagem](https://i0.wp.com/thecaninebuddy.com/wp-content/uploads/2021/08/crying-cat-meme.jpg?resize=1024%2C576&ssl=1)"
        )

    })
})


