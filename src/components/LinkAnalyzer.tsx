
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { analyzeLink } from "@/utils/analysisUtils";
import AnalysisLoading from "./AnalysisLoading";
import { toast } from "@/components/ui/sonner";

interface LinkAnalyzerProps {
  onAnalysisComplete: (result: any, url: string) => void;
}

const LinkAnalyzer = ({ onAnalysisComplete }: LinkAnalyzerProps) => {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleAnalyze = async () => {
    if (!url) {
      toast.error("Please enter a URL to analyze");
      return;
    }
    
    // Add http if not present
    let processedUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      processedUrl = 'https://' + url;
    }
    
    if (!isValidUrl(processedUrl)) {
      toast.error("Please enter a valid URL");
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      const result = await analyzeLink(processedUrl);
      onAnalysisComplete(result, processedUrl);
    } catch (error) {
      console.error("Error analyzing link:", error);
      toast.error("Failed to analyze the website. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-full p-6 glass-card">
      <h2 className="text-xl font-bold text-blue-800 mb-4">Link Wise Oracle</h2>
      <p className="text-gray-600 mb-4">
        Enter a website URL to analyze its safety, cookie policy, and get AI-powered insights.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          placeholder="Enter website URL (e.g., example.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-grow border-blue-200 focus-visible:ring-blue-500"
          disabled={isAnalyzing}
        />
        <Button 
          onClick={handleAnalyze} 
          disabled={isAnalyzing}
          className="gradient-blue"
        >
          Analyze Website
        </Button>
      </div>
      
      {isAnalyzing && (
        <AnalysisLoading className="mt-6" />
      )}
    </div>
  );
};

export default LinkAnalyzer;
