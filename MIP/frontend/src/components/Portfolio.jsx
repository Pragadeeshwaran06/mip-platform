import React from 'react';
import { mockStudentStats, mockBadges, mockTasks } from '../data/mockData';

function Portfolio({ user }) {
  // Use first 3 tasks as "completed" tasks for mock purposes
  const completedTasks = mockTasks.slice(0, 3);
  
  return (
    <div className="flex-grow max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm text-center">
            <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-6 border-4 border-white shadow-xl shadow-indigo-100/50">
              {user?.name?.[0] || 'U'}
            </div>
            <h2 className="text-2xl font-black text-slate-900">{user?.name}</h2>
            <p className="text-indigo-600 font-bold text-xs uppercase tracking-widest mt-1">{user?.role}</p>
            
            <div className="mt-8 pt-8 border-t border-slate-50 text-left space-y-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Email</p>
                <p className="text-sm font-medium text-slate-700">{user?.email}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Member Since</p>
                <p className="text-sm font-medium text-slate-700">Jan 2026</p>
              </div>
            </div>

            <button className="w-full mt-8 py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all">
              Edit Profile
            </button>
          </div>

          <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-100">
            <h3 className="font-bold mb-4">Pro Tip</h3>
            <p className="text-indigo-100 text-sm leading-relaxed">
              Students with a complete skill profile are 3x more likely to get their applications accepted.
            </p>
          </div>
        </div>

        {/* Right Column: Portfolio Content */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mockStudentStats.map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="text-xl mb-3">{stat.icon}</div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                <p className="text-xl font-black text-slate-900">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Work History */}
          <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black text-slate-900">Work History</h3>
              <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {completedTasks.length} Completed
              </span>
            </div>
            
            <div className="space-y-6">
              {completedTasks.map((task) => (
                <div key={task.id} className="group p-6 border border-slate-50 rounded-2xl hover:border-indigo-100 hover:bg-indigo-50/10 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{task.title}</h4>
                      <p className="text-xs text-slate-500 font-medium">{task.company}</p>
                    </div>
                    <span className="text-emerald-600 font-black text-sm">{task.price}</span>
                  </div>
                  <div className="flex gap-2">
                    {task.skills.map(skill => (
                      <span key={skill} className="text-[9px] font-bold text-slate-400 bg-white border border-slate-100 px-2 py-0.5 rounded-md uppercase">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements / Badges */}
          <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-8">Achievements</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {mockBadges.map((badge) => (
                <div key={badge.id} className="text-center group cursor-help">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 group-hover:scale-110 group-hover:bg-indigo-50 transition-all border border-slate-100">
                    {badge.icon}
                  </div>
                  <p className="text-xs font-bold text-slate-900">{badge.name}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{badge.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Portfolio;
