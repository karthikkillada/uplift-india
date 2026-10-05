import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SCHEMES_DATA, INDIAN_STATES } from '../data/mockData';
import { Scheme } from '../types';
import { 
  CheckCircle2, 
  HelpCircle, 
  AlertTriangle, 
  Sparkles, 
  Bookmark, 
  ExternalLink, 
  ArrowRight, 
  RotateCcw,
  ShieldCheck,
  Check
} from 'lucide-react';

interface MatchedResult {
  scheme: Scheme;
  matchScore: number;
  matchedReasons: string[];
}

export const EligibilityPage: React.FC = () => {
  const { savedSchemeIds, toggleSaveScheme, setActiveTab } = useApp();

  // Form State
  const [age, setAge] = useState<number>(30);
  const [state, setState] = useState<string>('Uttar Pradesh');
  const [occupation, setOccupation] = useState<string>('Farmer');
  const [annualIncome, setAnnualIncome] = useState<number>(120000);
  const [locationType, setLocationType] = useState<'Rural' | 'Urban'>('Rural');
  const [roleType, setRoleType] = useState<string>('Farmer');
  const [hasDisability, setHasDisability] = useState<boolean>(false);
  const [familySize, setFamilySize] = useState<number>(4);
  const [gender, setGender] = useState<'Any' | 'Female' | 'Male'>('Any');

  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [matchedResults, setMatchedResults] = useState<MatchedResult[]>([]);

  const handleCalculateEligibility = (e: React.FormEvent) => {
    e.preventDefault();

    const results: MatchedResult[] = [];

    SCHEMES_DATA.forEach(scheme => {
      let score = 0;
      const reasons: string[] = [];

      // 1. Age check
      const minAge = scheme.minAge ?? 0;
      const maxAge = scheme.maxAge ?? 100;
      if (age >= minAge && age <= maxAge) {
        score += 25;
        reasons.push(`Your age (${age} years) falls within the eligible range (${minAge}-${maxAge} yrs)`);
      } else {
        // Disqualified if strictly out of age range
        return;
      }

      // 2. Location Check (Rural vs Urban)
      if (scheme.locationApplicability === 'All India') {
        score += 20;
        reasons.push(`Available nationwide across both rural and urban areas`);
      } else if (scheme.locationApplicability === 'Rural Only' && locationType === 'Rural') {
        score += 30;
        reasons.push(`Tailored specifically for rural households`);
      } else if (scheme.locationApplicability === 'Urban Only' && locationType === 'Urban') {
        score += 30;
        reasons.push(`Tailored specifically for urban residents and street vendors`);
      } else {
        // Location mismatch
        return;
      }

      // 3. Income Check
      if (!scheme.maxAnnualIncome) {
        score += 15;
        reasons.push(`No upper household income ceiling restriction`);
      } else if (annualIncome <= scheme.maxAnnualIncome) {
        score += 25;
        reasons.push(`Annual income of ₹${annualIncome.toLocaleString('en-IN')} is within maximum limit of ₹${scheme.maxAnnualIncome.toLocaleString('en-IN')}`);
      } else {
        return;
      }

      // 4. Occupation & Role Match
      const matchesOccupation = scheme.targetOccupations.some(occ => {
        const occL = occ.toLowerCase();
        return (
          occL.includes(occupation.toLowerCase()) ||
          occL.includes(roleType.toLowerCase()) ||
          occL.includes('all') ||
          (occupation === 'Farmer' && occL.includes('agri')) ||
          (occupation === 'Daily Wage' && (occL.includes('worker') || occL.includes('laborer'))) ||
          (occupation === 'Student' && occL.includes('youth'))
        );
      });

      if (matchesOccupation) {
        score += 25;
        reasons.push(`Direct occupational fit for ${occupation} / ${roleType}`);
      } else if (scheme.targetOccupations.some(o => o.toLowerCase().includes('all'))) {
        score += 15;
        reasons.push(`Open to all citizen categories`);
      }

      // 5. Special conditions
      if (hasDisability && scheme.id === 'nsap-pension') {
        score += 15;
        reasons.push(`Priority disability social pension coverage applicable`);
      }

      if (gender === 'Female' && (scheme.category === 'Women & Child Welfare' || scheme.id === 'sukanya-samriddhi' || scheme.id === 'pm-mudra')) {
        score += 15;
        reasons.push(`Priority allocation for women entrepreneurs & beneficiaries`);
      }

      if (score >= 45) {
        results.push({
          scheme,
          matchScore: Math.min(score, 100),
          matchedReasons: reasons
        });
      }
    });

    results.sort((a, b) => b.matchScore - a.matchScore);
    setMatchedResults(results);
    setHasSubmitted(true);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const resetForm = () => {
    setHasSubmitted(false);
    setMatchedResults([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Questionnaire Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Intelligent Welfare Scheme Matching Tool</span>
        </div>
        <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-50">
          Am I Eligible?
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed">
          Answer 8 simple questions about your household. Our matching algorithm immediately identifies verified government welfare programs, subsidies, and employment guarantees you likely qualify for.
        </p>
      </div>

      {/* Mandatory Official Disclaimer */}
      <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-semibold">Guidance Disclaimer:</strong>
          <span>
            Eligibility results are only a guide based on standard criteria. Official sanction requires administrative verification of documents (Aadhaar, SECC status, land records) by the designated nodal department or Gram Sabha. Please verify the final eligibility requirements on the official government website.
          </span>
        </div>
      </div>

      {/* The Questionnaire Form */}
      {!hasSubmitted ? (
        <form onSubmit={handleCalculateEligibility} className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-md space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
            
            {/* 1. Age */}
            <div>
              <label className="block font-semibold text-stone-800 dark:text-stone-200 mb-1.5">
                1. Your Age (Years) <span className="text-amber-600">*</span>
              </label>
              <input
                type="number"
                min="10"
                max="100"
                value={age}
                onChange={e => setAge(parseInt(e.target.value, 10) || 18)}
                className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                required
              />
              <span className="text-[11px] text-stone-400 mt-1 block">Min 10, Max 100 years</span>
            </div>

            {/* 2. State */}
            <div>
              <label className="block font-semibold text-stone-800 dark:text-stone-200 mb-1.5">
                2. State / Union Territory <span className="text-amber-600">*</span>
              </label>
              <select
                value={state}
                onChange={e => setState(e.target.value)}
                className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                required
              >
                {INDIAN_STATES.filter(s => s !== 'All India').map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            {/* 3. Occupation */}
            <div>
              <label className="block font-semibold text-stone-800 dark:text-stone-200 mb-1.5">
                3. Primary Occupation <span className="text-amber-600">*</span>
              </label>
              <select
                value={occupation}
                onChange={e => setOccupation(e.target.value)}
                className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <option value="Farmer">Farmer / Agriculture</option>
                <option value="Daily Wage">Daily Wage Laborer / Construction</option>
                <option value="Street Vendor">Street Vendor / Hawkers</option>
                <option value="Artisan">Traditional Artisan / Handloom / Crafts</option>
                <option value="Domestic Worker">Domestic Worker / Helper</option>
                <option value="Small Shopkeeper">Small Shopkeeper / Micro-Trader</option>
                <option value="Unemployed">Unemployed Seeking Work</option>
                <option value="Student">Student / Apprentice</option>
                <option value="Homemaker">Homemaker</option>
                <option value="Senior Citizen">Retired / Senior Citizen</option>
              </select>
            </div>

            {/* 4. Annual Family Income */}
            <div>
              <label className="block font-semibold text-stone-800 dark:text-stone-200 mb-1.5">
                4. Total Annual Family Income (INR) <span className="text-amber-600">*</span>
              </label>
              <select
                value={annualIncome}
                onChange={e => setAnnualIncome(parseInt(e.target.value, 10))}
                className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <option value={75000}>Less than ₹75,000 / year (Antyodaya / Extreme Poverty)</option>
                <option value={120000}>₹75,000 to ₹1,20,000 / year (BPL / Priority Household)</option>
                <option value={180000}>₹1,20,000 to ₹1,80,000 / year</option>
                <option value={250000}>₹1,80,000 to ₹2,50,000 / year (Lower Middle Tier)</option>
                <option value={500000}>₹2,50,000 to ₹5,00,000 / year</option>
                <option value={800000}>Above ₹5,00,000 / year</option>
              </select>
              <span className="text-[11px] text-stone-400 mt-1 block">Combined annual earnings of all family members</span>
            </div>

            {/* 5. Location Type (Rural/Urban) */}
            <div>
              <label className="block font-semibold text-stone-800 dark:text-stone-200 mb-1.5">
                5. Location Type <span className="text-amber-600">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setLocationType('Rural')}
                  className={`py-2.5 px-4 rounded-xl border text-center font-medium transition-colors ${
                    locationType === 'Rural'
                      ? 'bg-amber-100 dark:bg-amber-950 border-amber-600 text-amber-900 dark:text-amber-200 font-bold'
                      : 'border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
                  }`}
                >
                  Rural (Village / Gram Panchayat)
                </button>
                <button
                  type="button"
                  onClick={() => setLocationType('Urban')}
                  className={`py-2.5 px-4 rounded-xl border text-center font-medium transition-colors ${
                    locationType === 'Urban'
                      ? 'bg-amber-100 dark:bg-amber-950 border-amber-600 text-amber-900 dark:text-amber-200 font-bold'
                      : 'border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
                  }`}
                >
                  Urban (Town / City / Nagar Palika)
                </button>
              </div>
            </div>

            {/* 6. Primary Profile Category */}
            <div>
              <label className="block font-semibold text-stone-800 dark:text-stone-200 mb-1.5">
                6. Broad Category <span className="text-amber-600">*</span>
              </label>
              <select
                value={roleType}
                onChange={e => setRoleType(e.target.value)}
                className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <option value="Farmer">Farmer (Cultivator / Landholder)</option>
                <option value="Worker">Worker / Wage Laborer</option>
                <option value="Student">Student (Pre-matric / Post-matric / College)</option>
                <option value="Youth">Unemployed Youth Seeking Skilling</option>
                <option value="Other">Other / General Citizen</option>
              </select>
            </div>

            {/* 7. Disability Status */}
            <div>
              <label className="block font-semibold text-stone-800 dark:text-stone-200 mb-1.5">
                7. Disability Status (Divyangjan)
              </label>
              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="disability"
                    checked={hasDisability === false}
                    onChange={() => setHasDisability(false)}
                    className="accent-amber-600"
                  />
                  <span className="text-stone-700 dark:text-stone-300">No</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="disability"
                    checked={hasDisability === true}
                    onChange={() => setHasDisability(true)}
                    className="accent-amber-600"
                  />
                  <span className="text-stone-700 dark:text-stone-300">Yes (Voluntarily provided for disability welfare)</span>
                </label>
              </div>
            </div>

            {/* 8. Family Size & Gender */}
            <div>
              <label className="block font-semibold text-stone-800 dark:text-stone-200 mb-1.5">
                8. Total Family Members
              </label>
              <input
                type="number"
                min="1"
                max="15"
                value={familySize}
                onChange={e => setFamilySize(parseInt(e.target.value, 10) || 1)}
                className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

          </div>

          <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Check My Eligible Schemes Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </form>
      ) : (
        /* Results Section */
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider block">
                Verification Analysis Complete
              </span>
              <h2 className="font-serif-heading text-2xl font-bold text-stone-900 dark:text-stone-100">
                You Potentially Qualify for {matchedResults.length} Schemes
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Profile: {age} yrs · {state} · {locationType} · {occupation} · Annual Income ₹{annualIncome.toLocaleString('en-IN')}
              </p>
            </div>
            <button
              onClick={resetForm}
              className="px-4 py-2 border border-stone-300 dark:border-stone-700 rounded-xl text-xs font-medium text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center gap-1.5 shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Modify Questionnaire</span>
            </button>
          </div>

          {matchedResults.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-3">
              <HelpCircle className="w-12 h-12 text-stone-400 mx-auto" />
              <h3 className="font-serif-heading text-lg font-bold text-stone-800 dark:text-stone-200">
                No Direct Matches for These Specific Parameters
              </h3>
              <p className="text-xs text-stone-500 max-w-md mx-auto">
                Some schemes may require specific land titles, BPL ration cards, or local Gram Sabha listing. You can explore all schemes directly in our main catalog.
              </p>
              <button
                onClick={() => setActiveTab('schemes')}
                className="mt-2 px-4 py-2 bg-amber-700 text-white rounded-lg text-xs font-medium"
              >
                Browse All Welfare Schemes
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {matchedResults.map(({ scheme, matchScore, matchedReasons }) => {
                const isSaved = savedSchemeIds.includes(scheme.id);
                return (
                  <div
                    key={scheme.id}
                    className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm hover:shadow-md transition-shadow space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-stone-500">
                          <span className="font-semibold text-amber-700 dark:text-amber-400">{scheme.category}</span>
                          <span>·</span>
                          <span className="truncate max-w-[240px]">{scheme.ministry}</span>
                        </div>
                        <h3 className="font-serif-heading text-xl font-bold text-stone-900 dark:text-stone-100 mt-1">
                          {scheme.name}
                        </h3>
                      </div>

                      <div className="flex items-center gap-3 self-start sm:self-auto">
                        <div className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-xs rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{matchScore}% Match</span>
                        </div>
                        <button
                          onClick={() => toggleSaveScheme(scheme.id)}
                          className={`p-2 rounded-lg border transition-colors ${
                            isSaved
                              ? 'bg-amber-50 dark:bg-amber-950 border-amber-300 text-amber-700'
                              : 'border-stone-200 dark:border-stone-800 text-stone-400 hover:text-stone-700'
                          }`}
                          title={isSaved ? 'Saved' : 'Save scheme'}
                        >
                          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-600 text-amber-600' : ''}`} />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                      {scheme.description}
                    </p>

                    {/* Why You Qualify Explanation Box */}
                    <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-stone-800/60 border border-amber-200/60 dark:border-stone-700 space-y-2">
                      <div className="text-xs font-semibold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Why You Qualify Based on Your Responses:</span>
                      </div>
                      <ul className="space-y-1 text-xs text-stone-700 dark:text-stone-300">
                        {matchedReasons.map((reason, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-amber-700 font-bold">·</span>
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Benefit Preview */}
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-900/50 text-xs">
                      <strong className="text-emerald-900 dark:text-emerald-300">Benefit Entitlement: </strong>
                      <span className="text-stone-700 dark:text-stone-300">{scheme.benefits}</span>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <button
                        onClick={() => setActiveTab('schemes')}
                        className="text-stone-600 dark:text-stone-300 hover:text-amber-700 font-medium"
                      >
                        View Checklist of Required Documents →
                      </button>

                      <div className="flex items-center gap-3">
                        <a
                          href={scheme.officialUrl}
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
                );
              })}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
