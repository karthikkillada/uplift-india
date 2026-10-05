export type Language = 'en' | 'hi' | 'te' | 'ta' | 'kn' | 'ml';

export type UserRole = 'citizen' | 'volunteer' | 'ngo' | 'admin';

export interface Scheme {
  id: string;
  name: string;
  hindiName?: string;
  description: string;
  category: string;
  ministry?: string;
  benefit?: string;
  eligibility?: string;
  applicationUrl?: string;
}

export interface Job {
  id: string;
  title: string;
  organization: string;
  location: string;
  category: string;
  salary: string;
  description?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  provider: string;
  duration: string;
  isFree: boolean;
}

export interface NGO {
  id: string;
  name: string;
  city: string;
  causes: string[];
  description?: string;
}

export interface VolunteerOpportunity {
  id: string;
  title: string;
  organization: string;
  location: string;
  cause: string;
  description?: string;
}

export interface SuccessStory {
  id: string;
  name: string;
  location: string;
  title: string;
  story: string;
  image?: string;
}

export interface EmergencyHelpline {
  title: string;
  number: string;
  category: string;
  description: string;
}

export interface HelpRequest {
  id: string;
  name: string;
  phone: string;
  category: string;
  description: string;
  location: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  createdAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  state: string;
  district: string;
  age: number;
  occupation: string;
  annualIncome: number;
  locationType: string;
  savedSchemeIds: string[];
  appliedJobIds: string[];
  enrolledCourseIds: string[];
  volunteerOpportunityIds: string[];
  submittedHelpRequestIds: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'scheme' | 'job' | 'course' | 'general';
  read: boolean;
}
