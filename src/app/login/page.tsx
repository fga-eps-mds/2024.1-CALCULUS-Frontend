import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import {
  GoogleSignInButton,
} from '../components/authButtons';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { CredentialsForm } from '../components/credentialsForm';

export default async function SignInPage() {
  const session = await getServerSession(authOptions);
  console.log('Session: ', session);

  if (session) return redirect('/home');

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center mt-10 p-10 shadow-md">
        <h1 className="mt-10 mb-4 text-4xl font-bold">Sign In</h1>
        <GoogleSignInButton />
        <span className="text-2xl font-semibold text-white text-center mt-8">
          Or
        </span>
        <CredentialsForm />
      </div>
    </div>
  );
}
