import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LiveSummary({ restrictions, strictness, customRules }) {
  const restrictionText =
    restrictions.length > 0 ? restrictions.join(', ') : 'None specified';
  const modeText =
    strictness === 'medical' ? 'allergy or medical mode' : 'preference mode';

  return (
    <div className="bg-[#F4F6F5] border border-[#362211]/12 rounded-2xl p-4.5 space-y-2">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-full bg-[#362211] text-white flex items-center justify-center text-xs font-bold">
          4
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#362211]/75">
          Live summary
        </span>
      </div>

      <motion.div
        key={`${restrictionText}-${strictness}-${customRules}`}
        initial={{ opacity: 0.6, y: 3 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="space-y-1"
      >
        <p className="text-sm sm:text-base font-bold text-[#362211] leading-snug">
          Checking for: <span className="text-[#2E7D32]">{restrictionText}</span>{' '}
          <span className="text-[#362211]/70 font-semibold">({modeText})</span>
        </p>

        {customRules && customRules.trim().length > 0 && (
          <p className="text-xs text-[#C68B59] font-semibold flex items-center gap-1.5 pt-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Custom note: "{customRules.trim()}"</span>
          </p>
        )}
      </motion.div>
    </div>
  );
}
