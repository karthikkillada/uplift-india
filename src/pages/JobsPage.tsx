import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { JOBS_DATA, INDIAN_STATES } from '../data/mockData';
import { Job, JobType } from '../types';
import { 
  Search, 
  Briefcase, 
  MapPin, 
  Clock, 
  GraduationCap, 
  Building2, 
  CheckCircle2, 
  X, 
  Calendar,
  Users,
  Send,
  AlertCircle
} from 'lucide-react';

export const JobsPage: React.FC = () => {
  const { appliedJobIds, applyForJob, currentUser } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedState, setSelectedState] = useState<string>('All India');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedEdu, setSelectedEdu] = useState<string>('All');

  // Apply Modal state
  const [selectedJobToApply, setSelectedJobToApply] = useState<Job | null>(null);
  const [applicantName, setApplicantName] = useState(currentUser.name || '');
  const [applicantPhone, setApplicantPhone] = useState(currentUser.phone || '');
  const [applicantExperience, setApplicantExperience] = useState('');
  const [applySuccess, setApplySuccess] = useState(false);

  const categories = [
    'All',
    'Agriculture',
    'Manufacturing',
    'Community Work',
    'Digital & Data',
    'Healthcare & Sanitation',
    'Retail & Logistics',
    'Govt Rozgar'
  ];

  const jobTypes = ['All', 'Full-Time', 'Part-Time', 'Rural Work / MGNREGA', 'Apprenticeship', 'Vocational'];

  const educationLevels = [
    'All',
    'No Formal Education',
    '8th / 10th Pass',
    '12th Pass',
    'ITI / Diploma',
    'Graduate'
  ];

  const filteredJobs = useMemo(() => {
    return JOBS_DATA.filter(job => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.organization.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q) ||
        job.description.toLowerCase().includes(q);

      const matchCategory = selectedCategory === 'All' || job.category === selectedCategory;
      const matchState = selectedState === 'All India' || job.state === selectedState;
      const matchType = selectedType === 'All' || job.jobType === selectedType;
      const matchEdu = selectedEdu === 'All' || job.educationReq === selectedEdu;

      return matchSearch && matchCategory && matchState && matchType && matchEdu;
    });
  }, [search, selectedCategory, selectedState, selectedType, selectedEdu]);

  const handleOpenApply = (job: Job) => {
    setSelectedJobToApply(job);
    setApplicantName(currentUser.name || '');
    setApplicantPhone(currentUser.phone || '');
    setApplicantExperience('');
    setApplySuccess(false);
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJobToApply) return;

    applyForJob(selectedJobToApply.id);
    setApplySuccess(true);
    setTimeout(() => {
      setSelectedJobToApply(null);
      setApplySuccess(false);
    }, 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
          <Briefcase className="w-4 h-4" />
          <span>Dignified Grassroots Employment & Rozgar Portal</span>
        </div>
        <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-50">
          Jobs & Employment Opportunities
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-300 max-w-3xl leading-relaxed">
          Explore local village and district employment, government livelihood programs (including MGNREGA and CSC Digital Seva), vocational apprenticeships, and entry-level positions requiring minimal formal education.
        </p>
      </div>

      {/* Filter and Search Box */}
      <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4">
        
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by job title, location, organization, or trade..."
            className="w-full pl-10 pr-4 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Category Pills */}
        <div>
          <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-2">
            Job Sectors:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200/80 dark:hover:bg-stone-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Dropdown Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-stone-100 dark:border-stone-800 text-xs">
          <div>
            <label className="block text-stone-500 dark:text-stone-400 font-medium mb-1">State / Region</label>
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
            <label className="block text-stone-500 dark:text-stone-400 font-medium mb-1">Employment Type</label>
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="w-full p-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-800 dark:text-stone-200 focus:outline-none"
            >
              {jobTypes.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-stone-500 dark:text-stone-400 font-medium mb-1">Education Level Required</label>
            <select
              value={selectedEdu}
              onChange={e => setSelectedEdu(e.target.value)}
              className="w-full p-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-800 dark:text-stone-200 focus:outline-none"
            >
              {educationLevels.map(edu => (
                <option key={edu} value={edu}>{edu}</option>
              ))}
            </select>
          </div>
        </div>

      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-stone-500">
        <div>Showing <strong>{filteredJobs.length}</strong> active job vacancies</div>
        {(search || selectedCategory !== 'All' || selectedState !== 'All India' || selectedType !== 'All' || selectedEdu !== 'All') && (
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('All');
              setSelectedState('All India');
              setSelectedType('All');
              setSelectedEdu('All');
            }}
            className="text-emerald-700 dark:text-emerald-400 hover:underline font-medium"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.map(job => {
          const isApplied = appliedJobIds.includes(job.id);
          return (
            <div
              key={job.id}
              className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">{job.category}</span>
                  <span className="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 font-mono text-[11px]">
                    {job.jobType}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif-heading text-lg font-bold text-stone-900 dark:text-stone-100 leading-snug">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-stone-700 dark:text-stone-300 font-medium mt-1">
                    <Building2 className="w-3.5 h-3.5 text-stone-400" />
                    <span>{job.organization}</span>
                    {job.isGovernmentAffiliated && (
                      <span className="text-[10px] bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-1.5 py-0.2 rounded font-semibold ml-1">
                        Govt Livelihood
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{job.location} ({job.state})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>Min Qualification: <strong>{job.educationReq}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>Deadline: {job.deadline} · {job.vacancies} Openings</span>
                  </div>
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {job.requiredSkills.map((sk, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 rounded text-[11px]"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 block uppercase tracking-wider font-semibold">Compensation</span>
                  <span className="text-xs sm:text-sm font-bold text-emerald-800 dark:text-emerald-300">
                    {job.salary}
                  </span>
                </div>

                <button
                  onClick={() => handleOpenApply(job)}
                  disabled={isApplied}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isApplied
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 cursor-default'
                      : 'bg-emerald-800 hover:bg-emerald-900 text-white shadow-sm hover:shadow'
                  }`}
                >
                  {isApplied ? 'Application Submitted ✓' : 'Apply for Job'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Application Modal */}
      {selectedJobToApply && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden">
            
            <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex items-start justify-between bg-stone-50 dark:bg-stone-950">
              <div>
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  Direct Job Application
                </span>
                <h3 className="font-serif-heading text-lg font-bold text-stone-900 dark:text-stone-100 mt-0.5">
                  {selectedJobToApply.title}
                </h3>
                <p className="text-xs text-stone-500">{selectedJobToApply.organization}</p>
              </div>
              <button
                onClick={() => setSelectedJobToApply(null)}
                className="p-1 text-stone-400 hover:text-stone-600 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {applySuccess ? (
              <div className="p-8 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-serif-heading text-lg font-bold text-stone-900 dark:text-stone-100">
                  Application Submitted Successfully!
                </h4>
                <p className="text-xs text-stone-500">
                  Your profile and contact details have been sent to {selectedJobToApply.organization}. You can track status in your dashboard.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitApplication} className="p-6 space-y-4 text-xs sm:text-sm">
                
                <div>
                  <label className="block font-medium text-stone-700 dark:text-stone-300 mb-1">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={e => setApplicantName(e.target.value)}
                    placeholder="Enter your name as per Aadhaar"
                    className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-medium text-stone-700 dark:text-stone-300 mb-1">
                    Mobile Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={applicantPhone}
                    onChange={e => setApplicantPhone(e.target.value)}
                    placeholder="10-digit mobile number for SMS updates"
                    className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-medium text-stone-700 dark:text-stone-300 mb-1">
                    Brief Background / Prior Experience (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={applicantExperience}
                    onChange={e => setApplicantExperience(e.target.value)}
                    placeholder="Mention any past work, trade skill, or schooling..."
                    className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded-xl text-[11px] text-stone-500 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    No application fees are ever charged for government-affiliated livelihood schemes. Never pay any fee or deposit for employment.
                  </span>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedJobToApply(null)}
                    className="px-4 py-2 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-xl font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-semibold flex items-center gap-1.5 shadow"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Application</span>
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
