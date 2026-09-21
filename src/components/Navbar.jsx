import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Leaf, Menu, X, ShieldAlert, Sparkles, SlidersHorizontal, QrCode } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDietary } from '../context/DietaryContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { selectedRestrictions } = useDietary();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dietary Profile', path: '/profile' },
    { name: 'Scanner', path: '/scanner' },
    { name: 'History', path: '/history' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#362211]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group transition-transform active:scale-98"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#2E7D32]/10 border border-[#2E7D32]/25 flex items-center justify-center text-[#2E7D32] group-hover:bg-[#2E7D32] group-hover:text-white transition-all duration-300 shadow-sm">
              <Leaf className="w-6 h-6 transition-transform group-hover:rotate-12" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-[#362211] flex items-center gap-1.5">
                Dietary Guardian
              </span>
              <p className="text-[11px] font-medium text-[#C68B59] uppercase tracking-wider">
                Scan • Understand • Stay Safe
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-[#F4F6F5] px-4 py-1.5 rounded-full border border-[#362211]/10 shadow-inner">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-[#2E7D32] font-bold'
                      : 'text-[#362211]/80 hover:text-[#362211] hover:bg-white/60'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white rounded-full shadow-sm -z-10 border border-[#362211]/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Quick Profile Badge */}
            <Link
              to="/profile"
              title="Edit Dietary Profile"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F4F6F5] border border-[#362211]/10 hover:border-[#C68B59]/40 text-xs font-semibold text-[#362211] transition-all hover:bg-white"
            >
              <span className="w-2 h-2 rounded-full bg-[#2E7D32] animate-pulse"></span>
              <span className="text-[#362211]/70">Profile:</span>
              <span className="text-[#2E7D32] font-bold">
                {selectedRestrictions.length} active
              </span>
            </Link>

            {/* Primary CTA */}
            <Link
              to="/scanner"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2E7D32] text-white text-sm font-semibold hover:bg-[#256629] transition-all duration-200 shadow-md hover:shadow-lg shadow-[#2E7D32]/20 active:scale-98"
            >
              <QrCode className="w-4 h-4" />
              <span>Scan Product</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/scanner"
              className="px-3 py-1.5 rounded-lg bg-[#2E7D32] text-white text-xs font-semibold flex items-center gap-1.5"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Scan</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation"
              className="p-2 rounded-xl text-[#362211] hover:bg-[#F4F6F5] transition-colors border border-transparent focus:border-[#362211]/15"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t border-[#362211]/10 bg-[#FFFFFF] px-4 pt-3 pb-6 space-y-2 shadow-xl"
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                    isActive
                      ? 'bg-[#2E7D32]/10 text-[#2E7D32] font-bold border border-[#2E7D32]/20'
                      : 'text-[#362211] hover:bg-[#F4F6F5]'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#2E7D32]"></span>}
                </Link>
              );
            })}

            <div className="pt-3 border-t border-[#362211]/10 flex flex-col gap-2">
              <div className="flex items-center justify-between px-4 py-2 bg-[#F4F6F5] rounded-xl text-xs">
                <span className="text-[#362211]/70">Checking:</span>
                <span className="font-bold text-[#2E7D32]">
                  {selectedRestrictions.join(', ') || 'None'}
                </span>
              </div>
              <Link
                to="/scanner"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 bg-[#2E7D32] text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2"
              >
                <QrCode className="w-5 h-5" />
                <span>Open Scanner</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
