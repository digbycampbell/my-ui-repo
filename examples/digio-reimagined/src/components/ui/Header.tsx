import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { Button } from './Button';
import { cn } from '@/src/lib/utils';
import { LayoutDashboard, Palette, Globe, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  isLoggedIn?: boolean;
  onLoginToggle?: () => void;
  isDark?: boolean;
  onThemeToggle?: () => void;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  isLoggedIn = false, 
  onLoginToggle,
  isDark = false,
  onThemeToggle,
  className 
}) => {
  const location = useLocation();
  
  const navItems = [
    { label: 'Website', path: '/', icon: Globe },
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Style Guide', path: '/styleguide', icon: Palette },
  ];

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-500 border-b",
      isDark 
        ? "border-white/5 bg-black/70 backdrop-blur-xl" 
        : "border-slate-200/50 bg-white/70 backdrop-blur-xl",
      className
    )}>
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <Logo size="sm" variant={isDark ? 'default' : 'accent'} />
          </Link>
          
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                className={cn(
                  "px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-300",
                  location.pathname === item.path 
                    ? (isDark ? "text-white" : "text-slate-900")
                    : (isDark ? "text-slate-500 hover:text-slate-300" : "text-slate-500 hover:text-slate-900")
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={onThemeToggle}
            className={cn(
              "p-2 rounded-full transition-colors",
              isDark ? "text-slate-500 hover:text-white hover:bg-white/5" : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
            )}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {isLoggedIn && (
            <div className={cn(
              "hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-full border transition-colors",
              isDark ? "bg-slate-900 border-slate-800" : "bg-slate-50 border-slate-200"
            )}>
              <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] font-bold text-white">
                DC
              </div>
              <span className={cn("text-xs font-medium", isDark ? "text-slate-300" : "text-slate-600")}>Digby Campbell</span>
            </div>
          )}
          
          <Button 
            variant="auth" 
            size="sm" 
            isLoggedIn={isLoggedIn}
            onClick={onLoginToggle}
            className={!isDark ? "border-slate-300 text-slate-700 hover:bg-slate-100" : ""}
          >
            {isLoggedIn ? 'Sign Out' : 'Sign In'}
          </Button>
        </div>
      </div>
    </header>
  );
};
