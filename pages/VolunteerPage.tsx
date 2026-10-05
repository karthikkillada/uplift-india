import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VOLUNTEER_OPPORTUNITIES, INDIAN_STATES } from '../data/mockData';
import { ASSETS } from '../assets';
import { 
  HeartHandshake, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle2, 
  Send, 
  Mail, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const VolunteerPage: React.FC = () => {
  const { registerAsVolunteer, volunteerRegistrations, currentUser } = useApp();

  // Volunteer Registration Form state
  const [volName, setVolName] = useState(currentUser.name || '');
  const [volPhone, setVolPhone] = useState(currentUser.phone || '');
  const [volEmail, setVolEmail] = useState(currentUser.email || '');
  const [volState, setVolState] = useState(currentUser.state || 'Uttar Pradesh');
  const [volDistrict, setVolDistrict] = useState(currentUser.district || '');
  const [volCause, setVolCause] = useState('Digital Literacy & Scheme Awareness Camps');
  const [volTime, setVolTime] = useState('2-4 Hours on Weekends');
  const [hasRegistered, setHasRegistered] = useState(false);

  // Joined drive tracking
  const [joinedDrives, setJoinedDrives] = useState<string[]>([]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    registerAsVolunteer({
      name: volName,
      phone: volPhone,
      email: volEmail,
      state: volState,
      cause: volCause,
      timeCommitment: volTime
    });
    setHasRegistered(true);
    setTimeout(() => {
      setHasRegistered(false);
    }, 4000);
  };

  const handleJoinDrive = (driveId: string) => {
    if (!joinedDrives.includes(driveId)) {
      setJoinedDrives(prev => [...prev, driveId]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header & Motto Banner */}
      <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-amber-900 via-stone-900 to-emerald-950 text-white border border-stone-800 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          
          <div className="p-8 sm:p-10 md:col-span-7 space-y-4">
            <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-semibold rounded-full tracking-wider uppercase">
              Grassroots Volunteer Movement
            </span>
            <h1 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              “Your time can change someone's life.”
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-xl font-sans-text">
              Join thousands of teachers, college students, software engineers, and community workers who dedicate a few hours a week to help illiterate families navigate welfare schemes, distribute surplus food, and mentor rural youth.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs text-amber-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>12,800+ Volunteers Across India</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Flexible Weekend Hours</span>
              </span>
            </div>
          </div>

          <div className="md:col-span-5 h-72 md:h-full">
            <img
              src={ASSETS.relief}
              alt="Community volunteers respectfully handing over food and relief supplies"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form: Register as Volunteer */}
        <div className="lg:col-span-5">
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-md space-y-5">
            <div className="border-b border-stone-100 dark:border-stone-800 pb-3">
              <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
                Join the Uplift Network
              </span>
              <h2 className="font-serif-heading text-2xl font-bold text-stone-900 dark:text-stone-100 mt-1">
                Volunteer Registration
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Fill this 1-minute form to be mapped to active drives in your district.
              </p>
            </div>

            {hasRegistered ? (
              <div className="p-6 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-center space-y-2 border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm">
                  Welcome to the Movement!
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-300">
                  Thank you, {volName}. Your registration has been saved. The state coordinator will connect you with upcoming weekend drives.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={volName}
                    onChange={e => setVolName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Phone / WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={volPhone}
                    onChange={e => setVolPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={volEmail}
                    onChange={e => setVolEmail(e.target.value)}
                    placeholder="youremail@example.com"
                    className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      State <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={volState}
                      onChange={e => setVolState(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none"
                    >
                      {INDIAN_STATES.filter(s => s !== 'All India').map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      City / District
                    </label>
                    <input
                      type="text"
                      value={volDistrict}
                      onChange={e => setVolDistrict(e.target.value)}
                      placeholder="e.g. Varanasi"
                      className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Preferred Cause
                  </label>
                  <select
                    value={volCause}
                    onChange={e => setVolCause(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none"
                  >
                    <option value="Digital Literacy & Scheme Awareness Camps">Digital Literacy & Scheme Awareness Camps</option>
                    <option value="Surplus Food Rescue & Nutrition Drives">Surplus Food Rescue & Nutrition Drives</option>
                    <option value="Senior Citizen Pension & Health Assistance">Senior Citizen Pension & Health Assistance</option>
                    <option value="Rural Youth Career Mentorship & English">Rural Youth Career Mentorship & English</option>
                    <option value="Emergency Disaster Relief & Flood Assistance">Emergency Disaster Relief & Flood Assistance</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Available Time Commitment
                  </label>
                  <select
                    value={volTime}
                    onChange={e => setVolTime(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none"
                  >
                    <option value="2-4 Hours on Weekends">2-4 Hours on Weekends</option>
                    <option value="1-2 Hours on Weekday Evenings">1-2 Hours on Weekday Evenings</option>
                    <option value="Flexible Remote Online Mentorship">Flexible Remote Online Mentorship</option>
                    <option value="Full-time Volunteer / Sabbatical">Full-time Volunteer / Sabbatical</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-amber-700 hover:bg-amber-800 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <HeartHandshake className="w-4 h-4" />
                    <span>Register as Volunteer</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Right Column: Live Volunteering Drives Across India */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
                Active Ground Drives
              </span>
              <h2 className="font-serif-heading text-2xl font-bold text-stone-900 dark:text-stone-100">
                Join an Upcoming Volunteer Drive
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            {VOLUNTEER_OPPORTUNITIES.map(drive => {
              const isJoined = joinedDrives.includes(drive.id);
              return (
                <div
                  key={drive.id}
                  className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm hover:shadow-md transition-shadow space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
                    <div>
                      <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">{drive.cause}</span>
                      <h3 className="font-serif-heading text-lg font-bold text-stone-900 dark:text-stone-100 mt-0.5">
                        {drive.title}
                      </h3>
                      <div className="text-xs text-stone-500 font-medium">Organized by {drive.organization}</div>
                    </div>

                    <div className="px-3 py-1 bg-stone-100 dark:bg-stone-800 rounded-full text-xs font-medium text-stone-600 dark:text-stone-300 flex items-center gap-1.5 self-start sm:self-auto">
                      <Users className="w-3.5 h-3.5 text-stone-400" />
                      <span>{drive.volunteersRegistered} / {drive.volunteersNeeded} volunteers registered</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-sans-text">
                    {drive.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600 dark:text-stone-400">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>{drive.location} ({drive.state})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>{drive.timeCommitment}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>{drive.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>{drive.contactEmail}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-stone-100 dark:border-stone-800">
                    <span className="text-[11px] text-stone-400">Orientation kit provided on arrival</span>
                    <button
                      onClick={() => handleJoinDrive(drive.id)}
                      disabled={isJoined}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                        isJoined
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 cursor-default'
                          : 'bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-900'
                      }`}
                    >
                      {isJoined ? 'Joined this Drive ✓' : 'Join Drive'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
