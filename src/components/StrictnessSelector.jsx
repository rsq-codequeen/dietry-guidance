import React from 'react';
import { ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StrictnessSelector({ strictness, onChange }) {
  const options = [
    {
      id: 'medical',
      title: 'Allergy or medical',
      subtitle: 'Strict standard for celiac, severe anaphylaxis, or medical disorders.',
      icon: ShieldAlert,
    },
    {
      id: 'preference',
      title: 'Preference',
      subtitle: 'Lifestyle choice (e.g. general wellness or exploratory diet).',
      icon: Sparkles,
    },
  ];

  return (
    <div className="space-y-2.5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {options.map((opt) => {
          const isSelected = strictness === opt.id;
          const Icon = opt.icon;
          return (
            <motion.button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              whileTap={{ scale: 0.98 }}
              className={`text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer relative ${
                isSelected
                  ? 'bg-white border-[#2E7D32] shadow-md shadow-[#2E7D32]/10 ring-2 ring-[#2E7D32]/20'
                  : 'bg-white/80 border-[#362211]/15 hover:border-[#362211]/30 hover:bg-white'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-[#2E7D32] text-white'
                        : 'bg-[#F4F6F5] text-[#362211]/70'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-[#362211]">
                      {opt.title}
                    </h4>
                  </div>
                </div>
                {isSelected && (
                  <CheckCircle2 className="w-5 h-5 text-[#2E7D32]" />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      <p className="text-xs text-[#362211]/70 font-medium px-1">
        {strictness === 'medical'
          ? 'Any doubt means a warning. Even trace amounts get flagged.'
          : 'Flagged only on primary ingredients. Traces will show as mild notes.'}
      </p>
    </div>
  );
}
