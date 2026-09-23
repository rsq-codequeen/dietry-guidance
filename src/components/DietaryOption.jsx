
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DietaryOption({ label, isSelected, onToggle }) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileTap={{ scale: 0.96 }}
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
        isSelected
          ? 'bg-[#2E7D32] text-white shadow-md shadow-[#2E7D32]/25 border border-[#2E7D32]'
          : 'bg-white text-[#362211] hover:bg-[#F4F6F5] border border-[#362211]/15 hover:border-[#362211]/30 shadow-xs'
      }`}
    >
      {isSelected && (
        <motion.span
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 450, damping: 25 }}
        >
          <Check className="w-4 h-4 stroke-[3]" />
        </motion.span>
      )}
      <span>{label}</span>
    </motion.button>
  );
}
