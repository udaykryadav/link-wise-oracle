
import React from "react";
import { Cookie } from "@/utils/analysisUtils";
import { cn } from "@/lib/utils";
import { Shield, Cookie as CookieIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface CookiePermissionsProps {
  cookies: Cookie[];
  className?: string;
}

const CookiePermissions = ({ cookies, className }: CookiePermissionsProps) => {
  const necessaryCookies = cookies.filter(cookie => cookie.type === 'necessary');
  const recommendedCookies = cookies.filter(cookie => cookie.recommended && cookie.type !== 'necessary');
  const optionalCookies = cookies.filter(cookie => !cookie.recommended);
  
  const getCookieTypeColor = (type: string) => {
    switch (type) {
      case 'necessary':
        return 'bg-blue-100 text-blue-800';
      case 'preferences':
        return 'bg-purple-100 text-purple-800';
      case 'analytics':
        return 'bg-amber-100 text-amber-800';
      case 'marketing':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={cn("glass-card p-5", className)}>
      <div className="flex items-center gap-2 mb-3">
        <CookieIcon className="h-5 w-5 text-blue-700" />
        <h3 className="text-xl font-bold text-blue-800">Cookie Permissions</h3>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        Here are our recommendations for cookie permissions on this website:
      </p>
      
      {necessaryCookies.length > 0 && (
        <>
          <div className="mb-4">
            <div className="flex items-center gap-1.5 mb-2">
              <Shield className="h-4 w-4 text-blue-600" />
              <h4 className="font-medium text-blue-800">Required</h4>
            </div>
            <div className="space-y-2">
              {necessaryCookies.map((cookie, index) => (
                <div key={index} className="bg-blue-50 border border-blue-100 rounded-md p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-sm">{cookie.name}</span>
                    <Badge variant="outline" className={cn("text-xs", getCookieTypeColor(cookie.type))}>
                      {cookie.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600">{cookie.purpose}</p>
                </div>
              ))}
            </div>
          </div>
          <Separator className="my-4" />
        </>
      )}
      
      {recommendedCookies.length > 0 && (
        <>
          <div className="mb-4">
            <h4 className="font-medium mb-2 text-blue-800">Recommended</h4>
            <div className="space-y-2">
              {recommendedCookies.map((cookie, index) => (
                <div key={index} className="bg-gray-50 border border-gray-200 rounded-md p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-sm">{cookie.name}</span>
                    <Badge variant="outline" className={cn("text-xs", getCookieTypeColor(cookie.type))}>
                      {cookie.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600">{cookie.purpose}</p>
                </div>
              ))}
            </div>
          </div>
          <Separator className="my-4" />
        </>
      )}
      
      {optionalCookies.length > 0 && (
        <div className="mb-2">
          <h4 className="font-medium mb-2 text-blue-800">Optional (Safe to Decline)</h4>
          <div className="space-y-2">
            {optionalCookies.map((cookie, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-md p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-sm">{cookie.name}</span>
                  <Badge variant="outline" className={cn("text-xs", getCookieTypeColor(cookie.type))}>
                    {cookie.type}
                  </Badge>
                </div>
                <p className="text-xs text-gray-600">{cookie.purpose}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CookiePermissions;
