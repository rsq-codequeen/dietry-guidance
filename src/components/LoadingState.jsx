import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scan, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

export default function LoadingState({ onComplete }) {
  const steps = [
    { title: 'Reading ingredient label...', subtitle: 'Extracting optical text and allergen disclosures', icon: Scan },
    { title: 'Checking dietary restrictions...', subtitle: 'Cross-referencing gluten sources & sugar thresholds', icon: ShieldAlert },
    { title: 'Preparing safety report...', subtitle: 'Structuring verified ingredients and warnings', icon: Sparkles },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(1), 900);
    const timer2 = setTimeout(() => setCurrentStep(2), 1900);
    const timer3 = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#362211]/60 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-md bg-white rounded-3xl p-8 border border-[#362211]/15 shadow-2xl space-y-6 text-center"
      >
        {/* Animated Icon Ring */}
        <div className="relative w-20 h-20 mx-auto">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
            className="absolute inset-0 rounded-full border-4 border-dashed border-[#2E7D32]/30 border-t-[#2E7D32]"
          />
          <div className="absolute inset-2 rounded-full bg-[#2E7D32]/10 flex items-center justify-center text-[#2E7D32]">
            <Scan className="w-8 h-8 animate-pulse" />
          </div>
        </div>

        {/* Current Step Status */}
        <div className="min-h-[70px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-1"
            >
              <h3 className="text-xl font-extrabold text-[#362211]">
                {steps[currentStep].title}
              </h3>
              <p className="text-xs text-[#362211]/70">
                {steps[currentStep].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Dots / Steps */}
        <div className="space-y-2.5 pt-2">
          {steps.map((step, idx) => {
            const isCompleted = idx < currentStep;
            const isCurrent = idx === currentStep;

            return (
              <div
                key={idx}
                className={`flex items-center gap-3 p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                  isCurrent
                    ? 'bg-[#2E7D32]/10 border-[#2E7D32]/40 text-[#2E7D32]'
                    : isCompleted
                    ? 'bg-[#F4F6F5] border-[#2E7D32]/20 text-[#362211]/70'
                    : 'bg-transparent border-transparent text-[#362211]/40'
                }`}
              >
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-current" />
                  )}
                </div>
                <span className="truncate">{step.title}</span>
              </div>
            );
          })}
        </div>

        <p className="text-[11px] text-[#C68B59] font-medium pt-2">
          Mock AI Processing • Safe Local Execution
        </p>
      </motion.div>
    </div>
  );
}
