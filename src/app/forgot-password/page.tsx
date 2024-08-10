'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Box, TextField, Button, Alert } from '@mui/material';
import calcuclusLogo from '@/public/calculus-logo.svg';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setError('Por favor, digite um email válido!');
            setSuccess('');
            return;
        }

        setError('');
        setSuccess('Email enviado com sucesso!');
        console.log('Email enviado: ', email);
    };

    return (
        <Box className="flex flex-col items-center justify-center min-h-screen py-2 bg-[#F8F3F3]">
            <Image
                src={calcuclusLogo}
                alt="Logo"
                width={128}
                height={128}
                className="mx-auto mb-12"
            />
            <h2 className="text-2xl font-bold mb-4 text-center text-black">Esqueci a Senha</h2>
            <p className="text-justify text-black font-bold">
                Enviaremos as instruções para o seu email.
            </p>
            <p className="mb-4 text-justify text-black font-bold">
                Para que você possa recuperar a sua senha.
            </p>
            <Box
                component="form"
                onSubmit={handleSubmit}
                className="flex flex-col items-center w-full max-w-md"
            >
                <TextField
                    type="email"
                    label="Digite seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                    fullWidth
                    className="mb-4 w-full text-black"
                />
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    className="bg-black text-white py-3 rounded-full hover:bg-gray-800 transition-colors w-full"
                >
                    Enviar
                </Button>
                {error && (
                    <Alert severity="error" className="mt-4">
                        {error}
                    </Alert>
                )}
                {success && (
                    <Alert severity="success" className="mt-4">
                        {success}
                    </Alert>
                )}
            </Box>
        </Box>
    );
}
