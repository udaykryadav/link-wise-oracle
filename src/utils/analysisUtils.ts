
// Mock functions for now - would connect to real APIs in production
export type SafetyLevel = 'safe' | 'warning' | 'danger' | 'unknown';
export type CookieType = 'necessary' | 'preferences' | 'analytics' | 'marketing' | 'other';

export interface Cookie {
  name: string;
  type: CookieType;
  purpose: string;
  recommended: boolean;
}

export interface AnalysisResult {
  safetyLevel: SafetyLevel;
  websiteDescription: string;
  safetySummary: string;
  cookiePermissions: Cookie[];
  isLocationSharing: boolean;
  isAutomaticLinkSharing: boolean;
  isScam: boolean;
}

// Simulates API call to analyze a link
export const analyzeLink = async (url: string): Promise<AnalysisResult> => {
  // In a real implementation, this would call an API or backend service
  // For now we're simulating a delay and returning mock data
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Sample mockup data - in reality this would come from AI analysis
  return {
    safetyLevel: Math.random() > 0.7 ? 'warning' : 'safe',
    websiteDescription: "This appears to be an e-commerce website selling technology products. It has product listings, shopping cart functionality, and user reviews.",
    safetySummary: "The website appears legitimate and uses standard encryption for data transfer. No malicious scripts detected.",
    cookiePermissions: [
      { 
        name: "Essential cookies", 
        type: "necessary", 
        purpose: "These cookies are required for the website to function properly.", 
        recommended: true 
      },
      { 
        name: "Preference cookies", 
        type: "preferences", 
        purpose: "These cookies remember your preferences on the website.", 
        recommended: true 
      },
      { 
        name: "Analytics cookies", 
        type: "analytics", 
        purpose: "These cookies help the website owner understand how visitors interact with the website.", 
        recommended: false 
      },
      { 
        name: "Marketing cookies", 
        type: "marketing", 
        purpose: "These cookies track you across websites to display relevant advertisements.", 
        recommended: false 
      }
    ],
    isLocationSharing: Math.random() > 0.8,
    isAutomaticLinkSharing: Math.random() > 0.9,
    isScam: Math.random() > 0.95,
  };
};

// Function to simulate asking questions about the website
export const askQuestionAboutWebsite = async (url: string, question: string): Promise<string> => {
  // In a real implementation, this would use an AI service like GPT
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const responses = [
    "Based on my analysis, this website primarily sells electronic products with a focus on smartphones and laptops.",
    "The website appears to use secure payment processing and has SSL encryption for customer data protection.",
    "This site has a privacy policy that states they collect user browsing data for personalized marketing.",
    "The website was created in 2018 according to WHOIS data and is registered to a legitimate business entity.",
    "Customer reviews on independent platforms suggest this is a legitimate business with reliable shipping.",
    "The website uses cookies primarily for session management, cart functionality, and analytics."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};
