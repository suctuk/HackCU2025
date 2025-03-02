import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TransitionProps {
  children: React.ReactNode;
  show: boolean;
  className?: string;
}

export const FadeTransition: React.FC<TransitionProps> = ({ 
  children, 
  show, 
  className 
}) => {
  return (
    <div
      className={cn(
        "transition-opacity duration-500 ease-in-out",
        show ? "opacity-100" : "opacity-0 pointer-events-none",
        className
      )}
    >
      {children}
    </div>
  );
};

export const ScaleTransition: React.FC<TransitionProps> = ({ 
  children, 
  show, 
  className 
}) => {
  return (
    <div
      className={cn(
        "transition-all duration-500 ease-in-out",
        show ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none",
        className
      )}
    >
      {children}
    </div>
  );
};

export const SlideUpTransition: React.FC<TransitionProps> = ({ 
  children, 
  show, 
  className 
}) => {
  return (
    <div
      className={cn(
        "transition-all duration-500 ease-in-out",
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none",
        className
      )}
    >
      {children}
    </div>
  );
};

interface StaggeredChildrenProps {
  children: React.ReactNode[];
  show: boolean;
  staggerDelay?: number;
  className?: string;
}

export const StaggeredChildren: React.FC<StaggeredChildrenProps> = ({
  children,
  show,
  staggerDelay = 100,
  className,
}) => {
  const [renderedChildren, setRenderedChildren] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    setRenderedChildren([]); // Clear the previous children first
    
    if (show) {
      const childrenArray = React.Children.toArray(children);
      let timeouts: NodeJS.Timeout[] = [];

      childrenArray.forEach((child, index) => {
        const timeout = setTimeout(() => {
          setRenderedChildren(prev => [...prev, child]);
        }, index * staggerDelay);
        
        timeouts.push(timeout);
      });

      return () => {
        timeouts.forEach(timeout => clearTimeout(timeout));
      };
    }
  }, [children, show, staggerDelay]);

  return (
    <div className={className}>
      {renderedChildren.map((child, index) => (
        <SlideUpTransition key={index} show={true}>
          {child}
        </SlideUpTransition>
      ))}
    </div>
  );
};
