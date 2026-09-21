import React from 'react';
import { AlertCircle, AlertTriangle } from 'lucide-react';

export default function LabelWarning({ warnings }) {
  if (!warnings) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-bold text-[#362211]">Label warnings</h3>
      <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#C68B59]/30 flex items-start gap-3 shadow-xs">
        <AlertCircle className="w-5 h-5 text-[#C68B59] shrink-0 mt-0.5" />
        <p className="text-sm font-medium text-[#362211] leading-relaxed">
          {warnings}
        </p>
      </div>
    </div>
  );
}
