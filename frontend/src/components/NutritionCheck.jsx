import React from 'react';
import { X, Check } from 'lucide-react';

export default function NutritionCheck({ nutrition }) {
  if (!nutrition) return null;

  const isExceeded = nutrition.isExceeded;

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-bold text-[#362211]">Nutrition check</h3>
      <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#362211]/12 flex items-center justify-between shadow-xs">
        <div className="text-sm font-bold text-[#362211]">
          <span>{nutrition.nutrient}: </span>
          <span className="text-[#362211]/90">{nutrition.value} </span>
          <span className="text-xs font-normal text-[#362211]/60">
            {nutrition.servingUnit}
          </span>
        </div>

        <div
          className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl ${
            isExceeded
              ? 'bg-[#C93B2B]/10 text-[#C93B2B] border border-[#C93B2B]/20'
              : 'bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/20'
          }`}
        >
          {isExceeded ? (
            <>
              <X className="w-3.5 h-3.5 stroke-[3]" />
              <span>Limit {nutrition.limit}</span>
            </>
          ) : (
            <>
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>Within {nutrition.limit}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
