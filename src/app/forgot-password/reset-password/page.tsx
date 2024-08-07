'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Box, TextField, Button, IconButton, InputAdornment, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import calculusLogos from '@/public/calculus-logo.svg';

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

        // routes logic....
    };

    return (
        <Box className="flex flex-col items-center justify-center min-h-screen py-2 bg-[#F8F3F3] text-black">
            <Image
                className="mx-auto mb-12"
                src={calculusLogos}
                alt="Logo"
                width={128}
                height={128}
            />
            <h2 className="text-4xl font-bold mb-8 text-center">Redefinir Senha</h2>
            <Box
                component="form"
                onSubmit={handleSubmit}
                className="flex flex-col items-center w-full max-w-md"
            >
                <TextField
                    type={showNewPassword ? 'text' : 'password'}
                    label="Nova senha"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    variant="outlined"
                    fullWidth
                    className="mb-4"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    edge="end"
                                >
                                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    type={showConfirmPassword ? 'text' : 'password'}
                    label="Confirmar nova senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    variant="outlined"
                    fullWidth
                    className="mb-4"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    edge="end"
                                >
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
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
