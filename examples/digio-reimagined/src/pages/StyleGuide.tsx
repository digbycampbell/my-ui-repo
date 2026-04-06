import React from 'react';
import { motion } from 'motion/react';
import { BRAND } from '@/src/lib/design-system';
import { cn } from '@/src/lib/utils';
import { Button } from '../components/ui/Button';
import { Logo } from '../components/ui/Logo';
import { 
  Palette, 
  Type, 
  Layout, 
  Component, 
  Zap, 
  Lock, 
  CheckCircle2, 
  Info,
  Layers,
  Box,
  MousePointer2
} from 'lucide-react';

export const StyleGuide: React.FC = () => {
  const colors = [
    { name: 'Primary', hex: BRAND.colors.primary, desc: 'Deep professional base' },
    { name: 'Accent', hex: BRAND.colors.accent, desc: 'Electric digital energy (Light)' },
    { name: 'Secondary', hex: BRAND.colors.secondary, desc: 'Modern tech-forward (Light)' },
    { name: 'Surface', hex: BRAND.colors.surface, desc: 'Component background' },
    { name: 'Border', hex: BRAND.colors.border, desc: 'Subtle separators' },
  ];

  const typography = [
    { name: 'Display', font: BRAND.typography.display, usage: 'Headings, Hero titles, Branding' },
    { name: 'Sans', font: BRAND.typography.sans, usage: 'Body text, UI elements, Navigation' },
    { name: 'Serif (Accent)', font: BRAND.typography.serif, usage: 'Editorial accents, Hero subtitles, Academic feel' },
    { name: 'Mono', font: BRAND.typography.mono, usage: 'Data, Code, Technical metadata' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pb-20 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-cyan-500/5 dark:bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="container mx-auto px-4 relative">
          <div className="flex items-center gap-4 mb-6">
            <Palette className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
            <span className="text-cyan-600 dark:text-cyan-400 font-mono font-medium tracking-widest uppercase text-sm">Design System v1.1</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-bold text-slate-900 dark:text-white mb-8 tracking-tight">
            Digio Style Guide<span className="text-cyan-600 dark:text-cyan-400">.</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed font-sans">
            The single source of truth for Digio's visual identity. A reimagined design language for the intersection of power infrastructure and digital intelligence, using a harmonized typographic system.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-1 sticky top-24 h-fit space-y-2">
          {['Colors', 'Typography', 'Logo', 'Buttons', 'Components', 'Layout'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all group"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-cyan-600 dark:group-hover:bg-cyan-400 transition-colors" />
              <span className="font-medium">{item}</span>
            </a>
          ))}
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3 space-y-32">
          
          {/* Colors Section */}
          <section id="colors" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-10">
              <Palette className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Color Palette</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {colors.map((color) => (
                <div key={color.name} className="group glass p-4 rounded-2xl">
                  <div 
                    className="h-32 w-full rounded-xl mb-4 shadow-inner transition-transform group-hover:scale-[1.02]" 
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-slate-900 dark:text-white font-bold">{color.name}</h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm">{color.desc}</p>
                    </div>
                    <code className="text-xs text-cyan-700 dark:text-cyan-400 font-mono bg-cyan-500/10 px-2 py-1 rounded">{color.hex}</code>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Typography Section */}
          <section id="typography" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-10">
              <Type className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Typography System</h2>
            </div>
            
            <div className="glass p-8 rounded-3xl mb-12 bg-slate-50/50 dark:bg-white/5 border-dashed border-2 border-slate-200 dark:border-white/10">
              <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white mb-4">The Harmonized Method</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                <div className="space-y-4">
                  <p>
                    <strong className="text-slate-900 dark:text-white">1. Geometric Consistency:</strong> We pair <span className="font-display font-bold">Outfit</span> (Display) with <span className="font-sans font-bold">Inter</span> (Sans). Both share a geometric foundation, ensuring that as you move from large headings to small UI text, the visual "rhythm" remains consistent.
                  </p>
                  <p>
                    <strong className="text-slate-900 dark:text-white">2. Contrast through Character:</strong> While the sans-serifs provide professional structure, <span className="font-serif italic text-lg">Instrument Serif</span> adds a modern-academic layer. It is used sparingly for "editorial" moments to soften the tech-heavy aesthetic.
                  </p>
                </div>
                <div className="space-y-4">
                  <p>
                    <strong className="text-slate-900 dark:text-white">3. Functional Separation:</strong> <span className="font-mono bg-slate-200 dark:bg-slate-800 px-1 rounded text-xs">JetBrains Mono</span> is reserved strictly for data, code, and technical metadata, providing a clear visual cue for "system-level" information.
                  </p>
                  <p>
                    <strong className="text-slate-900 dark:text-white">4. Optical Scaling:</strong> Headings use tighter tracking and heavier weights, while body text (Inter) is optimized for long-form reading with generous x-heights.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-12">
              {typography.map((font) => (
                <div key={font.name} className="glass p-8 rounded-2xl">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-slate-500 dark:text-slate-400 font-mono text-sm uppercase tracking-widest">{font.name} — {font.font}</h3>
                    <span className="text-xs text-slate-400 dark:text-slate-500">{font.usage}</span>
                  </div>
                  <p 
                    className={cn(
                      "text-slate-900 dark:text-white text-5xl md:text-7xl font-bold tracking-tight",
                      font.name === 'Serif (Accent)' && "italic font-normal"
                    )}
                    style={{ fontFamily: font.font }}
                  >
                    The quick brown fox jumps over the lazy dog.
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Logo Section */}
          <section id="logo" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-10">
              <Zap className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Logo Variations</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass p-12 rounded-2xl flex flex-col items-center justify-center gap-8">
                <Logo size="xl" variant="accent" />
                <span className="text-xs text-slate-500 font-mono">Light Mode Variant</span>
              </div>
              <div className="bg-slate-950 p-12 rounded-2xl flex flex-col items-center justify-center gap-8">
                <Logo size="xl" variant="default" />
                <span className="text-xs text-slate-500 font-mono">Dark Mode Variant</span>
              </div>
            </div>
          </section>

          {/* Buttons Section */}
          <section id="buttons" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-10">
              <MousePointer2 className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Interactive Elements</h2>
            </div>
            <div className="glass p-10 rounded-2xl space-y-12">
              <div>
                <h3 className="text-slate-500 dark:text-slate-400 font-mono text-xs uppercase tracking-widest mb-6">Action Buttons</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary">Primary Action</Button>
                  <Button variant="secondary">Secondary Action</Button>
                  <Button variant="outline">Outline Action</Button>
                  <Button variant="ghost">Ghost Action</Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-slate-500 dark:text-slate-400 font-mono text-xs uppercase tracking-widest mb-6">Security & Auth</h3>
                <div className="flex flex-wrap gap-4">
                  <Button isLocked>Locked Feature</Button>
                  <Button variant="auth">Sign In</Button>
                  <Button variant="auth" isLoggedIn>Sign Out</Button>
                </div>
              </div>
            </div>
          </section>

          {/* Components Section */}
          <section id="components" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-10">
              <Box className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white">UI Components</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass p-8 rounded-2xl border-l-4 border-cyan-600 dark:border-cyan-400">
                <div className="flex items-center gap-3 mb-4">
                  <Info className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  <h4 className="text-slate-900 dark:text-white font-bold">Information Card</h4>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Used for displaying key metrics or status updates in the tools dashboard. Features a subtle glow and sharp borders.
                </p>
              </div>
              <div className="glass p-8 rounded-2xl border-l-4 border-indigo-600 dark:border-indigo-500">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <h4 className="text-slate-900 dark:text-white font-bold">Success State</h4>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Used for confirmation messages and completed tasks. Harmonizes with the secondary brand color.
                </p>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
};
