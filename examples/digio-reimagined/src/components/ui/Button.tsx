import React from 'react';
import { motion } from 'motion/react';
import { Lock, LogIn, LogOut, ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'locked' | 'auth';
  size?: 'sm' | 'md' | 'lg';
  isLocked?: boolean;
  isLoggedIn?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'primary',
  size = 'md',
  isLocked = false,
  isLoggedIn = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-400/50 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";
  
  const sizeStyles = {
    sm: "px-4 py-1.5 text-sm gap-1.5",
    md: "px-6 py-2.5 text-base gap-2",
    lg: "px-10 py-4 text-lg gap-3"
  };

  const variants = {
    primary: "bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-black dark:hover:bg-slate-100",
    secondary: "bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-white/20",
    outline: "border border-slate-200 dark:border-white/20 bg-transparent text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-white/5",
    ghost: "bg-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5",
    locked: "bg-slate-50 dark:bg-white/5 text-slate-400 dark:text-slate-600 border border-slate-100 dark:border-white/5 cursor-not-allowed",
    auth: isLoggedIn 
      ? "bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/20"
      : "bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-black dark:hover:bg-slate-100"
  };

  const currentVariant = isLocked ? 'locked' : variant;

  return (
    <motion.button
      whileHover={!isLocked && !props.disabled ? { y: -1 } : {}}
      whileTap={!isLocked && !props.disabled ? { scale: 0.98 } : {}}
      className={cn(baseStyles, sizeStyles[size], variants[currentVariant], className)}
      disabled={isLocked || isLoading || props.disabled}
      {...props}
    >
      {isLocked && <Lock className="w-4 h-4" />}
      {variant === 'auth' && (
        isLoggedIn ? <LogOut className="w-4 h-4" /> : <LogIn className="w-4 h-4" />
      )}
      {!isLocked && leftIcon}
      
      <span className="relative">
        {children}
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </span>
        )}
      </span>

      {!isLocked && rightIcon}
      {variant === 'primary' && !rightIcon && !isLocked && <ChevronRight className="w-4 h-4 opacity-50" />}
    </motion.button>
  );
};
