import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { SCHEMES_DATA, JOBS_DATA, COURSES_DATA, NGOS_DATA, EMERGENCY_HELPLINES } from '../data/mockData';
import { Search, X, Landmark, Briefcase, GraduationCap, HeartHandshake, PhoneCall, ExternalLink, ArrowRight } from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setActiveTab } = useApp();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.trim().toLowerCase();

  const matchingSchemes = q
    ? SCHEMES_DATA.filter(
        s =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          (s.hindiName && s.hindiName.includes(q))
      ).slice(0, 4)
    : [];

  const matchingJobs = q
    ? JOBS_DATA.filter(
        j =>
          j.title.toLowerCase().includes(q) ||
          j.organization.toLowerCase().includes(q) ||
          j.location.toLowerCase().includes(q) ||
          j.category.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const matchingCourses = q
    ? COURSES_DATA.filter(
        c =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const matchingNgos = q
    ? NGOS_DATA.filter(
        n =>
          n.name.toLowerCase().includes(q) ||
          n.city.toLowerCase().includes(q) ||
          n.causes.some(c => c.toLowerCase().includes(q))
      ).slice(0, 2)
    : [];

  const matchingHelplines = q
    ? EMERGENCY_HELPLINES.filter(
        h =>
          h.title.toLowerCase().includes(q) ||
          h.number.includes(q) ||
          h.category.toLowerCase().includes(q)
      ).slice(0, 2)
    : [];

  const hasResults =
    matchingSchemes.length > 0 ||
    matchingJobs.length > 0 ||
    matchingCourses.length > 0 ||
    matchingNgos.length > 0 ||
    matchingHelplines.length > 0;

  const navigateTo = (tab: string) => {
    setActiveTab(tab);
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-stone-950/60 backdrop-blur-sm transition-opacity">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-stone-900 rounded-xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50">
          <Search className="w-5 h-5 text-stone-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search welfare schemes, jobs, courses, NGOs, helplines..."
            className="w-full bg-transparent text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] text-stone-400 bg-stone-200/60 dark:bg-stone-800 rounded font-mono">
            ESC
          </kbd>
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto p-4 space-y-5 text-xs">
          {!q && (
            <div className="py-6 text-center text-stone-500">
              <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
                Search across India's social welfare ecosystem
              </p>
              <p className="text-xs text-stone-400 mt-1">
                Try typing "Kisan", "Housing", "Electrician", "Food", "Loan", or "112"
              </p>
              
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {['PM-KISAN', 'PMAY Awas', 'Ayushman Bharat', 'MGNREGA', 'Digital Literacy', 'Helpline 112'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 bg-stone-100 dark:bg-stone-800 hover:bg-amber-100 dark:hover:bg-amber-950 text-stone-700 dark:text-stone-300 rounded text-xs transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {q && !hasResults && (
            <div className="py-12 text-center text-stone-500">
              <p className="text-sm font-semibold text-stone-700 dark:text-stone-300">No direct matches found</p>
              <p className="text-xs mt-1">Try another keyword or browse our directory by category.</p>
              <button
                onClick={() => navigateTo('schemes')}
                className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-700 text-white rounded text-xs font-medium"
              >
                <span>Browse All Government Schemes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Schemes Section */}
          {matchingSchemes.length > 0 && (
            <div>
              <div className="flex items-center justify-between font-semibold text-stone-500 uppercase tracking-wider text-[11px] mb-2">
                <span className="flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5 text-amber-600" />
                  Government Welfare Schemes ({matchingSchemes.length})
                </span>
                <button 
                  onClick={() => navigateTo('schemes')} 
                  className="text-amber-700 dark:text-amber-400 hover:underline normal-case font-normal"
                >
                  View all in Schemes
                </button>
              </div>
              <div className="space-y-1.5">
                {matchingSchemes.map(s => (
                  <div
                    key={s.id}
                    onClick={() => navigateTo('schemes')}
                    className="p-2.5 rounded-lg border border-stone-200/80 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/60 cursor-pointer transition-colors"
                  >
                    <div className="font-semibold text-stone-900 dark:text-stone-100 flex items-center justify-between">
                      <span>{s.name}</span>
                      <span className="text-[10px] text-amber-700 dark:text-amber-400 font-normal">{s.category}</span>
                    </div>
                    <p className="text-stone-600 dark:text-stone-400 text-[11px] line-clamp-1 mt-0.5">{s.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Jobs Section */}
          {matchingJobs.length > 0 && (
            <div>
              <div className="flex items-center justify-between font-semibold text-stone-500 uppercase tracking-wider text-[11px] mb-2">
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                  Employment & Jobs ({matchingJobs.length})
                </span>
                <button 
                  onClick={() => navigateTo('jobs')} 
                  className="text-amber-700 dark:text-amber-400 hover:underline normal-case font-normal"
                >
                  View all in Jobs
                </button>
              </div>
              <div className="space-y-1.5">
                {matchingJobs.map(j => (
                  <div
                    key={j.id}
                    onClick={() => navigateTo('jobs')}
                    className="p-2.5 rounded-lg border border-stone-200/80 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/60 cursor-pointer transition-colors"
                  >
                    <div className="font-semibold text-stone-900 dark:text-stone-100 flex items-center justify-between">
                      <span>{j.title}</span>
                      <span className="text-[10px] text-stone-500">{j.salary}</span>
                    </div>
                    <div className="text-stone-600 dark:text-stone-400 text-[11px] mt-0.5">
                      <span>{j.organization}</span> · <span>{j.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Courses Section */}
          {matchingCourses.length > 0 && (
            <div>
              <div className="flex items-center justify-between font-semibold text-stone-500 uppercase tracking-wider text-[11px] mb-2">
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                  Skill Development Courses ({matchingCourses.length})
                </span>
                <button 
                  onClick={() => navigateTo('skills')} 
                  className="text-amber-700 dark:text-amber-400 hover:underline normal-case font-normal"
                >
                  View all in Skills
                </button>
              </div>
              <div className="space-y-1.5">
                {matchingCourses.map(c => (
                  <div
                    key={c.id}
                    onClick={() => navigateTo('skills')}
                    className="p-2.5 rounded-lg border border-stone-200/80 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/60 cursor-pointer transition-colors"
                  >
                    <div className="font-semibold text-stone-900 dark:text-stone-100 flex items-center justify-between">
                      <span>{c.title}</span>
                      <span className="text-[10px] text-emerald-600 font-semibold">{c.isFree ? '100% Free' : 'Subsidized'}</span>
                    </div>
                    <div className="text-stone-600 dark:text-stone-400 text-[11px] mt-0.5">
                      <span>{c.provider}</span> · <span>{c.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Emergency Helplines Section */}
          {matchingHelplines.length > 0 && (
            <div>
              <div className="font-semibold text-stone-500 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-red-600" />
                Emergency & Helplines
              </div>
              <div className="space-y-1.5">
                {matchingHelplines.map(h => (
                  <div
                    key={h.number}
                    className="p-2.5 rounded-lg border border-red-200 dark:border-red-950 bg-red-50/50 dark:bg-red-950/20 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold text-stone-900 dark:text-stone-100">{h.title}</div>
                      <div className="text-[11px] text-stone-600 dark:text-stone-400">{h.description}</div>
                    </div>
                    <a
                      href={`tel:${h.number}`}
                      className="px-3 py-1 bg-red-600 text-white rounded font-bold text-xs hover:bg-red-700 whitespace-nowrap ml-3"
                    >
                      Call {h.number}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-stone-100 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-[11px] text-stone-500">
          <span>Official Social-Impact Guide for India</span>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="hover:text-stone-800 dark:hover:text-stone-200"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
