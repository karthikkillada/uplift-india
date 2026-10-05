import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EMERGENCY_HELPLINES, INDIAN_STATES } from '../data/mockData';
import { 
  PhoneCall, 
  LifeBuoy, 
  AlertCircle, 
  Send, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  Heart,
  ExternalLink
} from 'lucide-react';

export const EmergencyHelpPage: React.FC = () => {
  const { submitHelpRequest, currentUser } = useApp();

  const [name, setName] = useState(currentUser.name || '');
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [state, setState] = useState(currentUser.state || 'Uttar Pradesh');
  const [district, setDistrict] = useState(currentUser.district || '');
  const [category, setCategory] = useState<any>('Food');
  const [urgency, setUrgency] = useState<'Emergency (Immediate)' | 'High (24-48 Hours)' | 'Normal'>('Emergency (Immediate)');
  const [description, setDescription] = useState('');
  const [submittedTicketId, setSubmittedTicketId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = submitHelpRequest({
      requesterName: name,
      phone,
      state,
      district: district || 'Central District',
      category,
      urgency,
      description
    });
    setSubmittedTicketId(id);
    setDescription('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-red-600 uppercase tracking-wider">
          <LifeBuoy className="w-4 h-4" />
          <span>Immediate Crisis Assistance & Social Safety Net</span>
        </div>
        <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-50">
          Emergency Help & Citizen Helplines
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-300 max-w-3xl leading-relaxed">
          If you or someone in your community is facing starvation, lack of emergency medical care, sudden homelessness, domestic distress, or denied rations, use these verified 24x7 toll-free public helplines or submit an urgent assistance request below.
        </p>
      </div>

      {/* 24x7 Emergency Helplines Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif-heading text-2xl font-bold text-stone-900 dark:text-stone-100">
            Verified National Emergency Helplines (Toll-Free)
          </h2>
          <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Lines Active 24x7
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {EMERGENCY_HELPLINES.map(helpline => (
            <div
              key={helpline.number}
              className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
                    {helpline.category}
                  </span>
                  <span className="text-[11px] text-stone-400 font-medium">
                    {helpline.availability}
                  </span>
                </div>

                <h3 className="font-serif-heading text-lg font-bold text-stone-900 dark:text-stone-100">
                  {helpline.title}
                </h3>

                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-sans-text">
                  {helpline.description}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 block uppercase tracking-wider">Dial Toll-Free</span>
                  <span className="font-serif-heading text-xl font-bold text-stone-900 dark:text-stone-100">
                    {helpline.number}
                  </span>
                </div>

                <a
                  href={`tel:${helpline.number}`}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Immediate Assistance Request Form */}
      <div className="p-6 sm:p-10 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 text-xs font-semibold mb-2">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Community Rapid Response Triage</span>
          </div>
          <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
            Submit a Help Request for You or Your Community
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-2xl mt-1">
            Need urgent grain rations, shelter assistance, or grievance escalation against denied welfare? Submissions are routed directly to our partner NGO network and district volunteers.
          </p>
        </div>

        {submittedTicketId ? (
          <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="font-serif-heading text-xl font-bold text-stone-900 dark:text-stone-100">
              Help Request Dispatched Successfully
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 max-w-md mx-auto">
              Your ticket reference number is <strong className="font-mono text-emerald-800 dark:text-emerald-300">{submittedTicketId}</strong>. A field volunteer or partner NGO will contact you at <strong>{phone}</strong> within our response timeline.
            </p>
            <button
              onClick={() => setSubmittedTicketId(null)}
              className="mt-3 px-5 py-2 bg-emerald-800 text-white rounded-xl text-xs font-semibold"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Requester / Contact Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter name"
                  className="w-full p-2.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="10-digit phone number"
                  className="w-full p-2.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  value={state}
                  onChange={e => setState(e.target.value)}
                  className="w-full p-2.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none"
                >
                  {INDIAN_STATES.filter(s => s !== 'All India').map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  District / Village / Locality <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={district}
                  onChange={e => setDistrict(e.target.value)}
                  placeholder="e.g. Varanasi Rural / Mirzapur"
                  className="w-full p-2.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Category of Assistance <span className="text-red-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full p-2.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none"
                >
                  <option value="Food">Food / Rations / Hunger Relief</option>
                  <option value="Shelter">Shelter & Blankets</option>
                  <option value="Healthcare">Healthcare & Emergency Hospitalization</option>
                  <option value="Financial Assistance">Financial Distress Relief</option>
                  <option value="Employment">Employment / Wage Distress</option>
                  <option value="Government Services">Government Scheme Grievance</option>
                  <option value="Women and child support">Women & Child Protection</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Urgency Level <span className="text-red-500">*</span>
                </label>
                <select
                  value={urgency}
                  onChange={e => setUrgency(e.target.value as any)}
                  className="w-full p-2.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none font-medium"
                >
                  <option value="Emergency (Immediate)">Emergency (Immediate / Life Threatening)</option>
                  <option value="High (24-48 Hours)">High (Within 24-48 Hours)</option>
                  <option value="Normal">Normal Support Request</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Detailed Description of the Situation <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Explain the urgent situation, how many individuals are impacted, any medical conditions, and current location details..."
                className="w-full p-2.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Urgent Help Request</span>
              </button>
            </div>
          </form>
        )}
      </div>

    </div>
  );
};
