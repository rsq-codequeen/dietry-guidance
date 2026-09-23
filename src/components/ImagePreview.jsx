
import { Trash2, RefreshCw, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ImagePreview({ imageUrl, imageName, onRemove, onReplace, onAnalyze }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className="space-y-5"
    >
      <div className="relative rounded-3xl overflow-hidden border border-[#362211]/15 shadow-md bg-black/5 aspect-4/3 max-h-80 flex items-center justify-center">
        <img
          src={imageUrl}
          alt={imageName || 'Scanned Label Preview'}
          className="w-full h-full object-cover"
        />

        {/* Laser scanning line aesthetic */}
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: '200%' }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' }}
          className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#2E7D32] to-transparent opacity-80 pointer-events-none shadow-[0_0_15px_#2E7D32]"
        />

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-[#362211]/80 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs text-white">
          <span className="truncate max-w-[200px] font-medium">{imageName || 'Label preview'}</span>
          <span className="text-[#C68B59] font-bold shrink-0 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5 text-[#2E7D32]" /> Ready to scan
          </span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onReplace}
          className="flex-1 py-3 px-4 rounded-xl border border-[#362211]/20 bg-white hover:bg-[#F4F6F5] text-[#362211] text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <RefreshCw className="w-4 h-4 text-[#C68B59]" />
          <span>Replace</span>
        </button>

        <button
          type="button"
          onClick={onRemove}
          className="py-3 px-4 rounded-xl border border-[#C93B2B]/20 bg-[#C93B2B]/5 hover:bg-[#C93B2B]/10 text-[#C93B2B] text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
          <span>Remove</span>
        </button>
      </div>

      {/* Primary CTA Scan Button */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={onAnalyze}
        className="w-full py-4 px-6 rounded-2xl bg-[#2E7D32] hover:bg-[#256629] text-white text-base font-bold shadow-lg shadow-[#2E7D32]/25 flex items-center justify-center gap-3 transition-all cursor-pointer"
      >
        <Sparkles className="w-5 h-5 text-white" />
        <span>Scan Label Now</span>
        <ArrowRight className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
}
