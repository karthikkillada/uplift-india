import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { SCHEMES_DATA, INDIAN_STATES } from '../data/mockData';
import { Scheme, SchemeCategory } from '../types';
import { 
  Search, 
  Filter, 
  Bookmark, 
  ExternalLink, 
  Volume2, 
  ShieldCheck, 
  FileText, 
  Check, 
  X, 
  Info,
  Building,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

const CATEGORIES: ('All' | SchemeCategory)[] = [
  'All',
  'Food Security',
  'Housing',
  'Education',
  'Healthcare',
  'Employment',
  'Financial Assistance',
  'Agriculture',
  'Women & Child Welfare',
  'Skill Development'
];

export const SchemesPage: React.FC = () => {
  const { t, savedSchemeIds, toggleSaveScheme, speakText, isSpeaking, stopSpeaking } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedState, setSelectedState] = useState<string>('All India');
  const [selectedLocation, setSelectedLocation] = useState<'All' | 'Rural Only' | 'Urban Only'>('All');
  const [selectedIncome, setSelectedIncome] = useState<string>('All');
  const [selectedOccupation, setSelectedOccupation] = useState<string>('All');

  const [activeModalScheme, setActiveModalScheme] = useState<Scheme | null>(null);
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  const filteredSchemes = useMemo(() => {
    return SCHEMES_DATA.filter(scheme => {
      // Search
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        scheme.name.toLowerCase().includes(q) ||
        scheme.description.toLowerCase().includes(q) ||
        (scheme.hindiName && scheme.hindiName.toLowerCase().includes(q)) ||
        scheme.benefits.toLowerCase().includes(q);

      // Category
      const matchCategory =
        selectedCategory === 'All' || scheme.category === selectedCategory;

      // Location
      const matchLocation =
        selectedLocation === 'All' ||
        scheme.locationApplicability === 'All India' ||
        scheme.locationApplicability === selectedLocation;

      // Income limit
      let matchIncome = true;
      if (selectedIncome !== 'All' && scheme.maxAnnualIncome) {
        const incomeNum = parseInt(selectedIncome, 10);
        matchIncome = scheme.maxAnnualIncome >= incomeNum;
      }

      // Occupation
      const matchOccupation =
        selectedOccupation === 'All' ||
        scheme.targetOccupations.some(occ =>
          occ.toLowerCase().includes(selectedOccupation.toLowerCase())
        );

      return matchSearch && matchCategory && matchLocation && matchIncome && matchOccupation;
    });
  }, [search, selectedCategory, selectedLocation, selectedIncome, selectedOccupation]);

  const toggleDocCheck = (doc: string) => {
    setCheckedDocs(prev => ({ ...prev, [doc]: !prev[doc] }));
  };

  const handleReadScheme = (scheme: Scheme) => {
    const textToRead = `${scheme.name}. ${scheme.description}. Key benefit: ${scheme.benefits}. Eligibility: ${scheme.eligibilitySummary}`;
    speakText(textToRead);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header and Trust Pledge */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Verified Government Social Welfare Repository</span>
        </div>
        <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-50">
          Government Welfare Schemes
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-300 max-w-3xl leading-relaxed">
          Search and filter verified Central and State public assistance schemes for agriculture, housing, healthcare, rations, education, and livelihood. Official government portals and Direct Benefit Transfer (DBT) guidelines are linked directly.
        </p>
      </div>

      {/* Official Source Disclaimer Banner */}
      <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-200 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-semibold">Public Service & Verification Note:</strong>
          <span>
            Uplift India does not charge any fee or collect money for scheme registration. All applications must be submitted directly through official government portals (such as <strong>myscheme.gov.in</strong> or authorized Gram Panchayat / CSC centers). Eligibility conditions are based on published government norms.
          </span>
        </div>
      </div>

      {/* Search & Filter Controls Container */}
      <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4">
        
        {/* Main Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by scheme name, keyword (e.g. Kisan, Housing, Pension, Ayushman)..."
            className="w-full pl-10 pr-4 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Categories Horizontal Filter Chips */}
        <div>
          <div className="text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">
            Filter by Category:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-amber-700 text-white shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200/80 dark:hover:bg-stone-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Filter Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-stone-100 dark:border-stone-800 text-xs">
          
          <div>
            <label className="block text-stone-500 dark:text-stone-400 font-medium mb-1">State / Territory</label>
            <select
              value={selectedState}
              onChange={e => setSelectedState(e.target.value)}
              className="w-full p-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-800 dark:text-stone-200 focus:outline-none"
            >
              {INDIAN_STATES.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-stone-500 dark:text-stone-400 font-medium mb-1">Location Area</label>
            <select
              value={selectedLocation}
              onChange={e => setSelectedLocation(e.target.value as any)}
              className="w-full p-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-800 dark:text-stone-200 focus:outline-none"
            >
              <option value="All">All Locations</option>
              <option value="Rural Only">Rural Only</option>
              <option value="Urban Only">Urban Only</option>
            </select>
          </div>

          <div>
            <label className="block text-stone-500 dark:text-stone-400 font-medium mb-1">Annual Family Income</label>
            <select
              value={selectedIncome}
              onChange={e => setSelectedIncome(e.target.value)}
              className="w-full p-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-800 dark:text-stone-200 focus:outline-none"
            >
              <option value="All">Any Income Level</option>
              <option value="120000">Below ₹1,20,000 (BPL / Antyodaya)</option>
              <option value="250000">Up to ₹2,50,000</option>
              <option value="500000">Up to ₹5,00,000</option>
            </select>
          </div>

          <div>
            <label className="block text-stone-500 dark:text-stone-400 font-medium mb-1">Target Occupation</label>
            <select
              value={selectedOccupation}
              onChange={e => setSelectedOccupation(e.target.value)}
              className="w-full p-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-800 dark:text-stone-200 focus:outline-none"
            >
              <option value="All">All Occupations</option>
              <option value="Farmer">Farmer / Agriculture</option>
              <option value="Daily Wage">Daily Wage Laborer</option>
              <option value="Street Vendor">Street Vendor / Hawkers</option>
              <option value="Artisan">Artisan / Traditional Crafts</option>
              <option value="Student">Student / Youth</option>
              <option value="Senior Citizen">Senior Citizen</option>
            </select>
          </div>

        </div>

      </div>

      {/* Results Count & Active Filters Indicator */}
      <div className="flex items-center justify-between text-xs text-stone-500">
        <div>
          Showing <strong>{filteredSchemes.length}</strong> welfare schemes matching criteria
        </div>
        {(search || selectedCategory !== 'All' || selectedLocation !== 'All' || selectedIncome !== 'All' || selectedOccupation !== 'All') && (
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('All');
              setSelectedLocation('All');
              setSelectedIncome('All');
              setSelectedOccupation('All');
            }}
            className="text-amber-700 dark:text-amber-400 hover:underline font-medium"
          >
            Reset All Filters
          </button>
        )}
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSchemes.map(scheme => {
          const isSaved = savedSchemeIds.includes(scheme.id);
          return (
            <div
              key={scheme.id}
              className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Ministry & Category */}
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-semibold text-amber-700 dark:text-amber-400">{scheme.category}</span>
                    <span>·</span>
                    <span className="text-stone-500 text-[11px] truncate max-w-[200px]">{scheme.ministry}</span>
                  </div>

                  <button
                    onClick={() => toggleSaveScheme(scheme.id)}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      isSaved
                        ? 'bg-amber-50 dark:bg-amber-950 border-amber-300 text-amber-700 dark:text-amber-300'
                        : 'border-stone-200 dark:border-stone-800 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
                    }`}
                    title={isSaved ? 'Saved to dashboard' : 'Save scheme'}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-600 text-amber-600' : ''}`} />
                  </button>
                </div>

                {/* Scheme Name */}
                <h3 className="font-serif-heading text-lg font-bold text-stone-900 dark:text-stone-100 leading-snug">
                  {scheme.name}
                </h3>

                {scheme.hindiName && (
                  <div className="text-xs text-stone-500 dark:text-stone-400 -mt-1 font-medium">
                    {scheme.hindiName}
                  </div>
                )}

                <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-3 leading-relaxed">
                  {scheme.description}
                </p>

                {/* Eligibility Summary Box */}
                <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700 text-xs space-y-1">
                  <div>
                    <strong className="text-stone-900 dark:text-stone-100 font-semibold">Eligibility: </strong>
                    <span className="text-stone-600 dark:text-stone-300">{scheme.eligibilitySummary}</span>
                  </div>
                  <div className="text-[11px] text-stone-500 pt-1 flex flex-wrap gap-2">
                    <span>Applicability: <strong>{scheme.locationApplicability}</strong></span>
                    {scheme.beneficiaryCount && (
                      <>
                        <span>·</span>
                        <span>Scale: <strong>{scheme.beneficiaryCount}</strong></span>
                      </>
                    )}
                  </div>
                </div>

                {/* Key Benefits */}
                <div className="p-3 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/40 text-xs">
                  <strong className="text-emerald-900 dark:text-emerald-300 font-semibold block mb-0.5">Assistance Provided:</strong>
                  <span className="text-stone-700 dark:text-stone-300">{scheme.benefits}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 mt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                <button
                  onClick={() => handleReadScheme(scheme)}
                  className="flex items-center gap-1.5 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
                  title="Listen in voice"
                >
                  <Volume2 className="w-4 h-4 text-amber-600" />
                  <span>Read Aloud</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveModalScheme(scheme)}
                    className="px-3.5 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 font-medium"
                  >
                    View Details & Docs
                  </button>
                  <a
                    href={scheme.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-800 font-medium flex items-center gap-1"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Scheme Detail & Required Documents Modal */}
      {activeModalScheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm">
          <div className="w-full max-w-3xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-stone-200 dark:border-stone-800 flex items-start justify-between bg-stone-50 dark:bg-stone-950">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-400">
                  <span>{activeModalScheme.category}</span>
                  <span>·</span>
                  <span>{activeModalScheme.ministry}</span>
                </div>
                <h2 className="font-serif-heading text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
                  {activeModalScheme.name}
                </h2>
                {activeModalScheme.hindiName && (
                  <p className="text-xs text-stone-500 font-medium">{activeModalScheme.hindiName}</p>
                )}
              </div>
              <button
                onClick={() => setActiveModalScheme(null)}
                className="p-1.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-lg hover:bg-stone-200/60 dark:hover:bg-stone-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="overflow-y-auto p-6 space-y-6 text-xs sm:text-sm">
              
              {/* Detailed Description */}
              <div>
                <h4 className="font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider text-xs mb-1">
                  Scheme Overview & Objective
                </h4>
                <p className="text-stone-600 dark:text-stone-300 leading-relaxed font-sans-text">
                  {activeModalScheme.description}
                </p>
              </div>

              {/* Benefits */}
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50">
                <h4 className="font-semibold text-emerald-900 dark:text-emerald-300 mb-1">
                  Direct Benefits & Financial Entitlement:
                </h4>
                <p className="text-emerald-800 dark:text-emerald-200">
                  {activeModalScheme.benefits}
                </p>
              </div>

              {/* Eligibility Criteria Detailed */}
              <div className="space-y-2">
                <h4 className="font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider text-xs">
                  Eligibility Criteria
                </h4>
                <div className="p-3.5 rounded-lg bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 space-y-2 text-xs">
                  <p className="text-stone-700 dark:text-stone-300">{activeModalScheme.eligibilitySummary}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-stone-200/60 dark:border-stone-700 text-stone-600 dark:text-stone-400 text-[11px]">
                    <div>
                      <strong>Age Range:</strong> {activeModalScheme.minAge ?? 0} to {activeModalScheme.maxAge ?? 100} Years
                    </div>
                    <div>
                      <strong>Max Income:</strong> {activeModalScheme.maxAnnualIncome ? `₹${activeModalScheme.maxAnnualIncome.toLocaleString('en-IN')}/year` : 'No Income Cap'}
                    </div>
                    <div>
                      <strong>Application Mode:</strong> {activeModalScheme.applicationMode}
                    </div>
                  </div>
                </div>
              </div>

              {/* Required Documents Interactive Checklist */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider text-xs">
                    Required Documents Checklist
                  </h4>
                  <span className="text-[11px] text-stone-400">Click to tick documents you already possess</span>
                </div>
                
                <div className="space-y-1.5">
                  {activeModalScheme.requiredDocuments.map((doc, idx) => {
                    const isChecked = !!checkedDocs[`${activeModalScheme.id}-${idx}`];
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleDocCheck(`${activeModalScheme.id}-${idx}`)}
                        className={`p-2.5 rounded-lg border cursor-pointer transition-colors flex items-center justify-between text-xs ${
                          isChecked
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                            : 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                            isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-stone-300'
                          }`}>
                            {isChecked && <Check className="w-3 h-3" />}
                          </span>
                          <span>{doc}</span>
                        </span>
                        <span className="text-[10px] text-stone-400">
                          {isChecked ? 'Ready' : 'Pending'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Application Process Step-by-Step */}
              <div className="space-y-2">
                <h4 className="font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider text-xs">
                  Step-by-Step Application Process
                </h4>
                <div className="space-y-2">
                  {activeModalScheme.applicationProcess.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800/40 text-xs">
                      <span className="w-5 h-5 rounded-full bg-amber-700 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-sans-text">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Official Source Disclaimer in modal */}
              <div className="p-3 bg-stone-100 dark:bg-stone-800/60 rounded-lg text-[11px] text-stone-500">
                Official source verified from Government gazettes and <strong>{activeModalScheme.officialUrl}</strong>. For disputes or grievances, contact your local Gram Rozgar Sahayak, Block Development Officer, or call the 14443 / 112 citizen assistance desks.
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-stone-50 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <button
                onClick={() => handleReadScheme(activeModalScheme)}
                className="flex items-center gap-1.5 text-stone-600 dark:text-stone-300 hover:text-stone-900 font-medium"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Listen Aloud</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleSaveScheme(activeModalScheme.id)}
                  className="px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 font-medium"
                >
                  {savedSchemeIds.includes(activeModalScheme.id) ? 'Saved in Dashboard' : 'Save Scheme'}
                </button>
                <a
                  href={activeModalScheme.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-lg font-semibold flex items-center gap-1.5 shadow"
                >
                  <span>Apply on Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
