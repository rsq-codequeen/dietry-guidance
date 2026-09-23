import React from 'react';
import { Link } from 'react-router-dom';
import {
  Leaf,
  ShieldCheck,
  Cpu,
  HeartHandshake,
  Layers,
  Sparkles,
  ArrowRight,
  Code2,
  Lock,
} from 'lucide-react';
import SpotlightCard from '../components/reactbits/SpotlightCard';

export default function About() {
  return (
    <div className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F6F5] border border-[#362211]/12 text-xs font-semibold text-[#362211]">
          <Leaf className="w-4 h-4 text-[#2E7D32]" />
          <span>Dietary Guardian Mission</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#362211] tracking-tight">
          About Dietary Guardian
        </h1>
        <p className="text-lg sm:text-xl font-bold text-[#C68B59]">
          Better information. Safer choices.
        </p>
        <p className="text-base text-[#362211]/80 leading-relaxed">
          Designed to help people with dietary restrictions quickly understand
          ingredient labels and potential conflicts before making food purchases.
        </p>
      </div>

      {/* 3 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SpotlightCard>
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#2E7D32]/10 flex items-center justify-center text-[#2E7D32]">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#362211]">
              AI-Powered Analysis
            </h3>
            <p className="text-xs sm:text-sm text-[#362211]/75 leading-relaxed">
              Optical character recognition tailored specifically for micro-print packaging, nutritional charts, and complex allergen allergen declarations.
            </p>
          </div>
        </SpotlightCard>

        <SpotlightCard>
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#C68B59]/15 flex items-center justify-center text-[#C68B59]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#362211]">
              Personalized Profiles
            </h3>
            <p className="text-xs sm:text-sm text-[#362211]/75 leading-relaxed">
              Every dietary profile is tailored to the user. From severe celiac disease and peanut anaphylaxis to veganism, sugar monitoring, and custom notes.
            </p>
          </div>
        </SpotlightCard>

        <SpotlightCard>
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#2E7D32]/10 flex items-center justify-center text-[#2E7D32]">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#362211]">
              Accessibility First
            </h3>
            <p className="text-xs sm:text-sm text-[#362211]/75 leading-relaxed">
              Designed with clear contrast, screen-reader friendly semantics, tactile pill feedback, and crystal-clear color cues that never rely on color alone.
            </p>
          </div>
        </SpotlightCard>
      </div>

      {/* Tech Stack & AI-Ready Architecture Section */}
      <div className="p-8 sm:p-12 rounded-[32px] bg-[#F4F6F5] border border-[#362211]/10 space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2E7D32]">
            <Code2 className="w-4 h-4" />
            <span>Frontend Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#362211]">
            Modern Tech Stack & AI-Ready Architecture
          </h2>
          <p className="text-sm text-[#362211]/75 max-w-2xl leading-relaxed">
            This frontend prototype is cleanly isolated in <code className="text-[#362211] font-bold bg-white px-2 py-0.5 rounded border border-[#362211]/15">/frontend</code> and architected for plug-and-play connection with backend services.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { title: 'React 19', desc: 'Component View Layer' },
            { title: 'Vite 8', desc: 'Ultra-fast Tooling' },
            { title: 'Tailwind CSS', desc: 'Design Tokens & Styles' },
            { title: 'Framer Motion', desc: 'Smooth Micro-interactions' },
            { title: 'React Bits', desc: 'Interactive UI Primitives' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white border border-[#362211]/10 text-center space-y-1 shadow-xs"
            >
              <h4 className="font-bold text-sm text-[#362211]">{item.title}</h4>
              <p className="text-[11px] text-[#362211]/60 font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Backend Ready Callout */}
        <div className="p-5 rounded-2xl bg-white border border-[#C68B59]/30 flex items-start gap-4 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-[#C68B59]/15 flex items-center justify-center text-[#C68B59] shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-[#362211]">
              AI-Ready Frontend Architecture
            </h4>
            <p className="text-xs text-[#362211]/80 leading-relaxed">
              In accordance with collaborative team standards, this client operates entirely client-side using mock data. When the backend service is deployed by your teammate, all endpoints can seamlessly integrate into the centralized context provider without touching view logic.
            </p>
          </div>
        </div>

        <div className="text-center pt-4">
          <Link
            to="/scanner"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#2E7D32] text-white font-bold text-sm shadow-md hover:bg-[#256629] transition-all"
          >
            <span>Try the Scanner Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
