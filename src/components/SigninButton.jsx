import { LoaderCircle } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";


const SigninButton = () => {

    const [loading, setLoading] = useState(false);

    return (
        <button
            className="bg-red-600 flex justify-center items-center gap-2 text-white px-4 font-semibold hover:bg-red-500 py-2 rounded-lg shadow-sm text-nowrap"
            title="Sign in to post comment"
            aria-label="sign in"
            onClick={() => {signIn("google"); setLoading(true);}}
        >
            {loading && (<LoaderCircle width={20} className="animate-spin ml-[-2px]" />)} Sign In
        </button>
    );
};

export default SigninButton;
