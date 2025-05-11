
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import AuthForm from "@/components/auth/AuthForm";
import { Shield } from "lucide-react";

const Auth = () => {
  const { currentUser } = useAuth();

  // If user is already logged in, redirect to home
  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-slate-100 flex flex-col">
      {/* Hero Section */}
      <header className="pt-10 pb-8 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="mb-3 flex justify-center">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Shield className="h-6 w-6 text-blue-700" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-blue-900 mb-2">Link Wise Oracle</h1>
          <p className="text-lg text-gray-600">
            AI-powered website analysis to ensure your online safety
          </p>
        </div>
      </header>

      {/* Auth Form */}
      <main className="flex-1 flex items-center justify-center px-4 pb-10">
        <AuthForm />
      </main>
      
      {/* Footer */}
      <footer className="bg-blue-900 text-blue-100 py-6 px-4">
        <div className="container mx-auto max-w-6xl text-center text-sm">
          <p>Link Wise Oracle • AI-powered website analysis</p>
          <p className="mt-2 text-blue-300 text-xs">
            For educational purposes only. Analysis provides guidance but cannot guarantee complete security.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Auth;
