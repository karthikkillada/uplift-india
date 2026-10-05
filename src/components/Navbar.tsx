import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LANGUAGES } from '../data/translations';
import { 
  Search, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  Eye, 
  Type, 
  Bell, 
  Menu, 
  X, 
  ShieldCheck, 
  User, 
  ChevronDown,
  CheckCircle2,
  PhoneCall,
  LogIn,
  LogOut,
  Home,
  Briefcase,
  Landmark,
  GraduationCap,
  LifeBuoy,
  Sparkles
} from 'lucide-react';
import { UserRole } from '../types';

export const Navbar: React.FC = () => {
  const {
    t,
    language,
    setLanguage,
    activeTab,
    setActiveTab,
    setIsSearchOpen,
    isDarkMode,
    toggleDarkMode,
    isHighContrast,
    toggleHighContrast,
    isLargeText,
    toggleLargeText,
    isSpeaking,
    stopSpeaking,
    notifications,
    currentUser,
    switchRole,
    isAuthenticated,
    logout
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showAccessMenu, setShowAccessMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const primaryTaskLinks: { id: string; label: string; icon: React.ComponentType<{ className?: string }>; highlight?: boolean }[] = [
    { id: 'home', label: t('home'), icon: Home },
    { id: 'jobs', label: t('jobs'), icon: Briefcase },
    { id: 'schemes', label: t('schemes'), icon: Landmark },
    { id: 'skills', label: t('skills'), icon: GraduationCap },
    { id: 'emergency', label: t('emergency'), icon: LifeBuoy, highlight: true },
    ...(isAuthenticated ? [{ id: currentUser.role === 'admin' ? 'admin' : 'dashboard', label: currentUser.role === 'admin' ? 'Admin' : t('dashboard'), icon: User }] : []),
  ];

  const secondaryNavLinks: { id: string; label: string; highlight?: boolean }[] = [
    { id: 'eligibility', label: t('eligibility') },
    { id: 'financial', label: t('financialLiteracy') },
    { id: 'ngos', label: t('ngos') },
    { id: 'volunteer', label: t('volunteer') },
    { id: 'stories', label: t('stories') },
    ...(!isAuthenticated ? [{ id: 'login', label: t('login') }] : []),
  ];

  const allNavLinks = [...primaryTaskLinks, ...secondaryNavLinks];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRoleSelect = (role: UserRole) => {
    switchRole(role);
    setShowRoleMenu(false);
    if (role === 'admin') {
      setActiveTab('admin');
    } else {
      setActiveTab('dashboard');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-50/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800 transition-colors">
      {/* Top Accessibility & Emergency Alert Ribbon */}
      <div className="bg-amber-900 text-amber-50 text-xs px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="font-semibold tracking-wide flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            SDG 1 Initiative
          </span>
          <span className="text-amber-200/70 hidden sm:inline">|</span>
          <span className="text-amber-100 hidden sm:inline">
            Free national helpline for emergency relief:
          </span>
          <a href="tel:112" className="underline font-bold text-amber-200 hover:text-white">
            Dial 112 (24x7)
          </a>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Voice Stop if speaking */}
          {isSpeaking && (
            <button 
              onClick={stopSpeaking}
              className="flex items-center gap-1 bg-red-700 text-white px-2 py-0.5 rounded text-[11px] font-medium animate-pulse"
              title="Stop voice reading"
            >
              <VolumeX className="w-3.5 h-3.5" />
              <span>Stop Voice</span>
            </button>
          )}

          {/* Quick Language Switcher Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1 text-[11px] font-medium text-amber-100 hover:text-white px-1.5 py-0.5 rounded hover:bg-amber-800/60"
            >
              <span>{LANGUAGES.find(l => l.code === language)?.nativeName}</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            {showLangMenu && (
              <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-stone-900 rounded-md shadow-lg border border-stone-200 dark:border-stone-700 py-1 z-50 text-stone-900 dark:text-stone-100 text-xs">
                {LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setShowLangMenu(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center justify-between ${
                      language === lang.code ? 'font-bold text-amber-700 dark:text-amber-400' : ''
                    }`}
                  >
                    <span>{lang.nativeName}</span>
                    <span className="text-[10px] text-stone-400">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Role badge switcher */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-1 text-[11px] bg-amber-800/80 hover:bg-amber-800 px-2 py-0.5 rounded text-amber-100"
            >
              <span className="capitalize font-semibold">{currentUser.role} View</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            {showRoleMenu && (
              <div className="absolute right-0 mt-1 w-44 bg-white dark:bg-stone-900 rounded-md shadow-xl border border-stone-200 dark:border-stone-700 py-1.5 z-50 text-stone-900 dark:text-stone-100 text-xs">
                <div className="px-3 py-1 text-[10px] font-semibold text-stone-500 uppercase tracking-wider">
                  Switch User Perspective
                </div>
                {(['citizen', 'volunteer', 'ngo', 'admin'] as UserRole[]).map(role => (
                  <button
                    key={role}
                    onClick={() => handleRoleSelect(role)}
                    className={`w-full text-left px-3 py-1.5 hover:bg-amber-50 dark:hover:bg-stone-800 capitalize flex items-center justify-between ${
                      currentUser.role === role ? 'font-bold text-amber-700 dark:text-amber-400 bg-amber-50/50 dark:bg-stone-800/50' : ''
                    }`}
                  >
                    <span>{role}</span>
                    {currentUser.role === role && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Top Bar (Strict 3-zone contract) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left group flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-600 to-amber-500 flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
                UI
              </div>
              <div>
                <span className="font-serif-heading text-xl font-bold tracking-tight text-stone-900 dark:text-stone-50 block leading-tight">
                  Uplift India
                </span>
                <span className="text-[10px] tracking-wider uppercase text-amber-700 dark:text-amber-400 font-semibold block">
                  SDG 1: No Poverty
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Clean text with hover underlines) */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-stone-700 dark:text-stone-300">
            {primaryTaskLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors py-1 relative hover:text-amber-700 dark:hover:text-amber-400 flex items-center gap-1.5 ${
                  activeTab === link.id
                    ? 'text-amber-700 dark:text-amber-400 font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-amber-700 dark:after:bg-amber-400'
                    : ''
                } ${link.highlight ? 'text-red-600 dark:text-red-400 font-semibold' : ''}`}
              >
                <span>{link.label}</span>
                {link.highlight && <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>}
              </button>
            ))}

            {/* More Links Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 py-1 hover:text-amber-700 dark:hover:text-amber-400 text-stone-600 dark:text-stone-400">
                <span>More</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="absolute left-0 mt-1 w-48 bg-white dark:bg-stone-900 rounded-md shadow-lg border border-stone-200 dark:border-stone-800 py-1 hidden group-hover:block transition-all z-30">
                {secondaryNavLinks.map(link => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`w-full text-left px-4 py-2 text-xs hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center justify-between text-stone-700 dark:text-stone-300 ${
                      activeTab === link.id ? 'font-bold bg-amber-50 dark:bg-stone-800 text-amber-700' : ''
                    }`}
                  >
                    <span>{link.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Global Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
              title="Search schemes, jobs, courses, NGOs (Ctrl+K)"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Accessibility Options Popover */}
            <div className="relative">
              <button
                onClick={() => setShowAccessMenu(!showAccessMenu)}
                className="p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
                title="Accessibility Tools"
                aria-label="Accessibility settings"
              >
                <Eye className="w-4 h-4" />
              </button>
              {showAccessMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-stone-900 rounded-lg shadow-xl border border-stone-200 dark:border-stone-700 p-3 z-50 text-xs">
                  <div className="font-semibold text-stone-800 dark:text-stone-200 mb-2 pb-1 border-b border-stone-100 dark:border-stone-800">
                    Accessibility Preferences
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={toggleLargeText}
                      className="w-full flex items-center justify-between p-1.5 rounded hover:bg-stone-100 dark:hover:bg-stone-800"
                    >
                      <span className="flex items-center gap-2">
                        <Type className="w-3.5 h-3.5" />
                        <span>Large Text</span>
                      </span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] ${isLargeText ? 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 font-semibold' : 'text-stone-400'}`}>
                        {isLargeText ? 'ON' : 'OFF'}
                      </span>
                    </button>

                    <button
                      onClick={toggleHighContrast}
                      className="w-full flex items-center justify-between p-1.5 rounded hover:bg-stone-100 dark:hover:bg-stone-800"
                    >
                      <span className="flex items-center gap-2">
                        <Eye className="w-3.5 h-3.5" />
                        <span>High Contrast</span>
                      </span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] ${isHighContrast ? 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 font-semibold' : 'text-stone-400'}`}>
                        {isHighContrast ? 'ON' : 'OFF'}
                      </span>
                    </button>

                    <button
                      onClick={toggleDarkMode}
                      className="w-full flex items-center justify-between p-1.5 rounded hover:bg-stone-100 dark:hover:bg-stone-800"
                    >
                      <span className="flex items-center gap-2">
                        {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                        <span>Dark Theme</span>
                      </span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] ${isDarkMode ? 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 font-semibold' : 'text-stone-400'}`}>
                        {isDarkMode ? 'ON' : 'OFF'}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifMenu(!showNotifMenu)}
                className="p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors relative"
                title="Notifications"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-600"></span>
                )}
              </button>
              {showNotifMenu && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-stone-900 rounded-lg shadow-xl border border-stone-200 dark:border-stone-700 p-3 z-50 text-xs">
                  <div className="flex items-center justify-between mb-2 pb-1 border-b border-stone-100 dark:border-stone-800 font-semibold">
                    <span>Updates & Scheme Alerts</span>
                    <span className="text-[10px] text-stone-400">{notifications.length} alerts</span>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className="p-2 rounded bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-800">
                        <div className="font-medium text-stone-900 dark:text-stone-100">{n.title}</div>
                        <div className="text-[11px] text-stone-600 dark:text-stone-400 mt-0.5 leading-relaxed">{n.description}</div>
                        <div className="text-[9px] text-stone-400 mt-1">{n.date}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Authentication Action / User Dashboard Shortcut */}
            {!isAuthenticated ? (
              <button
                onClick={() => handleNavClick('login')}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold ${
                  activeTab === 'login'
                    ? 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800'
                }`}
                title="Sign In to Account"
              >
                <LogIn className="w-4 h-4" />
                <span>{t('login')}</span>
              </button>
            ) : (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleNavClick(currentUser.role === 'admin' ? 'admin' : 'dashboard')}
                  className={`p-2 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium ${
                    activeTab === 'dashboard' || activeTab === 'admin'
                      ? 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800'
                  }`}
                  title="Dashboard"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden md:inline capitalize">{currentUser.role === 'admin' ? 'Admin' : 'Dashboard'}</span>
                </button>

                <button
                  onClick={() => {
                    logout();
                    setActiveTab('login');
                  }}
                  className="p-2 rounded-lg text-stone-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors hidden sm:flex items-center"
                  title="Sign Out / Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Primary Action Button */}
            <button
              onClick={() => handleNavClick('eligibility')}
              className="bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap hidden sm:block"
            >
              {t('findSupport')}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-700 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Dedicated Quick Action Task Bar Strip: Home, Jobs, and Important Things Separately */}
      <div className="bg-stone-100/95 dark:bg-stone-900/95 border-t border-b border-stone-200/80 dark:border-stone-800 px-3 sm:px-4 py-1.5 overflow-x-auto scrollbar-none shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs min-w-max sm:min-w-0">
          
          {/* Separately Segmented Task Bar Items: Home, Jobs, Important Things */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* 1. HOME BUTTON */}
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold transition-all text-xs ${
                activeTab === 'home'
                  ? 'bg-amber-700 text-white shadow-sm ring-1 ring-amber-700'
                  : 'text-stone-700 dark:text-stone-200 hover:bg-white dark:hover:bg-stone-800 border border-stone-200/80 dark:border-stone-700/80 bg-white/80 dark:bg-stone-800/80'
              }`}
              title="Return to Home page"
            >
              <Home className="w-3.5 h-3.5 shrink-0" />
              <span>{t('home')}</span>
            </button>

            {/* 2. JOBS BUTTON (SEPARATELY HIGHLIGHTED) */}
            <button
              onClick={() => handleNavClick('jobs')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold transition-all text-xs ${
                activeTab === 'jobs'
                  ? 'bg-emerald-700 text-white shadow-sm ring-1 ring-emerald-700'
                  : 'text-stone-700 dark:text-stone-200 hover:bg-white dark:hover:bg-stone-800 border border-stone-200/80 dark:border-stone-700/80 bg-white/80 dark:bg-stone-800/80'
              }`}
              title="Browse employment & job opportunities"
            >
              <Briefcase className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{t('jobs')}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeTab === 'jobs'
                  ? 'bg-emerald-800 text-emerald-100'
                  : 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
              }`}>
                15+
              </span>
            </button>

            {/* Visual Divider between Home/Jobs and Important Things */}
            <div className="h-5 w-px bg-stone-300 dark:bg-stone-700 mx-1 hidden sm:block"></div>

            {/* 3. IMPORTANT THINGS (GROUPED SEPARATELY) */}
            <div className="flex items-center gap-1 bg-stone-200/60 dark:bg-stone-800/60 p-1 rounded-xl border border-stone-200/90 dark:border-stone-700/60">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 px-1.5 hidden md:flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>Important Things:</span>
              </span>

              {/* Government Schemes */}
              <button
                onClick={() => handleNavClick('schemes')}
                className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-semibold transition-all text-xs ${
                  activeTab === 'schemes'
                    ? 'bg-amber-700 text-white shadow-xs'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-800'
                }`}
                title="Verified Government Welfare Schemes"
              >
                <Landmark className="w-3.5 h-3.5 shrink-0" />
                <span>{t('schemes')}</span>
              </button>

              {/* Am I Eligible */}
              <button
                onClick={() => handleNavClick('eligibility')}
                className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-semibold transition-all text-xs ${
                  activeTab === 'eligibility'
                    ? 'bg-amber-700 text-white shadow-xs'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-800'
                }`}
                title="Instant Welfare Eligibility Questionnaire"
              >
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span className="hidden sm:inline">{t('eligibility')}</span>
                <span className="sm:hidden">Eligibility</span>
              </button>

              {/* Skills */}
              <button
                onClick={() => handleNavClick('skills')}
                className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-semibold transition-all text-xs ${
                  activeTab === 'skills'
                    ? 'bg-amber-700 text-white shadow-xs'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-800'
                }`}
                title="Free Skill Training & Certifications"
              >
                <GraduationCap className="w-3.5 h-3.5 shrink-0 text-indigo-600 dark:text-indigo-400" />
                <span>{t('skills')}</span>
              </button>

              {/* Emergency Help */}
              <button
                onClick={() => handleNavClick('emergency')}
                className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-semibold transition-all text-xs ${
                  activeTab === 'emergency'
                    ? 'bg-red-700 text-white shadow-xs'
                    : 'text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/60'
                }`}
                title="Emergency Helplines (112, 1098, Food & Medical)"
              >
                <LifeBuoy className="w-3.5 h-3.5 shrink-0 text-red-600 dark:text-red-400" />
                <span>{t('emergency')}</span>
              </button>

              {/* Dashboard / Profile if Authenticated */}
              {isAuthenticated && (
                <button
                  onClick={() => handleNavClick(currentUser.role === 'admin' ? 'admin' : 'dashboard')}
                  className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-semibold transition-all text-xs ${
                    activeTab === 'dashboard' || activeTab === 'admin'
                      ? 'bg-amber-700 text-white shadow-xs'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-800'
                  }`}
                  title="My Applications & Profile"
                >
                  <User className="w-3.5 h-3.5 shrink-0" />
                  <span className="capitalize">{currentUser.role === 'admin' ? 'Admin' : 'My Dashboard'}</span>
                </button>
              )}
            </div>

          </div>

          {/* Right Status / Auth Info */}
          <div className="flex items-center gap-2.5 shrink-0">
            {isAuthenticated ? (
              <div className="flex items-center gap-2 text-[11px]">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="font-semibold">{currentUser.name}</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 capitalize">({currentUser.role})</span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setActiveTab('home');
                  }}
                  className="px-2 py-1 rounded text-stone-500 hover:text-red-600 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors font-medium text-xs flex items-center gap-1"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('login')}
                className="px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 font-semibold hover:bg-amber-200 dark:hover:bg-amber-900 transition-colors flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In / Register</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-50 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 px-4 pt-2 pb-6 space-y-1">
          <div className="mb-3">
            <button
              onClick={() => {
                setIsSearchOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs bg-stone-200/70 dark:bg-stone-800 text-stone-600 dark:text-stone-300 rounded-lg"
            >
              <Search className="w-4 h-4" />
              <span>Search schemes, jobs, courses, NGOs...</span>
            </button>
          </div>

          {allNavLinks.map(link => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-between ${
                activeTab === link.id
                  ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 font-semibold'
                  : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
              } ${link.highlight ? 'text-red-600 dark:text-red-400 font-semibold' : ''}`}
            >
              <span>{link.label}</span>
              {link.highlight && <PhoneCall className="w-4 h-4 text-red-500" />}
            </button>
          ))}

          <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex gap-2">
            <button
              onClick={() => handleNavClick('eligibility')}
              className="w-full bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold py-2.5 rounded-lg text-center"
            >
              {t('findSupport')}
            </button>
            <button
              onClick={() => handleNavClick('dashboard')}
              className="w-full border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold py-2.5 rounded-lg text-center"
            >
              {t('dashboard')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
