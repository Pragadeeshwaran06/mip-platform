import React, { useState } from 'react';

function PostTask({ user }) {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    timeEstimate: '1-2 hours',
    price: '',
    category: 'Technical',
    subCategory: 'Software Development'
  });

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
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError('');
    setSuccess('');
    
    // Frontend Validation
    if (taskData.title.length < 5) {
      return setError('Title must be at least 5 characters long.');
    }
    if (Number(taskData.price) <= 0) {
      return setError('Bounty must be a positive number.');
    }

    setIsSubmitting(true);
    
    try {
      // We append the companyName from the logged-in user to the task data
      const payload = {
        ...taskData,
        companyName: user.name
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess('Task successfully posted to the secure database!');
        setTaskData({ title: '', description: '', timeEstimate: '1-2 hours', price: '' });
      } else {
        setError(data.error || 'Failed to post task.');
      }
    } catch (err) {
      console.error("Error posting task:", err);
      setError('Error connecting to the secure server. Is it running?');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-grow flex justify-center items-center px-4 py-16 bg-slate-50">
      <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-10 shadow-2xl shadow-indigo-100/30">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100">
            <span className="text-white text-xl">✍️</span>
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">Create Internship</h2>
            <p className="text-slate-500 font-medium text-sm">Post a micro-task and connect with top talent.</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-100 rounded-2xl text-sm font-medium flex items-center gap-3">
            <span className="text-lg">⚠️</span> {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-2xl text-sm font-medium flex items-center gap-3 animate-pulse">
            <span className="text-lg">✨</span> {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Task Title</label>
            <input 
              type="text" 
              required
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none"
              placeholder="e.g. Design 3 High-Impact Instagram Templates"
              value={taskData.title}
              onChange={(e) => setTaskData({...taskData, title: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Detailed Description</label>
            <textarea 
              required
              rows="4"
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none resize-none"
              placeholder="Describe the scope, deliverables, and any specific requirements..."
              value={taskData.description}
              onChange={(e) => setTaskData({...taskData, description: e.target.value})}
            ></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Task Category</label>
              <select 
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all cursor-pointer appearance-none"
                value={taskData.category}
                onChange={(e) => setTaskData({...taskData, category: e.target.value, subCategory: categories[e.target.value][0]})}
              >
                <option value="Technical">Technical</option>
                <option value="Non-Technical">Non-Technical</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Specific Role</label>
              <select 
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all cursor-pointer appearance-none"
                value={taskData.subCategory}
                onChange={(e) => setTaskData({...taskData, subCategory: e.target.value})}
              >
                {categories[taskData.category].map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Time Investment</label>
              <select 
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all cursor-pointer appearance-none"
                value={taskData.timeEstimate}
                onChange={(e) => setTaskData({...taskData, timeEstimate: e.target.value})}
              >
                <option>Less than 1 hour</option>
                <option>1-2 hours</option>
                <option>3-5 hours</option>
                <option>1 full day</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Task Bounty (₹)</label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                <input 
                  type="number" 
                  required
                  className="w-full pl-10 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none"
                  placeholder="1500"
                  value={taskData.price}
                  onChange={(e) => setTaskData({...taskData, price: e.target.value})}
                />
              </div>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className={`w-full font-bold py-4 px-4 rounded-2xl shadow-xl transition-all mt-4 transform active:scale-95 ${isSubmitting ? 'bg-slate-300 cursor-not-allowed text-slate-500' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100'}`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Publishing Task...
              </span>
            ) : 'Publish Micro-Internship'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostTask;
