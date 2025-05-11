
import React, { useState } from "react";
import LinkAnalyzer from "@/components/LinkAnalyzer";
import SafetyVerdict from "@/components/SafetyVerdict";
import CookiePermissions from "@/components/CookiePermissions";
import ChatInterface from "@/components/ChatInterface";
import { Shield } from "lucide-react";
import { AnalysisResult } from "@/utils/analysisUtils";

const Index = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [analyzedUrl, setAnalyzedUrl] = useState<string>("");

  const handleAnalysisComplete = (result: AnalysisResult, url: string) => {
    setAnalysisResult(result);
    setAnalyzedUrl(url);
    
    // Scroll to results if any
    if (result) {
      const resultsSection = document.getElementById("results-section");
      resultsSection?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-slate-100">
      {/* Hero Section */}
      <header className="pt-16 pb-12 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="mb-4 flex justify-center">
            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
              <Shield className="h-8 w-8 text-blue-700" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Link Wise Oracle</h1>
          <p className="text-xl text-gray-600 mb-6">
            AI-powered website analysis to ensure your online safety
          </p>
          <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-sm">
            <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
            <span className="text-blue-800">We respect your privacy - no data stored</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-6xl px-4 pb-16">
        {/* Link Input Section */}
        <section className="max-w-3xl mx-auto mb-10">
          <LinkAnalyzer onAnalysisComplete={handleAnalysisComplete} />
        </section>
        
        {/* Results Section */}
        {analysisResult && (
          <section id="results-section" className="animation-fade-in">
            <h2 className="text-2xl font-bold text-center text-blue-900 mb-8">Analysis Results</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left sidebar with Safety and Cookie Info */}
              <div className="md:col-span-1 space-y-6">
                <SafetyVerdict result={analysisResult} url={analyzedUrl} />
                <CookiePermissions cookies={analysisResult.cookiePermissions} />
              </div>
              
              {/* Chat Interface */}
              <div className="md:col-span-2 h-[600px]">
                <ChatInterface url={analyzedUrl} className="h-full" />
              </div>
            </div>
          </section>
        )}
        
        {/* How It Works Section */}
        {!analysisResult && (
          <section className="max-w-4xl mx-auto mt-16">
            <h2 className="text-2xl font-bold text-center text-blue-900 mb-8">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card p-6 text-center">
                <div className="bg-blue-100 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-700 font-bold text-xl">1</span>
                </div>
                <h3 className="font-medium text-lg mb-2">Analyze a Website</h3>
                <p className="text-gray-600 text-sm">
                  Enter any website URL and our AI will analyze it for safety concerns and features.
                </p>
              </div>
              
              <div className="glass-card p-6 text-center">
                <div className="bg-blue-100 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-700 font-bold text-xl">2</span>
                </div>
                <h3 className="font-medium text-lg mb-2">Get Safety Assessment</h3>
                <p className="text-gray-600 text-sm">
                  View security analysis and recommended cookie permissions to protect your privacy.
                </p>
              </div>
              
              <div className="glass-card p-6 text-center">
                <div className="bg-blue-100 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-700 font-bold text-xl">3</span>
                </div>
                <h3 className="font-medium text-lg mb-2">Ask Questions</h3>
                <p className="text-gray-600 text-sm">
                  Chat with our AI to learn more about the website's purpose, content, and trustworthiness.
                </p>
              </div>
            </div>
          </section>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-blue-900 text-blue-100 py-8 px-4">
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

export default Index;
