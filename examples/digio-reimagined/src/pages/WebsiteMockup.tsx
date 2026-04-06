import React from 'react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/Button';
import { Logo } from '../components/ui/Logo';
import { cn } from '@/src/lib/utils';
import { 
  Zap, 
  Globe, 
  Shield, 
  Cpu, 
  ArrowRight, 
  Activity, 
  Database, 
  Network,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const WebsiteMockup: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative pt-48 pb-32 overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 text-xs font-mono font-medium mb-10 tracking-widest uppercase">
                <Zap className="w-3 h-3" />
                <span>Engineering the Future of Power</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-slate-900 dark:text-white mb-10 tracking-tight leading-[1.05]">
                Powering the <br />
                Digital Grid.
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 mb-16 max-w-3xl mx-auto leading-relaxed font-sans font-medium">
                Specialist HVDC commissioning engineering and digital infrastructure solutions. Delivering high-voltage systems from energization to global operation.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button size="lg" className="w-full sm:w-auto px-10 h-14 text-lg rounded-full">
                  Explore Solutions
                </Button>
                <Link to="/dashboard">
                  <Button variant="ghost" size="lg" className="w-full sm:w-auto text-lg group" rightIcon={<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}>
                    Tools Dashboard
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product/Service Showcase (Apple-style Bento/Grid) */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Large Feature Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 relative h-[600px] rounded-[40px] overflow-hidden bg-slate-100 dark:bg-slate-900 group"
            >
              <div className="absolute inset-0 p-12 flex flex-col justify-end z-10">
                <h3 className="text-4xl md:text-6xl font-display font-bold text-slate-900 dark:text-white mb-6">HVDC Commissioning.</h3>
                <p className="text-xl text-slate-600 dark:text-slate-400 max-w-xl mb-8">
                  End-to-end commissioning of high-voltage direct current infrastructure with surgical precision.
                </p>
                <Button variant="outline" className="w-fit rounded-full px-8">Learn More</Button>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=2070" 
                alt="HVDC Infrastructure" 
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Smaller Feature Cards */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-[40px] overflow-hidden bg-slate-100 dark:bg-slate-900 group"
            >
              <div className="absolute inset-0 p-10 flex flex-col z-10">
                <h3 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-4">Digital Twins.</h3>
                <p className="text-slate-600 dark:text-slate-400 max-w-xs">
                  Real-time digital representations of physical power assets.
                </p>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2070" 
                alt="Digital Twin Tech" 
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-[40px] overflow-hidden bg-slate-100 dark:bg-slate-900 group"
            >
              <div className="absolute inset-0 p-10 flex flex-col z-10">
                <h3 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-4">Grid Intelligence.</h3>
                <p className="text-slate-600 dark:text-slate-400 max-w-xs">
                  Advanced data analytics and monitoring for power grid stability.
                </p>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072" 
                alt="Grid Intelligence" 
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section (Minimal) */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: 'Global Projects', value: '50+' },
              { label: 'Power Delivered', value: '12GW' },
              { label: 'Digital Tools', value: '24' },
              { label: 'Uptime', value: '99.9%' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-5xl md:text-6xl font-display font-bold text-slate-900 dark:text-white mb-4 tracking-tighter">{stat.value}</div>
                <div className="text-xs text-slate-500 font-mono uppercase tracking-[0.2em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer (Clean) */}
      <footer className="py-32 bg-slate-50 dark:bg-black border-t border-slate-200 dark:border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 md:col-span-1">
              <Logo size="md" className="mb-8" />
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                Digio NZ Limited. Specialist HVDC commissioning engineering — delivering high-voltage direct current infrastructure worldwide.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 col-span-1 md:col-span-3 gap-12">
              <div>
                <h4 className="text-slate-900 dark:text-white font-bold mb-8 text-sm uppercase tracking-widest">Company</h4>
                <ul className="space-y-4 text-sm text-slate-500">
                  <li><a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Projects</a></li>
                  <li><a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Careers</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-slate-900 dark:text-white font-bold mb-8 text-sm uppercase tracking-widest">Resources</h4>
                <ul className="space-y-4 text-sm text-slate-500">
                  <li><Link to="/styleguide" className="hover:text-slate-900 dark:hover:text-white transition-colors">Style Guide</Link></li>
                  <li><Link to="/dashboard" className="hover:text-slate-900 dark:hover:text-white transition-colors">Tools</Link></li>
                  <li><a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Documentation</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-slate-900 dark:text-white font-bold mb-8 text-sm uppercase tracking-widest">Contact</h4>
                <ul className="space-y-4 text-sm text-slate-500">
                  <li><a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">LinkedIn</a></li>
                  <li><a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Twitter</a></li>
                  <li><a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Email Us</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center pt-12 border-t border-slate-200 dark:border-white/5 gap-6">
            <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">
              © 2026 DIGIO NZ LIMITED. ALL RIGHTS RESERVED.
            </p>
            <div className="flex items-center gap-8">
              <a href="#" className="text-[10px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-mono uppercase tracking-widest transition-colors">PRIVACY POLICY</a>
              <a href="#" className="text-[10px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-mono uppercase tracking-widest transition-colors">TERMS OF SERVICE</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const LayoutDashboard = ({ className }: { className?: string }) => (
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
    <rect width="7" height="9" x="3" y="3" rx="1" />
    <rect width="7" height="5" x="14" y="3" rx="1" />
    <rect width="7" height="9" x="14" y="12" rx="1" />
    <rect width="7" height="5" x="3" y="16" rx="1" />
  </svg>
);
