
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Send, MessageCircle } from "lucide-react";
import { askQuestionAboutWebsite } from "@/utils/analysisUtils";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/sonner";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatInterfaceProps {
  url: string;
  className?: string;
}

const ChatInterface = ({ url, className }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 0, 
      text: "Hello! I've analyzed this website for you. What would you like to know about it?", 
      isUser: false, 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage: Message = {
      id: messages.length,
      text: input,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      const response = await askQuestionAboutWebsite(url, input);
      
      const botMessage: Message = {
        id: messages.length + 1,
        text: response,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error getting answer:", error);
      toast.error("Failed to get an answer. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={cn("glass-card flex flex-col h-full overflow-hidden", className)}>
      <div className="flex items-center p-4 border-b border-gray-200 bg-blue-50">
        <MessageCircle className="h-5 w-5 text-blue-700 mr-2" />
        <h3 className="text-lg font-medium text-blue-800">Ask about this website</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.isUser ? "justify-end" : "justify-start"
              )}
            >
              <Card className={cn(
                "max-w-[80%]",
                message.isUser 
                  ? "bg-blue-600 text-white border-blue-700" 
                  : "bg-gray-100 border-gray-200"
              )}>
                <CardContent className="p-3">
                  <p className={cn(
                    "text-sm",
                    message.isUser ? "text-white" : "text-gray-800"
                  )}>
                    {message.text}
                  </p>
                  <div className={cn(
                    "text-[10px] mt-1 text-right",
                    message.isUser ? "text-blue-100" : "text-gray-500"
                  )}>
                    {formatTime(message.timestamp)}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <Card className="max-w-[80%] bg-gray-100 border-gray-200">
                <CardContent className="p-3">
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
                    <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your question about this website..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSend} 
            disabled={!input.trim() || isLoading}
            size="icon"
            className="gradient-blue"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
