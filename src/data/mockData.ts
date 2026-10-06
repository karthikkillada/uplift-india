import { Scheme, Job, Course, NGO, VolunteerOpportunity, SuccessStory, EmergencyHelpline } from '../types';

export const INDIAN_STATES = [
  'All India',
  'Andhra Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Delhi NCR',
  'Gujarat',
  'Haryana',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Tamil Nadu',
  'Telangana',
  'Uttar Pradesh',
  'West Bengal'
];

export const SCHEMES_DATA: Scheme[] = [
  {
    id: 'pm-kisan',
    name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    hindiName: 'प्रधानमंत्री किसान सम्मान निधि',
    category: 'Agriculture',
    ministry: 'Ministry of Agriculture and Farmers Welfare',
    description: 'Direct income support of ₹6,000 per year in three equal installments to all landholding farmer families across India to meet agricultural and domestic needs.',
    benefits: '₹6,000 annually credited directly into bank account via DBT in three 4-monthly installments of ₹2,000 each.',
    eligibilitySummary: 'Small and marginal farmer families possessing cultivable land. Excludes institutional landholders and high-income taxpayers.',
    minAge: 18,
    maxAge: 75,
    maxAnnualIncome: 250000,
    targetOccupations: ['Farmer', 'Agricultural Worker', 'Self-Employed (Agri)'],
    locationApplicability: 'All India',
    requiredDocuments: [
      'Aadhaar Card',
      'Proof of land ownership (Khasra/Khatauni or Patta)',
      'Bank Account passbook linked with Aadhaar & NPCI',
      'Active mobile number'
    ],
    applicationProcess: [
      'Visit the official PM-KISAN portal (pmkisan.gov.in) or visit your nearest CSC (Common Service Centre).',
      'Click on "Farmers Corner" > "New Farmer Registration".',
      'Enter Aadhaar number and state, then fill land ownership and bank details.',
      'Submit the application and track status via Aadhaar / Mobile number.'
    ],
    officialUrl: 'https://pmkisan.gov.in',
    isVerifiedSource: true,
    beneficiaryCount: '11+ Crore Farmers',
    applicationMode: 'Both'
  },
  {
    id: 'pmay-g',
    name: 'Pradhan Mantri Awas Yojana - Gramin (PMAY-G)',
    hindiName: 'प्रधानमंत्री आवास योजना - ग्रामीण',
    category: 'Housing',
    ministry: 'Ministry of Rural Development',
    description: 'Provides financial assistance to rural families living in kutcha (unpaved) or dilapidated houses to construct a permanent pucca house with basic amenities including toilet and LPG connection.',
    benefits: 'Financial grant of ₹1,20,000 in plain areas and ₹1,30,000 in hilly/difficult areas, plus 90-95 days of unskilled labor wages under MGNREGA.',
    eligibilitySummary: 'Rural families listed in SECC 2011 deprivation list or Awas+ survey without a pucca house in their name anywhere in India.',
    minAge: 18,
    maxAge: 85,
    maxAnnualIncome: 180000,
    targetOccupations: ['Daily Wage Worker', 'Agricultural Worker', 'Artisan', 'Unemployed', 'Homemaker'],
    locationApplicability: 'Rural Only',
    requiredDocuments: [
      'Aadhaar Card of all family members',
      'Bank Account Passbook (DBT enabled)',
      'MGNREGA Job Card (if available)',
      'Certificate from Gram Panchayat of kutcha residence'
    ],
    applicationProcess: [
      'Beneficiaries are prioritized based on Gram Sabha verified lists under SECC / Awas+.',
      'Contact your Gram Panchayat Secretary or Block Development Officer (BDO).',
      'Geo-tagging of existing kutcha site is done by the Gram Rozgar Sahayak.',
      'Funds are disbursed in 3 verified construction milestones directly to bank.'
    ],
    officialUrl: 'https://pmayg.nic.in',
    isVerifiedSource: true,
    beneficiaryCount: '2.5+ Crore Houses Built',
    applicationMode: 'Offline / Panchayat'
  },
  {
    id: 'ayushman-bharat',
    name: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
    hindiName: 'आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना',
    category: 'Healthcare',
    ministry: 'National Health Authority (NHA), MoHFW',
    description: 'The world\'s largest government-funded healthcare assurance scheme offering secondary and tertiary care hospitalization coverage of ₹5 Lakh per family per year.',
    benefits: 'Cashless and paperless in-patient hospital care up to ₹5,00,000 per family per year across 28,000+ empaneled public and private hospitals.',
    eligibilitySummary: 'Poor and vulnerable families identified based on occupational and socio-economic deprivation criteria under SECC 2011. Senior citizens aged 70+ now eligible regardless of income.',
    minAge: 0,
    maxAge: 100,
    maxAnnualIncome: 250000,
    targetOccupations: ['Daily Wage Worker', 'Street Vendor', 'Domestic Worker', 'Artisan', 'Rickshaw Puller', 'Farmer', 'Unemployed'],
    locationApplicability: 'All India',
    requiredDocuments: [
      'Aadhaar Card or Ration Card',
      'Mobile Number',
      'Proof of identity for all dependent family members'
    ],
    applicationProcess: [
      'Check eligibility online at beneficiary.nha.gov.in using your mobile or ration card number.',
      'Visit any Empaneled Hospital Ayushman Mitra desk or CSC centre.',
      'Complete biometric e-KYC via Aadhaar OTP or fingerprint.',
      'Download your Ayushman PVC Card or digital card instantly on your phone.'
    ],
    officialUrl: 'https://pmjay.gov.in',
    isVerifiedSource: true,
    beneficiaryCount: '34+ Crore Ayushman Cards Issued',
    applicationMode: 'Both'
  },
  {
    id: 'mgnrega',
    name: 'Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)',
    hindiName: 'महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी अधिनियम',
    category: 'Employment',
    ministry: 'Ministry of Rural Development',
    description: 'Guarantees at least 100 days of wage employment in a financial year to every rural household whose adult members volunteer to do unskilled manual work.',
    benefits: 'Guaranteed 100 days of wage employment with statutory minimum wages (₹230 - ₹374/day depending on state) paid directly to bank within 15 days.',
    eligibilitySummary: 'Adult members of any rural household residing in the Gram Panchayat who are willing to perform unskilled manual labor.',
    minAge: 18,
    maxAge: 70,
    maxAnnualIncome: 200000,
    targetOccupations: ['Daily Wage Worker', 'Agricultural Worker', 'Unemployed', 'Rural Laborer'],
    locationApplicability: 'Rural Only',
    requiredDocuments: [
      'Passport size photograph of applicants',
      'Aadhaar Card',
      'Proof of residence in Gram Panchayat',
      'Bank/Post Office Passbook'
    ],
    applicationProcess: [
      'Submit Form-1 application to the Gram Panchayat or Ward member.',
      'Gram Panchayat issues a free Job Card within 15 days of application.',
      'Submit written application for work demanding employment.',
      'Panchayat must allocate work within 5 km of village within 15 days or pay unemployment allowance.'
    ],
    officialUrl: 'https://nrega.nic.in',
    isVerifiedSource: true,
    beneficiaryCount: '14+ Crore Active Workers',
    applicationMode: 'Offline / Panchayat'
  },
  {
    id: 'pm-svanidhi',
    name: 'PM Street Vendor\'s AtmaNirbhar Nidhi (PM SVANidhi)',
    hindiName: 'पीएम स्वनिधि योजना (स्ट्रीट वेंडर)',
    category: 'Financial Assistance',
    ministry: 'Ministry of Housing and Urban Affairs',
    description: 'Micro-credit facility for urban street vendors, fruit/vegetable sellers, and hawkers to resume their livelihood with collateral-free working capital loans.',
    benefits: 'Initial working capital loan up to ₹10,000 (1st tranche), ₹20,000 (2nd tranche), and ₹50,000 (3rd tranche) with 7% interest subsidy and cashback on digital transactions.',
    eligibilitySummary: 'Urban vendors, hawkers, thela-walas, and small roadside service providers possessing Certificate of Vending or recommendation letter from Urban Local Body (ULB).',
    minAge: 18,
    maxAge: 65,
    maxAnnualIncome: 300000,
    targetOccupations: ['Street Vendor', 'Small Shopkeeper', 'Artisan', 'Self-Employed'],
    locationApplicability: 'Urban Only',
    requiredDocuments: [
      'Aadhaar Card',
      'Voter ID Card',
      'Certificate of Vending (CoV) or Vendor ID card',
      'Bank Account details linked with UPI'
    ],
    applicationProcess: [
      'Check vending status at Municipal Corporation/Municipality.',
      'Apply online on pmsvanidhi.mohua.gov.in or through a Banking Correspondent / CSC.',
      'Choose preferred lending institution (Public/Private Bank, MFI).',
      'Loan is disbursed directly to savings account upon digital approval.'
    ],
    officialUrl: 'https://pmsvanidhi.mohua.gov.in',
    isVerifiedSource: true,
    beneficiaryCount: '65+ Lakh Loans Disbursed',
    applicationMode: 'Both'
  },
  {
    id: 'pm-mudra',
    name: 'Pradhan Mantri MUDRA Yojana (PMMY)',
    hindiName: 'प्रधानमंत्री मुद्रा योजना',
    category: 'Financial Assistance',
    ministry: 'Department of Financial Services, Ministry of Finance',
    description: 'Provides collateral-free loans up to ₹20 Lakh to non-corporate, non-farm small and micro enterprises for manufacturing, trading, and services.',
    benefits: 'Three loan categories: Shishu (up to ₹50,000), Kishore (₹50,000 to ₹5 Lakh), and Tarun (₹5 Lakh to ₹20 Lakh). No collateral security required.',
    eligibilitySummary: 'Any Indian citizen who has a business plan for a non-farm income generating activity such as shopkeeping, tailoring, food processing, transport, or small crafts.',
    minAge: 18,
    maxAge: 65,
    maxAnnualIncome: 600000,
    targetOccupations: ['Small Shopkeeper', 'Artisan', 'Tailor', 'Self-Employed', 'Youth / Entrepreneur'],
    locationApplicability: 'All India',
    requiredDocuments: [
      'Identity Proof (Aadhaar, Voter ID, PAN)',
      'Proof of Residence',
      'Business address proof & quotation of machinery/goods to be bought',
      'Bank statements for previous 6 months'
    ],
    applicationProcess: [
      'Prepare a simple business proposal indicating required loan amount.',
      'Apply online via udyamimitra.in portal or visit nearest commercial/Gramin bank.',
      'Fill MUDRA application form and submit supporting quotation documents.',
      'Sanctioned amount is issued with a MUDRA RuPay Debit Card for working capital.'
    ],
    officialUrl: 'https://www.mudra.org.in',
    isVerifiedSource: true,
    beneficiaryCount: '46+ Crore Loans Sanctioned',
    applicationMode: 'Both'
  },
  {
    id: 'pm-poshan-nfsa',
    name: 'Pradhan Mantri Garib Kalyan Anna Yojana (PMGKAY / NFSA)',
    hindiName: 'प्रधानमंत्री गरीब कल्याण अन्न योजना / राष्ट्रीय खाद्य सुरक्षा',
    category: 'Food Security',
    ministry: 'Department of Food and Public Distribution',
    description: 'Provides free food grains (wheat, rice, and coarse grains) to over 80 crore Antyodaya and Priority Household beneficiaries across India to guarantee basic nutritional security.',
    benefits: '5 kg of food grains per person per month completely free for Priority Households; 35 kg per family per month for Antyodaya Anna Yojana (AAY) families.',
    eligibilitySummary: 'Families holding valid Priority Household (PHH) or Antyodaya (AAY) Ration Cards under the National Food Security Act.',
    minAge: 0,
    maxAge: 100,
    maxAnnualIncome: 120000,
    targetOccupations: ['Daily Wage Worker', 'Domestic Worker', 'Agricultural Worker', 'Rickshaw Puller', 'Destitute / Senior'],
    locationApplicability: 'All India',
    requiredDocuments: [
      'Valid NFSA / State Ration Card',
      'Aadhaar card of all family members linked to Ration Card'
    ],
    applicationProcess: [
      'Check existing ration card status at nfsa.gov.in or State PDS portal.',
      'Visit your local Fair Price Shop (Ration dealer) with your Aadhaar.',
      'Complete biometric (fingerprint/iris) authentication on ePoS device.',
      'Collect allocated free grains under One Nation One Ration Card (ONORC) portability anywhere in India.'
    ],
    officialUrl: 'https://nfsa.gov.in',
    isVerifiedSource: true,
    beneficiaryCount: '81.35 Crore Beneficiaries',
    applicationMode: 'Offline / Panchayat'
  },
  {
    id: 'pmkvy',
    name: 'Pradhan Mantri Kaushal Vikas Yojana (PMKVY 4.0)',
    hindiName: 'प्रधानमंत्री कौशल विकास योजना',
    category: 'Skill Development',
    ministry: 'Ministry of Skill Development and Entrepreneurship',
    description: 'Enables Indian youth to take up industry-relevant skill certification training that helps them secure a better livelihood and self-employment.',
    benefits: '100% free technical and soft skill training, government-recognized NSDC certification, post-placement support, and conveyance stipend.',
    eligibilitySummary: 'Unemployed youth, school/college dropouts possessing Aadhaar Card and basic aptitude for chosen job role.',
    minAge: 15,
    maxAge: 45,
    maxAnnualIncome: 350000,
    targetOccupations: ['Student', 'Unemployed', 'Youth', 'Daily Wage Worker'],
    locationApplicability: 'All India',
    requiredDocuments: [
      'Aadhaar Card',
      'Bank Account details',
      'Education certificates (if any; 8th, 10th or 12th pass)',
      'Passport size photographs'
    ],
    applicationProcess: [
      'Visit skillindiadigital.gov.in or nearest Pradhan Mantri Kaushal Kendra (PMKK).',
      'Browse vocational sectors (IT, Healthcare, Solar, Electronics, Apparel, Construction).',
      'Register for orientation and aptitude counseling.',
      'Complete 200-400 hours course, pass practical assessment, and receive placement offers.'
    ],
    officialUrl: 'https://www.pmkvyofficial.org',
    isVerifiedSource: true,
    beneficiaryCount: '1.4+ Crore Youths Trained',
    applicationMode: 'Both'
  },
  {
    id: 'sukanya-samriddhi',
    name: 'Sukanya Samriddhi Yojana (SSY)',
    hindiName: 'सुकन्या समृद्धि योजना (बेटी बचाओ, बेटी पढ़ाओ)',
    category: 'Women & Child Welfare',
    ministry: 'Ministry of Finance & MoWCD',
    description: 'Small deposit savings scheme for girl child with high government-backed interest rate (currently 8.2%) and tax exemptions to secure higher education and marriage funds.',
    benefits: 'High 8.2% annual compounded interest, triple tax exemption (EEE), minimum deposit of only ₹250 per year.',
    eligibilitySummary: 'Parents or legal guardians of a girl child below 10 years of age. Maximum two girl children per family.',
    minAge: 0,
    maxAge: 10,
    maxAnnualIncome: 1000000,
    targetOccupations: ['All Parents / Guardians'],
    locationApplicability: 'All India',
    requiredDocuments: [
      'Birth Certificate of girl child',
      'Aadhaar Card and PAN card of parent/guardian',
      'Address proof',
      'Passport photos'
    ],
    applicationProcess: [
      'Visit any Post Office or authorized commercial bank branch.',
      'Fill SSY Account Opening Form (Form-1).',
      'Submit child birth certificate and parent KYC documents with minimum initial deposit of ₹250.',
      'Passbook is issued for tracking deposits and accumulated interest.'
    ],
    officialUrl: 'https://www.indiapost.gov.in',
    isVerifiedSource: true,
    beneficiaryCount: '3+ Crore Accounts Opened',
    applicationMode: 'Offline / Panchayat'
  },
  {
    id: 'pm-vishwakarma',
    name: 'PM Vishwakarma Kaushal Samman Yojana',
    hindiName: 'पीएम विश्वकर्मा कौशल सम्मान योजना',
    category: 'Skill Development',
    ministry: 'Ministry of Micro, Small and Medium Enterprises',
    description: 'End-to-end holistic support to traditional artisans and craftspeople across 18 family trades including carpentry, blacksmithing, pottery, tailoring, and masonry.',
    benefits: 'PM Vishwakarma Certificate & ID, basic skill training with ₹500/day stipend, ₹15,000 toolkit voucher, and collateral-free enterprise loans up to ₹3 Lakh at 5% concessional interest.',
    eligibilitySummary: 'Traditional artisans working with hands and tools in 18 notified family trades. Minimum age 18 years; family member not in government service.',
    minAge: 18,
    maxAge: 70,
    maxAnnualIncome: 300000,
    targetOccupations: ['Artisan', 'Carpenter', 'Blacksmith', 'Potter', 'Tailor', 'Mason', 'Barber', 'Cobbler'],
    locationApplicability: 'All India',
    requiredDocuments: [
      'Aadhaar Card and linked mobile number',
      'Bank Account Passbook',
      'Trade proof / self-declaration of traditional occupation'
    ],
    applicationProcess: [
      'Visit nearest Common Service Centre (CSC) with Aadhaar and bank details.',
      'Complete biometric verification and trade selection.',
      'Three-stage verification: Gram Panchayat / ULB, District Committee, and National Screening.',
      'Receive digital Vishwakarma Card and enroll for 5-day basic training camp.'
    ],
    officialUrl: 'https://pmvishwakarma.gov.in',
    isVerifiedSource: true,
    beneficiaryCount: '20+ Lakh Artisans Registered',
    applicationMode: 'Common Service Centre (CSC)'
  },
  {
    id: 'nsp-pre-matric',
    name: 'National Scholarship Portal - Pre & Post Matric Scholarships for SC/ST/OBC',
    hindiName: 'राष्ट्रीय छात्रवृत्ति पोर्टल - छात्रवृत्ति योजनाएं',
    category: 'Education',
    ministry: 'Ministry of Social Justice and Empowerment / Tribal Affairs',
    description: 'Direct scholarship financial assistance to students belonging to economically disadvantaged backgrounds to prevent dropout and support school and college education.',
    benefits: 'Tuition fees reimbursement plus monthly maintenance allowance ranging from ₹3,000 to ₹15,000 per year directly into student bank account.',
    eligibilitySummary: 'Students enrolled in recognized schools, ITIs, or colleges whose annual family income is below ₹2,50,000.',
    minAge: 6,
    maxAge: 30,
    maxAnnualIncome: 250000,
    targetOccupations: ['Student', 'Youth'],
    locationApplicability: 'All India',
    requiredDocuments: [
      'Aadhaar Card of student',
      'Previous year academic mark sheet',
      'Valid Income Certificate issued by Tehsildar / Revenue officer',
      'Caste Certificate (if applicable)',
      'Bank passbook in student\'s name'
    ],
    applicationProcess: [
      'Register on scholarships.gov.in (NSP Portal) with student Aadhaar and active mobile number.',
      'Fill student details and select eligible scholarship scheme according to category.',
      'Upload required marksheet and income verification certificates.',
      'Institute verifies application online, followed by District/State nodal officer approval.'
    ],
    officialUrl: 'https://scholarships.gov.in',
    isVerifiedSource: true,
    beneficiaryCount: '1.2+ Crore Students Annually',
    applicationMode: 'Online'
  },
  {
    id: 'nsap-pension',
    name: 'National Social Assistance Programme (NSAP) - Indira Gandhi National Old Age Pension',
    hindiName: 'राष्ट्रीय सामाजिक सहायता कार्यक्रम (वृद्धावस्था पेंशन)',
    category: 'Financial Assistance',
    ministry: 'Ministry of Rural Development',
    description: 'Monthly social security financial pension to senior citizens, widows, and persons with severe disabilities living below the poverty line.',
    benefits: 'Monthly financial pension of ₹1,000 to ₹2,500 (combined Central and State contribution) directly to bank/post office account.',
    eligibilitySummary: 'Senior citizens aged 60+ belonging to households living Below Poverty Line (BPL) according to government survey.',
    minAge: 60,
    maxAge: 105,
    maxAnnualIncome: 100000,
    targetOccupations: ['Senior Citizen', 'Unemployed', 'Retired Worker', 'Widow'],
    locationApplicability: 'All India',
    requiredDocuments: [
      'Aadhaar Card / Voter ID for age verification',
      'BPL Card or Food Security Antyodaya Card',
      'Bank or Post Office Savings Passbook',
      'Passport size photograph'
    ],
    applicationProcess: [
      'Obtain NSAP pension application form from Gram Panchayat / Municipal Ward office.',
      'Attach Age verification and BPL certificate copies.',
      'Submit to the Sub-Divisional Magistrate (SDM) or Social Welfare Office.',
      'Sanction letter is generated and monthly pension starts via Direct Benefit Transfer.'
    ],
    officialUrl: 'https://nsap.nic.in',
    isVerifiedSource: true,
    beneficiaryCount: '3.1+ Crore Pensioners',
    applicationMode: 'Offline / Panchayat'
  }
];

export const JOBS_DATA: Job[] = [
  {
    id: 'job-1',
    title: 'CSC Digital Village Seva Kendra Operator',
    organization: 'Common Services Centers (CSC e-Governance)',
    location: 'Varanasi, Prayagraj & Mirzapur Districts',
    state: 'Uttar Pradesh',
    jobType: 'Full-Time',
    category: 'Digital & Data',
    educationReq: '8th / 10th Pass',
    salary: '₹14,000 - ₹20,000 / month + service incentives',
    deadline: '2026-11-15',
    requiredSkills: ['Basic Computer Operations', 'Hindi typing', 'Smartphone usage', 'Customer assistance'],
    description: 'Help rural villagers apply for Aadhaar services, PM-KISAN, Ayushman cards, utility bill payments, and scholarship forms at village kiosk.',
    vacancies: 45,
    isGovernmentAffiliated: true
  },
  {
    id: 'job-2',
    title: 'Gram Rozgar Sahayak (MGNREGA Rural Field Coordinator)',
    organization: 'Panchayat & Rural Development Department',
    location: 'Ranchi, Gumla & Khunti Districts',
    state: 'Jharkhand',
    jobType: 'Rural Work / MGNREGA',
    category: 'Govt Rozgar',
    educationReq: '12th Pass',
    salary: '₹12,500 / month fixed honorarium',
    deadline: '2026-10-30',
    requiredSkills: ['Record keeping', 'Local language', 'Measurement assistance', 'Community interaction'],
    description: 'Assist the Gram Panchayat in registering job card holders, measuring worksites, recording attendance on mobile app, and organizing social audit meetings.',
    vacancies: 80,
    isGovernmentAffiliated: true
  },
  {
    id: 'job-3',
    title: 'Solar Rooftop & Ag-Pump Installation Apprentice',
    organization: 'PM Surya Ghar & Green Tech Solutions',
    location: 'Jaipur, Jodhpur & Ajmer',
    state: 'Rajasthan',
    jobType: 'Apprenticeship',
    category: 'Manufacturing',
    educationReq: '8th / 10th Pass',
    salary: '₹11,000 / month stipend during training + ₹18,000 post-certification',
    deadline: '2026-11-20',
    requiredSkills: ['Basic tool handling', 'Willingness to learn electrical wiring', 'Physical fitness'],
    description: 'On-the-job training for mounting solar photovoltaic panels, wiring inverters, and testing solar-powered agricultural irrigation pumps.',
    vacancies: 60,
    isGovernmentAffiliated: false
  },
  {
    id: 'job-4',
    title: 'Community Health Mobilizer (Asha / Health Sahayak)',
    organization: 'National Rural Health Mission (Partner NGO)',
    location: 'Guntur & Krishna Districts',
    state: 'Andhra Pradesh',
    jobType: 'Part-Time',
    category: 'Healthcare & Sanitation',
    educationReq: '8th / 10th Pass',
    salary: '₹9,500 - ₹13,000 / month based on health camp mobilizations',
    deadline: '2026-11-10',
    requiredSkills: ['Empathetic communication', 'Telugu fluency', 'Basic health survey recording'],
    description: 'Facilitate maternal and child immunization awareness, guide eligible pregnant women to primary health centers, and distribute hygiene kits.',
    vacancies: 30,
    isGovernmentAffiliated: true
  },
  {
    id: 'job-5',
    title: 'Organic Farming & Seed Preservation Assistant',
    organization: 'Kisan Swaraj Producer Company',
    location: 'Solapur & Satara Districts',
    state: 'Maharashtra',
    jobType: 'Full-Time',
    category: 'Agriculture',
    educationReq: 'No Formal Education',
    salary: '₹450 / day + seasonal crop bonus',
    deadline: '2026-12-05',
    requiredSkills: ['Soil preparation', 'Composting', 'Drip irrigation handling', 'Crop harvesting'],
    description: 'Support local Farmer Producer Organization (FPO) in natural compost preparation, organic pest control concoction, and sorting heirloom grain seeds.',
    vacancies: 25,
    isGovernmentAffiliated: false
  },
  {
    id: 'job-6',
    title: 'E-Commerce Rural Hub Delivery & Pickup Partner',
    organization: 'Gramin Express Logistics',
    location: 'Coimbatore, Salem & Erode',
    state: 'Tamil Nadu',
    jobType: 'Full-Time',
    category: 'Retail & Logistics',
    educationReq: '8th / 10th Pass',
    salary: '₹16,000 - ₹22,000 / month + fuel allowance',
    deadline: '2026-11-25',
    requiredSkills: ['Valid two-wheeler driving license', 'Basic smartphone navigation', 'Tamil fluency'],
    description: 'Deliver packaged parcels, agricultural tools, and essentials to rural customer locations and assist in simple parcel handovers.',
    vacancies: 50,
    isGovernmentAffiliated: false
  },
  {
    id: 'job-7',
    title: 'Garment Finishing & Tailoring Specialist',
    organization: 'Khadigram Self-Help Textile Cluster',
    location: 'Murshidabad & Nadia',
    state: 'West Bengal',
    jobType: 'Vocational',
    category: 'Manufacturing',
    educationReq: 'No Formal Education',
    salary: '₹13,500 - ₹17,000 / month piece-rate earnings',
    deadline: '2026-12-15',
    requiredSkills: ['Sewing machine operation', 'Embroidery or button stitching', 'Attention to fabric'],
    description: 'Stitching, tailoring, and quality finishing of eco-friendly cotton garments for fair-trade artisan cooperatives with flexible timings.',
    vacancies: 40,
    isGovernmentAffiliated: false
  },
  {
    id: 'job-8',
    title: 'Kisan Call Centre Grievance Executive',
    organization: 'AgriTech Voice Helpdesk Services',
    location: 'Bhopal & Indore Hubs',
    state: 'Madhya Pradesh',
    jobType: 'Full-Time',
    category: 'Govt Rozgar',
    educationReq: '12th Pass',
    salary: '₹15,000 - ₹18,500 / month',
    deadline: '2026-11-05',
    requiredSkills: ['Fluent spoken Hindi', 'Patience in explaining schemes', 'Keyboard typing'],
    description: 'Answer inbound calls from farmers seeking information on crop insurance claims (PMFBY), fertilizer subsidy tokens, and weather advisories.',
    vacancies: 35,
    isGovernmentAffiliated: true
  }
];

export const COURSES_DATA: Course[] = [
  {
    id: 'course-1',
    title: 'Everyday Digital Literacy & Smartphone Mastery',
    category: 'Digital Literacy',
    level: 'Beginner',
    duration: '2 Weeks (15 Hours)',
    isFree: true,
    provider: 'Digital Saksharta Abhiyan (DISHA) & Uplift India',
    description: 'Learn how to use an Android smartphone safely: browsing information, using Google Translate, voice search, checking government scheme status, and downloading documents.',
    syllabus: [
      'Smartphone basics: touchscreen, keyboard, voice typing in regional language',
      'Searching for public services and checking Aadhaar / Ration card details',
      'Installing and using DigiLocker to save identity certificates safely',
      'Using WhatsApp and Telegram for community alerts and job circulars',
      'Recognizing spam calls, phishing messages, and suspicious APK downloads'
    ],
    hasCertificate: true,
    practicalLanguage: 'Hindi, Telugu, Tamil, English, Kannada, Malayalam'
  },
  {
    id: 'course-2',
    title: 'Safe UPI & Digital Banking for Small Merchants & Families',
    category: 'Financial Literacy',
    level: 'Beginner',
    duration: '1 Week (8 Hours)',
    isFree: true,
    provider: 'National Payments Corporation of India (NPCI) Outreach',
    description: 'Complete hands-on guide to BHIM UPI, PhonePe, and Google Pay. Master receiving payments via QR code, sending money safely, and never sharing your PIN or OTP.',
    syllabus: [
      'Understanding UPI IDs, bank account linking, and RuPay debit cards',
      'The Golden Rule: You only enter UPI PIN to SEND money, never to RECEIVE money',
      'Setting up a merchant Soundbox and static QR stand for tea stall or shop',
      'Reading transaction SMS, bank mini-statements, and resolving pending transfers',
      'Filing a complaint on the 1930 Cyber Fraud Helpline and banking ombudsman'
    ],
    hasCertificate: true,
    practicalLanguage: 'Multilingual'
  },
  {
    id: 'course-3',
    title: 'Basic Electrician & Home Appliances Repair',
    category: 'Vocational Skills',
    level: 'Beginner',
    duration: '4 Weeks (60 Hours)',
    isFree: true,
    provider: 'Pradhan Mantri Kaushal Vikas Yojana (PMKVY)',
    description: 'Practical training on domestic electrical wiring, switchboard repairs, ceiling fan motor winding, LED bulb refurbishment, and basic safety fuses.',
    syllabus: [
      'Electrical safety, insulation tools, multimeters, and circuit breakers (MCBs)',
      'Single-phase domestic wiring and load calculations for small homes',
      'Diagnosing inverter batteries, water pumps, and mixer-grinder faults',
      'Setting up a local repair kiosk with under ₹5,000 initial tool kit',
      'Estimating material costs and customer billing for home repair visits'
    ],
    hasCertificate: true,
    practicalLanguage: 'Hindi & Regional'
  },
  {
    id: 'course-4',
    title: 'Organic Kitchen Gardening & High-Yield Mushroom Cultivation',
    category: 'Agriculture',
    level: 'Beginner',
    duration: '3 Weeks (20 Hours)',
    isFree: true,
    provider: 'Indian Council of Agricultural Research (ICAR) Outreach',
    description: 'Turn a small spare room or rooftop into an income-generating oyster mushroom farm with minimal capital investment and high market returns.',
    syllabus: [
      'Substrate preparation using paddy straw and steam sterilization techniques',
      'Spawning and bag inoculation under clean hygiene conditions',
      'Controlling humidity, ventilation, and temperature without electricity',
      'Harvesting, packaging, and direct selling to nearby restaurants & weekly mandis',
      'Drying surplus mushrooms to produce long-lasting protein powder'
    ],
    hasCertificate: true,
    practicalLanguage: 'Multilingual'
  },
  {
    id: 'course-5',
    title: 'Professional Tailoring, Blouse Cutting & Kurti Stitching',
    category: 'Handicrafts',
    level: 'Intermediate',
    duration: '6 Weeks (80 Hours)',
    isFree: true,
    provider: 'National Skill Development Corporation (NSDC) Partner Hub',
    description: 'Learn step-by-step drafting, measuring, precision cutting, and machine stitching for blouses, salwar suits, kurtis, and children garments.',
    syllabus: [
      'Operating manual and electric sewing machines, troubleshooting needle jams',
      'Taking accurate body measurements and making paper patterns',
      'Piping, neck designs, zip attachments, and sleeve variations',
      'Calculating fabric yardage to minimize material wastage',
      'Forming a Self-Help Group (SHG) to take bulk school uniform contracts'
    ],
    hasCertificate: true,
    practicalLanguage: 'Regional Languages'
  },
  {
    id: 'course-6',
    title: 'Spoken English & Professional Workplace Communication',
    category: 'English',
    level: 'Beginner',
    duration: '4 Weeks (30 Hours)',
    isFree: true,
    provider: 'Uplift Bharat Skill Academy',
    description: 'Build confidence in speaking basic English for retail jobs, front-desk interactions, delivery roles, and job interviews without fear of grammatical mistakes.',
    syllabus: [
      'Everyday greetings, polite requests, and self-introduction for job interviews',
      'Understanding customer queries in English and giving clear responses',
      'Reading delivery addresses, shipping receipts, and medicine labels',
      'Professional phone etiquette and writing simple WhatsApp business updates',
      'Overcoming nervousness through daily mirror practice and voice notes'
    ],
    hasCertificate: true,
    practicalLanguage: 'Hindi-English / Regional-English bilingual'
  },
  {
    id: 'course-7',
    title: 'Starting a Micro-Business: From Idea to First Sale',
    category: 'Entrepreneurship',
    level: 'Beginner',
    duration: '3 Weeks (25 Hours)',
    isFree: true,
    provider: 'NITI Aayog Women Entrepreneurship Platform (WEP)',
    description: 'Comprehensive road-map to starting a tea stall, snack kiosk, tailoring boutique, or spice grinding unit with Mudra and SVANidhi micro-loans.',
    syllabus: [
      'Identifying high-demand local products in your mohalla or panchayat',
      'Costing: raw material, packaging, transportation, and healthy profit margins',
      'Registering for free Udyam MSME certificate and FSSAI basic food license',
      'Accessing collateral-free bank loans under PM Mudra and Stand-Up India',
      'Bookkeeping on paper registers or free Khata apps'
    ],
    hasCertificate: true,
    practicalLanguage: 'Multilingual'
  },
  {
    id: 'course-8',
    title: 'Computer Basics & Data Entry for Government Portals',
    category: 'Computer Skills',
    level: 'Beginner',
    duration: '4 Weeks (40 Hours)',
    isFree: true,
    provider: 'National Institute of Electronics & IT (NIELIT)',
    description: 'Master keyboard typing, MS Word/Excel basics, PDF conversion, image resizing, and filling government online forms without errors.',
    syllabus: [
      'Touch typing practice in English and regional script (Inscript/Krutidev)',
      'Creating spreadsheets: basic calculations, sorting lists, printing forms',
      'Scanning documents and compressing photo size to under 100 KB for uploads',
      'Navigating state government welfare portals and downloading certificates',
      'Preparing professional CV / Biodata format for job applications'
    ],
    hasCertificate: true,
    practicalLanguage: 'Multilingual'
  }
];

export const NGOS_DATA: NGO[] = [
  {
    id: 'ngo-1',
    name: 'Akshaya Patra Foundation',
    darpanId: 'KA/2016/0104822',
    state: 'Karnataka',
    city: 'Bengaluru (Operating across 14 States)',
    address: 'Hare Krishna Hill, West of Chord Road, Rajajinagar, Bengaluru - 560010',
    phone: '+91 80 3014 3400',
    email: 'infodesk@akshayapatra.org',
    causes: ['Food', 'Education', 'Emergency Support'],
    description: 'Runs the world\'s largest NGO-led school lunch program, nourishing over 2.2 million school children every day across government schools in India.',
    establishedYear: 2000,
    verified: true
  },
  {
    id: 'ngo-2',
    name: 'Goonj - A Voice, An Effort',
    darpanId: 'DL/2017/0158291',
    state: 'Delhi NCR',
    city: 'New Delhi (Nationwide presence)',
    address: 'J-93, Sarita Vihar, New Delhi - 110076',
    phone: '+91 11 4140 1216',
    email: 'mail@goonj.org',
    causes: ['Shelter', 'Emergency Support', 'Skill Training', 'Food'],
    description: 'Pioneered "Cloth for Work" turning urban surplus clothing, blankets, and school kits into a currency for community development and rural disaster relief.',
    establishedYear: 1999,
    verified: true
  },
  {
    id: 'ngo-3',
    name: 'Pratham Education Foundation',
    darpanId: 'MH/2016/0101934',
    state: 'Maharashtra',
    city: 'Mumbai',
    address: 'Y.B. Chavan Center, 4th Floor, Gen. J. Bhosale Marg, Nariman Point, Mumbai - 400021',
    phone: '+91 22 2281 9561',
    email: 'info@pratham.org',
    causes: ['Education', 'Skill Training', 'Employment'],
    description: 'Improves the quality of foundational education for millions of underprivileged children through community reading camps and youth vocational skilling.',
    establishedYear: 1995,
    verified: true
  },
  {
    id: 'ngo-4',
    name: 'Self Employed Women\'s Association (SEWA Bharat)',
    darpanId: 'DL/2017/0118392',
    state: 'Delhi NCR',
    city: 'New Delhi & Ahmedabad',
    address: '7/5 South Patel Nagar, New Delhi - 110008',
    phone: '+91 11 2584 1369',
    email: 'mail@sewabharat.org',
    causes: ['Employment', 'Skill Training', 'Financial Assistance', 'Healthcare'],
    description: 'Federation of over 2.5 million informal women workers supporting livelihood cooperatives, micro-insurance, and artisan craft linkages across India.',
    establishedYear: 1972,
    verified: true
  },
  {
    id: 'ngo-5',
    name: 'Robin Hood Army (RHA)',
    darpanId: 'DL/2020/0259102',
    state: 'Delhi NCR',
    city: 'Pan-India across 300+ Cities',
    address: 'Volunteer network operating in 300+ cities with zero financial capital',
    phone: '+91 98110 54321',
    email: 'info@robinhoodarmy.com',
    causes: ['Food', 'Education', 'Emergency Support'],
    description: 'Zero-funds volunteer movement that redistributes surplus food from restaurants and weddings to feed hungry citizens and homeless families with dignity.',
    establishedYear: 2014,
    verified: true
  },
  {
    id: 'ngo-6',
    name: 'HelpAge India',
    darpanId: 'DL/2016/0102711',
    state: 'Delhi NCR',
    city: 'New Delhi (Pan-India)',
    address: 'C-14, Qutab Institutional Area, New Delhi - 110016',
    phone: '1800 180 1253',
    email: 'headoffice@helpageindia.org',
    causes: ['Healthcare', 'Shelter', 'Emergency Support', 'Financial Assistance'],
    description: 'Dedicated to serving disadvantaged elders through mobile medical units, cataract surgeries, elder abuse helplines, and destitute elder homes.',
    establishedYear: 1978,
    verified: true
  }
];

export const VOLUNTEER_OPPORTUNITIES: VolunteerOpportunity[] = [
  {
    id: 'vol-1',
    title: 'Weekend Digital Literacy & Scheme Awareness Camp',
    organization: 'Uplift India Gramin Action',
    cause: 'Digital Literacy & Schemes',
    location: 'Sitapur & Hardoi Rural Blocks',
    state: 'Uttar Pradesh',
    timeCommitment: '4 Hours every Saturday',
    date: 'Upcoming Batch: 2nd & 4th Saturdays',
    volunteersNeeded: 25,
    volunteersRegistered: 18,
    description: 'Assist rural villagers in filling out PM-KISAN e-KYC, downloading Ayushman cards, and applying for school scholarships on laptops.',
    contactEmail: 'volunteer.up@upliftindia.org'
  },
  {
    id: 'vol-2',
    title: 'Evening Community Food Distribution & Child Study Circles',
    organization: 'Robin Hood Army & Uplift Youth',
    cause: 'Food & Foundational Education',
    location: 'Dharavi & Chembur Slum Communities',
    state: 'Maharashtra',
    timeCommitment: '2 Hours on Sunday afternoons',
    date: 'Every Sunday',
    volunteersNeeded: 30,
    volunteersRegistered: 24,
    description: 'Distribute hot fresh meal packets, organize fun reading and drawing activities for first-generation school kids.',
    contactEmail: 'mumbai.volunteers@robinhoodarmy.com'
  },
  {
    id: 'vol-3',
    title: 'Senior Citizen Healthcare & Pension Helpdesk',
    organization: 'HelpAge Community Care',
    cause: 'Elder Welfare & Healthcare',
    location: 'Kukatpally & Malkajgiri',
    state: 'Telangana',
    timeCommitment: '3 Hours on weekday mornings',
    date: 'Mon-Wed-Fri Mornings',
    volunteersNeeded: 15,
    volunteersRegistered: 11,
    description: 'Assist elderly citizens in verifying their annual life certificate (Jeevan Pramaan) using face authentication and guiding them to free health clinics.',
    contactEmail: 'hyderabad@helpageindia.org'
  },
  {
    id: 'vol-4',
    title: 'Rural Youth Spoken English & Mock Interview Mentorship',
    organization: 'Uplift Career Bridges',
    cause: 'Youth Employment',
    location: 'Online via Zoom / Phone Calls',
    state: 'All India',
    timeCommitment: '2 Hours weekly (Flexible)',
    date: 'Ongoing Continuous Program',
    volunteersNeeded: 50,
    volunteersRegistered: 39,
    description: 'Pair 1-on-1 with a rural college student or ITI diploma holder to practice job interview questions, English speaking, and resume proofreading.',
    contactEmail: 'mentorship@upliftindia.org'
  }
];

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 'story-1',
    personName: 'Sunita Devi',
    age: 38,
    location: 'Muzaffarpur District',
    state: 'Bihar',
    initialSituation: 'Mother of three children whose family was struggling to survive on irregular seasonal agricultural wages of under ₹4,000 per month.',
    supportReceived: 'Participated in a free bee-keeping and organic honey extraction workshop, followed by a ₹50,000 collateral-free loan under PM MUDRA (Shishu category).',
    outcome: 'Now manages 45 bee boxes yielding 400 kg of pure honey annually. Her family earnings exceed ₹22,000 monthly, and all three children attend English-medium secondary school.',
    quote: 'The day I opened my own bank passbook and received our first enterprise loan, I realized our poverty wasn\'t a destiny, it was just a lack of opportunity and knowledge.',
    lessonsLearned: 'Micro-loans combined with practical skill training create sustainable family dignity faster than one-time charity.',
    category: 'Women Empowerment'
  },
  {
    id: 'story-2',
    personName: 'Rameshwar Yadav',
    age: 44,
    location: 'Tikamgarh District',
    state: 'Madhya Pradesh',
    initialSituation: 'Lived with his elderly parents in a temporary mud-thatch hut that leaked heavily during monsoons, forcing the family to sleep on plastic sheets.',
    supportReceived: 'Sanctioned ₹1,20,000 under Pradhan Mantri Awas Yojana - Gramin (PMAY-G) along with 90 days MGNREGA wages and Swachh Bharat toilet assistance.',
    outcome: 'Built a sturdy two-room pucca brick house equipped with an LPG cylinder under Ujjwala and clean tap water under Jal Jeevan Mission.',
    quote: 'For 25 years, every rainy season felt like a battle for survival. Having a solid roof over our heads has restored our sleep and pride.',
    lessonsLearned: 'Pucca housing drastically reduces seasonal healthcare expenses from vector-borne diseases and dampness.',
    category: 'Rural Farmer'
  },
  {
    id: 'story-3',
    personName: 'Karthik Shanmugam',
    age: 22,
    location: 'Tirunelveli',
    state: 'Tamil Nadu',
    initialSituation: 'Son of a small handloom weaver who had to discontinue college after 12th standard due to financial constraints and remained unemployed for 18 months.',
    supportReceived: 'Completed a 3-month free PMKVY certification course in Rooftop Solar Panel Technician & Inverter Maintenance.',
    outcome: 'Employed by a clean-energy installation firm in Madurai earning ₹19,500/month with health insurance, and has supported his sister\'s nursing college tuition.',
    quote: 'Skill certification gave me the technical vocabulary and practical confidence that textbooks never did.',
    lessonsLearned: 'Industry-aligned vocational trades provide immediate placement pathways for rural youth.',
    category: 'Youth & Employment'
  },
  {
    id: 'story-4',
    personName: 'Fatima Begum',
    age: 41,
    location: 'Old City, Hyderabad',
    state: 'Telangana',
    initialSituation: 'Ran a small street roadside bangle and flower cart that was severely impacted by pandemic disruptions, forcing her into predatory local moneylenders charging 10% monthly interest.',
    supportReceived: 'Applied for PM SVANidhi working capital loan of ₹10,000, repaid on time via QR code to receive a 2nd tranche of ₹20,000 with 7% interest subsidy.',
    outcome: 'Completely debt-free from moneylenders. Uses a PhonePe QR code for 80% of daily transactions and earns ₹800 - ₹1,200 daily profit.',
    quote: 'When you no longer fear the moneylender banging on your door at night, your mind is free to grow your trade.',
    lessonsLearned: 'Zero-collateral micro-credit combined with digital UPI payments liberates urban street vendors from usurious debt cycles.',
    category: 'Micro-Enterprise'
  }
];

export const EMERGENCY_HELPLINES: EmergencyHelpline[] = [
  {
    title: 'National Emergency Response Support System (ERSS)',
    number: '112',
    category: 'Police / Fire / Ambulance',
    description: 'Single all-India emergency helpline number for immediate police, fire, or medical ambulance response across any state.',
    availability: '24 Hours, 7 Days a week',
    tollFree: true
  },
  {
    title: 'Childline India (Under MoWCD Mission Vatsalya)',
    number: '1098',
    category: 'Children in Distress & Protection',
    description: 'Emergency nationwide 24x7 phone outreach service for children in need of care, food, shelter, and protection against abuse or child labor.',
    availability: '24 Hours, 7 Days a week',
    tollFree: true
  },
  {
    title: 'Women Helpline (Domestic Distress & Safety)',
    number: '181',
    category: 'Women Protection & Legal Crisis',
    description: 'Provides 24x7 emergency and non-emergency support to women affected by violence, harassment, or in need of immediate shelter homes.',
    availability: '24 Hours, 7 Days a week',
    tollFree: true
  },
  {
    title: 'National Health Authority - Ayushman Bharat Toll-Free',
    number: '14555',
    category: 'Healthcare & Hospitalization',
    description: 'Verify Ayushman card status, locate nearest empaneled hospital, and file grievances for denied cashless healthcare benefits.',
    availability: '24 Hours, 7 Days a week',
    tollFree: true
  },
  {
    title: 'Elder Line (Ministry of Social Justice & Empowerment)',
    number: '14567',
    category: 'Senior Citizens',
    description: 'National toll-free helpline providing emotional support, rescue for abandoned destitute elders, and legal assistance on maintenance.',
    availability: '8:00 AM - 8:00 PM Daily',
    tollFree: true
  },
  {
    title: 'National Cyber Financial Crime Reporting Helpline',
    number: '1930',
    category: 'Cyber Fraud & UPI Scam Recovery',
    description: 'Immediately report unauthorized bank deductions, OTP scams, fake loan apps, or UPI frauds within 2 hours to freeze fraudulent recipient accounts.',
    availability: '24 Hours, 7 Days a week',
    tollFree: true
  },
  {
    title: 'Kisan Call Centre (Ministry of Agriculture)',
    number: '1800-180-1551',
    category: 'Farmers & Agriculture',
    description: 'Toll-free expert advice for farmers in 22 local languages on crop diseases, weather advisories, minimum support prices, and PM-KISAN.',
    availability: '6:00 AM - 10:00 PM Daily',
    tollFree: true
  }
];

export const INITIAL_HELP_REQUESTS = [
  {
    id: 'req-101',
    requesterName: 'Anand Kumar',
    phone: '98765 43210',
    state: 'Bihar',
    district: 'Patna',
    category: 'Healthcare' as const,
    urgency: 'Emergency (Immediate)' as const,
    description: 'Elderly father suffering from severe chest pain and hospital in rural block is refusing Ayushman card due to server downtime. Need urgent intervention.',
    status: 'In Progress' as const,
    createdAt: '2026-09-29 14:20'
  },
  {
    id: 'req-102',
    requesterName: 'Meenakshi Sundaram',
    phone: '98401 23456',
    state: 'Tamil Nadu',
    district: 'Madurai',
    category: 'Food' as const,
    urgency: 'High (24-48 Hours)' as const,
    description: 'Community of 18 migrant construction worker families stranded without food rations after work contractor fled without clearing weekly wages.',
    status: 'Assigned' as const,
    createdAt: '2026-09-29 09:15'
  },
  {
    id: 'req-103',
    requesterName: 'Kailash Chand',
    phone: '94140 88990',
    state: 'Rajasthan',
    district: 'Barmer',
    category: 'Employment' as const,
    urgency: 'Normal' as const,
    description: 'Applied for MGNREGA Job Card 45 days ago at Gram Panchayat but no response or receipt provided by local secretary.',
    status: 'Pending' as const,
    createdAt: '2026-09-28 17:40'
  }
];

export const FINANCIAL_LITERACY_MODULES = [
  {
    id: 'jan-dhan',
    title: 'Opening & Operating a PM Jan Dhan Zero-Balance Account',
    readTime: '4 min read',
    summary: 'A bank account is your gateway to financial security and government direct benefit transfers (DBT). Learn how anyone can open a zero-balance account without paying a single rupee.',
    keyPoints: [
      'No minimum balance requirement: Your account will never be charged penalties for having zero balance.',
      'Free RuPay Debit Card: Includes ₹2 Lakh accidental death/disability insurance cover when used once every 90 days.',
      'Direct Benefit Transfer (DBT): All government subsidies (PM-KISAN, PMAY, scholarships, pensions) reach your account safely without middlemen.',
      'Overdraft facility up to ₹10,000 for one member per household (preferably the female head of family) after 6 months of satisfactory operation.'
    ],
    documents: ['Aadhaar Card with mobile linkage OR Voter ID / NREGA Job card with passport size photo.'],
    actionSteps: 'Walk into any public sector bank (SBI, PNB, BoB, Canara), regional rural bank, or Bank Mitra kiosk and request a "BSBDA / PM Jan Dhan Account Form".'
  },
  {
    id: 'upi-safety',
    title: '10 Golden Rules for Safe Digital UPI Payments',
    readTime: '5 min read',
    summary: 'Digital payments save travel time and keep your money secure, but scammers exploit lack of technical awareness. Remember the fundamental rule of UPI.',
    keyPoints: [
      'RULE 1 (CRITICAL): UPI PIN is strictly used to DEDUCT money from your account. You NEVER need to enter your UPI PIN, scan a QR code, or approve a request to RECEIVE money.',
      'RULE 2: Never share OTP (One Time Password) with ANYONE on phone, even if caller claims to be bank manager, electricity official, or police.',
      'RULE 3: Do not install screen sharing apps (AnyDesk, TeamViewer, RustDesk) requested by unknown callers.',
      'RULE 4: Verify the display name shown in green on your UPI app before entering your PIN.',
      'RULE 5: If money is deducted fraudulently, report immediately within 2 hours by calling National Cyber Helpline 1930 to freeze the fraud transfer.'
    ],
    documents: [],
    actionSteps: 'Share these 5 rules with every member in your family, especially elders and young students.'
  },
  {
    id: 'budget-planning',
    title: 'Smart Household Budgeting: The 50 / 30 / 20 Rule for Families',
    readTime: '6 min read',
    summary: 'Managing a modest monthly income is difficult with rising living costs. A simple percentage guideline helps build emergency safety cushions.',
    keyPoints: [
      '50% for Needs (Rotī, Kapda, Makan): Essential groceries, rent, basic electricity, children\'s school fees, and daily medicines.',
      '30% for Wants & Social Obligations: Clothing festival purchases, occasional family travel, mobile recharge, tea & hospitality.',
      '20% for Savings & Debt Elimination: Emergency cash stash, Recurring Deposit (RD), gold chit or debt clearance to eliminate high-interest moneylenders.',
      'Emergency Fund Rule: Always strive to keep at least 1 to 2 months of basic kitchen expenses in an accessible savings bank account.'
    ],
    documents: [],
    actionSteps: 'Use the interactive budget calculator below to test your own household income split.'
  },
  {
    id: 'avoid-fraud-apps',
    title: 'Spotting Illegal Loan Apps & Lottery Scams',
    readTime: '4 min read',
    summary: 'Illegal mobile loan apps advertise "Instant loan in 2 minutes without documents" and then access phone contacts to blackmail borrowers. Protect your family.',
    keyPoints: [
      'WARNING SIGN: Apps not registered with Reserve Bank of India (RBI). Always check if the lender is backed by a registered NBFC or Bank.',
      'DANGER: Any app that asks for permission to access your Contacts, Photo Gallery, and Location to give a loan is predatory.',
      'EXORBITANT CHARGES: Deducting 30-40% upfront as "processing fees" and demanding repayment in 7 days.',
      'SAFE ALTERNATIVE: Use official government micro-credit schemes like PM SVANidhi (₹10,000 at 7%) or Mudra Shishu loan rather than downloading unknown apps.'
    ],
    documents: [],
    actionSteps: 'Never download APK files sent via WhatsApp or Telegram links. Install apps only from Google Play Store and check developer legitimacy.'
  },
  {
    id: 'micro-insurance',
    title: 'Life & Accident Insurance for Just ₹20 and ₹436 a Year',
    readTime: '4 min read',
    summary: 'Most poor families are devastated financially when the primary earning member suffers an accident or illness. The Government of India provides micro-insurance at negligible cost.',
    keyPoints: [
      'Pradhan Mantri Suraksha Bima Yojana (PMSBY): Accidental death and full disability cover of ₹2 Lakh for just ₹20 per YEAR (less than ₹2 per month) auto-debited from bank.',
      'Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY): Life insurance cover of ₹2 Lakh for any cause of death for just ₹436 per YEAR (₹1.20 per day) for ages 18 to 50.',
      'Ayushman Bharat (PM-JAY): ₹5 Lakh cashless hospitalization coverage per family annually at zero premium for eligible families.',
      'Combined protection: For less than ₹460 a year, a family secures ₹4 Lakh in life/accident protection plus ₹5 Lakh in hospital insurance.'
    ],
    documents: ['Savings bank account with Aadhaar linkage and simple auto-debit consent form.'],
    actionSteps: 'Submit the 1-page PMSBY/PMJJBY consent form at your bank branch or enable it through your bank\'s mobile app.'
  }
];
