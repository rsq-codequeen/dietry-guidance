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
    strictness,
    customRules,
    currentScanImage,
    currentScanFile,
    setCurrentScanImage,
    setCurrentScanFile,
    setScanResult,
    setActiveResultKey,
    addHistoryRecord,
  } = useDietary();

  const [imageName, setImageName] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');

  const handleImageSelected = (url, name, demoKey, file, selectionError) => {
    if (selectionError) {
      setError(selectionError);
      return;
    }
    setCurrentScanImage(url);
    setCurrentScanFile(file);
    setImageName(name);
    setError('');
  };

  const handleRemoveImage = () => {
    setCurrentScanImage(null);
    setCurrentScanFile(null);
    setImageName('');
    setError('');
  };

  const handleStartAnalysis = async () => {
    if (!currentScanFile) {
      setError('Please select an image file before scanning.');
      return;
    }

    setIsAnalyzing(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('image', currentScanFile);
      formData.append(
        'profile',
        JSON.stringify({ restrictions: selectedRestrictions, strictness, customRules })
      );

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'The label could not be analyzed.');
      }

        const resultKey = data.verdict === 'unclear' ? 'cant_tell' : data.verdict;
        if (!['unsafe', 'caution', 'safe', 'cant_tell'].includes(resultKey)) {
          throw new Error('The server returned an invalid verdict.');
        }
      const flags = Array.isArray(data.flags) ? data.flags : [];
      const ingredients = (data.ingredients_text || '')
        .split(/,\s*/)
        .map((text) => text.trim())
        .filter(Boolean)
        .map((text) => {
          const flag = flags.find((item) =>
            text.toLowerCase().includes(String(item.text || '').toLowerCase())
          );
          return flag
            ? { text, isFlagged: true, type: flag.level, reason: flag.reason }
            : { text, isFlagged: false };
        });
      const liveResult = {
        id: `scan-${Date.now()}`,
        status: resultKey === 'cant_tell' ? "Can't tell" : resultKey[0].toUpperCase() + resultKey.slice(1),
        productName: imageName,
        profileSummary: selectedRestrictions.join(', ') || 'No restrictions selected',
        message: data.summary || 'The label was analyzed.',
        rawIngredientsText: data.ingredients_text || '',
        ingredients,
        labelWarnings: data.warnings || '',
        nutrition: null,
        flags,
        isLive: true,
      };

      setScanResult(liveResult);
      setActiveResultKey(resultKey);

      addHistoryRecord({
        id: liveResult.id,
        productName: liveResult.productName,
        brand: 'Label scan',
        category: 'Packaged Grocery',
        timestamp: 'Just now',
        date: new Date().toISOString().split('T')[0],
        status: liveResult.status,
        dietaryProfile: liveResult.profileSummary,
        primaryWarning: liveResult.message,
        thumbnail: currentScanImage,
        ingredientsCount: ingredients.length,
        conflictsCount: flags.filter((flag) => flag.level === 'definite').length,
        statusVariant: resultKey,
        nutritionHighlights: {},
      });

      navigate('/result');
    } catch (requestError) {
      setError(requestError.message || 'Could not connect to the analysis server.');
    } finally {
      setIsAnalyzing(false);
    }
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

        {error && (
          <p className="rounded-xl border border-[#C93B2B]/30 bg-[#C93B2B]/10 px-4 py-3 text-sm font-semibold text-[#C93B2B]">
            {error}
          </p>
        )}

        {/* Bottom Disclaimer matching screenshot 2 */}
        <p className="text-[11px] sm:text-xs text-center text-[#362211]/55 pt-3 border-t border-[#362211]/8">
          AI can misread labels. Always double-check. Not medical advice.
        </p>
      </motion.div>

      {/* Animated Loading Overlay during mock analysis */}
      <AnimatePresence>
        {isAnalyzing && <LoadingState />}
      </AnimatePresence>
    </div>
  );
}
