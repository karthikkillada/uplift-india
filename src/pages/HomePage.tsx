import React from 'react';
import { useApp } from '../context/AppContext';
import { ASSETS } from '../assets';
import { SCHEMES_DATA, JOBS_DATA, SUCCESS_STORIES, NGOS_DATA } from '../data/mockData';
import { 
  Landmark, 
  Briefcase, 
  GraduationCap, 
  LifeBuoy, 
  Users, 
  FileCheck2, 
  HeartHandshake, 
  ArrowRight, 
  ShieldCheck, 
  TrendingDown, 
  CheckCircle2, 
  ExternalLink,
  Bookmark,
  Volume2,
  Sparkles
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { 
    t, 
    setActiveTab, 
    toggleSaveScheme, 
    savedSchemeIds, 
    speakText,
    currentUser,
    isAuthenticated,
    appliedJobIds,
    enrolledCourseIds
  } = useApp();

  const featuredSchemes = SCHEMES_DATA.slice(0, 4);
  const featuredJobs = JOBS_DATA.slice(0, 3);
  const featuredStory = SUCCESS_STORIES[0];
  const featuredNgos = NGOS_DATA.slice(0, 3);

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      
      {/* Post-Login Welcome & Clear Separated Hub (Home, Jobs, Important Things) */}
      {isAuthenticated && (
        <section className="bg-gradient-to-b from-amber-50/90 via-stone-50 to-stone-50 dark:from-stone-900 dark:via-stone-950 dark:to-stone-950 border-b border-amber-200/60 dark:border-stone-800 py-6 sm:py-8 px-4 sm:px-6 lg:px-8 shadow-inner">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Header: Citizen Greeting & Quick Metrics */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-amber-700 text-white font-serif-heading font-bold text-xl flex items-center justify-center shadow-md shrink-0">
                  {currentUser.name.charAt(0)}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-serif-heading text-lg sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
                      Welcome, {currentUser.name}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-semibold capitalize flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      {currentUser.role} Account
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-0.5">
                    Location: <strong className="text-stone-800 dark:text-stone-200">{currentUser.district}, {currentUser.state}</strong> · Occupation: <strong>{currentUser.occupation}</strong>
                  </p>
                </div>
              </div>

              {/* Status Stats Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-stone-800 border border-amber-200/60 dark:border-stone-700 text-center">
                  <div className="text-[10px] text-stone-500 dark:text-stone-400 font-semibold uppercase">Saved Schemes</div>
                  <div className="font-bold text-amber-800 dark:text-amber-300 text-sm">{savedSchemeIds.length}</div>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-stone-800 border border-emerald-200/60 dark:border-stone-700 text-center">
                  <div className="text-[10px] text-stone-500 dark:text-stone-400 font-semibold uppercase">Job Matches</div>
                  <div className="font-bold text-emerald-800 dark:text-emerald-300 text-sm">{JOBS_DATA.length}+</div>
                </div>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="px-4 py-2.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold hover:bg-stone-800 dark:hover:bg-white transition-all shadow-sm flex items-center gap-1.5"
                >
                  <span>My Full Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Clear Three-Part Task Separator: [ 1. HOME ] | [ 2. JOBS ] | [ 3. IMPORTANT THINGS ] */}
            <div className="space-y-4">
              
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Task Bar Quick Access — 3 Clear Areas:</span>
                </div>
                <div className="text-xs text-stone-500">
                  Select any section to jump directly
                </div>
              </div>

              {/* 3 Main Action Cards: Home, Jobs, Important Things */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* 1. HOME CARD */}
                <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border-2 border-amber-200 dark:border-stone-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold">
                        1
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                        Current Page
                      </span>
                    </div>
                    <h3 className="font-serif-heading text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-700">
                      Home & Poverty Mission
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-sans-text">
                      Explore national statistics, SDG 1 progress, verified success stories, and platform impact metrics.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-stone-100 dark:border-stone-800 mt-4 flex items-center justify-between text-xs">
                    <span className="text-stone-500 font-medium">Overview & Mission</span>
                    <button
                      onClick={() => window.scrollTo({ top: 500, behavior: 'smooth' })}
                      className="font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
                    >
                      <span>Read Below</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* 2. JOBS CARD ("JODS") */}
                <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border-2 border-emerald-300 dark:border-emerald-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold">
                        2
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                        {JOBS_DATA.length}+ Verified Openings
                      </span>
                    </div>
                    <h3 className="font-serif-heading text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-700">
                      Jobs & Employment
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-sans-text">
                      Find rural and urban vacancies, daily wage livelihoods, MGNREGA work, and entry-level positions.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-stone-100 dark:border-stone-800 mt-4 flex items-center justify-between text-xs">
                    <span className="text-emerald-700 dark:text-emerald-400 font-semibold">₹12k - ₹28k/mo</span>
                    <button
                      onClick={() => setActiveTab('jobs')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold flex items-center gap-1 shadow-xs transition-colors"
                    >
                      <span>Open Jobs</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* 3. IMPORTANT THINGS CARD */}
                <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border-2 border-indigo-300 dark:border-indigo-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 flex items-center justify-center font-bold">
                        3
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300">
                        Essential Services
                      </span>
                    </div>
                    <h3 className="font-serif-heading text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-indigo-700">
                      Important Things & Welfare
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-sans-text">
                      Government cash DBT schemes, instant eligibility checker, free skill training, and 24x7 crisis helplines.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-stone-100 dark:border-stone-800 mt-4 flex items-center justify-between text-xs">
                    <span className="text-indigo-700 dark:text-indigo-400 font-semibold">DBT & Subsidies</span>
                    <button
                      onClick={() => setActiveTab('schemes')}
                      className="px-3 py-1.5 rounded-lg bg-indigo-700 hover:bg-indigo-800 text-white font-bold flex items-center gap-1 shadow-xs transition-colors"
                    >
                      <span>Explore Schemes</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Sub-strip of Important Things Shortcuts */}
              <div className="p-4 rounded-xl bg-stone-100 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="font-semibold text-stone-700 dark:text-stone-300">
                  Quick Shortcuts for Important Things:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setActiveTab('schemes')}
                    className="px-2.5 py-1 rounded-lg bg-white dark:bg-stone-800 border border-stone-300/80 dark:border-stone-700 font-medium hover:border-amber-500 transition-colors flex items-center gap-1.5"
                  >
                    <Landmark className="w-3.5 h-3.5 text-amber-600" />
                    <span>Welfare Schemes ({SCHEMES_DATA.length})</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('eligibility')}
                    className="px-2.5 py-1 rounded-lg bg-white dark:bg-stone-800 border border-stone-300/80 dark:border-stone-700 font-medium hover:border-amber-500 transition-colors flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Am I Eligible? (Quiz)</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('skills')}
                    className="px-2.5 py-1 rounded-lg bg-white dark:bg-stone-800 border border-stone-300/80 dark:border-stone-700 font-medium hover:border-amber-500 transition-colors flex items-center gap-1.5"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Free Skills</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('emergency')}
                    className="px-2.5 py-1 rounded-lg bg-red-100 dark:bg-red-950/60 border border-red-200 dark:border-red-900 text-red-800 dark:text-red-200 font-semibold hover:bg-red-200 transition-colors flex items-center gap-1.5"
                  >
                    <LifeBuoy className="w-3.5 h-3.5 text-red-600" />
                    <span>Emergency Aid (Dial 112)</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </section>
      )}

      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/60 via-stone-50 to-stone-50 dark:from-stone-900 dark:via-stone-950 dark:to-stone-950 pt-8 sm:pt-14 pb-12 sm:pb-20 border-b border-stone-200/80 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* SDG 1 Badge Kicker */}
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-800 dark:text-amber-300">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
                <span>UNITED NATIONS SDG 1 · NO POVERTY</span>
                <span className="text-stone-300 dark:text-stone-700">/</span>
                <span className="text-stone-500 dark:text-stone-400 font-normal">Social Impact Platform</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-50 leading-[1.15] text-balance">
                Together, We Can Build a Poverty-Free India
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl font-sans-text">
                Connecting marginalized citizens, rural families, youth, and workers directly with verified Government Welfare Schemes, dignified employment, free vocational skills, and community emergency support.
              </p>

              {/* 4 Large Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setActiveTab('schemes')}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-semibold text-sm shadow-sm transition-all text-left group"
                >
                  <span className="flex items-center gap-2.5">
                    <Landmark className="w-5 h-5 text-amber-200" />
                    <span>{t('findSchemesBtn')}</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-amber-200 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setActiveTab('jobs')}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm shadow-sm transition-all text-left group"
                >
                  <span className="flex items-center gap-2.5">
                    <Briefcase className="w-5 h-5 text-emerald-200" />
                    <span>{t('findJobsBtn')}</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-emerald-200 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setActiveTab('skills')}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-indigo-800 hover:bg-indigo-900 text-white font-semibold text-sm shadow-sm transition-all text-left group"
                >
                  <span className="flex items-center gap-2.5">
                    <GraduationCap className="w-5 h-5 text-indigo-200" />
                    <span>{t('learnSkillsBtn')}</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-indigo-200 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setActiveTab('emergency')}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-semibold text-sm shadow-sm transition-all text-left group"
                >
                  <span className="flex items-center gap-2.5">
                    <LifeBuoy className="w-5 h-5 text-red-200" />
                    <span>{t('getHelpBtn')}</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-red-200 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Sub-kicker reassurance */}
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-stone-500 dark:text-stone-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% Free Public Resource</span>
                </span>
                <span className="text-stone-300 dark:text-stone-700">·</span>
                <span>Verified Government Portals</span>
                <span className="text-stone-300 dark:text-stone-700">·</span>
                <span>No Middlemen</span>
              </div>
            </div>

            {/* Right Column: Hero Visual Presentation */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-200/90 dark:border-stone-800 bg-stone-100 dark:bg-stone-900">
                <img
                  src={ASSETS.hero}
                  alt="Dignified Indian citizens: woman artisan, student, and agricultural farmer looking forward to a bright future"
                  className="w-full h-80 sm:h-96 object-cover"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                
                {/* Measured Scrim for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="text-xs uppercase tracking-widest text-amber-300 font-semibold mb-1">
                    India's Transformative Milestone
                  </div>
                  <div className="font-serif-heading text-lg font-bold">
                    Over 13.5 Crore Citizens Lifted Out of Multidimensional Poverty
                  </div>
                  <div className="text-xs text-stone-300 mt-1">
                    Source: NITI Aayog National Multidimensional Poverty Index Report
                  </div>
                </div>
              </div>

              {/* Quick Eligibility floating prompt */}
              <div 
                onClick={() => setActiveTab('eligibility')}
                className="mt-3 p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-md cursor-pointer hover:border-amber-400 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-800 dark:text-amber-200 shrink-0 font-bold text-xs">
                    ?
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-900 dark:text-stone-100">
                      Unsure which schemes apply to you?
                    </div>
                    <div className="text-[11px] text-stone-500 dark:text-stone-400">
                      Take our 2-minute "Am I Eligible?" questionnaire
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-amber-700 dark:text-amber-400" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Impact Statistics Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="p-5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-amber-700 dark:text-amber-400 mb-2">
              <Users className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                {t('statPeopleHelped')}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-serif-heading text-stone-900 dark:text-stone-100 tabular-nums">
              1.2M+
            </div>
            <p className="text-xs text-stone-500 mt-1">Beneficiaries navigated to welfare</p>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-emerald-700 dark:text-emerald-400 mb-2">
              <Landmark className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                {t('statSchemesListed')}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-serif-heading text-stone-900 dark:text-stone-100 tabular-nums">
              85+
            </div>
            <p className="text-xs text-stone-500 mt-1">Verified Central & State Schemes</p>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-indigo-700 dark:text-indigo-400 mb-2">
              <Briefcase className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                {t('statJobsAvailable')}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-serif-heading text-stone-900 dark:text-stone-100 tabular-nums">
              3,400+
            </div>
            <p className="text-xs text-stone-500 mt-1">Grassroots & Rozgar vacancies</p>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-amber-700 dark:text-amber-400 mb-2">
              <HeartHandshake className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                {t('statVolunteers')}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-serif-heading text-stone-900 dark:text-stone-100 tabular-nums">
              12,800+
            </div>
            <p className="text-xs text-stone-500 mt-1">Active community mobilizers</p>
          </div>

        </div>
      </section>

      {/* 3. SDG 1 Information & Indian Context Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-stone-100 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <div className="text-xs font-semibold text-amber-800 dark:text-amber-400 uppercase tracking-wider">
                Understanding Sustainable Development Goal 1
              </div>
              <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
                Ending Poverty in All Its Dimensions
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-sans-text">
                Poverty is more than the lack of income and resources to ensure a sustainable livelihood. Its manifestations include hunger and malnutrition, limited access to education and other basic services, social discrimination, and lack of participation in decision-making.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-stone-700 dark:text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Target 1.1:</strong> Eradicate extreme poverty for all people everywhere.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-stone-700 dark:text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Target 1.3:</strong> Implement nationally appropriate social protection floors for the poor and vulnerable.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-stone-700 dark:text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Target 1.4:</strong> Ensure equal rights to economic resources, basic services, and appropriate technology.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-stone-700 dark:text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Target 1.5:</strong> Build resilience of the poor against economic, social, and environmental disasters.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-md">
                <img
                  src={ASSETS.sdg}
                  alt="Rural women and youth in a digital empowerment workshop under banyan tree"
                  className="w-full h-72 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="p-4 bg-white dark:bg-stone-900 text-xs">
                  <div className="font-semibold text-stone-900 dark:text-stone-100">
                    Community Digital Literacy & Self-Help Groups
                  </div>
                  <div className="text-stone-500 mt-1">
                    Grassroots training drives bridge the digital divide so no rural family misses out on DBT subsidies or health cards.
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Featured Government Schemes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Direct Benefit Transfers & Social Protection
            </div>
            <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
              Featured Government Schemes
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('schemes')}
            className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:text-amber-800 flex items-center gap-1 group self-start sm:self-auto"
          >
            <span>Explore All 85+ Schemes</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredSchemes.map(scheme => {
            const isSaved = savedSchemeIds.includes(scheme.id);
            return (
              <div
                key={scheme.id}
                className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-3">
                  
                  {/* Category and Ministry */}
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-amber-700 dark:text-amber-400">{scheme.category}</span>
                      <span>·</span>
                      <span className="text-stone-500 truncate max-w-[200px]">{scheme.ministry}</span>
                    </div>

                    <button
                      onClick={() => toggleSaveScheme(scheme.id)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        isSaved
                          ? 'bg-amber-50 dark:bg-amber-950 border-amber-300 text-amber-700 dark:text-amber-300'
                          : 'border-stone-200 dark:border-stone-800 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
                      }`}
                      title={isSaved ? 'Scheme saved to your dashboard' : 'Save scheme'}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-600 text-amber-600' : ''}`} />
                    </button>
                  </div>

                  {/* Scheme Title */}
                  <h3 className="font-serif-heading text-lg font-bold text-stone-900 dark:text-stone-100 leading-snug">
                    {scheme.name}
                  </h3>

                  {/* Hindi Title if present */}
                  {scheme.hindiName && (
                    <div className="text-xs text-stone-500 dark:text-stone-400 -mt-1">
                      {scheme.hindiName}
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-3 leading-relaxed">
                    {scheme.description}
                  </p>

                  {/* Key Benefits highlight box */}
                  <div className="p-3 rounded-lg bg-amber-50/70 dark:bg-stone-800/80 border border-amber-200/50 dark:border-stone-700 text-xs">
                    <strong className="text-amber-900 dark:text-amber-300 block mb-0.5">Primary Benefit:</strong>
                    <span className="text-stone-700 dark:text-stone-300">{scheme.benefits}</span>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 mt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                  <button
                    onClick={() => speakText(`${scheme.name}. ${scheme.description}. Benefits: ${scheme.benefits}`)}
                    className="flex items-center gap-1.5 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
                    title="Listen aloud (Voice guidance)"
                  >
                    <Volume2 className="w-4 h-4 text-amber-600" />
                    <span>Read Aloud</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveTab('schemes')}
                      className="px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 font-medium"
                    >
                      Details & Docs
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
      </section>

      {/* 5. Featured Jobs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Livelihood & Employment
            </div>
            <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
              Grassroots & Entry-Level Job Openings
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('jobs')}
            className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 flex items-center gap-1 group self-start sm:self-auto"
          >
            <span>View All Job Opportunities</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredJobs.map(job => (
            <div
              key={job.id}
              className="p-5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">{job.category}</span>
                  <span className="tabular-nums font-mono text-[11px]">{job.jobType}</span>
                </div>

                <h3 className="font-serif-heading text-base font-bold text-stone-900 dark:text-stone-100 leading-snug">
                  {job.title}
                </h3>

                <p className="text-xs font-medium text-stone-700 dark:text-stone-300">
                  {job.organization}
                </p>

                <p className="text-xs text-stone-500">
                  Location: {job.location}
                </p>

                <div className="pt-2">
                  <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                    Salary: {job.salary}
                  </div>
                  <div className="text-[11px] text-stone-400 mt-0.5">
                    Qualification: {job.educationReq}
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <span className="text-[11px] text-stone-400">
                  {job.vacancies} vacancies
                </span>
                <button
                  onClick={() => setActiveTab('jobs')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-medium text-xs"
                >
                  View & Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Success Story Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-amber-50/50 dark:bg-stone-900 border border-amber-200/60 dark:border-stone-800 p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                Grassroots Impact Story
              </div>
              <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
                "{featuredStory.quote}"
              </h2>

              <div className="text-xs text-stone-500">
                <strong>{featuredStory.personName}</strong>, Age {featuredStory.age} · {featuredStory.location}, {featuredStory.state} · {featuredStory.category}
              </div>

              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-sans-text">
                {featuredStory.outcome}
              </p>

              <div className="p-3.5 rounded-lg bg-white dark:bg-stone-800/80 border border-amber-200/50 dark:border-stone-700 text-xs">
                <strong className="text-stone-900 dark:text-stone-100 block mb-1">Lesson for Community:</strong>
                <span className="text-stone-600 dark:text-stone-300">{featuredStory.lessonsLearned}</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-6 bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 space-y-3">
              <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-800 dark:text-amber-300">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-serif-heading text-base font-bold text-stone-900 dark:text-stone-100">
                Real Stories, Real Transformation
              </h3>
              <p className="text-xs text-stone-500">
                Read how rural artisans, street vendors, and students escaped poverty through public schemes and skill training.
              </p>
              <button
                onClick={() => setActiveTab('stories')}
                className="w-full py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-lg text-xs font-semibold hover:bg-stone-800"
              >
                Read All Stories
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Call To Action (Need Support? Find Help Today) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-red-900 via-amber-900 to-stone-900 text-white p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="inline-block px-2.5 py-1 bg-white/20 rounded text-xs font-semibold tracking-wider uppercase">
              Immediate Assistance Network
            </span>
            <h2 className="font-serif-heading text-2xl sm:text-4xl font-bold tracking-tight">
              Need Support? Find Help Today.
            </h2>
            <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
              Facing acute food distress, homelessness, denied hospital coverage, or immediate economic crisis? Uplift India connects you directly with 24x7 verified emergency helplines and local NGO relief networks.
            </p>
            
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => setActiveTab('emergency')}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow transition-all"
              >
                Access Emergency Help Center
              </button>
              <button
                onClick={() => setActiveTab('eligibility')}
                className="px-5 py-2.5 bg-white text-stone-900 hover:bg-stone-100 font-semibold text-xs sm:text-sm rounded-xl shadow transition-all"
              >
                Check Welfare Scheme Eligibility
              </button>
              <button
                onClick={() => setActiveTab('volunteer')}
                className="px-5 py-2.5 bg-stone-800/80 hover:bg-stone-800 text-white border border-stone-600 font-semibold text-xs sm:text-sm rounded-xl transition-all"
              >
                Register as a Volunteer
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
