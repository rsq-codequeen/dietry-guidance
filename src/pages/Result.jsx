import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, RefreshCw, Bookmark, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useDietary } from '../context/DietaryContext';
import ResultCard from '../components/ResultCard';
import IngredientInspector from '../components/IngredientInspector';
import LabelWarning from '../components/LabelWarning';
import NutritionCheck from '../components/NutritionCheck';

export default function Result() {
  const navigate = useNavigate();
  const {
    activeResultKey,
    setActiveResultKey,
    currentResult,
    selectedRestrictions,
    currentScanImage,
  } = useDietary();

  // If safe state is selected, fire subtle celebratory confetti
  useEffect(() => {
    if (activeResultKey === 'safe') {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#2E7D32', '#C68B59', '#362211'],
      });
    }
  }, [activeResultKey]);

  const profileSummary =
    selectedRestrictions.length > 0
      ? selectedRestrictions.join(', ')
      : 'Gluten-free, Low sugar';

  return (
    <div className="py-8 sm:py-12 max-w-xl mx-auto px-4">
      {/* Container styled like the phone mockup in screenshot 1 */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-white rounded-[28px] sm:rounded-[36px] border border-[#362211]/12 p-6 sm:p-9 shadow-xl shadow-[#362211]/6 space-y-6"
      >
        {/* Top Segmented Controls and Main Status Card matching screenshot 1 */}
        <ResultCard
          activeKey={activeResultKey}
          onSelectKey={setActiveResultKey}
          result={currentResult}
          profileSummary={profileSummary}
        />

        {/* Ingredients section with interactive clickable flagged tokens */}
        <IngredientInspector ingredients={currentResult.ingredients} />

        {/* Label Warnings section matching screenshot 1 */}
        <LabelWarning warnings={currentResult.labelWarnings} />

        {/* Nutrition Check section matching screenshot 1 */}
        <NutritionCheck nutrition={currentResult.nutrition} />

        {/* Primary CTA Button matching screenshot 1 */}
        <div className="pt-2">
          <Link
            to="/scanner"
            className="w-full py-4 px-6 rounded-2xl bg-[#2E7D32] hover:bg-[#256629] text-white text-base font-bold shadow-lg shadow-[#2E7D32]/25 flex items-center justify-center gap-2 transition-all active:scale-98"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Scan another</span>
          </Link>
        </div>

        {/* Bottom Disclaimer matching screenshot 1 */}
        <p className="text-[11px] sm:text-xs text-center text-[#362211]/55 pt-3 border-t border-[#362211]/8">
          AI can misread labels. Always double-check. Not medical advice.
        </p>
      </motion.div>
    </div>
  );
}
