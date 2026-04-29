import React from 'react';

function Sidebar({ currentPage, setCurrentPage, user }) {
  const studentMenu = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'internships', label: 'Internships', icon: '💼' },
    { id: 'tasks', label: 'Browse Tasks', icon: '📋' },
    { id: 'ai', label: 'AI Assistant', icon: '🤖' },
    { id: 'earnings', label: 'Earnings', icon: '💰' },
    { id: 'portfolio', label: 'Portfolio', icon: '👤' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const adminMenu = [
    { id: 'admin', label: 'Admin Panel', icon: '📊' },
    { id: 'tasks', label: 'Manage Tasks', icon: '📋' },
    { id: 'settings', label: 'System Settings', icon: '⚙️' },
  ];

  const menuItems = user?.role === 'Admin' ? adminMenu : studentMenu;

  return (
    <div className="w-64 min-h-screen bg-white border-r border-slate-100 flex flex-col pt-8 sticky top-0">
      <div className="px-8 mb-10">
        <span className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">{user?.role} Portal</span>
      </div>

      <nav className="flex-grow px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${
              currentPage === item.id 
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
              : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-6">
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Pro Plan</p>
          <p className="text-xs font-bold text-slate-700 mb-3">Get unlimited applications</p>
          <button className="w-full bg-slate-900 text-white text-[10px] font-black uppercase py-2 rounded-lg hover:bg-slate-800 transition-colors">
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
