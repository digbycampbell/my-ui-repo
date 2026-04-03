import { useState } from 'react';
import { 
  Settings, 
  Upload, 
  FileText, 
  Trash2, 
  Sparkles, 
  ChevronDown, 
  Database, 
  Coins, 
  Tag, 
  Search, 
  Filter, 
  Download,
  X,
  CheckCircle2,
  AlertCircle,
  Receipt,
  Menu,
  Lock,
  Unlock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface ReceiptData {
  id: string;
  name: string;
  date: string;
  merchant: string;
  originalAmount: number;
  convertedAmount: number;
  currency: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  tags: string[];
}

// --- Mock Data ---
const MOCK_RECEIPTS: ReceiptData[] = [
  {
    id: '1',
    name: 'Dinner at Yakitoriya Sumire Feb 05',
    date: '2026-02-05',
    merchant: 'Yakitoriya Sumire',
    originalAmount: 42831,
    convertedAmount: 42831,
    currency: 'JPY',
    status: 'completed',
    tags: ['February 2026', 'Dining out', 'Business']
  }
];

export default function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isClearModalOpen, setClearModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLocked, setIsLocked] = useState(true);

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
      {/* Collapsible Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 288 : 88 }}
        className="border-r border-slate-200 bg-white/80 backdrop-blur-2xl flex flex-col z-20 overflow-hidden shrink-0"
      >
        {/* Top: Logo & Burger Menu */}
        <div className={`p-6 flex items-center h-20 shrink-0 ${isSidebarOpen ? 'justify-between' : 'justify-center'}`}>
          {isSidebarOpen && (
            <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-[#f472b6]/10 text-[#f472b6] shrink-0">
                <Receipt className="w-4 h-4" />
              </div>
              <h1 className="font-display font-bold text-xl tracking-tight text-slate-900">Digio<span className="text-[#f472b6]">.</span></h1>
            </div>
          )}
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="btn-icon-dark shrink-0"
          >
            <Menu size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Middle: Navigation/Settings */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 space-y-8">
          {/* AI Settings */}
          <section>
            <h2 className={`text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center ${isSidebarOpen ? 'gap-2' : 'justify-center'}`}>
              <Sparkles size={14} className="shrink-0" /> 
              {isSidebarOpen && <span className="whitespace-nowrap">AI Settings</span>}
            </h2>
            <button 
              onClick={() => setSettingsOpen(true)}
              disabled={isLocked}
              className={`flex items-center transition-all group disabled:opacity-50 disabled:cursor-not-allowed ${
                isSidebarOpen 
                  ? 'w-full justify-between px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#f472b6]/50' 
                  : 'w-10 h-10 justify-center mx-auto rounded-xl bg-slate-50 border border-slate-200 hover:border-[#f472b6]/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Settings size={16} className="text-slate-400 group-hover:text-[#f472b6] transition-colors shrink-0" />
                {isSidebarOpen && <span className="text-sm font-medium text-slate-700 whitespace-nowrap">gemini</span>}
              </div>
              {isSidebarOpen && <Settings size={14} className="text-slate-400 shrink-0" />}
            </button>
          </section>

          {/* Currency */}
          <section>
            <h2 className={`text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center ${isSidebarOpen ? 'gap-2' : 'justify-center'}`}>
              <Coins size={14} className="shrink-0" /> 
              {isSidebarOpen && <span className="whitespace-nowrap">Currency</span>}
            </h2>
            {isSidebarOpen && (
              <div className="space-y-2">
                <label className="text-xs text-slate-500 ml-1 whitespace-nowrap">Target Currency</label>
                <div className="relative">
                  <select disabled={isLocked} className="w-full appearance-none bg-white border border-slate-200 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#f472b6]/50 outline-none cursor-pointer text-slate-900 disabled:opacity-50 disabled:bg-slate-50 disabled:cursor-not-allowed">
                    <option>JPY</option>
                    <option>NZD</option>
                    <option>USD</option>
                    <option>EUR</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
            )}
          </section>

          {/* Tags */}
          <section>
            <h2 className={`text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center ${isSidebarOpen ? 'gap-2' : 'justify-center'}`}>
              <Tag size={14} className="shrink-0" /> 
              {isSidebarOpen && <span className="whitespace-nowrap">Tags</span>}
            </h2>
            {isSidebarOpen && (
              <div className={`flex flex-wrap gap-2 ${isLocked ? 'opacity-50 pointer-events-none' : ''}`}>
                {['Business', 'Travel', 'Food', 'Software'].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-[10px] font-mono font-medium text-slate-600 hover:border-[#f472b6] transition-colors cursor-pointer whitespace-nowrap">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </section>

          {/* Storage */}
          <section>
            <h2 className={`text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center ${isSidebarOpen ? 'gap-2' : 'justify-center'}`}>
              <Database size={14} className="shrink-0" /> 
              {isSidebarOpen && <span className="whitespace-nowrap">Storage</span>}
            </h2>
            {isSidebarOpen && (
              <div className="bg-slate-50 rounded-3xl p-5 border border-slate-200 space-y-4">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 whitespace-nowrap">1 receipt(s)</span>
                  <span className="text-slate-700 font-mono whitespace-nowrap">0.63 MB</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="w-1/4 h-full bg-[#f472b6]" />
                </div>
                <button 
                  onClick={() => setClearModalOpen(true)}
                  disabled={isLocked}
                  className="text-[10px] text-red-500 hover:text-red-600 transition-colors uppercase font-mono font-bold tracking-widest disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  Purge old receipts...
                </button>
              </div>
            )}
          </section>
        </div>

        {/* Bottom: Lock & Profile */}
        <div className="p-6 border-t border-slate-200 flex flex-col gap-4 shrink-0">
          <button 
            onClick={() => setIsLocked(!isLocked)}
            className={`${isLocked ? "btn-status-locked" : "btn-status-unlocked"} ${!isSidebarOpen ? '!px-0 w-10 h-10 justify-center mx-auto' : 'w-full'}`}
          >
            {isLocked ? <Lock size={18} strokeWidth={2.5} className="shrink-0" /> : <Unlock size={18} strokeWidth={2.5} className="shrink-0" />}
            {isSidebarOpen && <span className="text-sm font-semibold whitespace-nowrap">{isLocked ? 'Locked' : 'Editing'}</span>}
          </button>

          <div className={`flex items-center gap-3 ${isSidebarOpen ? 'p-3 rounded-2xl bg-slate-50 border border-slate-200' : 'justify-center'}`}>
            <div className="w-10 h-10 rounded-full bg-[#1e1b4b] flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-bold">DC</span>
            </div>
            {isSidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">Digby Campbell</p>
                <p className="text-[10px] font-mono text-slate-500 truncate">digby.campbell@digio.nz</p>
              </div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        {/* Header */}
        <header className="h-20 border-b border-slate-200 bg-white/70 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-slate-500">
              <span className="text-sm font-medium">Tools</span>
              <span className="text-slate-300">/</span>
              <span className="text-sm font-bold text-slate-900">Receipts</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search receipts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-11 w-64"
              />
            </div>
            <button className="btn-primary bg-[#1e1b4b] hover:bg-[#1e1b4b]/90 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isLocked}>
              <Sparkles size={18} className="text-[#f472b6]" />
              <span className="hidden sm:inline">Analyze with AI</span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* Upload Section */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className={`bg-white rounded-[40px] h-full p-10 flex flex-col items-center justify-center text-center border-dashed border-2 border-slate-200 transition-all shadow-sm ${isLocked ? 'opacity-60 cursor-not-allowed' : 'hover:border-[#f472b6]/50 cursor-pointer group'}`}>
                <div className={`w-20 h-20 bg-[#f472b6]/10 rounded-3xl flex items-center justify-center mb-6 transition-transform duration-500 ${!isLocked && 'group-hover:scale-110'}`}>
                  <Upload className="text-[#f472b6] w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-2xl text-slate-900 mb-2 tracking-tight">Drop files here</h3>
                <p className="text-sm text-slate-500 mb-8 font-medium">Images and PDFs up to 10MB</p>
                <button className="btn-secondary" disabled={isLocked}>Browse Files</button>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-[40px] h-full flex flex-col border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <h3 className="font-display font-bold text-xl text-slate-900 tracking-tight">Recent Files</h3>
                    <span className="px-3 py-1 bg-[#f472b6]/10 text-[#f472b6] text-[10px] font-mono font-bold rounded-full">1</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={isLocked}>
                      <Trash2 size={18} />
                    </button>
                    <button className="btn-outline py-2 px-4 text-sm">
                      <Download size={16} /> PDF
                    </button>
                  </div>
                </div>
                <div className="p-8 flex-1 flex items-center justify-center bg-slate-50/30">
                  {/* Mock File Card */}
                  <motion.div 
                    whileHover={{ y: -6 }}
                    className="w-56 bg-white border border-slate-200 rounded-3xl p-5 flex flex-col items-center gap-4 relative group shadow-sm"
                  >
                    <div className="absolute top-3 right-3">
                      <CheckCircle2 size={18} className="text-emerald-500" />
                    </div>
                    <div className="w-full h-40 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 overflow-hidden">
                      <FileText size={48} className="text-red-400/50" />
                    </div>
                    <div className="w-full text-center">
                      <p className="text-sm font-bold text-slate-900 truncate mb-2">Roster_2026_03_M...</p>
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-[10px] text-slate-400 font-mono">91 KB</span>
                        <span className="text-[10px] text-emerald-500 font-mono font-bold uppercase tracking-widest">Processed</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* Data Table Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl font-display font-bold text-slate-900 tracking-tight">Extracted Data</h2>
                <div className="flex items-center gap-2">
                  <button className="btn-secondary py-2 px-4 text-sm">
                    <Filter size={16} /> Filter
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="px-8 py-5 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em]">Name</th>
                      <th className="px-8 py-5 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em]">Date</th>
                      <th className="px-8 py-5 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em]">Merchant</th>
                      <th className="px-8 py-5 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em] text-right">Original</th>
                      <th className="px-8 py-5 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em] text-right">Converted</th>
                      <th className="px-8 py-5"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {MOCK_RECEIPTS.map(receipt => (
                      <tr key={receipt.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-6">
                          <div className="flex flex-col gap-2">
                            <span className="text-base font-bold text-slate-900">{receipt.name}</span>
                            <div className="flex gap-2">
                              {receipt.tags.map(tag => (
                                <span key={tag} className="text-[10px] font-mono px-2 py-1 bg-slate-100 text-slate-600 rounded-full">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-sm font-mono text-slate-500">{receipt.date}</td>
                        <td className="px-8 py-6 text-sm text-slate-600 font-medium">{receipt.merchant}</td>
                        <td className="px-8 py-6 text-sm font-mono text-right text-slate-700">
                          {receipt.originalAmount.toLocaleString()} <span className="text-[10px] text-slate-400 ml-1">{receipt.currency}</span>
                        </td>
                        <td className="px-8 py-6 text-base font-mono text-right font-bold text-[#f472b6]">
                          ¥{receipt.convertedAmount.toLocaleString()}
                        </td>
                        <td className="px-8 py-6 text-right">
                          <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={isLocked}>
                            <Settings size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-6 border-t border-slate-100 bg-slate-50 text-xs font-mono text-slate-400 text-center">
                SHOWING 1 OF 1 RECEIPTS
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSettingsOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-lg relative z-10 shadow-2xl rounded-[40px] overflow-hidden border border-slate-200"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="text-2xl font-display font-bold text-slate-900 flex items-center gap-3 tracking-tight">
                  <Sparkles className="text-[#f472b6]" size={24} /> AI Settings
                </h3>
                <button onClick={() => setSettingsOpen(false)} className="text-slate-400 hover:text-slate-900 p-2 rounded-full hover:bg-slate-200 transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="p-8 space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em]">Provider</label>
                  <div className="flex gap-3">
                    {['Google Gemini', 'OpenAI', 'Anthropic'].map(provider => (
                      <button 
                        key={provider}
                        className={`flex-1 py-3 px-4 rounded-full text-sm font-medium border transition-all ${
                          provider === 'Google Gemini' 
                            ? 'bg-slate-900 border-slate-900 text-white shadow-md' 
                            : 'bg-transparent border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {provider}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em]">API Key</label>
                  <input 
                    type="password" 
                    placeholder="••••••••••••••••••••••••••••••••"
                    className="input-field w-full font-mono text-sm"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em]">Model</label>
                  <div className="relative">
                    <select className="input-field w-full appearance-none pr-10">
                      <option>Gemini Flash Latest</option>
                      <option>Gemini Pro Latest</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>
              <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end gap-4">
                <button onClick={() => setSettingsOpen(false)} className="btn-outline">Cancel</button>
                <button onClick={() => setSettingsOpen(false)} className="btn-primary">Save Changes</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Clear Modal */}
      <AnimatePresence>
        {isClearModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setClearModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-sm relative z-10 shadow-2xl border border-red-500/20 rounded-[40px] overflow-hidden"
            >
              <div className="p-10 text-center space-y-6">
                <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
                  <AlertCircle className="text-red-500 w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-slate-900 tracking-tight">Clear All Receipts</h3>
                  <p className="text-sm text-slate-500 mt-3 leading-relaxed">
                    This will permanently delete all 1 receipts. This action cannot be undone.
                  </p>
                </div>
                <div className="flex flex-col gap-3 pt-4">
                  <button 
                    onClick={() => setClearModalOpen(false)}
                    className="w-full py-3.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full transition-colors"
                  >
                    Delete All
                  </button>
                  <button 
                    onClick={() => setClearModalOpen(false)}
                    className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-full transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
