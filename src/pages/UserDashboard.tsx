import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SCHEMES_DATA, JOBS_DATA, COURSES_DATA } from '../data/mockData';
import { 
  User, 
  Bookmark, 
  Briefcase, 
  GraduationCap, 
  HeartHandshake, 
  LifeBuoy, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  ExternalLink, 
  Edit3, 
  Save, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const UserDashboard: React.FC = () => {
  const { 
    currentUser, 
    setCurrentUser, 
    savedSchemeIds, 
    toggleSaveScheme, 
    appliedJobIds, 
    enrolledCourseIds, 
    helpRequests, 
    volunteerRegistrations,
    setActiveTab 
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'saved' | 'recommended' | 'jobs' | 'learning' | 'volunteering' | 'requests'>('saved');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Edit profile state
  const [editName, setEditName] = useState(currentUser.name);
  const [editPhone, setEditPhone] = useState(currentUser.phone);
  const [editState, setEditState] = useState(currentUser.state);
  const [editDistrict, setEditDistrict] = useState(currentUser.district);
  const [editOccupation, setEditOccupation] = useState(currentUser.occupation || 'Agricultural Worker');
  const [editIncome, setEditIncome] = useState(currentUser.annualIncome || 140000);
  const [editLocationType, setEditLocationType] = useState(currentUser.locationType || 'Rural');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUser(prev => ({
      ...prev,
      name: editName,
      phone: editPhone,
      state: editState,
      district: editDistrict,
      occupation: editOccupation,
      annualIncome: editIncome,
      locationType: editLocationType
    }));
    setIsEditingProfile(false);
  };

  // Data lookups
  const savedSchemes = SCHEMES_DATA.filter(s => savedSchemeIds.includes(s.id));
  const appliedJobs = JOBS_DATA.filter(j => appliedJobIds.includes(j.id));
  const enrolledCourses = COURSES_DATA.filter(c => enrolledCourseIds.includes(c.id));

  // Dynamic recommendations for this user profile
  const recommendedSchemes = SCHEMES_DATA.filter(s => {
    if (savedSchemeIds.includes(s.id)) return false;
    const matchesOcc = s.targetOccupations.some(o => 
      o.toLowerCase().includes((currentUser.occupation || '').toLowerCase()) || o.toLowerCase().includes('all')
    );
    const matchesIncome = !s.maxAnnualIncome || (currentUser.annualIncome || 150000) <= s.maxAnnualIncome;
    return matchesOcc || matchesIncome;
  }).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Dashboard User Profile Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-500 text-white font-serif-heading font-bold text-2xl flex items-center justify-center shadow-md">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif-heading text-2xl font-bold text-stone-900 dark:text-stone-100">
                {currentUser.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-semibold text-xs capitalize">
                {currentUser.role}
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              {currentUser.occupation} · {currentUser.district}, {currentUser.state} · Income: ₹{(currentUser.annualIncome || 140000).toLocaleString('en-IN')}/yr
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSubTab('profile')}
            className="px-4 py-2 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-semibold flex items-center gap-1.5"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit My Profile</span>
          </button>
          <button
            onClick={() => setActiveTab('eligibility')}
            className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-semibold shadow flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Retake Scheme Finder</span>
          </button>
        </div>
      </div>

      {/* Nav Sub-Tabs */}
      <div className="flex items-center gap-1 border-b border-stone-200 dark:border-stone-800 overflow-x-auto pb-px text-xs font-semibold">
        <button
          onClick={() => setActiveSubTab('saved')}
          className={`px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeSubTab === 'saved'
              ? 'border-amber-700 text-amber-800 dark:text-amber-300'
              : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved Schemes ({savedSchemes.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('recommended')}
          className={`px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeSubTab === 'recommended'
              ? 'border-amber-700 text-amber-800 dark:text-amber-300'
              : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Recommended For You ({recommendedSchemes.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('jobs')}
          className={`px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeSubTab === 'jobs'
              ? 'border-amber-700 text-amber-800 dark:text-amber-300'
              : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Job Applications ({appliedJobs.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('learning')}
          className={`px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeSubTab === 'learning'
              ? 'border-amber-700 text-amber-800 dark:text-amber-300'
              : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Learning Progress ({enrolledCourses.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('requests')}
          className={`px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeSubTab === 'requests'
              ? 'border-amber-700 text-amber-800 dark:text-amber-300'
              : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
          }`}
        >
          <LifeBuoy className="w-4 h-4" />
          <span>My Help Requests ({helpRequests.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('profile')}
          className={`px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeSubTab === 'profile'
              ? 'border-amber-700 text-amber-800 dark:text-amber-300'
              : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile Settings</span>
        </button>
      </div>

      {/* Sub-Tab 1: Saved Schemes */}
      {activeSubTab === 'saved' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif-heading text-xl font-bold text-stone-900 dark:text-stone-100">
              Your Bookmarked Government Schemes
            </h2>
            <button
              onClick={() => setActiveTab('schemes')}
              className="text-xs font-semibold text-amber-700 hover:underline"
            >
              Browse more schemes →
            </button>
          </div>

          {savedSchemes.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-3">
              <Bookmark className="w-10 h-10 text-stone-400 mx-auto" />
              <h3 className="font-serif-heading text-lg font-bold text-stone-800 dark:text-stone-200">
                No Schemes Bookmarked Yet
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Click the bookmark icon on any welfare scheme to save it for offline review and document preparation.
              </p>
              <button
                onClick={() => setActiveTab('schemes')}
                className="mt-2 px-4 py-2 bg-amber-700 text-white rounded-xl text-xs font-semibold"
              >
                Explore Government Schemes
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedSchemes.map(s => (
                <div
                  key={s.id}
                  className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span className="font-semibold text-amber-700 dark:text-amber-400">{s.category}</span>
                      <button
                        onClick={() => toggleSaveScheme(s.id)}
                        className="text-stone-400 hover:text-red-500 transition-colors p-1"
                        title="Remove from saved"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <h3 className="font-serif-heading text-lg font-bold text-stone-900 dark:text-stone-100">
                      {s.name}
                    </h3>

                    <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2">
                      {s.description}
                    </p>

                    <div className="p-3 bg-amber-50/70 dark:bg-stone-800 rounded-xl text-xs text-stone-700 dark:text-stone-300">
                      <strong className="text-amber-900 dark:text-amber-300 block">Benefit: </strong>
                      <span>{s.benefits}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                    <button
                      onClick={() => setActiveTab('schemes')}
                      className="text-stone-600 dark:text-stone-300 hover:text-amber-700 font-medium"
                    >
                      View Documents Checklist →
                    </button>
                    <a
                      href={s.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg font-semibold flex items-center gap-1"
                    >
                      <span>Official Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Sub-Tab 2: Recommended Schemes */}
      {activeSubTab === 'recommended' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-stone-700 dark:text-stone-300">
            Recommendations generated based on your profile as an <strong>{currentUser.occupation}</strong> residing in <strong>{currentUser.state}</strong> with annual family income of <strong>₹{(currentUser.annualIncome || 140000).toLocaleString('en-IN')}</strong>.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedSchemes.map(s => (
              <div
                key={s.id}
                className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm flex flex-col justify-between space-y-3"
              >
                <div>
                  <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">{s.category}</span>
                  <h3 className="font-serif-heading text-base font-bold text-stone-900 dark:text-stone-100 mt-1">
                    {s.name}
                  </h3>
                  <p className="text-xs text-stone-500 mt-2 line-clamp-3">
                    {s.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                  <button
                    onClick={() => toggleSaveScheme(s.id)}
                    className="text-amber-700 font-semibold hover:underline"
                  >
                    + Save to Bookmarks
                  </button>
                  <a
                    href={s.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-stone-400 hover:text-stone-800"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-Tab 3: Job Applications */}
      {activeSubTab === 'jobs' && (
        <div className="space-y-4">
          <h2 className="font-serif-heading text-xl font-bold text-stone-900 dark:text-stone-100">
            Track Your Job Applications
          </h2>

          {appliedJobs.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-3">
              <Briefcase className="w-10 h-10 text-stone-400 mx-auto" />
              <h3 className="font-serif-heading text-lg font-bold text-stone-800 dark:text-stone-200">
                No Applications Yet
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Explore local village and district employment postings and submit your application with zero fees.
              </p>
              <button
                onClick={() => setActiveTab('jobs')}
                className="mt-2 px-4 py-2 bg-emerald-800 text-white rounded-xl text-xs font-semibold"
              >
                Browse Job Vacancies
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {appliedJobs.map(job => (
                <div
                  key={job.id}
                  className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">{job.category}</span>
                    <h3 className="font-serif-heading text-lg font-bold text-stone-900 dark:text-stone-100">
                      {job.title}
                    </h3>
                    <div className="text-xs text-stone-500">
                      {job.organization} · {job.location} · {job.salary}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Application Under Review</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Sub-Tab 4: Learning Progress */}
      {activeSubTab === 'learning' && (
        <div className="space-y-4">
          <h2 className="font-serif-heading text-xl font-bold text-stone-900 dark:text-stone-100">
            Enrolled Skill Development Courses
          </h2>

          {enrolledCourses.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-3">
              <GraduationCap className="w-10 h-10 text-stone-400 mx-auto" />
              <h3 className="font-serif-heading text-lg font-bold text-stone-800 dark:text-stone-200">
                No Active Courses
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Enroll in free vocational training courses to acquire income-generating skills.
              </p>
              <button
                onClick={() => setActiveTab('skills')}
                className="mt-2 px-4 py-2 bg-indigo-800 text-white rounded-xl text-xs font-semibold"
              >
                Explore Free Skill Courses
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrolledCourses.map((c, idx) => {
                const progress = idx === 0 ? 65 : 25;
                return (
                  <div
                    key={c.id}
                    className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4"
                  >
                    <div>
                      <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-400">{c.category}</span>
                      <h3 className="font-serif-heading text-lg font-bold text-stone-900 dark:text-stone-100 mt-0.5">
                        {c.title}
                      </h3>
                      <div className="text-xs text-stone-500 mt-1">Provider: {c.provider} · {c.duration}</div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-stone-500">
                        <span>Course Completion</span>
                        <span className="font-bold text-stone-800 dark:text-stone-200">{progress}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-xs">
                      <span className="text-stone-500">{c.syllabus.length} Modules</span>
                      <button
                        onClick={() => setActiveTab('skills')}
                        className="px-3.5 py-1.5 bg-indigo-800 text-white rounded-lg font-semibold hover:bg-indigo-900"
                      >
                        Resume Learning
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Sub-Tab 5: Help Requests */}
      {activeSubTab === 'requests' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif-heading text-xl font-bold text-stone-900 dark:text-stone-100">
              Your Submitted Help & Distress Requests
            </h2>
            <button
              onClick={() => setActiveTab('emergency')}
              className="text-xs font-semibold text-red-600 hover:underline"
            >
              + Submit New Request
            </button>
          </div>

          <div className="space-y-3">
            {helpRequests.map(req => {
              const statusColors: Record<string, string> = {
                Pending: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
                Assigned: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
                'In Progress': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300',
                Resolved: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
              };

              return (
                <div
                  key={req.id}
                  className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-stone-600 dark:text-stone-300">{req.id}</span>
                      <span className="text-stone-300">·</span>
                      <span className="text-xs font-semibold text-stone-800 dark:text-stone-200">{req.category}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-stone-400">{req.createdAt}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${statusColors[req.status] || 'bg-stone-100'}`}>
                        {req.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-sans-text">
                    {req.description}
                  </p>

                  <div className="text-[11px] text-stone-500">
                    Location: {req.district}, {req.state} · Contact: {req.phone} · Urgency: <strong>{req.urgency}</strong>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Sub-Tab 6: Profile Settings */}
      {activeSubTab === 'profile' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6 max-w-2xl">
          <div className="border-b border-stone-100 dark:border-stone-800 pb-3">
            <h2 className="font-serif-heading text-xl font-bold text-stone-900 dark:text-stone-100">
              Personal & Socio-Economic Profile
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              These details customize your automated welfare scheme recommendations.
            </p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={editName}
                onChange={e => setEditName(e.target.value)}
                className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Mobile Phone Number</label>
              <input
                type="tel"
                required
                value={editPhone}
                onChange={e => setEditPhone(e.target.value)}
                className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">State</label>
                <input
                  type="text"
                  required
                  value={editState}
                  onChange={e => setEditState(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">District / City</label>
                <input
                  type="text"
                  required
                  value={editDistrict}
                  onChange={e => setEditDistrict(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Occupation</label>
                <input
                  type="text"
                  value={editOccupation}
                  onChange={e => setEditOccupation(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Annual Family Income (₹)</label>
                <input
                  type="number"
                  value={editIncome}
                  onChange={e => setEditIncome(parseInt(e.target.value, 10) || 0)}
                  className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="px-6 py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl font-bold flex items-center gap-2 shadow"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
