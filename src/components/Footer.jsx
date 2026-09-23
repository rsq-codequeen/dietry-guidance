
import { Link } from 'react-router-dom';
import { Leaf, ShieldCheck, AlertCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#F4F6F5] border-t border-[#362211]/10 mt-20 text-[#362211]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2E7D32]/10 border border-[#2E7D32]/20 flex items-center justify-center text-[#2E7D32]">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-[#362211]">
                Dietary Guardian
              </span>
            </div>
            <p className="text-sm text-[#362211]/80 max-w-md leading-relaxed">
              AI-powered food label scanning for individuals and families with allergies, celiac disease, and dietary health restrictions.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-[#362211]/10 text-xs font-semibold text-[#C68B59]">
              <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
              <span>Private & Local • No Personal Data Sold</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#362211]">
              App Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[#362211]/75">
              <li>
                <Link to="/" className="hover:text-[#2E7D32] transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-[#2E7D32] transition-colors">
                  Dietary Profile (Step 1)
                </Link>
              </li>
              <li>
                <Link to="/scanner" className="hover:text-[#2E7D32] transition-colors">
                  Label Scanner
                </Link>
              </li>
              <li>
                <Link to="/result" className="hover:text-[#2E7D32] transition-colors">
                  Inspection Results
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-[#2E7D32] transition-colors">
                  Scan History
                </Link>
              </li>
            </ul>
          </div>

          {/* Important Disclaimers */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#362211]">
              Safety First
            </h4>
            <div className="p-4 rounded-xl bg-white border border-[#C68B59]/20 text-xs text-[#362211]/80 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-[#C68B59]">
                <AlertCircle className="w-4 h-4" />
                <span>Important Notice</span>
              </div>
              <p className="leading-normal">
                AI can misread labels. Always double-check packaging. This tool is for assistive guidance and is not a substitute for clinical medical advice.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[#362211]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#362211]/60">
          <p>© {new Date().getFullYear()} Dietary Guardian. Built with React, Vite & Tailwind CSS.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-[#2E7D32] transition-colors">
              About the Architecture
            </Link>
            <span className="text-[#362211]/30">•</span>
            <span>Frontend Isolated Prototype</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
