import React, { useState } from 'react';
import { QrCode, Copy, Check, ExternalLink, Download, Smartphone, X, Sparkles } from 'lucide-react';

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QrModal: React.FC<QrModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [qrTheme, setQrTheme] = useState<'light' | 'dark'>('light');

  if (!isOpen) return null;

  const liveUrl = 'https://1234holebasayya.github.io/project/';
  // Using relative path so it resolves cleanly whether on localhost or github.io/project/
  const qrImageSrc = qrTheme === 'light' ? './qr-code.png' : './qr-code-dark.png';

  const handleCopy = () => {
    navigator.clipboard.writeText(liveUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = qrImageSrc;
    a.download = `reroute-ai-qr-${qrTheme}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-[#0F172A] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-7 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background ambient glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close QR Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Smartphone className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Live Mobile Demo</span>
        </div>

        <h3 className="text-xl font-extrabold text-white tracking-tight">
          Scan to Open on Mobile
        </h3>
        <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
          Scan with any smartphone camera to launch the live deployed ReRoute AI application instantly.
        </p>

        {/* QR Code Container */}
        <div className="my-5 flex flex-col items-center">
          <div className={`p-4 rounded-2xl border transition-all duration-300 shadow-2xl ${
            qrTheme === 'light' 
              ? 'bg-white border-slate-200 shadow-cyan-500/10' 
              : 'bg-[#0B0F19] border-cyan-500/40 shadow-cyan-500/20'
          }`}>
            <img
              src={qrImageSrc}
              alt="ReRoute AI Live Deployment QR Code"
              className="w-52 h-52 sm:w-60 sm:h-60 object-contain rounded-lg"
            />
          </div>

          {/* Theme Selector Toggle */}
          <div className="flex items-center gap-1 mt-3 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setQrTheme('light')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                qrTheme === 'light'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              High Contrast (Fast Scan)
            </button>
            <button
              onClick={() => setQrTheme('dark')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                qrTheme === 'dark'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Cyber Dark
            </button>
          </div>
        </div>

        {/* Live URL Pill with 1-click Copy */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 flex items-center justify-between gap-2 mb-4">
          <div className="text-left min-w-0 flex-1 px-1">
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">Target Public URL</span>
            <span className="text-xs font-mono text-cyan-300 truncate block">
              {liveUrl}
            </span>
          </div>
          <button
            onClick={handleCopy}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 ${
              copied
                ? 'bg-emerald-500 text-slate-950'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-slate-950" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-300" />
                Copy
              </>
            )}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            Open Web App
          </a>
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs transition-colors"
          >
            <Download className="w-4 h-4" />
            Download QR
          </button>
        </div>

        {/* Hackathon Badge */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Team Hack Bros • PS-2 Travel Recovery Engine</span>
        </div>
      </div>
    </div>
  );
};
