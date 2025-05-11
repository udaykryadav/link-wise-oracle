
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Shield } from "lucide-react";

type FormMode = "login" | "register" | "reset";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mode, setMode] = useState<FormMode>("login");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn, signUp, resetPassword } = useAuth();

  const switchMode = (newMode: FormMode) => {
    setMode(newMode);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (mode === "register") {
        if (password !== confirmPassword) {
          toast({
            title: "Passwords don't match",
            description: "Please make sure your passwords match.",
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }

        await signUp(email, password);
        toast({
          title: "Account created!",
          description: "You've successfully registered.",
        });
      } else if (mode === "login") {
        await signIn(email, password);
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in.",
        });
      } else if (mode === "reset") {
        await resetPassword(email);
        toast({
          title: "Check your email",
          description: "We've sent a password reset link to your email.",
        });
        switchMode("login");
      }
    } catch (error: any) {
      const errorMessage = error.message || "An error occurred";
      toast({
        title: "Authentication error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-card w-full max-w-md mx-auto p-6">
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center">
            <Shield className="h-7 w-7 text-blue-700" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-blue-900">
          {mode === "login" ? "Welcome Back" : mode === "register" ? "Create Account" : "Reset Password"}
        </h2>
        <p className="text-gray-600 mt-2">
          {mode === "login"
            ? "Sign in to access Link Wise Oracle"
            : mode === "register"
              ? "Join us to analyze websites safely"
              : "Enter your email to reset your password"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {mode !== "reset" && (
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        )}

        {mode === "register" && (
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting 
            ? "Processing..." 
            : mode === "login" 
              ? "Sign In" 
              : mode === "register" 
                ? "Create Account" 
                : "Send Reset Link"}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        {mode === "login" ? (
          <>
            <p className="mb-2">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => switchMode("register")}
                className="text-blue-700 hover:underline"
              >
                Sign up
              </button>
            </p>
            <button
              type="button"
              onClick={() => switchMode("reset")}
              className="text-blue-700 hover:underline"
            >
              Forgot password?
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => switchMode("login")}
            className="text-blue-700 hover:underline"
          >
            Back to login
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
