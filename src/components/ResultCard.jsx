import React from 'react';
import { XCircle, AlertTriangle, CheckCircle2, HelpCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ResultCard({
  activeKey,
  onSelectKey,
  result,
  profileSummary,
}) {
  const modes = [
    { key: 'unsafe', label: 'Unsafe' },
    { key: 'caution', label: 'Caution' },
    { key: 'safe', label: 'Safe' },
    { key: 'cant_tell', label: "Can't tell" },
  ];

  // Colors and icons per status
  const config = {
    unsafe: {
      title: 'Unsafe',
      icon: XCircle,
      bg: 'bg-[#5A1D1D]/95 text-white',
      border: 'border-[#C93B2B]/50',
      iconColor: 'text-[#FF6B6B]',
      badgeBg: 'bg-[#C93B2B]',
    },
    caution: {
      title: 'Caution',
      icon: AlertTriangle,
      bg: 'bg-[#5C3E18]/95 text-white',
      border: 'border-[#C68B59]/50',
      iconColor: 'text-[#F3B77C]',
      badgeBg: 'bg-[#C68B59]',
    },
    safe: {
      title: 'Safe',
      icon: CheckCircle2,
      bg: 'bg-[#1C4D20]/95 text-white',
      border: 'border-[#2E7D32]/50',
      iconColor: 'text-[#69D670]',
      badgeBg: 'bg-[#2E7D32]',
    },
    cant_tell: {
      title: "Can't tell",
      icon: HelpCircle,
      bg: 'bg-[#3A332C]/95 text-white',
      border: 'border-[#362211]/30',
      iconColor: 'text-[#E0D7D0]',
      badgeBg: 'bg-[#362211]',
    },
  }[activeKey] || {};

  const StatusIcon = config.icon || XCircle;

  return (
    <div className="space-y-4">
      {/* Top Demo State Switcher (matching reference screenshot 1 top header) */}
      {!result.isLive && (
        <div className="bg-[#F4F6F5] p-1.5 rounded-2xl border border-[#362211]/12 flex items-center gap-1 overflow-x-auto">
          {modes.map((mode) => {
            const isSelected = activeKey === mode.key;
            return (
              <button
                key={mode.key}
                type="button"
                onClick={() => onSelectKey(mode.key)}
                className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-[#362211] text-white shadow-sm'
                    : 'text-[#362211]/70 hover:text-[#362211] hover:bg-white/60'
                }`}
              >
                {mode.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Sub-header navigation row */}
      <div className="flex items-center justify-between px-1 text-sm font-semibold">
        <Link
          to="/scanner"
          className="inline-flex items-center gap-1.5 text-[#362211] hover:text-[#2E7D32] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Scan another</span>
        </Link>
        <span className="text-xs sm:text-sm text-[#362211]/75 font-medium">
          {profileSummary || 'Gluten-free, Low sugar'}
        </span>
      </div>

      {/* Main Status Hero Card matching screenshot 1 */}
      <motion.div
        key={activeKey}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`p-6 sm:p-7 rounded-3xl border shadow-lg ${config.bg} ${config.border} space-y-3`}
      >
        <div className="flex items-center gap-3">
          <StatusIcon className={`w-8 h-8 ${config.iconColor} shrink-0`} />
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {config.title}
          </h2>
          {activeKey === 'safe' && (
            <span className="ml-auto text-xs font-bold px-2.5 py-1 rounded-full bg-white/20 text-white">
              96% Match
            </span>
          )}
        </div>

        <p className="text-sm sm:text-base leading-relaxed text-white/95 font-medium">
          {result.message}
        </p>
      </motion.div>
    </div>
  );
}
