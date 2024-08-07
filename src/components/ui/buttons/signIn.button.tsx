import { useSession } from 'next-auth/react';
import MyButton from './myButton.component';
const SignInButton = () => {
  const { data: session } = useSession();

  if (session && session.user)
    return (
      <MyButton type="button" color='white'>
        Sign In
      </MyButton>
    );
};

export default SignInButton;
