
import React, { useState, useEffect } from "react";
import { FadeTransition } from "./Transition";
import { cn } from "@/lib/utils";

interface LoadingScreenProps {
  onLoadComplete: () => void;
  className?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  onLoadComplete,
  className 
}) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate loading with incremental progress
    let interval: NodeJS.Timeout;
    
    const simulateProgress = () => {
      interval = setInterval(() => {
        setProgress(prev => {
          // Slow down progress as it approaches 100%
          const increment = Math.max(0.5, (100 - prev) / 20);
          const newProgress = Math.min(100, prev + increment);
          
          // When reaching 100%, trigger the fade-out and completion
          if (newProgress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setIsVisible(false);
              setTimeout(onLoadComplete, 500); // Wait for fade animation to complete
            }, 500);
          }
          
          return newProgress;
        });
      }, 50);
    };

    // Start after a short delay for better visual effect
    setTimeout(simulateProgress, 300);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [onLoadComplete]);

  return (
    <FadeTransition show={isVisible} className={cn("fixed inset-0 z-50 flex flex-col items-center justify-center bg-background", className)}>
      <div className="w-full max-w-md px-6 flex flex-col items-center">
        <div className="mb-8 relative">
          <div className="w-24 h-24 rounded-full bg-sleep-100 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-sleep-300/20 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-sleep-300/30 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-sleep-300 flex items-center justify-center text-white">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="animate-pulse"
                  >
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-sleep-300 rounded-full opacity-20 animate-ping"></div>
        </div>
        
        <h2 className="text-2xl font-semibold text-sleep-900 mb-2">Preparing your sleep dashboard</h2>
        <p className="text-sleep-700 mb-6 text-center">
          Loading your personalized sleep solution...
        </p>
        
        <div className="w-full h-2 bg-sleep-100 rounded-full overflow-hidden mb-2">
          <div 
            className="h-full bg-sleep-300 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-sleep-500 text-sm">{Math.round(progress)}%</p>
      </div>
    </FadeTransition>
  );
};

export default LoadingScreen;
