import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { useDietary } from '../context/DietaryContext';
import { DIETARY_PRESETS } from '../data/mockResults';
import DietaryOption from '../components/DietaryOption';
import StrictnessSelector from '../components/StrictnessSelector';
import LiveSummary from '../components/LiveSummary';

export default function Profile() {
  const navigate = useNavigate();
  const {
    selectedRestrictions,
    toggleRestriction,
    strictness,
    setStrictness,
    customRules,
    setCustomRules,
  } = useDietary();

  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleSaveAndScan = (e) => {
    e.preventDefault();
    setSavedFeedback(true);
    setTimeout(() => {
      navigate('/scanner');
    }, 350);
  };

  return (
    <div className="py-8 sm:py-12 max-w-xl mx-auto px-4">
      {/* Phone container style to faithfully match reference screenshot 3 */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-white rounded-[28px] sm:rounded-[36px] border border-[#362211]/12 p-6 sm:p-9 shadow-xl shadow-[#362211]/6 space-y-7"
      >
        {/* Header matching screenshot 3 */}
        <div className="space-y-1.5 border-b border-[#362211]/8 pb-5">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#362211] tracking-tight">
              Your dietary profile
            </h1>
            <span className="text-xs font-bold text-[#362211]/50 tracking-wide uppercase">
              Step 1 of 1
            </span>
          </div>
          <p className="text-sm text-[#362211]/70 font-medium">
            Tell us what to watch for. You only do this once.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSaveAndScan} className="space-y-7">
          {/* STEP 1: What do you need to avoid? */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#362211] text-white flex items-center justify-center text-xs font-bold">
                1
              </div>
              <label className="text-sm sm:text-base font-bold text-[#362211]">
                What do you need to avoid?
              </label>
            </div>

            {/* Pill options in responsive grid / flex wrap */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              {DIETARY_PRESETS.map((preset) => {
                const isSelected = selectedRestrictions.includes(preset.label);
                return (
                  <DietaryOption
                    key={preset.id}
                    label={preset.label}
                    isSelected={isSelected}
                    onToggle={() => toggleRestriction(preset.label)}
                  />
                );
              })}
            </div>
          </div>

          {/* STEP 2: How strict should we be? */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#362211] text-white flex items-center justify-center text-xs font-bold">
                2
              </div>
              <label className="text-sm sm:text-base font-bold text-[#362211]">
                How strict should we be?
              </label>
            </div>

            <StrictnessSelector
              strictness={strictness}
              onChange={setStrictness}
            />
          </div>

          {/* STEP 3: Anything else? Optional */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#362211] text-white flex items-center justify-center text-xs font-bold">
                  3
                </div>
                <label
                  htmlFor="custom-rules"
                  className="text-sm sm:text-base font-bold text-[#362211]"
                >
                  Anything else?
                </label>
              </div>
              <span className="text-xs text-[#362211]/50 font-semibold">
                Optional
              </span>
            </div>

            <input
              id="custom-rules"
              type="text"
              value={customRules}
              onChange={(e) => setCustomRules(e.target.value)}
              placeholder="No soy, no red dye 40"
              className="w-full px-4 py-3 rounded-2xl bg-[#F4F6F5] border border-[#362211]/15 text-[#362211] text-sm placeholder:text-[#362211]/40 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 focus:border-[#2E7D32] transition-all"
            />
          </div>

          {/* STEP 4: Live Summary */}
          <LiveSummary
            restrictions={selectedRestrictions}
            strictness={strictness}
            customRules={customRules}
          />

          {/* Action Button matching screenshot 3 */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-4 px-6 rounded-2xl font-bold text-base transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
              savedFeedback
                ? 'bg-[#256629] text-white shadow-md'
                : 'bg-[#2E7D32] hover:bg-[#256629] text-white shadow-[#2E7D32]/25'
            }`}
          >
            {savedFeedback ? (
              <>
                <Check className="w-5 h-5" />
                <span>Profile Saved! Opening Scanner...</span>
              </>
            ) : (
              <>
                <span>Save and start scanning</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>

          {/* Footer Privacy Note matching screenshot 3 */}
          <div className="flex items-center justify-center gap-2 text-xs text-[#362211]/60 pt-1">
            <Lock className="w-3.5 h-3.5 text-[#C68B59]" />
            <span>Stored on your phone only. Never uploaded.</span>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
