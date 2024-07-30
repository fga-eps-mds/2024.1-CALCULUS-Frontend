'use client';

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'

export default function OAuth() {
    const session = useSession();
    const [authenticated, setAuthenticated] = useState(false);
    const [message, setMessage] = useState("Carregando...");
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    useEffect(() => {
      if (token && !authenticated) {
        signIn('credentials', {token})
        setMessage("Login efetuado com sucesso! redirecionando");
        setAuthenticated(true);
        setTimeout(() => {}, 1000);
        window.location.href = '/home';
      }
    }, [token]);
    return (<>
      <p>{message}</p>
    </>);
}
