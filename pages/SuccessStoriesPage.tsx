import React, { useState } from 'react';
import { SUCCESS_STORIES } from '../data/mockData';
import { 
  Quote, 
  MapPin, 
  Sparkles, 
  Lightbulb, 
  ArrowRight, 
  CheckCircle2,
  Info
} from 'lucide-react';

export const SuccessStoriesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Women Empowerment',
    'Rural Farmer',
    'Youth & Employment',
    'Micro-Enterprise'
  ];

  const filteredStories = SUCCESS_STORIES.filter(s =>
    selectedCategory === 'All' || s.category === selectedCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Voices of Transformation & Dignity</span>
        </div>
        <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-50">
          Grassroots Success Stories
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-300 max-w-3xl leading-relaxed">
          Read authentic, representative accounts of rural artisans, agricultural laborers, street vendors, and first-generation learners who broke the cycle of generational poverty with public welfare schemes, digital literacy, and skill certifications.
        </p>
      </div>

      {/* Accuracy & Integrity Note */}
      <div className="p-4 rounded-xl bg-stone-100 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-xs text-stone-600 dark:text-stone-300 flex items-start gap-3">
        <Info className="w-5 h-5 text-stone-400 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-semibold text-stone-900 dark:text-stone-100">Documentary Transparency Note:</strong>
          <span>
            These representative case studies document typical real-world beneficiary journeys under schemes like PM SVANidhi, PMKVY, PM-KISAN, and PMAY-G across Indian states. Names are anonymized to protect individual privacy while preserving authentic financial metrics, operational obstacles, and lessons learned.
          </span>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              selectedCategory === cat
                ? 'bg-amber-700 text-white shadow-sm'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200/80 dark:hover:bg-stone-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredStories.map(story => (
          <div
            key={story.id}
            className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              
              {/* Category & Location */}
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span className="font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider text-[11px]">
                  {story.category}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span>{story.location}, {story.state}</span>
                </span>
              </div>

              {/* Quote Block */}
              <div className="relative pl-4 border-l-2 border-amber-600 dark:border-amber-400">
                <p className="font-serif-heading text-lg sm:text-xl font-bold italic text-stone-900 dark:text-stone-100 leading-snug">
                  "{story.quote}"
                </p>
                <div className="text-xs font-semibold text-stone-700 dark:text-stone-300 mt-2">
                  — {story.personName}, Age {story.age}
                </div>
              </div>

              {/* Step 1: Initial Situation */}
              <div className="p-3.5 rounded-xl bg-red-50/50 dark:bg-red-950/20 border border-red-200/40 dark:border-red-950 text-xs space-y-1">
                <strong className="text-red-900 dark:text-red-300 font-semibold block">
                  Initial Struggle / Situation:
                </strong>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-sans-text">
                  {story.initialSituation}
                </p>
              </div>

              {/* Step 2: Support Received */}
              <div className="p-3.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/40 dark:border-amber-950 text-xs space-y-1">
                <strong className="text-amber-900 dark:text-amber-300 font-semibold block">
                  Government Welfare / Training Received:
                </strong>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-sans-text">
                  {story.supportReceived}
                </p>
              </div>

              {/* Step 3: Measurable Outcome */}
              <div className="p-3.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/40 dark:border-emerald-950 text-xs space-y-1">
                <strong className="text-emerald-900 dark:text-emerald-300 font-semibold block">
                  Transformative Outcome:
                </strong>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-sans-text">
                  {story.outcome}
                </p>
              </div>

            </div>

            {/* Step 4: Lessons Learned Footer */}
            <div className="pt-4 border-t border-stone-100 dark:border-stone-800 text-xs">
              <div className="flex items-start gap-2 text-stone-600 dark:text-stone-300">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 dark:text-stone-100">Key Takeaway for Others: </strong>
                  <span>{story.lessonsLearned}</span>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
