import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INDIAN_STATES } from '../data/mockData';
import { UserRole } from '../types';
import { 
  ShieldCheck, 
  Lock, 
  Phone, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  KeyRound, 
  Smartphone, 
  UserCheck, 
  ArrowLeft, 
  RefreshCw,
  Sparkles,
  Building,
  User,
  HeartHandshake
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, registerUser, setActiveTab, t } = useApp();

  // Mode: 'login' | 'forgot' | 'signup'
  const [mode, setMode] = useState<'login' | 'forgot' | 'signup'>('login');
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('98765 01234');
  const [loginPassword, setLoginPassword] = useState('Password@123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loginError, setLoginError] = useState<string | null>(null);

  // OTP Login state
  const [otpSent, setOtpSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');

  // Forgot Password Flow State (1: Request, 2: Verify OTP, 3: New Password, 4: Success)
  const [forgotStep, setForgotStep] = useState<1 | 2 | 3 | 4>(1);
  const [resetIdentifier, setResetIdentifier] = useState('');
  const [resetOtp, setResetOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);

  // Sign Up State
  const [signupName, setSignupName] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupState, setSignupState] = useState('Uttar Pradesh');
  const [signupDistrict, setSignupDistrict] = useState('');
  const [signupRole, setSignupRole] = useState<UserRole>('citizen');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupOccupation, setSignupOccupation] = useState('Agricultural Worker');
  const [signupError, setSignupError] = useState<string | null>(null);

  // 1-Click Demo Profiles for quick testing
  const demoLogins = [
    {
      role: 'citizen' as UserRole,
      title: 'Citizen / Farmer',
      name: 'Rajesh Sharma',
      id: '98765 01234',
      icon: User,
      desc: 'Beneficiary seeking PM-KISAN, Awas & Jobs'
    },
    {
      role: 'volunteer' as UserRole,
      title: 'Community Volunteer',
      name: 'Priya Nair',
      id: 'priya.volunteer@uplift.in',
      icon: HeartHandshake,
      desc: 'Grassroots digital literacy mentor'
    },
    {
      role: 'ngo' as UserRole,
      title: 'NGO Coordinator',
      name: 'Amitabh Sengupta',
      id: 'akshaya.patra@ngo.org',
      icon: Building,
      desc: 'Darpan-registered food relief lead'
    },
    {
      role: 'admin' as UserRole,
      title: 'SDG Administrator',
      name: 'Dr. K. Ramanathan',
      id: 'admin.sdg1@upliftindia.gov.in',
      icon: ShieldCheck,
      desc: 'Nodal monitoring & grievance console'
    }
  ];

  // --- Handlers ---
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (!loginIdentifier.trim()) {
      setLoginError('Please enter your registered mobile number or email.');
      return;
    }

    if (loginMethod === 'password') {
      if (!loginPassword) {
        setLoginError('Please enter your account password.');
        return;
      }
      login(loginIdentifier, 'citizen');
      setActiveTab('home');
    } else {
      // OTP method
      if (!otpSent) {
        setOtpSent(true);
      } else {
        if (enteredOtp !== '123456' && enteredOtp.length < 4) {
          setLoginError('Invalid OTP. Use 123456 for instant demo sign-in.');
          return;
        }
        login(loginIdentifier, 'citizen');
        setActiveTab('home');
      }
    }
  };

  const handleQuickDemoLogin = (demo: typeof demoLogins[0]) => {
    login(demo.id, demo.role, demo.name);
    setActiveTab('home');
  };

  // Forgot password handlers
  const handleForgotStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setResetError(null);
    if (!resetIdentifier.trim()) {
      setResetError('Please provide your registered mobile number or email address.');
      return;
    }
    setForgotStep(2);
  };

  const handleForgotStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setResetError(null);
    if (resetOtp !== '123456' && resetOtp.length < 4) {
      setResetError('Incorrect verification code. For demonstration, use code: 123456');
      return;
    }
    setForgotStep(3);
  };

  const handleForgotStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    setResetError(null);
    if (newPassword.length < 6) {
      setResetError('Password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setResetError('Passwords do not match. Please re-enter.');
      return;
    }
    setForgotStep(4);
  };

  // Sign up handler
  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError(null);

    if (!signupName.trim() || !signupPhone.trim()) {
      setSignupError('Please fill all mandatory fields marked with an asterisk (*).');
      return;
    }

    registerUser({
      name: signupName,
      phone: signupPhone,
      email: signupEmail || `${signupPhone}@citizen.upliftindia.gov.in`,
      state: signupState,
      district: signupDistrict || 'Central District',
      role: signupRole,
      occupation: signupOccupation,
      savedSchemeIds: ['pm-kisan', 'ayushman-bharat'],
      appliedJobIds: [],
      enrolledCourseIds: [],
      volunteerOpportunityIds: [],
      submittedHelpRequestIds: []
    });

    setActiveTab('home');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Unified Citizen & Partner Authentication Gateway</span>
        </div>
        <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-50">
          {mode === 'login' && 'Sign In to Uplift India'}
          {mode === 'forgot' && 'Reset Account Password'}
          {mode === 'signup' && 'Create Your Uplift Account'}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-md mx-auto">
          {mode === 'login' && 'Access your personalized welfare dashboard, saved schemes, job applications, and skill certifications.'}
          {mode === 'forgot' && 'Verify your mobile number or email to securely restore access to your account.'}
          {mode === 'signup' && 'Register in under 1 minute to receive localized welfare alerts and job matches.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Main Form Box */}
        <div className="md:col-span-7 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 p-6 sm:p-8 shadow-md space-y-6">
          
          {/* Top Switcher Tabs with direct Forgot Password option */}
          <div className="flex p-1 bg-stone-100 dark:bg-stone-800 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setLoginError(null);
              }}
              className={`flex-1 py-2 rounded-lg transition-all ${
                mode === 'login'
                  ? 'bg-white dark:bg-stone-900 text-amber-800 dark:text-amber-300 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('forgot');
                setForgotStep(1);
                setResetError(null);
                if (!resetIdentifier && loginIdentifier) {
                  setResetIdentifier(loginIdentifier);
                }
              }}
              className={`flex-1 py-2 rounded-lg transition-all ${
                mode === 'forgot'
                  ? 'bg-white dark:bg-stone-900 text-amber-800 dark:text-amber-300 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              Forgot Password
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setSignupError(null);
              }}
              className={`flex-1 py-2 rounded-lg transition-all ${
                mode === 'signup'
                  ? 'bg-white dark:bg-stone-900 text-amber-800 dark:text-amber-300 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* ----------------- MODE 1: LOGIN ----------------- */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs sm:text-sm">
              
              {/* Method Toggle: Password vs OTP */}
              <div className="flex items-center justify-between text-xs border-b border-stone-100 dark:border-stone-800 pb-2">
                <span className="text-stone-500 font-medium">Authentication Method:</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setLoginMethod('password');
                      setOtpSent(false);
                      setLoginError(null);
                    }}
                    className={`px-2.5 py-1 rounded text-xs font-medium ${
                      loginMethod === 'password'
                        ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-semibold'
                        : 'text-stone-400 hover:text-stone-600'
                    }`}
                  >
                    Password
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginMethod('otp');
                      setLoginError(null);
                    }}
                    className={`px-2.5 py-1 rounded text-xs font-medium ${
                      loginMethod === 'otp'
                        ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-semibold'
                        : 'text-stone-400 hover:text-stone-600'
                    }`}
                  >
                    Mobile OTP (SMS)
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              {/* Identifier Input */}
              <div>
                <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Mobile Number or Email ID <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-stone-400">
                    {loginIdentifier.includes('@') ? <Mail className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                  </span>
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={e => setLoginIdentifier(e.target.value)}
                    placeholder="Enter 10-digit mobile or email address"
                    className="w-full pl-9 pr-4 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs sm:text-sm"
                  />
                </div>
              </div>

              {/* Password Option */}
              {loginMethod === 'password' && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-semibold text-stone-700 dark:text-stone-300">
                      Account Password <span className="text-red-500">*</span>
                    </label>
                    
                    {/* CRITICAL FEATURE: FORGOT PASSWORD LINK */}
                    <button
                      type="button"
                      onClick={() => {
                        setResetIdentifier(loginIdentifier);
                        setForgotStep(1);
                        setResetError(null);
                        setMode('forgot');
                      }}
                      className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:text-amber-800 hover:underline transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <div className="relative">
                    <span className="absolute left-3 top-3 text-stone-400">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={loginPassword}
                      onChange={e => setLoginPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-9 pr-10 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* OTP Option */}
              {loginMethod === 'otp' && (
                <div className="space-y-3">
                  {!otpSent ? (
                    <div className="p-3 bg-amber-50 dark:bg-stone-800 rounded-xl text-xs text-stone-600 dark:text-stone-300">
                      A 6-digit one-time password will be sent via SMS to verify your mobile.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="font-semibold text-stone-700 dark:text-stone-300 text-xs">
                          Enter 6-Digit OTP <span className="text-red-500">*</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => setEnteredOtp('123456')}
                          className="text-[11px] text-amber-700 hover:underline font-semibold"
                        >
                          Auto-fill: 123456
                        </button>
                      </div>
                      <input
                        type="text"
                        maxLength={6}
                        value={enteredOtp}
                        onChange={e => setEnteredOtp(e.target.value)}
                        placeholder="e.g. 123456"
                        className="w-full tracking-widest text-center py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl font-mono text-base font-bold text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <div className="text-[11px] text-stone-400 flex items-center justify-between">
                        <span>OTP sent to {loginIdentifier}</span>
                        <button
                          type="button"
                          onClick={() => setOtpSent(true)}
                          className="hover:underline text-stone-500"
                        >
                          Resend OTP
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Remember Me */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-stone-600 dark:text-stone-400">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="accent-amber-700 rounded"
                  />
                  <span>Keep me signed in on this device</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-amber-700 hover:bg-amber-800 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-xs sm:text-sm mt-2"
              >
                <span>{loginMethod === 'otp' && !otpSent ? 'Send OTP Verification Code' : 'Sign In to Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2 text-xs text-stone-500">
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="font-bold text-amber-700 hover:underline"
                >
                  Register here for free
                </button>
              </div>
            </form>
          )}

          {/* ----------------- MODE 2: FORGOT PASSWORD ----------------- */}
          {mode === 'forgot' && (
            <div className="space-y-5">
              
              {/* Step indicator */}
              <div className="flex items-center justify-between text-xs pb-3 border-b border-stone-100 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setForgotStep(1);
                  }}
                  className="text-stone-500 hover:text-stone-800 flex items-center gap-1 font-medium"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Login</span>
                </button>

                <div className="text-stone-400 font-mono text-[11px]">
                  Step {forgotStep} of 3
                </div>
              </div>

              {resetError && (
                <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{resetError}</span>
                </div>
              )}

              {/* FORGOT STEP 1: Enter Identifier */}
              {forgotStep === 1 && (
                <form onSubmit={handleForgotStep1} className="space-y-4 text-xs sm:text-sm">
                  <div className="space-y-1">
                    <h3 className="font-serif-heading text-lg font-bold text-stone-900 dark:text-stone-100">
                      Step 1: Identify Your Account
                    </h3>
                    <p className="text-xs text-stone-500 leading-relaxed font-sans-text">
                      Enter the mobile number or email address associated with your Uplift India registration. We will send a secure verification code.
                    </p>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Registered Mobile Number or Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-stone-400">
                        <KeyRound className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        required
                        value={resetIdentifier}
                        onChange={e => setResetIdentifier(e.target.value)}
                        placeholder="e.g. 9876501234 or yourname@example.com"
                        className="w-full pl-9 pr-4 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50 dark:bg-stone-800 rounded-xl text-xs text-stone-600 dark:text-stone-300 space-y-1">
                    <div className="font-semibold text-amber-900 dark:text-amber-300">Security Guarantee:</div>
                    <p>We will never ask you to transfer money or share your UPI PIN to recover your password.</p>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-amber-700 hover:bg-amber-800 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <span>Send Verification Code (OTP)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* FORGOT STEP 2: Enter OTP */}
              {forgotStep === 2 && (
                <form onSubmit={handleForgotStep2} className="space-y-4 text-xs sm:text-sm">
                  <div className="space-y-1">
                    <h3 className="font-serif-heading text-lg font-bold text-stone-900 dark:text-stone-100">
                      Step 2: Enter Verification Code
                    </h3>
                    <p className="text-xs text-stone-500 leading-relaxed">
                      A 6-digit verification code has been dispatched to <strong>{resetIdentifier}</strong>.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="font-semibold text-stone-700 dark:text-stone-300">
                        6-Digit Security OTP <span className="text-red-500">*</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setResetOtp('123456')}
                        className="text-xs text-amber-700 dark:text-amber-400 hover:underline font-bold"
                      >
                        Auto-fill: 123456
                      </button>
                    </div>

                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={resetOtp}
                      onChange={e => setResetOtp(e.target.value)}
                      placeholder="123456"
                      className="w-full text-center tracking-widest font-mono text-xl font-bold py-3 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />

                    <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
                      <span>Did not receive code?</span>
                      <button
                        type="button"
                        onClick={() => setResetOtp('123456')}
                        className="text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 font-medium"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Resend OTP</span>
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-amber-700 hover:bg-amber-800 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <span>Verify Code & Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* FORGOT STEP 3: Set New Password */}
              {forgotStep === 3 && (
                <form onSubmit={handleForgotStep3} className="space-y-4 text-xs sm:text-sm">
                  <div className="space-y-1">
                    <h3 className="font-serif-heading text-lg font-bold text-stone-900 dark:text-stone-100">
                      Step 3: Create New Password
                    </h3>
                    <p className="text-xs text-stone-500">
                      Choose a secure new password for your account.
                    </p>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      New Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-stone-400">
                        <Lock className="w-4 h-4" />
                      </span>
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        required
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        className="w-full pl-9 pr-10 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-3 text-stone-400 hover:text-stone-600"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Confirm New Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-stone-400">
                        <Lock className="w-4 h-4" />
                      </span>
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        required
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter your new password"
                        className="w-full pl-9 pr-4 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Save New Password & Sign In</span>
                  </button>
                </form>
              )}

              {/* FORGOT STEP 4: Success confirmation */}
              {forgotStep === 4 && (
                <div className="p-6 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-serif-heading text-xl font-bold text-stone-900 dark:text-stone-100">
                      Password Successfully Reset!
                    </h3>
                    <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                      Your credentials for <strong>{resetIdentifier}</strong> have been updated securely.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      login(resetIdentifier, 'citizen');
                      setActiveTab('home');
                    }}
                    className="w-full py-3 bg-amber-700 hover:bg-amber-800 text-white rounded-xl font-bold text-xs sm:text-sm shadow"
                  >
                    Proceed to Home Page
                  </button>
                </div>
              )}

            </div>
          )}

          {/* ----------------- MODE 3: SIGN UP ----------------- */}
          {mode === 'signup' && (
            <form onSubmit={handleSignupSubmit} className="space-y-4 text-xs sm:text-sm">
              
              {signupError && (
                <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{signupError}</span>
                </div>
              )}

              <div>
                <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Full Name (as per Aadhaar / Official ID) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={signupName}
                  onChange={e => setSignupName(e.target.value)}
                  placeholder="e.g. Anand Verma"
                  className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={signupPhone}
                    onChange={e => setSignupPhone(e.target.value)}
                    placeholder="10-digit phone number"
                    className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Email ID (Optional)
                  </label>
                  <input
                    type="email"
                    value={signupEmail}
                    onChange={e => setSignupEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    State <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={signupState}
                    onChange={e => setSignupState(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none"
                  >
                    {INDIAN_STATES.filter(s => s !== 'All India').map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    District / City
                  </label>
                  <input
                    type="text"
                    value={signupDistrict}
                    onChange={e => setSignupDistrict(e.target.value)}
                    placeholder="e.g. Varanasi / Patna"
                    className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Account Type / Role
                  </label>
                  <select
                    value={signupRole}
                    onChange={e => setSignupRole(e.target.value as UserRole)}
                    className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none"
                  >
                    <option value="citizen">Citizen Beneficiary</option>
                    <option value="volunteer">Volunteer Mobilizer</option>
                    <option value="ngo">NGO / Civil Society Lead</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Primary Occupation
                  </label>
                  <input
                    type="text"
                    value={signupOccupation}
                    onChange={e => setSignupOccupation(e.target.value)}
                    placeholder="e.g. Farmer / Student"
                    className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Create Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  required
                  value={signupPassword}
                  onChange={e => setSignupPassword(e.target.value)}
                  placeholder="Create a secure password (min 6 characters)"
                  className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-700 hover:bg-amber-800 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Complete Registration & Open Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2 text-xs text-stone-500">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-bold text-amber-700 hover:underline"
                >
                  Sign in here
                </button>
              </div>

            </form>
          )}

        </div>

        {/* Right Column: 1-Click Demo Profiles & Trust Features */}
        <div className="md:col-span-5 space-y-6">
          
          {/* Quick 1-Click Role Login Box */}
          <div className="p-6 rounded-2xl bg-amber-50/70 dark:bg-stone-900 border border-amber-200/70 dark:border-stone-800 shadow-sm space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Instant 1-Click Demo Logins</span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              For evaluation and testing without typing, click any user role below to sign in immediately:
            </p>

            <div className="space-y-2 pt-1">
              {demoLogins.map(demo => {
                const IconComponent = demo.icon;
                return (
                  <button
                    key={demo.role}
                    type="button"
                    onClick={() => handleQuickDemoLogin(demo)}
                    className="w-full p-3 rounded-xl bg-white dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 hover:border-amber-500 text-left transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 flex items-center justify-center shrink-0">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-xs text-stone-900 dark:text-stone-100 group-hover:text-amber-700">
                          {demo.title} ({demo.name})
                        </div>
                        <div className="text-[11px] text-stone-500 line-clamp-1">
                          {demo.desc}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Trust & Data Privacy Pledge */}
          <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 text-xs space-y-3">
            <div className="font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Citizen Privacy & Data Protection Pledge</span>
            </div>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed font-sans-text text-[11px]">
              Uplift India operates strictly under privacy-by-design standards:
            </p>
            <ul className="space-y-1.5 text-stone-600 dark:text-stone-400 text-[11px]">
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Personal contact data is never sold or shared with commercial marketing agencies.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Passwords and authentication tokens are salted and securely stored.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Role-based access ensures volunteers and admins only see verified assistance tickets.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};
