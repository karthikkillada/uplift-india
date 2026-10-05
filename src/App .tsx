/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { SchemesPage } from './pages/SchemesPage';
import { EligibilityPage } from './pages/EligibilityPage';
import { JobsPage } from './pages/JobsPage';
import { SkillsPage } from './pages/SkillsPage';
import { FinancialLiteracyPage } from './pages/FinancialLiteracyPage';
import { NGOPage } from './pages/NGOPage';
import { VolunteerPage } from './pages/VolunteerPage';
import { SuccessStoriesPage } from './pages/SuccessStoriesPage';
import { EmergencyHelpPage } from './pages/EmergencyHelpPage';
import { UserDashboard } from './pages/UserDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { LoginPage } from './pages/LoginPage';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <main className="min-h-screen flex flex-col justify-between bg-[#FAF9F5] dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors">
      <Navbar />
      <GlobalSearchModal />
      
      <div className="flex-1">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'schemes' && <SchemesPage />}
        {activeTab === 'eligibility' && <EligibilityPage />}
        {activeTab === 'jobs' && <JobsPage />}
        {activeTab === 'skills' && <SkillsPage />}
        {activeTab === 'financial' && <FinancialLiteracyPage />}
        {activeTab === 'ngos' && <NGOPage />}
        {activeTab === 'volunteer' && <VolunteerPage />}
        {activeTab === 'stories' && <SuccessStoriesPage />}
        {activeTab === 'emergency' && <EmergencyHelpPage />}
        {activeTab === 'dashboard' && <UserDashboard />}
        {activeTab === 'admin' && <AdminDashboard />}
        {activeTab === 'login' && <LoginPage />}
      </div>

      <Footer />
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
