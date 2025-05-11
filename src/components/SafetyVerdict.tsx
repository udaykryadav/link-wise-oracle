
import React from "react";
import { Shield, ShieldCheck, ShieldX, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { SafetyLevel, AnalysisResult } from "@/utils/analysisUtils";
import { Separator } from "@/components/ui/separator";

interface SafetyVerdictProps {
  result: AnalysisResult;
  url: string;
  className?: string;
}

const SafetyVerdict = ({ result, url, className }: SafetyVerdictProps) => {
  const renderSafetyIcon = () => {
    switch (result.safetyLevel) {
      case "safe":
        return <ShieldCheck className="h-8 w-8 text-emerald-500" />;
      case "warning":
        return <AlertTriangle className="h-8 w-8 text-amber-500" />;
      case "danger":
        return <ShieldX className="h-8 w-8 text-red-500" />;
      default:
        return <Shield className="h-8 w-8 text-gray-500" />;
    }
  };

  const getSafetyColorClass = () => {
    switch (result.safetyLevel) {
      case "safe":
        return "bg-emerald-50 border-emerald-200 text-emerald-800";
      case "warning":
        return "bg-amber-50 border-amber-200 text-amber-800";
      case "danger":
        return "bg-red-50 border-red-200 text-red-800";
      default:
        return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };

  const getSafetyText = () => {
    switch (result.safetyLevel) {
      case "safe":
        return "Safe to Visit";
      case "warning":
        return "Use with Caution";
      case "danger":
        return "Potentially Unsafe";
      default:
        return "Unknown Safety";
    }
  };

  return (
    <div className={cn("glass-card p-5", className)}>
      <h3 className="text-xl font-bold text-blue-800 mb-3">Safety Analysis</h3>
      
      <div className={cn("rounded-lg p-4 flex items-center gap-3 border mb-4", getSafetyColorClass())}>
        {renderSafetyIcon()}
        <div>
          <p className="font-medium">{getSafetyText()}</p>
          <p className="text-sm opacity-80">{url}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium flex items-center gap-2 mb-1">
            <Info className="h-4 w-4" />
            Website Purpose
          </h4>
          <p className="text-sm text-gray-700">{result.websiteDescription}</p>
        </div>
        
        <Separator />
        
        <div>
          <h4 className="font-medium mb-1">Security Findings</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <div className={result.isScam ? "text-red-500" : "text-emerald-500"}>
                {result.isScam ? "✖" : "✓"}
              </div>
              <span>
                {result.isScam 
                  ? "Possible scam indicators detected" 
                  : "No scam indicators detected"}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <div className={result.isLocationSharing ? "text-amber-500" : "text-emerald-500"}>
                {result.isLocationSharing ? "⚠" : "✓"}
              </div>
              <span>
                {result.isLocationSharing 
                  ? "May request location sharing" 
                  : "No location sharing detected"}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <div className={result.isAutomaticLinkSharing ? "text-amber-500" : "text-emerald-500"}>
                {result.isAutomaticLinkSharing ? "⚠" : "✓"}
              </div>
              <span>
                {result.isAutomaticLinkSharing 
                  ? "May attempt automatic link sharing" 
                  : "No automatic link sharing detected"}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SafetyVerdict;
