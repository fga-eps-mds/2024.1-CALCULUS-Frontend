'use client';

import { useState } from 'react';
import Image from 'next/image';
import calculusLogos from '@/public/calculus-logo.svg';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function ResetPassword() {

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword.length < 8) {
            setError('A senha deve ter pelo menos 8 caracteres');
            setSuccess('');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('As senhas não coincidem.');
            setSuccess('');
            return;
        }

        setError('');
        setSuccess('Senha redefinida com sucesso!');

        // lógica do back aqui
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-[#F8F3F3] text-black">
            <Image
                className="mx-auto mb-12"
                src={calculusLogos}
                alt="Logo"
                width={128}
                height={128}
            />
            <h2 className="text-4xl font-bold mb-8 text-center">Redefinir Senha</h2>
            <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-md">
                <div className="relative mb-4 w-full">
                    <input
                        type={showNewPassword ? 'text' : 'password'}
                        placeholder="Nova senha"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md w-full"
                    />
                    <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
                    >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </button>
                </div>
                <div className="relative mb-4 w-full">
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirmar nova senha"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md w-full"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
                    >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </button>
                </div>
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
