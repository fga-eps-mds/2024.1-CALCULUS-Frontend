import { useSession } from "next-auth/react";


const SignInButton = () => {
    const { data: session } = useSession();

    if (session && session.user)
        return (
            <button
                type="button"
                className="btn-custom"
            >
                Sign In
            </button>
        );
};

export default SignInButton;