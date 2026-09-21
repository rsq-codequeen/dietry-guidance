import React, { useState } from 'react';
import { Info, AlertCircle, HelpCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IngredientInspector({ ingredients = [] }) {
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#362211]">
          Ingredients as read from the photo
        </h3>
      </div>

      {/* Ingredients paragraph container matching screenshot 1 */}
      <div className="p-5 rounded-3xl bg-[#F4F6F5] border border-[#362211]/12 leading-loose text-base font-medium text-[#362211]">
        {ingredients.map((item, index) => {
          const isLast = index === ingredients.length - 1;
          const isSelected = selectedIngredient?.text === item.text;

          if (!item.isFlagged) {
            return (
              <span key={index}>
                <span className="text-[#362211]/85">{item.text}</span>
                {!isLast && <span className="text-[#362211]/50 mr-1.5">, </span>}
              </span>
            );
          }

          // Flagged item styling
          const isDefinite = item.type === 'definite';
          return (
            <span key={index} className="inline-block my-0.5">
              <button
                type="button"
                onClick={() =>
                  setSelectedIngredient(isSelected ? null : item)
                }
                className={`inline-flex items-center px-2.5 py-1 rounded-xl text-sm font-bold transition-all cursor-pointer border ${
                  isSelected
                    ? 'ring-2 ring-[#362211] shadow-md scale-105'
                    : ''
                } ${
                  isDefinite
                    ? 'border-[#C93B2B]/70 bg-white text-[#C93B2B] hover:bg-[#C93B2B]/10 underline underline-offset-4 decoration-2 decoration-[#C93B2B]'
                    : 'border-[#C68B59] border-dashed bg-white text-[#C68B59] hover:bg-[#C68B59]/10'
                }`}
              >
                <span>{item.text}</span>
              </button>
              {!isLast && <span className="text-[#362211]/50 mr-1.5">, </span>}
            </span>
          );
        })}
      </div>

      {/* Explanatory Popover Drawer when an item is clicked */}
      <AnimatePresence>
        {selectedIngredient && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -6 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -6 }}
            className={`p-4 rounded-2xl border text-sm relative ${
              selectedIngredient.type === 'definite'
                ? 'bg-[#C93B2B]/10 border-[#C93B2B]/40 text-[#362211]'
                : 'bg-[#C68B59]/15 border-[#C68B59]/40 text-[#362211]'
            }`}
          >
            <button
              onClick={() => setSelectedIngredient(null)}
              className="absolute top-3 right-3 p-1 rounded-lg text-[#362211]/60 hover:text-[#362211] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-2.5 pr-6">
              <div className="mt-0.5 shrink-0">
                {selectedIngredient.type === 'definite' ? (
                  <AlertCircle className="w-5 h-5 text-[#C93B2B]" />
                ) : (
                  <HelpCircle className="w-5 h-5 text-[#C68B59]" />
                )}
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#362211] capitalize">
                  {selectedIngredient.text}
                </h4>
                <p className="text-xs text-[#362211]/85 mt-0.5">
                  {selectedIngredient.reason}
                </p>
                <div className="mt-2 text-[11px] font-semibold text-[#362211]/70">
                  Status:{' '}
                  <span
                    className={
                      selectedIngredient.type === 'definite'
                        ? 'text-[#C93B2B] font-bold'
                        : 'text-[#C68B59] font-bold'
                    }
                  >
                    {selectedIngredient.type === 'definite'
                      ? 'Definite Conflict'
                      : 'Possible Conflict / Verification Needed'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend matching screenshot 1 */}
      <div className="flex items-center gap-6 text-xs text-[#362211]/80 font-semibold px-1">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-sm bg-[#C93B2B] inline-block" />
          <span>Definite conflict</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-sm bg-[#C68B59] inline-block" />
          <span>Possible conflict</span>
        </div>
      </div>

      {/* Info helper box matching screenshot 1 */}
      <div className="p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#362211]/10 flex items-center gap-2.5 text-xs text-[#362211]/75 shadow-xs">
        <Info className="w-4 h-4 text-[#C68B59] shrink-0" />
        <span>Tap a highlighted word to see why it was flagged.</span>
      </div>
    </div>
  );
}
