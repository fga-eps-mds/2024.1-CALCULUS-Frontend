'use client';

import { useState } from 'react';
import Image from 'next/image';
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
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-[#F8F3F3]">
            <Image
                className="mx-auto mb-12"
                src={calcuclusLogo}
                alt="Logo"
                width={128}
                height={128}
            />
            <h2 className="text-2xl font-bold mb-4 text-center text-black">Esqueci a Senha</h2>
            <p className="text-justify text-black font-bold">
                Enviaremos as instruções para o seu email.
            </p>
            <p className="mb-4 text-justify text-black font-bold">
                Para que você possa recuperar a sua senha.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-md">
                <input
                    type="email"
                    placeholder="Digite seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-4 p-2 border border-gray-300 rounded-md w-full text-black"
                />
                <button
                    type="submit"
                    className="bg-black text-white py-3 rounded-full hover:bg-gray-800 transition-colors w-full"
                >
                    Enviar
                </button>
                {error && <p className="text-red-500 mt-4">{error}</p>}
                {success && <p className="text-green-500 mt-4">{success}</p>}
            </form>
        </div>
    );
}
