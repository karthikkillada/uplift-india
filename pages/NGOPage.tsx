import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { NGOS_DATA, INDIAN_STATES } from '../data/mockData';
import { NGO } from '../types';
import { 
  HeartHandshake, 
  Search, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Building, 
  Calendar, 
  Send, 
  CheckCircle2, 
  X,
  ExternalLink
} from 'lucide-react';

export const NGOPage: React.FC = () => {
  const { submitHelpRequest, currentUser } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCause, setSelectedCause] = useState<string>('All');
  const [selectedState, setSelectedState] = useState<string>('All India');

  // Request Aid Modal
  const [targetNgo, setTargetNgo] = useState<NGO | null>(null);
  const [contactName, setContactName] = useState(currentUser.name || '');
  const [contactPhone, setContactPhone] = useState(currentUser.phone || '');
  const [district, setDistrict] = useState(currentUser.district || '');
  const [needCategory, setNeedCategory] = useState<'Food' | 'Shelter' | 'Healthcare' | 'Financial Assistance' | 'Employment' | 'Government Services' | 'Women and child support'>('Food');
  const [needDescription, setNeedDescription] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const causes = ['All', 'Food', 'Education', 'Healthcare', 'Shelter', 'Employment', 'Skill Training', 'Emergency Support'];

  const filteredNgos = useMemo(() => {
    return NGOS_DATA.filter(ngo => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        ngo.name.toLowerCase().includes(q) ||
        ngo.city.toLowerCase().includes(q) ||
        ngo.description.toLowerCase().includes(q);

      const matchCause =
        selectedCause === 'All' || ngo.causes.includes(selectedCause as any);

      const matchState =
        selectedState === 'All India' || ngo.state === selectedState;

      return matchSearch && matchCause && matchState;
    });
  }, [search, selectedCause, selectedState]);

  const handleOpenAidModal = (ngo: NGO) => {
    setTargetNgo(ngo);
    setNeedCategory(ngo.causes[0] as any || 'Food');
    setSubmitSuccess(false);
  };

  const handleAidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetNgo) return;

    submitHelpRequest({
      requesterName: contactName,
      phone: contactPhone,
      state: targetNgo.state,
      district: district || targetNgo.city,
      category: needCategory,
      urgency: 'High (24-48 Hours)',
      description: `[Routed to NGO: ${targetNgo.name}] ${needDescription}`
    });

    setSubmitSuccess(true);
    setTimeout(() => {
      setTargetNgo(null);
      setSubmitSuccess(false);
      setNeedDescription('');
    }, 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 dark:text-rose-400 uppercase tracking-wider">
          <HeartHandshake className="w-4 h-4" />
          <span>Civil Society & Community Relief Network</span>
        </div>
        <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-50">
          NGO & Community Support Directory
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-300 max-w-3xl leading-relaxed">
          Discover verified non-profit organizations, charitable trusts, and community kitchens across India providing immediate food relief, orphan education, free medical clinics, destitute shelter, and women's self-help credit.
        </p>
      </div>

      {/* Filter and Search Container */}
      <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by NGO name, city, or cause (e.g. Akshaya Patra, Mumbai, Food)..."
            className="w-full pl-10 pr-4 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>

        <div>
          <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-2">
            Support Categories:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {causes.map(cause => (
              <button
                key={cause}
                onClick={() => setSelectedCause(cause)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedCause === cause
                    ? 'bg-rose-800 text-white shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200/80 dark:hover:bg-stone-700'
                }`}
              >
                {cause}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t border-stone-100 dark:border-stone-800 max-w-xs text-xs">
          <label className="block text-stone-500 dark:text-stone-400 font-medium mb-1">Filter by State</label>
          <select
            value={selectedState}
            onChange={e => setSelectedState(e.target.value)}
            className="w-full p-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-800 dark:text-stone-200 focus:outline-none"
          >
            {INDIAN_STATES.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-stone-500">
        <div>Showing <strong>{filteredNgos.length}</strong> verified non-profit partners</div>
        {(search || selectedCause !== 'All' || selectedState !== 'All India') && (
          <button
            onClick={() => {
              setSearch('');
              setSelectedCause('All');
              setSelectedState('All India');
            }}
            className="text-rose-700 dark:text-rose-400 hover:underline font-medium"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* NGOs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNgos.map(ngo => (
          <div
            key={ngo.id}
            className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>NITI Aayog Darpan: {ngo.darpanId}</span>
                </div>
                <span className="text-stone-400 text-[11px]">Est. {ngo.establishedYear}</span>
              </div>

              <div>
                <h3 className="font-serif-heading text-xl font-bold text-stone-900 dark:text-stone-100 leading-snug">
                  {ngo.name}
                </h3>
                <div className="flex items-center gap-1 text-xs text-stone-500 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>{ngo.city}, {ngo.state}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-sans-text">
                {ngo.description}
              </p>

              {/* Causes tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {ngo.causes.map((c, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 text-[11px] font-semibold border border-rose-200/50 dark:border-rose-900/50"
                  >
                    {c}
                  </span>
                ))}
              </div>

              {/* Contact info list */}
              <div className="p-3 bg-stone-50 dark:bg-stone-800/50 rounded-xl space-y-1.5 text-xs text-stone-600 dark:text-stone-300">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <a href={`tel:${ngo.phone}`} className="hover:text-rose-700 font-medium">
                    {ngo.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <a href={`mailto:${ngo.email}`} className="hover:text-rose-700">
                    {ngo.email}
                  </a>
                </div>
                <div className="text-[11px] text-stone-400 pt-0.5 leading-snug">
                  Address: {ngo.address}
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
              <a
                href={`tel:${ngo.phone}`}
                className="text-xs font-semibold text-stone-600 dark:text-stone-300 hover:text-stone-900 flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5 text-rose-600" />
                <span>Call Helpline</span>
              </a>

              <button
                onClick={() => handleOpenAidModal(ngo)}
                className="px-4 py-2 bg-rose-800 hover:bg-rose-900 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
              >
                Request Community Aid
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Request Aid Modal */}
      {targetNgo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden">
            
            <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex items-start justify-between bg-stone-50 dark:bg-stone-950">
              <div>
                <span className="text-xs font-semibold text-rose-700 dark:text-rose-400 uppercase tracking-wider">
                  Direct Community Support Request
                </span>
                <h3 className="font-serif-heading text-lg font-bold text-stone-900 dark:text-stone-100 mt-0.5">
                  Request Assistance from {targetNgo.name}
                </h3>
              </div>
              <button
                onClick={() => setTargetNgo(null)}
                className="p-1 text-stone-400 hover:text-stone-600 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitSuccess ? (
              <div className="p-8 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-serif-heading text-lg font-bold text-stone-900 dark:text-stone-100">
                  Request Dispatched to {targetNgo.name}
                </h4>
                <p className="text-xs text-stone-500">
                  A ticket has been registered in the system. Local volunteer coordinators will verify and reach out via phone.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAidSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-medium text-stone-700 dark:text-stone-300 mb-1">
                    Your Name / Contact Person <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={e => setContactName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block font-medium text-stone-700 dark:text-stone-300 mb-1">
                    Mobile Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={e => setContactPhone(e.target.value)}
                    placeholder="Active mobile number"
                    className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-stone-700 dark:text-stone-300 mb-1">
                      City / District
                    </label>
                    <input
                      type="text"
                      value={district}
                      onChange={e => setDistrict(e.target.value)}
                      placeholder="e.g. Varanasi / Patna"
                      className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-stone-700 dark:text-stone-300 mb-1">
                      Assistance Type
                    </label>
                    <select
                      value={needCategory}
                      onChange={e => setNeedCategory(e.target.value as any)}
                      className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none"
                    >
                      <option value="Food">Food / Ration Kits</option>
                      <option value="Shelter">Shelter & Blankets</option>
                      <option value="Healthcare">Medical / Medicine Aid</option>
                      <option value="Financial Assistance">Financial Relief</option>
                      <option value="Employment">Livelihood Assistance</option>
                      <option value="Women and child support">Women & Child Support</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-stone-700 dark:text-stone-300 mb-1">
                    Describe the situation / immediate need <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={needDescription}
                    onChange={e => setNeedDescription(e.target.value)}
                    placeholder="Mention how many people need help, the exact location, and nature of emergency..."
                    className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setTargetNgo(null)}
                    className="px-4 py-2 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-xl font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-rose-800 hover:bg-rose-900 text-white rounded-xl font-semibold flex items-center gap-1.5 shadow"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Aid Request</span>
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
