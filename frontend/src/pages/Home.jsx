import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  QrCode,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sliders,
  AlertOctagon,
  Sparkles,
  CheckCircle,
  ScanLine,
  ChevronRight,
  Clock,
  Eye,
  Heart,
} from 'lucide-react';
import BlurText from '../components/reactbits/BlurText';
import SpotlightCard from '../components/reactbits/SpotlightCard';
import ShinyText from '../components/reactbits/ShinyText';
import AnimatedContent from '../components/reactbits/AnimatedContent';
import { useDietary } from '../context/DietaryContext';

export default function Home() {
  const { selectedRestrictions } = useDietary();

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 overflow-hidden">
        {/* Subtle organic gradient blur background */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#2E7D32]/10 via-[#C68B59]/10 to-transparent blur-3xl -z-10 rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Pill badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F6F5] border border-[#362211]/12 text-xs font-semibold text-[#362211]">
                <span className="w-2 h-2 rounded-full bg-[#2E7D32]"></span>
                <ShinyText text="Organic Tech • Next-Gen Dietary Safety" />
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#362211] tracking-tight leading-[1.15]">
                <BlurText
                  text="Know What's Inside."
                  delay={0.05}
                  className="text-[#362211] font-extrabold"
                />
              </h1>

              {/* Subheading */}
              <p className="text-lg sm:text-xl text-[#362211]/80 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
                AI-powered food label scanning for people with dietary restrictions.
                Scan ingredients in seconds, identify hidden allergens, and make confident choices every grocery trip.
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/profile"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-base shadow-xl shadow-[#2E7D32]/25 hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-3 active:scale-98"
                >
                  <QrCode className="w-5 h-5" />
                  <span>Scan a Product</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#how-it-works"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#F4F6F5] hover:bg-white border border-[#362211]/15 text-[#362211] font-bold text-base transition-all duration-200 flex items-center justify-center gap-2 hover:border-[#362211]/30"
                >
                  <span>How It Works</span>
                  <ChevronRight className="w-4 h-4 text-[#C68B59]" />
                </a>
              </div>

              {/* Micro Trust Proof */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-[#362211]/70 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#2E7D32]" />
                  <span>No account needed</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#2E7D32]" />
                  <span>Local privacy</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#2E7D32]" />
                  <span>Instant OCR</span>
                </div>
              </div>
            </div>

            {/* Right Visual Prototype Mockup Card */}
            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative mx-auto max-w-sm rounded-[32px] p-4 bg-white border-2 border-[#362211]/12 shadow-2xl shadow-[#362211]/10"
              >
                {/* Mock Phone Frame Header */}
                <div className="flex items-center justify-between pb-3 px-2 border-b border-[#362211]/10 text-xs font-bold text-[#362211]">
                  <span className="text-[#362211]/60">9:41</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#2E7D32]"></span>
                    <span className="text-[#2E7D32]">Dietary Guardian</span>
                  </div>
                </div>

                {/* Card Content inside mockup */}
                <div className="pt-4 space-y-3.5">
                  {/* Checking badge */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F4F6F5] text-xs font-semibold text-[#362211]">
                    <span className="text-[#362211]/70">Active Restrictions:</span>
                    <span className="text-[#2E7D32] font-bold">Gluten-free, Low sugar</span>
                  </div>

                  {/* Scanned Card Preview */}
                  <div className="p-4 rounded-2xl bg-[#5A1D1D] text-white border border-[#C93B2B]/50 shadow-sm space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#C93B2B] flex items-center justify-center text-xs font-black">
                        ✕
                      </div>
                      <h4 className="font-extrabold text-lg">Unsafe</h4>
                    </div>
                    <p className="text-xs text-white/90 leading-relaxed">
                      Contains barley malt and wheat flour, both gluten sources. Sugar is also over your limit.
                    </p>
                  </div>

                  {/* Ingredients highlight mini */}
                  <div className="p-3 rounded-2xl bg-[#F4F6F5] border border-[#362211]/10 text-xs leading-relaxed">
                    <p className="font-bold text-[#362211] mb-1">Detected ingredients:</p>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-1.5 py-0.5 rounded bg-white text-[#362211]">Rolled oats</span>
                      <span className="px-1.5 py-0.5 rounded bg-[#C93B2B]/10 text-[#C93B2B] font-bold border border-[#C93B2B]/40">sugar</span>
                      <span className="px-1.5 py-0.5 rounded bg-[#C93B2B]/10 text-[#C93B2B] font-bold border border-[#C93B2B]/40">barley malt</span>
                      <span className="px-1.5 py-0.5 rounded bg-[#C93B2B]/10 text-[#C93B2B] font-bold border border-[#C93B2B]/40">wheat flour</span>
                    </div>
                  </div>

                  {/* Quick Action Button inside mockup */}
                  <Link
                    to="/scanner"
                    className="w-full py-3 rounded-xl bg-[#2E7D32] text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#256629] transition-colors"
                  >
                    <span>Try Interactive Scanner</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section (3 Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4F6F5] border border-[#362211]/10 text-xs font-bold text-[#C68B59] uppercase tracking-wider">
            Key Features
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#362211] tracking-tight">
            Designed for Precision & Peace of Mind
          </h2>
          <p className="text-base text-[#362211]/75">
            Everything you need to navigate packaged groceries with total clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <SpotlightCard>
            <div className="space-y-4">
              <div className="w-13 h-13 rounded-2xl bg-[#2E7D32]/10 border border-[#2E7D32]/25 flex items-center justify-center text-[#2E7D32]">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#362211]">
                Instant Label Analysis
              </h3>
              <p className="text-sm text-[#362211]/80 leading-relaxed">
                Get results in seconds. High accuracy optical scanning detects small print, hidden allergens, and nutritional thresholds instantly.
              </p>
              <div className="pt-2 text-xs font-bold text-[#2E7D32] flex items-center gap-1">
                <span>Sub-second detection</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </SpotlightCard>

          {/* Card 2 */}
          <SpotlightCard>
            <div className="space-y-4">
              <div className="w-13 h-13 rounded-2xl bg-[#C68B59]/15 border border-[#C68B59]/30 flex items-center justify-center text-[#C68B59]">
                <Sliders className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#362211]">
                Personalized Dietary Profiles
              </h3>
              <p className="text-sm text-[#362211]/80 leading-relaxed">
                Set your dietary restrictions and preferences. Tailor rules for celiac disease, nut allergies, low sodium, veganism, or custom ingredients.
              </p>
              <div className="pt-2 text-xs font-bold text-[#C68B59] flex items-center gap-1">
                <span>Flexible strictness modes</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </SpotlightCard>

          {/* Card 3 */}
          <SpotlightCard>
            <div className="space-y-4">
              <div className="w-13 h-13 rounded-2xl bg-[#2E7D32]/10 border border-[#2E7D32]/25 flex items-center justify-center text-[#2E7D32]">
                <AlertOctagon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#362211]">
                Clear Ingredient Warnings
              </h3>
              <p className="text-sm text-[#362211]/80 leading-relaxed">
                See exactly which ingredients may conflict with your profile. Interactive highlighted words provide transparent rationale on why it was flagged.
              </p>
              <div className="pt-2 text-xs font-bold text-[#2E7D32] flex items-center gap-1">
                <span>Interactive popover breakdown</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </SpotlightCard>
        </div>
      </section>

      {/* How It Works (4 Steps) */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="rounded-[36px] bg-[#F4F6F5] border border-[#362211]/10 p-8 sm:p-14 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2E7D32]">
              Simple 4-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#362211]">
              How Dietary Guardian Works
            </h2>
            <p className="text-sm sm:text-base text-[#362211]/75">
              From taking a photo to a comprehensive safety analysis in under 5 seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-2xl border border-[#362211]/10 shadow-xs space-y-4 relative">
              <div className="w-10 h-10 rounded-xl bg-[#362211] text-white font-extrabold flex items-center justify-center text-sm">
                01
              </div>
              <h3 className="text-lg font-bold text-[#362211]">
                Choose Restriction
              </h3>
              <p className="text-xs sm:text-sm text-[#362211]/75 leading-relaxed">
                Select your dietary profile or custom rules. Configure strictness between medical allergy or lifestyle preference.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-2xl border border-[#362211]/10 shadow-xs space-y-4 relative">
              <div className="w-10 h-10 rounded-xl bg-[#2E7D32] text-white font-extrabold flex items-center justify-center text-sm">
                02
              </div>
              <h3 className="text-lg font-bold text-[#362211]">
                Scan Label
              </h3>
              <p className="text-xs sm:text-sm text-[#362211]/75 leading-relaxed">
                Upload or take a photo of the product label. Our optical viewfinder guides framing for optimal clarity.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-2xl border border-[#362211]/10 shadow-xs space-y-4 relative">
              <div className="w-10 h-10 rounded-xl bg-[#C68B59] text-white font-extrabold flex items-center justify-center text-sm">
                03
              </div>
              <h3 className="text-lg font-bold text-[#362211]">
                AI Checks Ingredients
              </h3>
              <p className="text-xs sm:text-sm text-[#362211]/75 leading-relaxed">
                Analyze the ingredients against your dietary restrictions, checking for hidden barley, dairy derivatives, or excessive sugar.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-6 rounded-2xl border border-[#362211]/10 shadow-xs space-y-4 relative">
              <div className="w-10 h-10 rounded-xl bg-[#362211] text-white font-extrabold flex items-center justify-center text-sm">
                04
              </div>
              <h3 className="text-lg font-bold text-[#362211]">
                Understand the Result
              </h3>
              <p className="text-xs sm:text-sm text-[#362211]/75 leading-relaxed">
                See whether the product is safe and why. Tap any highlighted ingredient to see why it was flagged.
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <Link
              to="/profile"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-base shadow-lg shadow-[#2E7D32]/25 transition-all"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
