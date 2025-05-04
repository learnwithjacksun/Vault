import { ThemeToggle } from "@/Components/UI";
import { CircleCheck, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="fixed top-8 right-8">
        <ThemeToggle />
      </div>

      <div className="layout mt-20">
        <div className="flex items-center justify-center gap-2">
          <Shield size={32} strokeWidth={3} className="text-primary" />
          <h3 className="text-2xl font-bold font-sora">Quest Vault</h3>
        </div>

        <div className="text-center mt-10 w-full">
          <span className="bg-secondary p-2 px-3 rounded-full border border-line text-muted text-sm">
            🔐 Secure, Simple, Portable
          </span>
          <h1 className="text-4xl capitalize inline-flex md:text-6xl mt-4 font-sora font-bold gradient-text">
            Your private vault for sensitive information
          </h1>
        </div>

        <div className="text-left center">
          <ul className="text-left text-sm text-muted mt-4 space-y-2">
            <li className="flex items-center gap-2">
              <CircleCheck size={20} className="text-green-600" />
              Store NIN, BVN,passwords, etc.
            </li>
            <li className="flex items-center gap-2">
              <CircleCheck size={20} className="text-green-600" />
              Protected by end-to-end encryption
            </li>
            <li className="flex items-center gap-2">
              <CircleCheck size={20} className="text-green-600" />
              Login with email OTP
            </li>
            <li className="flex items-center gap-2">
              <CircleCheck size={20} className="text-green-600" />
              Only you can view your data
            </li>
          </ul>
        </div>

        <div className="center flex-col gap-2 border-t border-line pt-4 space-y-4 mt-10 pb-10">
          <p>Are you a new user?</p>
          <div className="flex items-center gap-2 md:flex-row flex-col">
            <Link
              to="/new"
              className="btn-primary btn text-secondary min-w-[200px] py-3 rounded-lg"
            >
              Yes, Create Vault
            </Link>
            <Link
              to="/login"
              className="bg-secondary btn text-main min-w-[200px] py-3 rounded-lg"
            >
              No, Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
