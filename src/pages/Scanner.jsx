import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, ShieldAlert, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDietary } from '../context/DietaryContext';
import ImageUploader from '../components/ImageUploader';
import ImagePreview from '../components/ImagePreview';
import LoadingState from '../components/LoadingState';

export default function Scanner() {
  const navigate = useNavigate();
  const {
    selectedRestrictions,
    currentScanImage,
    setCurrentScanImage,
    setActiveResultKey,
    addHistoryRecord,
  } = useDietary();

  const [imageName, setImageName] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [intendedResultKey, setIntendedResultKey] = useState('unsafe');

  const handleImageSelected = (url, name, demoKey = 'unsafe') => {
    setCurrentScanImage(url);
    setImageName(name);
    setIntendedResultKey(demoKey);
  };

  const handleRemoveImage = () => {
    setCurrentScanImage(null);
    setImageName('');
  };

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
  };

  const handleLoadingComplete = () => {
    setActiveResultKey(intendedResultKey);

    // Also record in scan history
    addHistoryRecord({
      id: `scan-${Date.now()}`,
      productName:
        intendedResultKey === 'unsafe'
          ? 'Honey & Nut Oat Crunch Granola'
          : 'Artisan Brown Rice Crackers',
      brand: intendedResultKey === 'unsafe' ? 'Nature Harvest' : 'Simple Grains',
      category: 'Packaged Grocery',
      timestamp: 'Just now',
      date: new Date().toISOString().split('T')[0],
      status: intendedResultKey === 'unsafe' ? 'Unsafe' : 'Safe',
      dietaryProfile: selectedRestrictions.join(', ') || 'Gluten-free, Low sugar',
      primaryWarning:
        intendedResultKey === 'unsafe'
          ? 'Contains barley malt, wheat flour & high sugar'
          : 'Zero gluten detected; low sugar verified',
      thumbnail:
        currentScanImage ||
        'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=300&auto=format&fit=crop&q=60',
      ingredientsCount: 8,
      conflictsCount: intendedResultKey === 'unsafe' ? 3 : 0,
      statusVariant: intendedResultKey,
      nutritionHighlights: { sugar: intendedResultKey === 'unsafe' ? '14g' : '0g' },
    });

    setIsAnalyzing(false);
    navigate('/result');
  };

  const restrictionString =
    selectedRestrictions.length > 0
      ? selectedRestrictions.join(', ')
      : 'Gluten-free, Low sugar';

  return (
    <div className="py-8 sm:py-12 max-w-xl mx-auto px-4">
      {/* Container styled like the phone mockup in screenshot 2 */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-white rounded-[28px] sm:rounded-[36px] border border-[#362211]/12 p-6 sm:p-9 shadow-xl shadow-[#362211]/6 space-y-6 relative"
      >
        {/* Top Profile Notification Banner matching screenshot 2 */}
        <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-[#1E3A5F]/10 sm:bg-[#1E3A5F]/8 border border-[#1E3A5F]/20 text-xs sm:text-sm font-semibold text-[#1E3A5F]">
          <div className="flex items-center gap-2 truncate pr-2">
            <ShieldAlert className="w-4 h-4 text-[#1E3A5F] shrink-0" />
            <span className="truncate">
              Checking for:{' '}
              <span className="font-bold">{restrictionString}</span>
            </span>
          </div>
          <Link
            to="/profile"
            className="text-xs font-bold text-[#1E3A5F] hover:underline shrink-0 ml-2"
          >
            Edit
          </Link>
        </div>

        {/* Heading matching screenshot 2 */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#362211] tracking-tight">
            Scan a label
          </h1>
          <p className="text-sm text-[#362211]/70 font-medium">
            Point your camera at the ingredient list.
          </p>
        </div>

        {/* Dynamic Image Upload or Preview */}
        <AnimatePresence mode="wait">
          {!currentScanImage ? (
            <motion.div
              key="uploader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ImageUploader onImageSelected={handleImageSelected} />
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ImagePreview
                imageUrl={currentScanImage}
                imageName={imageName}
                onRemove={handleRemoveImage}
                onReplace={() => setCurrentScanImage(null)}
                onAnalyze={handleStartAnalysis}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Disclaimer matching screenshot 2 */}
        <p className="text-[11px] sm:text-xs text-center text-[#362211]/55 pt-3 border-t border-[#362211]/8">
          AI can misread labels. Always double-check. Not medical advice.
        </p>
      </motion.div>

      {/* Animated Loading Overlay during mock analysis */}
      <AnimatePresence>
        {isAnalyzing && (
          <LoadingState onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>
    </div>
  );
}
