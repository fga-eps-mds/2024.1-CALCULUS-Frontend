'use server';
import { signIn } from "@/auth";

export async function signInEmailPassword(data: any) {
    return await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
    });
}

export async function authGoogle(data: any) {
    return await signIn('google');
}