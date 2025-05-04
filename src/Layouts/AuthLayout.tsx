import { Header } from "@/Components/Auth";
import React from "react";

interface AuthLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const AuthLayout = ({ title, description, children }: AuthLayoutProps) => {
  return (
    <>
      <Header />
      <main className="w-[90%] md:w-[480px] mx-auto py-4 pb-16">
        <div className="border-b border-line pb-4 mb-4">
          <h1 className="text-2xl font-bold gradient-text font-sora">
            {title}
          </h1>
          <p className="text-muted text-sm">{description}</p>
        </div>
        {children}
        <p className="text-sm text-muted text-center mt-6">
          Secure with <span className="font-bold text-yellow-500">AES-256</span>{" "}
          encryption and stored on your device
        </p>
      </main>
    </>
  );
};

export default AuthLayout;
