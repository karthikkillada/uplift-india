import React from 'react';
import { useApp } from '../context/AppContext';
import { LANGUAGES } from '../data/translations';
import { ShieldCheck, Heart, ExternalLink, PhoneCall, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab, setLanguage, language, t } = useApp();

  return (
    <footer className="bg-stone-900 text-stone-300 pt-12 pb-8 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Emergency Help Ribbon in Footer */}
        <div className="mb-10 p-4 rounded-xl bg-stone-800/80 border border-stone-700/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-10 h-10 rounded-full bg-red-950 flex items-center justify-center text-red-400 shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-white text-sm">24x7 Verified Citizen Helplines</div>
              <div className="text-stone-400 text-xs">Toll-free emergency numbers for immediate food, safety, child protection, and medical aid</div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <a href="tel:112" className="px-3 py-1.5 bg-stone-700 hover:bg-stone-600 rounded-lg text-white font-medium">
              National ERSS: <strong className="text-amber-300">112</strong>
            </a>
            <a href="tel:1098" className="px-3 py-1.5 bg-stone-700 hover:bg-stone-600 rounded-lg text-white font-medium">
              Childline: <strong className="text-amber-300">1098</strong>
            </a>
            <a href="tel:181" className="px-3 py-1.5 bg-stone-700 hover:bg-stone-600 rounded-lg text-white font-medium">
              Women: <strong className="text-amber-300">181</strong>
            </a>
            <a href="tel:1930" className="px-3 py-1.5 bg-stone-700 hover:bg-stone-600 rounded-lg text-white font-medium">
              Cyber/UPI Fraud: <strong className="text-amber-300">1930</strong>
            </a>
            <a href="tel:14555" className="px-3 py-1.5 bg-stone-700 hover:bg-stone-600 rounded-lg text-white font-medium">
              Ayushman: <strong className="text-amber-300">14555</strong>
            </a>
          </div>
        </div>

        {/* 4 Columns of navigation & info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Platform Purpose & SDG 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-amber-600 flex items-center justify-center text-white font-bold text-xs">
                UI
              </div>
              <span className="font-serif-heading text-lg font-bold text-white tracking-tight">
                Uplift India
              </span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              Dedicated to United Nations Sustainable Development Goal 1 (SDG 1: No Poverty) in India. Eliminating information barriers between underserved citizens and public welfare programs.
            </p>
            <div className="pt-2 text-[11px] text-emerald-400 font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Independent Civil Society Platform</span>
            </div>
          </div>

          {/* Col 2: Citizen Resources */}
          <div>
            <h4 className="text-stone-100 font-semibold text-xs tracking-wider uppercase mb-3">
              Citizen Welfare
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button onClick={() => setActiveTab('schemes')} className="hover:text-amber-400 transition-colors">
                  Government Welfare Schemes
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('eligibility')} className="hover:text-amber-400 transition-colors">
                  Am I Eligible? (Scheme Finder)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('jobs')} className="hover:text-amber-400 transition-colors">
                  Employment & Rozgar Portal
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('skills')} className="hover:text-amber-400 transition-colors">
                  Free Skill Development Courses
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('financial')} className="hover:text-amber-400 transition-colors">
                  Financial Literacy & UPI Safety
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('login')} className="hover:text-amber-400 transition-colors font-medium text-amber-200">
                  Citizen & Partner Login
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Community & Social Impact */}
          <div>
            <h4 className="text-stone-100 font-semibold text-xs tracking-wider uppercase mb-3">
              Community & Action
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button onClick={() => setActiveTab('ngos')} className="hover:text-amber-400 transition-colors">
                  Verified NGO Directory
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('volunteer')} className="hover:text-amber-400 transition-colors">
                  Volunteer Registration
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('stories')} className="hover:text-amber-400 transition-colors">
                  Real Success Stories
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('emergency')} className="hover:text-amber-400 transition-colors">
                  Emergency Help & Food Support
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('admin')} className="hover:text-amber-400 transition-colors">
                  Admin Analytics & Impact Reports
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Government Portals */}
          <div>
            <h4 className="text-stone-100 font-semibold text-xs tracking-wider uppercase mb-3">
              Official External Portals
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <a href="https://www.myscheme.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 flex items-center gap-1">
                  <span>myScheme Portal (Govt of India)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://pmkisan.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 flex items-center gap-1">
                  <span>PM-KISAN Samman Nidhi</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://pmjay.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 flex items-center gap-1">
                  <span>Ayushman Bharat PM-JAY</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://nrega.nic.in" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 flex items-center gap-1">
                  <span>MGNREGA Rural Works</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://scholarships.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 flex items-center gap-1">
                  <span>National Scholarship Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Multilingual Selector Strip */}
        <div className="py-4 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3 text-[11px] text-stone-400">
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-stone-400" />
            <span>Select Preferred Language:</span>
            <div className="flex flex-wrap gap-2">
              {LANGUAGES.map(l => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    language === l.code ? 'bg-amber-700 text-white font-medium' : 'hover:text-white'
                  }`}
                >
                  {l.nativeName}
                </button>
              ))}
            </div>
          </div>
          <div>
            <span>UN SDG 1: No Poverty by 2030</span>
          </div>
        </div>

        {/* Disclaimer & Legal */}
        <div className="pt-4 border-t border-stone-800 text-[11px] text-stone-500 leading-relaxed space-y-1">
          <p>
            <strong>Official Disclaimer:</strong> Uplift India is an independent social impact open initiative created for academic demonstration, civil society education, and public awareness. It is not affiliated with, nor does it represent, any government department. Scheme details, eligibility criteria, and benefit structures are compiled from official public gazettes and government portals. Users should verify specific terms directly on official ministry portals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-2">
            <p>© {new Date().getFullYear()} Uplift India Initiative · B.Tech CSE Final Year Capstone Project · SDG 1: No Poverty.</p>
            <p className="flex items-center gap-1 mt-1 sm:mt-0">
              Built with purpose for India's inclusive growth
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};
