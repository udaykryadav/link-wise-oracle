
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { LogOut, User } from "lucide-react";

const UserProfile = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out",
        description: "You've been successfully logged out.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="hidden sm:flex items-center gap-2 text-blue-900">
        <User className="h-4 w-4" />
        <span className="text-sm">{currentUser?.email}</span>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={handleLogout}
        className="text-blue-800"
      >
        <LogOut className="h-4 w-4 mr-1" />
        <span className="hidden sm:inline">Logout</span>
      </Button>
    </div>
  );
};

export default UserProfile;
