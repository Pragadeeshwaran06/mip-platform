import React, { useState, useEffect } from 'react';
import { mockTasks } from '../data/mockData';
import marketplaceBg from '../assets/marketplace-bg.png';


function TaskBoard({ user }) {
  const [availableTasks, setAvailableTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [appliedTasks, setAppliedTasks] = useState(new Set());
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [applicantData, setApplicantData] = useState({
    fullName: '',
    collegeName: '',
    department: '',
    year: '1st Year'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSubCategory, setActiveSubCategory] = useState('All');

  const categories = {
    'Technical': [
      'Software Development',
      'Data Science',
      'Cyber Security',
      'UI/UX Design',
      'Cloud Computing',
      'DevOps'
    ],
    'Non-Technical': [
      'Marketing & SEO',
      'Content Writing',
      'Human Resources',
      'Sales & Business Dev',
      'Finance & Accounting',
      'Customer Support'
    ]
  };

  // useEffect runs once when the component loads. We use it to fetch data.
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Tasks
        const taskResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks`);
        const taskData = await taskResponse.json();
        
        let finalTasks = [];
        if (Array.isArray(taskData)) {
          const mockWithUniqueIds = mockTasks.map(t => ({ ...t, id: `m-${t.id}` }));
          finalTasks = [...taskData, ...mockWithUniqueIds.filter(mt => !taskData.find(dt => dt.title === mt.title))];
          setAvailableTasks(finalTasks);
        } else {
          finalTasks = mockTasks.map(t => ({ ...t, id: `m-${t.id}` }));
          setAvailableTasks(finalTasks);
        }

        // Fetch User's Applications if logged in
        if (user && user.id) {
          const appResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/applications/${user.id}`);
          const appData = await appResponse.json();
          if (Array.isArray(appData)) {
            const appliedIds = new Set(appData.map(app => app.taskId));
            setAppliedTasks(appliedIds);
          }
        }
      } catch (error) {
        console.error("Error fetching data, falling back to mock data:", error);
        setAvailableTasks(mockTasks);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const handleApplyClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const submitApplication = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert("Please log in to apply.");
      return;
    }

    // In a real app, mock tasks (with 'm-' prefix) can't be applied to in the DB
    // but we'll simulate success for them too for a "working model" feel.
    if (typeof selectedTask.id === 'string' && selectedTask.id.startsWith('m-')) {
      console.log("Simulating application for mock task:", selectedTask.id);
      setAppliedTasks(prev => new Set([...prev, selectedTask.id]));
      setIsModalOpen(false);
      setSelectedTask(null);
      setApplicantData({ fullName: '', collegeName: '', department: '', year: '1st Year' });
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskId: selectedTask.id,
          userId: user.id,
          fullName: applicantData.fullName,
          collegeName: applicantData.collegeName,
          department: applicantData.department,
          year: applicantData.year
        }),
      });

      if (response.ok) {
        setAppliedTasks(prev => new Set([...prev, selectedTask.id]));
        setIsModalOpen(false);
        setSelectedTask(null);
        setApplicantData({ fullName: '', collegeName: '', department: '', year: '1st Year' });
      } else {
        const error = await response.json();
        alert(error.error || "Failed to submit application.");
      }
    } catch (error) {
      console.error("Application error:", error);
      alert("Network error. Application not submitted.");
    }
  };

  // Helper to calculate match score
  const calculateMatchScore = (taskSkills) => {
    if (!user || !user.skills || !taskSkills) return null;
    const commonSkills = taskSkills.filter(skill => 
      user.skills.some(userSkill => userSkill.toLowerCase() === skill.toLowerCase())
    );
    const score = Math.round((commonSkills.length / taskSkills.length) * 100);
    // If no match but user has skills, give a base "potential" score or just return a fixed number
    return score || 15;
  };

  const filteredTasks = availableTasks.filter(task => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = (
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query) ||
      task.company.toLowerCase().includes(query) ||
      (task.skills && task.skills.some(skill => skill.toLowerCase().includes(query)))
    );

    const matchesCategory = activeCategory === 'All' || task.category === activeCategory;
    const matchesSubCategory = activeSubCategory === 'All' || task.subCategory === activeSubCategory;

    return matchesSearch && matchesCategory && matchesSubCategory;
  }).map(task => ({
    ...task,
    matchScore: calculateMatchScore(task.skills)
  })).sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));

  if (loading) {
    return <div className="text-center mt-20 text-xl font-bold text-slate-600">Loading Tasks...</div>;
  }

  return (
    <div className="flex-grow max-w-6xl mx-auto px-4 py-16 relative">
      {/* Background Image Layer */}
      <div 
        className="fixed inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url(${marketplaceBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      
      <div className="relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <span className="inline-block px-3 py-1 mb-4 text-[10px] font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 rounded-full">
            Marketplace
          </span>
          <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">Available Micro-Internships</h2>
          <p className="text-slate-500 mt-3 text-lg font-medium">Complete high-impact tasks to build your portfolio and earn.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </span>
            <input 
              type="text"
              placeholder="Search tasks, skills, or companies..."
              className="pl-12 pr-6 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all w-full md:w-80 shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="px-6 py-3.5 bg-indigo-50 border border-indigo-100 rounded-2xl text-sm font-bold text-indigo-600 shadow-sm flex items-center justify-center whitespace-nowrap">
            {filteredTasks.length} {filteredTasks.length === 1 ? 'Task' : 'Tasks'} Found
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="mb-12 space-y-6">
        <div className="flex flex-wrap gap-3">
          {['All', 'Technical', 'Non-Technical'].map(cat => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setActiveSubCategory('All');
              }}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeCategory === cat 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                : 'bg-white border border-slate-200 text-slate-500 hover:border-indigo-200 hover:text-indigo-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {activeCategory !== 'All' && (
          <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-left-4 duration-300">
            <button
              onClick={() => setActiveSubCategory('All')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeSubCategory === 'All'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              All {activeCategory}
            </button>
            {categories[activeCategory].map(sub => (
              <button
                key={sub}
                onClick={() => setActiveSubCategory(sub)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeSubCategory === sub
                  ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                  : 'bg-white border border-slate-200 text-slate-500 hover:border-indigo-200 hover:text-indigo-600'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-6">
        {filteredTasks.length === 0 ? (
          <div className="py-24 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <div className="text-5xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No matching tasks found</h3>
            <p className="text-slate-500 max-w-sm mx-auto">Try adjusting your search terms or filters to find what you're looking for.</p>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-6 text-indigo-600 font-bold hover:underline"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div key={task.id} className="group bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              
              <div className="flex-grow">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  {task.matchScore !== null && (
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${
                      task.matchScore > 80 ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 
                      task.matchScore > 50 ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 
                      'bg-slate-50 text-slate-400 border border-slate-100'
                    }`}>
                      ✨ {task.matchScore}% Match
                    </span>
                  )}
                  <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {task.timeEstimate}
                  </span>
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">{task.company}</span>
                  {task.createdAt && (
                    <span className="text-slate-300 text-xs">• {new Date(task.createdAt).toLocaleDateString()}</span>
                  )}
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">{task.title}</h3>
                
                <div className="flex flex-wrap gap-2">
                  {task.skills && task.skills.map(skill => (
                    <span key={skill} className={`text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-wider border transition-colors ${
                      user?.skills?.some(s => s.toLowerCase() === skill.toLowerCase())
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                      : 'bg-slate-50 text-slate-500 border-slate-100'
                    }`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="w-full md:w-auto flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4">
                <div className="flex flex-col items-start md:items-end">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Bounty</span>
                  <span className="text-3xl font-extrabold text-slate-900">{task.price}</span>
                </div>
                <button 
                  onClick={() => handleApplyClick(task)}
                  disabled={appliedTasks.has(task.id)}
                  className={`font-bold py-3.5 px-8 rounded-2xl shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-95 whitespace-nowrap ${
                    appliedTasks.has(task.id) 
                      ? 'bg-emerald-500 text-white shadow-emerald-100 cursor-default' 
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100'
                  }`}
                >
                  {appliedTasks.has(task.id) ? (
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Applied
                    </span>
                  ) : 'Apply Now'}
                </button>
              </div>

            </div>
          ))
        )}
      </div>


      {/* Application Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="bg-indigo-600 px-8 py-6 text-white">
              <h3 className="text-2xl font-bold">Apply for Micro-Internship</h3>
              <p className="text-indigo-100 text-sm mt-1">Applying for: {selectedTask?.title}</p>
            </div>

            <form onSubmit={submitApplication} className="p-8 space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none"
                  placeholder="Enter your full name"
                  value={applicantData.fullName}
                  onChange={(e) => setApplicantData({...applicantData, fullName: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">College Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none"
                  placeholder="Enter your college name"
                  value={applicantData.collegeName}
                  onChange={(e) => setApplicantData({...applicantData, collegeName: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Department</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none"
                    placeholder="e.g. CSE, IT"
                    value={applicantData.department}
                    onChange={(e) => setApplicantData({...applicantData, department: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Current Year</label>
                  <select 
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none cursor-pointer appearance-none"
                    value={applicantData.year}
                    onChange={(e) => setApplicantData({...applicantData, year: e.target.value})}
                  >
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-[2] px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 transition-all transform active:scale-95"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default TaskBoard;
