import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SCHEMES_DATA, JOBS_DATA, COURSES_DATA, NGOS_DATA } from '../data/mockData';
import { HelpRequest } from '../types';
import { 
  ShieldCheck, 
  BarChart3, 
  Users, 
  Landmark, 
  Briefcase, 
  LifeBuoy, 
  Download, 
  CheckCircle2, 
  Clock, 
  Filter, 
  Search,
  Eye,
  Check,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { helpRequests, updateHelpRequestStatus, volunteerRegistrations } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'requests' | 'schemes' | 'jobs' | 'volunteers'>('overview');
  const [requestFilter, setRequestFilter] = useState<string>('All');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Quick statistics
  const totalBeneficiaries = 1245800;
  const activeSchemesCount = SCHEMES_DATA.length;
  const activeJobsCount = JOBS_DATA.length;
  const pendingRequestsCount = helpRequests.filter(r => r.status === 'Pending').length;
  const resolvedRequestsCount = helpRequests.filter(r => r.status === 'Resolved').length;

  const handleUpdateStatus = (id: string, newStatus: HelpRequest['status']) => {
    updateHelpRequestStatus(id, newStatus);
    setStatusMessage(`Ticket ${id} status updated to ${newStatus}`);
    setTimeout(() => setStatusMessage(null), 2500);
  };

  const handleExportReport = () => {
    const reportData = {
      timestamp: new Date().toISOString(),
      platform: 'Uplift India – SDG 1: No Poverty',
      metrics: {
        totalCitizensHelped: totalBeneficiaries,
        activeSchemes: activeSchemesCount,
        openJobs: activeJobsCount,
        registeredVolunteers: 12800 + volunteerRegistrations.length,
        helpRequests: helpRequests
      }
    };
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `uplift-india-sdg1-impact-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // State distribution data for chart
  const stateData = [
    { state: 'Uttar Pradesh', count: 420000, percent: 34 },
    { state: 'Bihar', count: 310000, percent: 25 },
    { state: 'Madhya Pradesh', count: 180000, percent: 14 },
    { state: 'Maharashtra', count: 140000, percent: 11 },
    { state: 'Rajasthan', count: 110000, percent: 9 },
    { state: 'Tamil Nadu', count: 85800, percent: 7 },
  ];

  // Help requests category distribution
  const categoryData = [
    { cat: 'Food & Rations', count: 42, color: 'bg-amber-600' },
    { cat: 'Healthcare & Hospitalization', count: 31, color: 'bg-emerald-600' },
    { cat: 'Shelter & Housing', count: 18, color: 'bg-blue-600' },
    { cat: 'Employment / Wage Issues', count: 24, color: 'bg-indigo-600' },
    { cat: 'Govt Scheme Grievances', count: 15, color: 'bg-rose-600' }
  ];

  // Scheme views distribution
  const schemeViews = [
    { name: 'PM-KISAN Samman Nidhi', views: '284K', width: '95%' },
    { name: 'Ayushman Bharat PM-JAY', views: '240K', width: '82%' },
    { name: 'PMAY-Gramin Housing', views: '198K', width: '68%' },
    { name: 'MGNREGA 100-Day Wage', views: '175K', width: '60%' },
    { name: 'PM SVANidhi Street Vendor', views: '132K', width: '45%' },
  ];

  const filteredRequests = helpRequests.filter(r =>
    requestFilter === 'All' || r.status === requestFilter
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>National Program Administration Console</span>
          </div>
          <h1 className="font-serif-heading text-3xl font-bold text-stone-900 dark:text-stone-50 mt-1">
            Uplift India · Impact Command Center
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Live analytics monitoring UN SDG 1 poverty reduction indicators, beneficiary reach, and grievance resolution.
          </p>
        </div>

        <button
          onClick={handleExportReport}
          className="px-4 py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-xl text-xs font-semibold flex items-center gap-2 hover:bg-stone-800 shadow self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export SDG 1 Impact Data</span>
        </button>
      </div>

      {statusMessage && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-emerald-800 dark:text-emerald-200 rounded-xl text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
            Citizens Lifted / Assisted
          </span>
          <div className="font-serif-heading text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 mt-1 tabular-nums">
            1.24M
          </div>
          <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+12.4% this quarter</span>
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
            Verified Schemes Active
          </span>
          <div className="font-serif-heading text-2xl sm:text-3xl font-bold text-amber-700 dark:text-amber-400 mt-1 tabular-nums">
            {activeSchemesCount}
          </div>
          <span className="text-[11px] text-stone-400 mt-1 block">
            100% gazette synchronized
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
            Pending Help Requests
          </span>
          <div className="font-serif-heading text-2xl sm:text-3xl font-bold text-red-600 mt-1 tabular-nums">
            {pendingRequestsCount}
          </div>
          <span className="text-[11px] text-stone-400 mt-1 block">
            Average response time: 3.2 hrs
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
            Resolved Grievances
          </span>
          <div className="font-serif-heading text-2xl sm:text-3xl font-bold text-emerald-600 mt-1 tabular-nums">
            {resolvedRequestsCount + 428}
          </div>
          <span className="text-[11px] text-emerald-600 font-medium mt-1 block">
            94.6% resolution rate
          </span>
        </div>

      </div>

      {/* Admin Navigation Sub-Tabs */}
      <div className="flex items-center gap-1 border-b border-stone-200 dark:border-stone-800 pb-px text-xs font-semibold">
        <button
          onClick={() => setActiveAdminTab('overview')}
          className={`px-4 py-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeAdminTab === 'overview'
              ? 'border-amber-700 text-amber-800 dark:text-amber-300'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Analytics & Visual Charts</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('requests')}
          className={`px-4 py-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeAdminTab === 'requests'
              ? 'border-amber-700 text-amber-800 dark:text-amber-300'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <LifeBuoy className="w-4 h-4" />
          <span>Manage Help Requests ({helpRequests.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('schemes')}
          className={`px-4 py-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeAdminTab === 'schemes'
              ? 'border-amber-700 text-amber-800 dark:text-amber-300'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Landmark className="w-4 h-4" />
          <span>Welfare Schemes Catalog</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('jobs')}
          className={`px-4 py-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeAdminTab === 'jobs'
              ? 'border-amber-700 text-amber-800 dark:text-amber-300'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Employment Postings</span>
        </button>
      </div>

      {/* Tab 1: Analytics & Interactive Visual Charts */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Chart 1: Beneficiaries by State */}
            <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
                <div>
                  <h3 className="font-serif-heading text-lg font-bold text-stone-900 dark:text-stone-100">
                    Beneficiaries by State
                  </h3>
                  <p className="text-[11px] text-stone-400">Distribution across major Indian states</p>
                </div>
                <span className="text-xs text-stone-500">1.24M Total</span>
              </div>

              <div className="space-y-3 pt-2">
                {stateData.map(item => (
                  <div key={item.state} className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-stone-700 dark:text-stone-300">
                      <span className="font-medium">{item.state}</span>
                      <span className="font-mono tabular-nums text-stone-500">
                        {item.count.toLocaleString('en-IN')} ({item.percent}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-600 rounded-full transition-all duration-700"
                        style={{ width: `${item.percent * 2.5}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart 2: Scheme Engagement & Views */}
            <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
                <div>
                  <h3 className="font-serif-heading text-lg font-bold text-stone-900 dark:text-stone-100">
                    Top Welfare Schemes Explored
                  </h3>
                  <p className="text-[11px] text-stone-400">Highest viewed eligibility queries</p>
                </div>
                <span className="text-xs text-stone-500">Last 30 Days</span>
              </div>

              <div className="space-y-3 pt-2">
                {schemeViews.map(sv => (
                  <div key={sv.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-stone-700 dark:text-stone-300">
                      <span className="font-medium truncate max-w-[240px]">{sv.name}</span>
                      <span className="font-mono tabular-nums text-emerald-600 font-semibold">{sv.views} views</span>
                    </div>
                    <div className="w-full h-2.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-700 rounded-full transition-all duration-700"
                        style={{ width: sv.width }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Chart 3: Help Requests by Category */}
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <div>
                <h3 className="font-serif-heading text-lg font-bold text-stone-900 dark:text-stone-100">
                  Citizen Distress & Help Requests by Category
                </h3>
                <p className="text-[11px] text-stone-400">Categorical breakdown of requests received across districts</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
              {categoryData.map(cat => (
                <div
                  key={cat.cat}
                  className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700 text-center space-y-1"
                >
                  <div className={`w-3 h-3 rounded-full ${cat.color} mx-auto mb-2`}></div>
                  <div className="font-serif-heading text-2xl font-bold text-stone-900 dark:text-stone-100 tabular-nums">
                    {cat.count}
                  </div>
                  <div className="text-[11px] text-stone-500 font-medium leading-tight">
                    {cat.cat}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Tab 2: Manage Help Requests */}
      {activeAdminTab === 'requests' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-serif-heading text-xl font-bold text-stone-900 dark:text-stone-100">
                Citizen Distress Tickets & Field Assignment
              </h2>
              <p className="text-xs text-stone-500">Update status as field volunteers verify and resolve aid.</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500">Filter:</span>
              <select
                value={requestFilter}
                onChange={e => setRequestFilter(e.target.value)}
                className="p-1.5 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-800 dark:text-stone-200"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Assigned">Assigned</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 dark:border-stone-800 text-stone-400 uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">Ticket ID</th>
                  <th className="py-3 px-3">Requester & Phone</th>
                  <th className="py-3 px-3">Location</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Urgency</th>
                  <th className="py-3 px-3">Current Status</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {filteredRequests.map(req => (
                  <tr key={req.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/40">
                    <td className="py-3 px-3 font-mono font-bold text-stone-700 dark:text-stone-300">
                      {req.id}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-stone-900 dark:text-stone-100">{req.requesterName}</div>
                      <div className="text-stone-400 text-[11px]">{req.phone}</div>
                    </td>
                    <td className="py-3 px-3 text-stone-600 dark:text-stone-400">
                      {req.district}, {req.state}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-[11px]">
                        {req.category}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        req.urgency.includes('Immediate') ? 'text-red-700 bg-red-50 dark:bg-red-950/40' : 'text-stone-600'
                      }`}>
                        {req.urgency}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-semibold">{req.status}</span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <select
                        value={req.status}
                        onChange={e => handleUpdateStatus(req.id, e.target.value as any)}
                        className="p-1 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded text-xs"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Assigned">Assigned</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Schemes Management */}
      {activeAdminTab === 'schemes' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif-heading text-xl font-bold text-stone-900 dark:text-stone-100">
                Verified Welfare Schemes Repository
              </h2>
              <p className="text-xs text-stone-500">Official government schemes currently synced in database</p>
            </div>
            <span className="text-xs text-emerald-600 font-semibold">All Synchronized</span>
          </div>

          <div className="divide-y divide-stone-100 dark:divide-stone-800 text-xs">
            {SCHEMES_DATA.map(s => (
              <div key={s.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-stone-900 dark:text-stone-100">{s.name}</div>
                  <div className="text-[11px] text-stone-500">{s.category} · {s.ministry}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[11px] font-semibold">
                    Verified Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Jobs Management */}
      {activeAdminTab === 'jobs' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif-heading text-xl font-bold text-stone-900 dark:text-stone-100">
                Livelihood & Rozgar Postings
              </h2>
              <p className="text-xs text-stone-500">Grassroots vacancies managed by district coordinators</p>
            </div>
            <span className="text-xs text-stone-500">{JOBS_DATA.length} Active Posts</span>
          </div>

          <div className="divide-y divide-stone-100 dark:divide-stone-800 text-xs">
            {JOBS_DATA.map(j => (
              <div key={j.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-stone-900 dark:text-stone-100">{j.title}</div>
                  <div className="text-[11px] text-stone-500">{j.organization} · {j.location} · {j.salary}</div>
                </div>
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold text-xs">
                  {j.vacancies} vacancies
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
