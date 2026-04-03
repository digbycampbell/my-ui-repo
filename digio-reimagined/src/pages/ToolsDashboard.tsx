import React from 'react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/Button';
import { TOOL_THEMES } from '@/src/lib/design-system';
import { 
  Users, 
  Receipt, 
  Zap, 
  Settings, 
  Search, 
  Bell, 
  Plus, 
  ExternalLink, 
  Lock,
  ArrowUpRight,
  TrendingUp,
  Clock,
  Calendar
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const ToolsDashboard: React.FC = () => {
  const tools = [
    {
      id: 'kereone',
      name: 'Kereone Roster',
      desc: 'External workforce management and scheduling system.',
      theme: TOOL_THEMES.kereone,
      status: 'Active',
      users: 124,
      lastUpdate: '2h ago'
    },
    {
      id: 'receipts',
      name: 'Digio Receipts',
      desc: 'Internal expense tracking and digital receipt management.',
      theme: TOOL_THEMES.receipts,
      status: 'Active',
      users: 12,
      lastUpdate: '1d ago'
    },
    {
      id: 'hvdc-monitor',
      name: 'HVDC Real-time',
      desc: 'High-voltage infrastructure monitoring and diagnostics.',
      theme: TOOL_THEMES.default,
      status: 'Locked',
      users: 0,
      lastUpdate: 'N/A',
      isLocked: true
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black flex transition-colors duration-500">
      {/* Sidebar Navigation */}
      <aside className="w-72 border-r border-slate-200 dark:border-white/5 hidden lg:flex flex-col sticky top-14 h-[calc(100vh-56px)] bg-white/80 dark:bg-black/80 backdrop-blur-2xl">
        <div className="p-8 space-y-10">
          <div className="space-y-2">
            <h3 className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-4 mb-6">Workspace</h3>
            {[
              { label: 'Overview', icon: Zap, active: true },
              { label: 'Tools Directory', icon: Users },
              { label: 'Analytics', icon: TrendingUp },
              { label: 'Settings', icon: Settings },
            ].map((item) => (
              <button 
                key={item.label}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                  item.active 
                    ? "bg-slate-900 dark:bg-white text-white dark:text-black shadow-lg shadow-slate-200 dark:shadow-none" 
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-4 mb-6">Your Tools</h3>
            {tools.map((tool) => (
              <button 
                key={tool.id}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-full text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tool.theme.accentColor }} />
                  {tool.name}
                </div>
                {tool.isLocked && <Lock className="w-3 h-3 opacity-40" />}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto p-8">
          <div className="bg-slate-100 dark:bg-white/5 p-6 rounded-[24px]">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 font-medium">Need a custom tool?</p>
            <Button variant="primary" size="sm" className="w-full rounded-full">Contact Support</Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
            <div>
              <h1 className="text-5xl font-display font-bold text-slate-900 dark:text-white mb-3 tracking-tight">Tools Dashboard</h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Manage your internal and external digital assets.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search tools..." 
                  className="bg-slate-100 dark:bg-white/5 border-none rounded-full pl-12 pr-6 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-400/50 w-72 transition-all"
                />
              </div>
              <Button variant="outline" size="sm" className="p-3 rounded-full"><Bell className="w-4 h-4" /></Button>
              <Button variant="primary" size="sm" className="rounded-full px-6" leftIcon={<Plus className="w-4 h-4" />}>New Tool</Button>
            </div>
          </header>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { label: 'Active Users', value: '136', icon: Users, color: 'text-slate-900 dark:text-white' },
              { label: 'Total Tools', value: '08', icon: Zap, color: 'text-slate-900 dark:text-white' },
              { label: 'System Uptime', value: '99.99%', icon: Activity, color: 'text-slate-900 dark:text-white' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white dark:bg-white/5 p-8 rounded-[32px] border border-slate-100 dark:border-white/5 flex items-center gap-6 shadow-sm">
                <div className={cn("w-14 h-14 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center", stat.color)}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight">{stat.value}</div>
                  <div className="text-[10px] text-slate-400 font-mono uppercase tracking-[0.2em] mt-1">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Tools Grid */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
              Available Tools
            </h2>
            <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 dark:bg-white/5 px-3 py-1 rounded-full">
              {tools.length} Total
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <motion.div 
                key={tool.id}
                whileHover={{ y: -6 }}
                className={cn(
                  "bg-white dark:bg-white/5 rounded-[40px] overflow-hidden flex flex-col border border-slate-100 dark:border-white/5 shadow-sm transition-all duration-500",
                  tool.isLocked ? "opacity-60" : ""
                )}
              >
                <div className="p-10 flex-1">
                  <div className="flex justify-between items-start mb-8">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: `${tool.theme.accentColor}10`, color: tool.theme.accentColor }}
                    >
                      {tool.id === 'kereone' ? <Users className="w-7 h-7" /> : 
                       tool.id === 'receipts' ? <Receipt className="w-7 h-7" /> : 
                       <Zap className="w-7 h-7" />}
                    </div>
                    <div className={cn(
                      "text-[10px] font-mono font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full",
                      tool.status === 'Active' ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-slate-100 dark:bg-white/5 text-slate-400"
                    )}>
                      {tool.status}
                    </div>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-4 tracking-tight">{tool.name}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-10 font-medium">
                    {tool.desc}
                  </p>

                  <div className="flex items-center gap-6 pt-8 border-t border-slate-50 dark:border-white/5">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-slate-300" />
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{tool.users}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-300" />
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{tool.lastUpdate}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-slate-50 dark:bg-white/5 border-t border-slate-100 dark:border-white/5 flex gap-3">
                  <Button 
                    variant={tool.isLocked ? "locked" : "primary"} 
                    size="sm" 
                    className="flex-1 rounded-full h-12"
                    isLocked={tool.isLocked}
                  >
                    {tool.isLocked ? 'Request Access' : 'Launch Tool'}
                  </Button>
                  <Button variant="outline" size="sm" className="w-12 h-12 p-0 rounded-full flex items-center justify-center">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

const Activity = ({ className }: { className?: string }) => (
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
    className={className}
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);
