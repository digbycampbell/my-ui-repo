import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'white' | 'accent';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className, 
  size = 'md', 
  variant = 'default',
  showText = true 
}) => {
  const sizeMap = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-12',
    xl: 'h-16'
  };

  const colorMap = {
    default: 'text-cyan-400',
    white: 'text-white',
    accent: 'text-cyan-600' // Darker for light mode
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <motion.div 
        className={cn("relative flex items-center justify-center", sizeMap[size])}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Geometric "D" Icon */}
        <svg 
          viewBox="0 0 100 100" 
          className={cn("h-full w-auto fill-current transition-colors duration-500", colorMap[variant])}
        >
          {/* Minimalist "D" */}
          <path 
            d="M30,20 L60,20 C80,20 85,35 85,50 C85,65 80,80 60,80 L30,80 Z" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="8" 
            strokeLinejoin="round"
          />
          {/* Electrical Transient Impulse */}
          <motion.path 
            d="M30,50 L45,50 L47,30 L50,70 L53,40 L56,60 L60,50 L75,50" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              repeatType: "loop",
              ease: "easeInOut",
              repeatDelay: 1
            }}
          />
        </svg>
      </motion.div>
      
      {showText && (
        <span className={cn(
          "font-display font-bold tracking-tight transition-colors duration-300",
          size === 'sm' ? 'text-lg' : size === 'md' ? 'text-2xl' : 'text-4xl',
          variant === 'white' ? 'text-white' : 'text-slate-900 dark:text-slate-50'
        )}>
          Digio<span className={cn(variant === 'accent' ? "text-cyan-600" : "text-cyan-400")}>.</span>
        </span>
      )}
    </div>
  );
};
