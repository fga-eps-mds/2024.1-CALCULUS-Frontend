'use client';

import { signIn, signOut } from "@/auth";
import { userSignOut } from "@/services/user.service";
import { Button } from "@mui/material";


export function SignOutButton() {
    const handle = () => {
        userSignOut()
    };
    
    return (
        <Button
          onClick={handle}>
          Sair daqui
        </Button>
    );
}