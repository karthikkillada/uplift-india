import React, { useState } from 'react';
import { FINANCIAL_LITERACY_MODULES } from '../data/mockData';
import { 
  Landmark, 
  ShieldAlert, 
  Calculator, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Smartphone, 
  PiggyBank, 
  AlertTriangle,
  ArrowRight,
  BookOpen
} from 'lucide-react';

export const FinancialLiteracyPage: React.FC = () => {
  // Interactive Budget Calculator State
  const [monthlyIncome, setMonthlyIncome] = useState<number>(18000);

  // Interactive Quiz State: UPI Safety
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);

  const needsAmount = Math.round(monthlyIncome * 0.5);
  const wantsAmount = Math.round(monthlyIncome * 0.3);
  const savingsAmount = Math.round(monthlyIncome * 0.2);

  const handleQuizChoice = (optionIndex: number) => {
    setSelectedQuizOption(optionIndex);
    setQuizAnswered(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
          <PiggyBank className="w-4 h-4" />
          <span>Financial Empowerment & Fraud Defense</span>
        </div>
        <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-50">
          Financial Literacy & Safe Banking
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-300 max-w-3xl leading-relaxed">
          Learn how to open zero-balance bank accounts, transfer money safely through UPI without falling for frauds, avoid predatory loan apps, plan your household budget, and secure your family with ₹20/year government micro-insurance.
        </p>
      </div>

      {/* Critical UPI Golden Rule Alert Box */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950 via-stone-900 to-amber-950 text-white shadow-xl border border-red-900/60">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>THE #1 GOLDEN RULE OF UPI PAYMENTS</span>
            </div>
            <h2 className="font-serif-heading text-xl sm:text-2xl font-bold text-white">
              You NEVER Need to Enter Your UPI PIN to RECEIVE Money!
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans-text">
              Scammers often send a QR code or payment request saying: "Scan this or enter your PIN to claim ₹5,000 lottery or government subsidy." If you enter your PIN, <strong>money is deducted from your bank</strong>, never credited.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-center shrink-0 w-full md:w-auto">
            <span className="text-[11px] uppercase tracking-wider text-amber-300 font-semibold block">
              Victim of Online Fraud?
            </span>
            <div className="font-serif-heading text-xl font-bold text-white mt-0.5">
              Call 1930
            </div>
            <span className="text-[10px] text-stone-300 block mt-1">
              National Cyber Helpline (24x7)
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Tool 1: 50 / 30 / 20 Household Budget Planner */}
      <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              <Calculator className="w-4 h-4" />
              <span>Interactive Household Tool</span>
            </div>
            <h2 className="font-serif-heading text-2xl font-bold text-stone-900 dark:text-stone-100 mt-1">
              Family Budget Planner (The 50/30/20 Rule)
            </h2>
          </div>
          <span className="text-xs text-stone-500">
            Helps eliminate reliance on high-interest local moneylenders
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2">
                Enter Monthly Household Income (₹):
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="6000"
                  max="60000"
                  step="1000"
                  value={monthlyIncome}
                  onChange={e => setMonthlyIncome(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-600 h-2 bg-stone-200 dark:bg-stone-700 rounded-lg cursor-pointer"
                />
                <span className="font-serif-heading text-xl font-bold text-stone-900 dark:text-stone-100 shrink-0 tabular-nums">
                  ₹{monthlyIncome.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              {[10000, 15000, 20000, 30000, 45000].map(val => (
                <button
                  key={val}
                  onClick={() => setMonthlyIncome(val)}
                  className={`px-3 py-1 rounded-lg border transition-colors ${
                    monthlyIncome === val
                      ? 'bg-emerald-800 text-white border-emerald-800 font-semibold'
                      : 'border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  ₹{val.toLocaleString('en-IN')}
                </button>
              ))}
            </div>

            <p className="text-xs text-stone-500 leading-relaxed">
              Adjust the slider or click a preset value to see how much money should be allocated each month to essentials, family needs, and emergency safety savings.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* 50% Needs */}
            <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/50 space-y-2">
              <div className="flex items-center justify-between text-xs text-amber-900 dark:text-amber-300 font-semibold">
                <span>Needs (50%)</span>
                <span>Rotī, Kapda, Makan</span>
              </div>
              <div className="font-serif-heading text-2xl font-bold text-amber-900 dark:text-amber-200 tabular-nums">
                ₹{needsAmount.toLocaleString('en-IN')}
              </div>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                Ration groceries, cooking gas, electricity bill, school fees, and essential medicine.
              </p>
            </div>

            {/* 30% Wants */}
            <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-900/50 space-y-2">
              <div className="flex items-center justify-between text-xs text-indigo-900 dark:text-indigo-300 font-semibold">
                <span>Wants (30%)</span>
                <span>Family & Social</span>
              </div>
              <div className="font-serif-heading text-2xl font-bold text-indigo-900 dark:text-indigo-200 tabular-nums">
                ₹{wantsAmount.toLocaleString('en-IN')}
              </div>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                Mobile recharges, festival clothing, tea stalls, travel, and household gifts.
              </p>
            </div>

            {/* 20% Savings */}
            <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/50 space-y-2">
              <div className="flex items-center justify-between text-xs text-emerald-900 dark:text-emerald-300 font-semibold">
                <span>Savings (20%)</span>
                <span>Emergency Cushion</span>
              </div>
              <div className="font-serif-heading text-2xl font-bold text-emerald-900 dark:text-emerald-200 tabular-nums">
                ₹{savingsAmount.toLocaleString('en-IN')}
              </div>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                Jan Dhan bank deposit, debt repayment to clear moneylenders, and hospital buffer.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Interactive Tool 2: UPI Safety Knowledge Quiz */}
      <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" />
          <span>Interactive 30-Second Awareness Test</span>
        </div>

        <h3 className="font-serif-heading text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
          Quick Test: A customer at your shop wants to pay you ₹800 via Google Pay and sends you a QR code on WhatsApp asking you to scan it and enter your PIN. What will happen?
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          
          <button
            onClick={() => handleQuizChoice(0)}
            className={`p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all ${
              selectedQuizOption === 0
                ? 'bg-red-50 dark:bg-red-950/40 border-red-500 text-red-900 dark:text-red-200'
                : 'border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200'
            }`}
          >
            <strong>Option A:</strong> ₹800 will be credited into my bank account immediately.
          </button>

          <button
            onClick={() => handleQuizChoice(1)}
            className={`p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all ${
              selectedQuizOption === 1
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200'
                : 'border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200'
            }`}
          >
            <strong>Option B:</strong> ₹800 will be DEBITED (stolen) from my account because entering a PIN only deducts money!
          </button>

        </div>

        {quizAnswered && (
          <div className={`p-4 rounded-xl text-xs sm:text-sm flex items-start gap-3 ${
            selectedQuizOption === 1
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-emerald-900 dark:text-emerald-200'
              : 'bg-red-50 dark:bg-red-950/40 border border-red-300 text-red-900 dark:text-red-200'
          }`}>
            {selectedQuizOption === 1 ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            )}
            <div>
              <strong className="block font-bold">
                {selectedQuizOption === 1 ? 'Correct Answer! Excellent awareness.' : 'Incorrect! Danger of fraud.'}
              </strong>
              <span>
                To receive money, the customer must scan YOUR QR code or enter YOUR mobile number. You NEVER scan someone else\'s QR code or enter your secret PIN to receive payments.
              </span>
            </div>
          </div>
        )}
      </section>

      {/* Educational Modules Cards */}
      <div className="space-y-6">
        <h2 className="font-serif-heading text-2xl font-bold text-stone-900 dark:text-stone-100">
          Core Financial Literacy Lessons
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FINANCIAL_LITERACY_MODULES.map(module => (
            <div
              key={module.id}
              className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between text-xs text-stone-400 border-b border-stone-100 dark:border-stone-800 pb-3">
                <span className="font-semibold text-amber-700 dark:text-amber-400">Step-by-Step Guide</span>
                <span>{module.readTime}</span>
              </div>

              <h3 className="font-serif-heading text-xl font-bold text-stone-900 dark:text-stone-100 leading-snug">
                {module.title}
              </h3>

              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-sans-text">
                {module.summary}
              </p>

              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider">
                  Important Takeaways:
                </div>
                <ul className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300">
                  {module.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold shrink-0">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {module.actionSteps && (
                <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded-xl text-xs text-stone-700 dark:text-stone-300">
                  <strong className="text-stone-900 dark:text-stone-100">Next Action: </strong>
                  {module.actionSteps}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
