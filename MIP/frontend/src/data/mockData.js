// Helper to generate dates in the last 30 days
const getRandomDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 30));
  return date.toISOString();
};

export const mockTasks = [
  { id: 1, title: "Create Landing Page for Web3 Startup", company: "Nexus Labs", category: "Technical", subCategory: "Software Development", price: "₹8,000", timeEstimate: "3-5 Days", skills: ["React", "Tailwind CSS"], description: "High-converting landing page.", createdAt: getRandomDate() },
  { id: 2, title: "Write 5 Technical Blog Posts", company: "DevStream", category: "Non-Technical", subCategory: "Content Writing", price: "₹5,000", timeEstimate: "1 Week", skills: ["Technical Writing", "SEO"], description: "Focusing on AWS and React.", createdAt: getRandomDate() },
  { id: 3, title: "Design Mobile App UI (10 Screens)", company: "Pixel Perfect", category: "Technical", subCategory: "UI/UX Design", price: "₹12,000", timeEstimate: "5-7 Days", skills: ["Figma", "Prototyping"], description: "Modern, dark-themed UI.", createdAt: getRandomDate() },
  { id: 4, title: "B2B Sales Outreach Campaign", company: "GrowthScale", category: "Non-Technical", subCategory: "Sales & Business Dev", price: "₹6,500", timeEstimate: "4 Days", skills: ["Communication", "Lead Gen"], description: "Identify potential B2B partners.", createdAt: getRandomDate() },
  { id: 5, title: "Data Visualization Dashboard", company: "Insight Analytics", category: "Technical", subCategory: "Data Science", price: "₹10,000", timeEstimate: "4-6 Days", skills: ["Python", "D3.js"], description: "Visualize retail sales trends.", createdAt: getRandomDate() },
  { id: 6, title: "Social Media Marketing Strategy", company: "TrendWave", category: "Non-Technical", subCategory: "Marketing & SEO", price: "₹4,000", timeEstimate: "3 Days", skills: ["Social Media", "Canva"], description: "30-day content calendar.", createdAt: getRandomDate() },
  { id: 7, title: "Python Script for Web Scraping", company: "DataExtract", category: "Technical", subCategory: "Software Development", price: "₹3,500", timeEstimate: "2 Days", skills: ["Python", "BS4"], description: "Extract data from e-commerce sites.", createdAt: getRandomDate() },
  { id: 8, title: "Logo Design for FinTech", company: "BrandNew", category: "Technical", subCategory: "UI/UX Design", price: "₹2,500", timeEstimate: "2 Days", skills: ["Illustrator", "Branding"], description: "Minimalist and professional logo.", createdAt: getRandomDate() },
  { id: 9, title: "Customer Support Training Manual", company: "ServiceFirst", category: "Non-Technical", subCategory: "Customer Support", price: "₹4,500", timeEstimate: "4 Days", skills: ["Writing", "Training"], description: "Create a guide for new agents.", createdAt: getRandomDate() },
  { id: 10, title: "AWS Cloud Migration Plan", company: "CloudOps", category: "Technical", subCategory: "Cloud Computing", price: "₹15,000", timeEstimate: "10 Days", skills: ["AWS", "Architecture"], description: "Draft a migration strategy for a legacy app.", createdAt: getRandomDate() },
  // ... Generating 40 more tasks
  ...Array.from({ length: 40 }).map((_, i) => ({
    id: i + 11,
    title: [
      "Improve Database Performance", "Email Marketing Automation", "React Native Bug Fixes",
      "Financial Audit Report", "Market Research for New Product", "HR Policy Documentation",
      "DevOps Pipeline Setup", "Cyber Security Audit", "Google Ads Optimization",
      "Video Editing for Product Launch", "Podcast Transcription", "Machine Learning Model Tuning",
      "Infographic Design for Blog", "Proofreading Scientific Paper", "Competitive Analysis Report"
    ][i % 15] + ` (Project ${i + 11})`,
    company: ["TechGiant", "StartupX", "GlobalSolutions", "CreativeHub", "DataSystems"][i % 5],
    category: i % 2 === 0 ? "Technical" : "Non-Technical",
    subCategory: i % 2 === 0 ? ["Software Development", "Data Science", "Cyber Security", "UI/UX Design", "Cloud Computing", "DevOps"][i % 6] : ["Marketing & SEO", "Content Writing", "Human Resources", "Sales & Business Dev", "Finance & Accounting", "Customer Support"][i % 6],
    price: `₹${(Math.floor(Math.random() * 15) + 2) * 1000}`,
    timeEstimate: `${Math.floor(Math.random() * 7) + 2} Days`,
    skills: i % 2 === 0 ? ["React", "Python", "Node.js"] : ["SEO", "Copywriting", "Sales"],
    description: "This is a comprehensive task designed to test your professional skills in a real-world scenario. You will be expected to deliver high-quality results within the specified timeframe.",
    createdAt: getRandomDate()
  }))
];

export const mockUsers = [
  { 
    id: 1, 
    name: "Pragadeesh", 
    role: "Admin", 
    email: "admin@mip.com", 
    password: "password123", 
    createdAt: "2026-01-15T00:00:00Z" 
  },
  { 
    id: 2, 
    name: "Jane Doe", 
    role: "Student", 
    email: "jane@student.com", 
    password: "password123", 
    skills: ["React", "Tailwind CSS", "Figma", "Node.js"],
    createdAt: "2026-02-20T00:00:00Z" 
  },
  { 
    id: 3, 
    name: "Acme Corp", 
    role: "Company", 
    email: "acme@company.com", 
    password: "password123", 
    createdAt: "2026-03-10T00:00:00Z" 
  },
  { 
    id: 4, 
    name: "John Smith", 
    role: "Student", 
    email: "john@student.com", 
    password: "password123", 
    skills: ["Python", "SEO", "Technical Writing"],
    createdAt: "2026-04-05T00:00:00Z" 
  },
  { 
    id: 5, 
    name: "Nexus Labs", 
    role: "Company", 
    email: "nexus@company.com", 
    password: "password123", 
    createdAt: "2026-04-12T00:00:00Z" 
  },
  // ... Generating 25 more students
  ...Array.from({ length: 25 }).map((_, i) => ({
    id: i + 6,
    name: ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Heidi", "Ivan", "Judy", "Karl", "Linda", "Mike"][i % 13] + " " + ["Wilson", "Taylor", "Anderson", "Thomas", "Moore", "White", "Harris"][i % 7],
    role: "Student",
    email: `student${i + 6}@mip.com`,
    password: "password123",
    skills: ["React", "Python", "UI/UX Design"],
    createdAt: getRandomDate()
  }))
];

export const mockStudentStats = [
  { label: 'Tasks Completed', value: '12', icon: '✅', color: 'bg-emerald-50 text-emerald-600' },
  { label: 'Total Earnings', value: '₹14,500', icon: '💰', color: 'bg-indigo-50 text-indigo-600' },
  { label: 'Current Streak', value: '5 Days', icon: '🔥', color: 'bg-orange-50 text-orange-600' },
  { label: 'Skill Level', value: 'Level 4', icon: '🏆', color: 'bg-purple-50 text-purple-600' },
];

export const mockSkills = [
  { name: 'Frontend Dev', level: 85 },
  { name: 'UI Design', level: 70 },
  { name: 'Content Writing', level: 45 },
  { name: 'Problem Solving', level: 90 },
];

export const mockNotifications = [
  { id: 1, title: 'New Task Match!', message: 'A new React task matches 95% of your skills.', time: '2 mins ago', type: 'info', read: false },
  { id: 2, title: 'Application Accepted', message: 'Nexus Labs accepted your application for UI Design.', time: '1 hour ago', type: 'success', read: false },
  { id: 3, title: 'Payment Received', message: 'You earned ₹8,000 for Landing Page project.', time: '5 hours ago', type: 'success', read: true },
  { id: 4, title: 'New Achievement', message: 'You earned the "Fast Learner" badge!', time: '1 day ago', type: 'reward', read: true },
];

export const mockBadges = [
  { id: 1, name: 'Fast Learner', icon: '⚡', description: 'Completed 3 tasks in 1 week', date: '2026-04-10' },
  { id: 2, name: 'UI Ninja', icon: '🎨', description: 'Maintained 4.9+ rating in Design', date: '2026-04-15' },
  { id: 3, name: 'Bounty Hunter', icon: '🎯', description: 'Earned over ₹50,000 total', date: '2026-04-20' },
  { id: 4, name: 'Consistent', icon: '🔥', description: '7 day streak of activity', date: '2026-04-22' },
];

export const mockActivities = [
  { id: 1, type: 'applied', task: 'React Dashboard', time: '2 hours ago' },
  { id: 2, type: 'completed', task: 'Logo Design', time: '1 day ago' },
  { id: 3, type: 'earned', task: 'Level 4 Milestone', time: '2 days ago' },
  { id: 4, type: 'message', task: 'Nexus Labs', time: '3 days ago' },
];

