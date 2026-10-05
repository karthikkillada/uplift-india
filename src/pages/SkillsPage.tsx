import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { COURSES_DATA } from '../data/mockData';
import { ASSETS } from '../assets';
import { Course } from '../types';
import { 
  GraduationCap, 
  Search, 
  Clock, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  X, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

const CATEGORIES = [
  'All',
  'Digital Literacy',
  'Financial Literacy',
  'Vocational Skills',
  'Agriculture',
  'Handicrafts',
  'English',
  'Entrepreneurship',
  'Computer Skills'
];

export const SkillsPage: React.FC = () => {
  const { enrolledCourseIds, enrollCourse } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeCourseModal, setActiveCourseModal] = useState<Course | null>(null);

  const filteredCourses = useMemo(() => {
    return COURSES_DATA.filter(course => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        course.title.toLowerCase().includes(q) ||
        course.description.toLowerCase().includes(q) ||
        course.provider.toLowerCase().includes(q);

      const matchCategory =
        selectedCategory === 'All' || course.category === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [search, selectedCategory]);

  const handleEnroll = (courseId: string) => {
    enrollCourse(courseId);
    if (activeCourseModal?.id === courseId) {
      setActiveCourseModal(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider">
          <GraduationCap className="w-4 h-4" />
          <span>Skill India Mission & Free Livelihood Learning</span>
        </div>
        <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-50">
          Skill Development & Vocational Training
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-300 max-w-3xl leading-relaxed">
          Access 100% free practical courses in smartphone literacy, UPI digital payments, domestic electrical wiring, organic farming, tailoring, spoken English, and small business setup certified by National Skill Development Corporation (NSDC) and PMKVY.
        </p>
      </div>

      {/* Featured Skills Banner with Generated Visual */}
      <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-indigo-950 via-stone-900 to-amber-950 text-white border border-stone-800 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          <div className="p-6 sm:p-8 md:col-span-7 space-y-3">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold">
              Practical Trade Skills
            </span>
            <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold leading-tight">
              Turn Hands-on Knowledge into Independent Income
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans-text">
              Vocational skills drastically reduce dependency on unpredictable daily wage labor. Complete self-paced micro-modules with regional language audio support and receive a digital certificate for your resume.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs text-indigo-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero Tuition Fees</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Govt-Recognized Certification</span>
              </span>
            </div>
          </div>

          <div className="md:col-span-5 h-64 md:h-full">
            <img
              src={ASSETS.vocational}
              alt="Hands-on vocational technical equipment training in a modern workshop"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by course topic (e.g. Electrician, UPI, English, Mushroom, Tailoring)..."
            className="w-full pl-10 pr-4 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-2">
            Skill Disciplines:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-indigo-700 text-white shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200/80 dark:hover:bg-stone-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-stone-500">
        <div>Showing <strong>{filteredCourses.length}</strong> vocational courses</div>
        {(search || selectedCategory !== 'All') && (
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('All');
            }}
            className="text-indigo-700 dark:text-indigo-400 hover:underline font-medium"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCourses.map(course => {
          const isEnrolled = enrolledCourseIds.includes(course.id);
          return (
            <div
              key={course.id}
              className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-semibold text-indigo-700 dark:text-indigo-400">{course.category}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-[11px]">
                    {course.isFree ? '100% Free' : course.cost}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif-heading text-lg font-bold text-stone-900 dark:text-stone-100 leading-snug">
                    {course.title}
                  </h3>
                  <div className="text-xs text-stone-500 mt-1 font-medium">
                    Offered by: {course.provider}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600 dark:text-stone-300">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>{course.duration}</span>
                  </span>
                  <span>·</span>
                  <span>Level: <strong>{course.level}</strong></span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span>Certificate included</span>
                  </span>
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed">
                  {course.description}
                </p>

                {/* Practical Languages Supported */}
                <div className="text-[11px] text-stone-500 pt-1">
                  Languages: <strong>{course.practicalLanguage}</strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                <button
                  onClick={() => setActiveCourseModal(course)}
                  className="px-3.5 py-2 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 font-medium flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>View Syllabus ({course.syllabus.length} Modules)</span>
                </button>

                <button
                  onClick={() => handleEnroll(course.id)}
                  disabled={isEnrolled}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                    isEnrolled
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 cursor-default'
                      : 'bg-indigo-800 hover:bg-indigo-900 text-white shadow-sm hover:shadow'
                  }`}
                >
                  {isEnrolled ? 'Enrolled (Tracking in Dashboard)' : 'Enroll for Free'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Course Detail & Syllabus Modal */}
      {activeCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden max-h-[90vh] flex flex-col">
            
            <div className="p-6 border-b border-stone-200 dark:border-stone-800 flex items-start justify-between bg-stone-50 dark:bg-stone-950">
              <div>
                <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider">
                  {activeCourseModal.category} · {activeCourseModal.level}
                </span>
                <h3 className="font-serif-heading text-xl font-bold text-stone-900 dark:text-stone-100 mt-1">
                  {activeCourseModal.title}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">Offered by {activeCourseModal.provider}</p>
              </div>
              <button
                onClick={() => setActiveCourseModal(null)}
                className="p-1 text-stone-400 hover:text-stone-600 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
              <div>
                <h4 className="font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider text-xs mb-1">
                  Course Summary & Objectives
                </h4>
                <p className="text-stone-600 dark:text-stone-300 leading-relaxed font-sans-text">
                  {activeCourseModal.description}
                </p>
              </div>

              {/* Module Syllabus */}
              <div className="space-y-2">
                <h4 className="font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider text-xs">
                  Detailed Module Syllabus
                </h4>
                <div className="space-y-2">
                  {activeCourseModal.syllabus.map((mod, idx) => (
                    <div key={idx} className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-100 dark:border-stone-800 flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="font-semibold text-stone-900 dark:text-stone-100">Module {idx + 1}</div>
                        <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5 leading-relaxed">{mod}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certification note */}
              <div className="p-3.5 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900/50 flex items-center gap-3 text-xs">
                <Award className="w-6 h-6 text-amber-600 shrink-0" />
                <div>
                  <strong className="text-stone-900 dark:text-stone-100 block">Certificate of Completion Included</strong>
                  <span className="text-stone-600 dark:text-stone-300">
                    Complete all modules and simple practical quiz to download your verified digital certificate.
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-stone-50 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs">
              <span className="text-stone-500">Duration: {activeCourseModal.duration}</span>
              <button
                onClick={() => handleEnroll(activeCourseModal.id)}
                disabled={enrolledCourseIds.includes(activeCourseModal.id)}
                className={`px-5 py-2.5 rounded-xl font-bold ${
                  enrolledCourseIds.includes(activeCourseModal.id)
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-indigo-800 hover:bg-indigo-900 text-white shadow'
                }`}
              >
                {enrolledCourseIds.includes(activeCourseModal.id) ? 'Already Enrolled' : 'Start Learning Now (Free)'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
