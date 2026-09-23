import React, { useRef } from 'react';
import { Camera, Image as ImageIcon, SunMedium, Scan, PlusCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ImageUploader({ onImageSelected }) {
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onImageSelected(url, file.name, undefined, file);
    }
  };

  const handleSampleSelect = async (type) => {
    try {
      const imageUrl = type === 'unsafe'
        ? 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=800&auto=format&fit=crop&q=80';
      const imageName = type === 'unsafe'
        ? 'Granola_Cereal_Nutrition_Label.jpg'
        : 'Rice_Crackers_Organic_Label.jpg';

      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error('Demo image download failed.');
      const blob = await response.blob();
      const file = new File([blob], imageName, { type: blob.type || 'image/jpeg' });
      onImageSelected(imageUrl, imageName, type, file);
    } catch (error) {
      onImageSelected(null, '', undefined, null, error.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hidden file inputs */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={cameraInputRef}
        onChange={handleFileChange}
        accept="image/*"
        capture="environment"
        className="hidden"
      />

      {/* Main Viewfinder Frame matching reference screenshot 2 */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="group relative cursor-pointer border-2 border-dashed border-[#362211]/25 hover:border-[#2E7D32] rounded-3xl p-10 sm:p-14 bg-[#FFFFFF] hover:bg-[#F4F6F5]/50 transition-all duration-300 flex flex-col items-center justify-center text-center shadow-xs"
      >
        <motion.div
          whileHover={{ scale: 1.08 }}
          className="w-16 h-16 rounded-2xl bg-[#F4F6F5] border border-[#362211]/10 flex items-center justify-center text-[#362211]/70 group-hover:text-[#2E7D32] group-hover:border-[#2E7D32]/30 mb-4 transition-colors shadow-xs"
        >
          <Camera className="w-8 h-8" />
        </motion.div>

        <p className="text-base sm:text-lg font-bold text-[#362211]">
          Fit the whole ingredient list here
        </p>
        <p className="text-xs text-[#362211]/60 mt-1 max-w-xs">
          Click or drop an ingredient label photo to begin analysis
        </p>

        {/* Framing corner accents for camera viewfinder feel */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#362211]/30 rounded-tl-md" />
        <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#362211]/30 rounded-tr-md" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#362211]/30 rounded-bl-md" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#362211]/30 rounded-br-md" />
      </div>

      {/* Buttons matching screenshot 2 */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => cameraInputRef.current?.click()}
          className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-[#F4F6F5] border border-[#362211]/15 text-[#362211] font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-xs cursor-pointer active:scale-99"
        >
          <Camera className="w-5 h-5 text-[#2E7D32]" />
          <span>Take photo</span>
        </button>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-[#F4F6F5] border border-[#362211]/15 text-[#362211] font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-xs cursor-pointer active:scale-99"
        >
          <ImageIcon className="w-5 h-5 text-[#C68B59]" />
          <span>Upload from gallery</span>
        </button>
      </div>

      {/* Quick Test Samples */}
      <div className="pt-2">
        <div className="flex items-center justify-between text-xs text-[#362211]/70 mb-2">
          <span className="font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C68B59]" />
            Or try with instant demo labels:
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => handleSampleSelect('unsafe')}
            className="py-2.5 px-3 rounded-xl bg-[#F4F6F5] hover:bg-white border border-[#362211]/12 hover:border-[#C93B2B]/40 text-xs font-semibold text-[#362211] transition-all text-left flex items-center justify-between"
          >
            <span>Granola Bar Label</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#C93B2B]/10 text-[#C93B2B]">
              Unsafe Demo
            </span>
          </button>
          <button
            type="button"
            onClick={() => handleSampleSelect('safe')}
            className="py-2.5 px-3 rounded-xl bg-[#F4F6F5] hover:bg-white border border-[#362211]/12 hover:border-[#2E7D32]/40 text-xs font-semibold text-[#362211] transition-all text-left flex items-center justify-between"
          >
            <span>Rice Crackers Label</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#2E7D32]/10 text-[#2E7D32]">
              Safe Demo
            </span>
          </button>
        </div>
      </div>

      {/* Helper tips exactly matching screenshot 2 */}
      <div className="space-y-3 pt-3 text-xs sm:text-sm text-[#362211]/80">
        <div className="flex items-start gap-3">
          <SunMedium className="w-4 h-4 text-[#C68B59] shrink-0 mt-0.5" />
          <p>Avoid glare and shadows on shiny packaging.</p>
        </div>
        <div className="flex items-start gap-3">
          <Scan className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" />
          <p>Keep the full list in frame, edge to edge.</p>
        </div>
        <div className="flex items-start gap-3">
          <PlusCircle className="w-4 h-4 text-[#C68B59] shrink-0 mt-0.5" />
          <p>Add a second photo of the nutrition panel to check sugar and sodium.</p>
        </div>
      </div>
    </div>
  );
}
