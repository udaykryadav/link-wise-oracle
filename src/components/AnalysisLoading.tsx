
import React from "react";
import { cn } from "@/lib/utils";

interface AnalysisLoadingProps {
  className?: string;
}

const AnalysisLoading = ({ className }: AnalysisLoadingProps) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-6", className)}>
      <div className="relative flex items-center justify-center mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-blue-200 opacity-25"></div>
        <div className="animate-spin absolute inset-[4px] border-t-4 border-blue-600 rounded-full"></div>
        <div className="absolute flex items-center justify-center">
          <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" />
          </svg>
        </div>
      </div>
      <div className="space-y-2 text-center">
        <h3 className="text-lg font-medium text-blue-800">Analyzing Website</h3>
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
          <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
        <p className="text-sm text-muted-foreground">Checking for security issues, analyzing content and cookie policies...</p>
      </div>
    </div>
  );
};

export default AnalysisLoading;
