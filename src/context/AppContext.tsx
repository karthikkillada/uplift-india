import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, UserRole, UserProfile, HelpRequest, NotificationItem } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { INITIAL_HELP_REQUESTS } from '../data/mockData';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedState: string;
  setSelectedState: (state: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isHighContrast: boolean;
  toggleHighContrast: () => void;
  isLargeText: boolean;
  toggleLargeText: () => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  currentUser: UserProfile;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  switchRole: (role: UserRole) => void;
  savedSchemeIds: string[];
  toggleSaveScheme: (schemeId: string) => void;
  appliedJobIds: string[];
  applyForJob: (jobId: string) => void;
  enrolledCourseIds: string[];
  enrollCourse: (courseId: string) => void;
  helpRequests: HelpRequest[];
  submitHelpRequest: (data: Omit<HelpRequest, 'id' | 'createdAt' | 'status'>) => string;
  updateHelpRequestStatus: (id: string, status: HelpRequest['status']) => void;
  volunteerRegistrations: Array<{
    name: string;
    phone: string;
    email: string;
    state: string;
    cause: string;
    timeCommitment: string;
  }>;
  registerAsVolunteer: (data: {
    name: string;
    phone: string;
    email: string;
    state: string;
    cause: string;
    timeCommitment: string;
  }) => void;
  isAuthenticated: boolean;
  login: (identifier: string, role?: UserRole, name?: string) => void;
  logout: () => void;
  registerUser: (data: Partial<UserProfile>) => void;
  notifications: NotificationItem[];
  markNotificationsAsRead: () => void;
  isSpeaking: boolean;
  speakText: (text: string) => void;
  stopSpeaking: () => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'user-001',
  name: 'Rajesh Sharma',
  email: 'rajesh.sharma@example.in',
  phone: '98765 01234',
  role: 'citizen',
  state: 'Uttar Pradesh',
  district: 'Varanasi',
  age: 32,
  occupation: 'Agricultural Worker',
  annualIncome: 140000,
  locationType: 'Rural',
  savedSchemeIds: ['pm-kisan', 'ayushman-bharat'],
  appliedJobIds: ['job-1'],
  enrolledCourseIds: ['course-1'],
  volunteerOpportunityIds: [],
  submittedHelpRequestIds: ['req-101']
};

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'New Installment for PM-KISAN Released',
    description: 'The 18th tranche of PM-KISAN has been disbursed directly via DBT. Verify your Aadhaar-NPCI bank status.',
    date: '2 Hours ago',
    type: 'scheme',
    read: false
  },
  {
    id: 'notif-2',
    title: 'CSC VLE Hiring Drive Announced',
    description: 'Common Service Centres (CSC) opened 45 new village coordinator vacancies across Eastern UP.',
    date: '1 Day ago',
    type: 'job',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Free Rooftop Solar Training Camp',
    description: 'Applications open for 30 days hands-on apprentice training under PM Surya Ghar Muft Bijli Yojana.',
    date: '3 Days ago',
    type: 'course',
    read: true
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('uplift_lang') as Language) || 'en';
  });

  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedState, setSelectedState] = useState<string>('All India');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('uplift_dark') === 'true';
  });

  const [isHighContrast, setIsHighContrast] = useState<boolean>(() => {
    return localStorage.getItem('uplift_contrast') === 'true';
  });

  const [isLargeText, setIsLargeText] = useState<boolean>(() => {
    return localStorage.getItem('uplift_large_text') === 'true';
  });

  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('uplift_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  const [savedSchemeIds, setSavedSchemeIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('uplift_saved_schemes');
    return saved ? JSON.parse(saved) : ['pm-kisan', 'ayushman-bharat'];
  });

  const [appliedJobIds, setAppliedJobIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('uplift_applied_jobs');
    return saved ? JSON.parse(saved) : ['job-1'];
  });

  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('uplift_enrolled_courses');
    return saved ? JSON.parse(saved) : ['course-1'];
  });

  const [helpRequests, setHelpRequests] = useState<HelpRequest[]>(() => {
    const saved = localStorage.getItem('uplift_help_requests');
    return saved ? JSON.parse(saved) : INITIAL_HELP_REQUESTS;
  });

  const [volunteerRegistrations, setVolunteerRegistrations] = useState<any[]>(() => {
    const saved = localStorage.getItem('uplift_volunteers');
    return saved ? JSON.parse(saved) : [];
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('uplift_auth') !== 'false';
  });
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Sync classes with DOM
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('uplift_dark', isDarkMode ? 'true' : 'false');
  }, [isDarkMode]);

  useEffect(() => {
    if (isHighContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    localStorage.setItem('uplift_contrast', isHighContrast ? 'true' : 'false');
  }, [isHighContrast]);

  useEffect(() => {
    if (isLargeText) {
      document.documentElement.classList.add('large-text');
    } else {
      document.documentElement.classList.remove('large-text');
    }
    localStorage.setItem('uplift_large_text', isLargeText ? 'true' : 'false');
  }, [isLargeText]);

  useEffect(() => {
    localStorage.setItem('uplift_saved_schemes', JSON.stringify(savedSchemeIds));
  }, [savedSchemeIds]);

  useEffect(() => {
    localStorage.setItem('uplift_applied_jobs', JSON.stringify(appliedJobIds));
  }, [appliedJobIds]);

  useEffect(() => {
    localStorage.setItem('uplift_enrolled_courses', JSON.stringify(enrolledCourseIds));
  }, [enrolledCourseIds]);

  useEffect(() => {
    localStorage.setItem('uplift_help_requests', JSON.stringify(helpRequests));
  }, [helpRequests]);

  useEffect(() => {
    localStorage.setItem('uplift_volunteers', JSON.stringify(volunteerRegistrations));
  }, [volunteerRegistrations]);

  useEffect(() => {
    localStorage.setItem('uplift_user', JSON.stringify(currentUser));
  }, [currentUser]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('uplift_lang', lang);
  };

  const t = (key: string): string => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS.en[key] || key;
  };

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);
  const toggleHighContrast = () => setIsHighContrast(prev => !prev);
  const toggleLargeText = () => setIsLargeText(prev => !prev);

  const toggleSaveScheme = (schemeId: string) => {
    setSavedSchemeIds(prev => {
      const updated = prev.includes(schemeId)
        ? prev.filter(id => id !== schemeId)
        : [...prev, schemeId];
      return updated;
    });
  };

  const applyForJob = (jobId: string) => {
    if (!appliedJobIds.includes(jobId)) {
      setAppliedJobIds(prev => [...prev, jobId]);
    }
  };

  const enrollCourse = (courseId: string) => {
    if (!enrolledCourseIds.includes(courseId)) {
      setEnrolledCourseIds(prev => [...prev, courseId]);
    }
  };

  const submitHelpRequest = (data: Omit<HelpRequest, 'id' | 'createdAt' | 'status'>): string => {
    const newId = `req-${Date.now().toString().slice(-4)}`;
    const newReq: HelpRequest = {
      ...data,
      id: newId,
      status: 'Pending',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };
    setHelpRequests(prev => [newReq, ...prev]);
    return newId;
  };

  const updateHelpRequestStatus = (id: string, status: HelpRequest['status']) => {
    setHelpRequests(prev =>
      prev.map(r => (r.id === id ? { ...r, status } : r))
    );
  };

  const registerAsVolunteer = (data: any) => {
    setVolunteerRegistrations(prev => [data, ...prev]);
  };

  const switchRole = (role: UserRole) => {
    setCurrentUser(prev => ({ ...prev, role }));
  };

  const login = (identifier: string, role: UserRole = 'citizen', name?: string) => {
    setIsAuthenticated(true);
    localStorage.setItem('uplift_auth', 'true');
    setCurrentUser(prev => ({
      ...prev,
      name: name || (identifier.includes('@') ? identifier.split('@')[0] : 'Citizen ' + identifier.slice(-4)),
      email: identifier.includes('@') ? identifier : `${identifier}@citizen.upliftindia.gov.in`,
      phone: identifier.includes('@') ? prev.phone : identifier,
      role: role || prev.role
    }));
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('uplift_auth', 'false');
  };

  const registerUser = (data: Partial<UserProfile>) => {
    setIsAuthenticated(true);
    localStorage.setItem('uplift_auth', 'true');
    setCurrentUser(prev => ({
      ...prev,
      ...data,
      id: `user-${Date.now().toString().slice(-4)}`
    }));
  };

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Web Speech API Text to Speech
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Choose appropriate voice/lang if available
    const langMap: Record<Language, string> = {
      en: 'en-IN',
      hi: 'hi-IN',
      te: 'te-IN',
      ta: 'ta-IN',
      kn: 'kn-IN',
      ml: 'ml-IN',
    };
    utterance.lang = langMap[language] || 'en-IN';
    utterance.rate = 0.95; // Slightly slower for better comprehension

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        activeTab,
        setActiveTab,
        selectedState,
        setSelectedState,
        isDarkMode,
        toggleDarkMode,
        isHighContrast,
        toggleHighContrast,
        isLargeText,
        toggleLargeText,
        isSearchOpen,
        setIsSearchOpen,
        currentUser,
        setCurrentUser,
        switchRole,
        savedSchemeIds,
        toggleSaveScheme,
        appliedJobIds,
        applyForJob,
        enrolledCourseIds,
        enrollCourse,
        helpRequests,
        submitHelpRequest,
        updateHelpRequestStatus,
        volunteerRegistrations,
        registerAsVolunteer,
        notifications,
        markNotificationsAsRead,
        isSpeaking,
        speakText,
        stopSpeaking,
        isAuthenticated,
        login,
        logout,
        registerUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
