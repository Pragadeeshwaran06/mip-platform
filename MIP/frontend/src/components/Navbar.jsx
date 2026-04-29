import React, { useState } from 'react';
import NotificationBell from './NotificationBell';

function Navbar({ currentPage, setCurrentPage, user, setUser }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = () => {
    setUser(null);
    setCurrentPage('home');
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 glass-panel shadow-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo Section */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer group"
            onClick={() => handleNavigation('home')}
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center mr-3 shadow-indigo-200 shadow-lg group-hover:scale-110 transition-transform">
              <span className="text-white text-xl font-bold">M</span>
            </div>
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">Micro<span className="text-indigo-600">Intern</span></span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-6 items-center">
            <button 
              onClick={() => handleNavigation('student')}
              className={`text-sm font-semibold px-3 py-2 transition-all relative ${currentPage === 'student' ? 'text-indigo-600 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}
            >
              For Students
            </button>

            {user?.role === 'Student' && (
              <button 
                onClick={() => handleNavigation('dashboard')}
                className={`text-sm font-semibold px-3 py-2 transition-all relative ${currentPage === 'dashboard' ? 'text-indigo-600 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}
              >
                Dashboard
              </button>
            )}
            <button 
              onClick={() => handleNavigation('company')}
              className={`text-sm font-semibold px-3 py-2 transition-all relative ${currentPage === 'company' ? 'text-indigo-600 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}
            >
              For Companies
            </button>

            {user?.role === 'Admin' && (
              <button 
                onClick={() => handleNavigation('admin')}
                className={`text-sm font-semibold px-3 py-2 transition-all relative ${currentPage === 'admin' ? 'text-indigo-600 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}
              >
                Admin Panel
              </button>
            )}

            <div className="h-6 w-px bg-slate-200 mx-2"></div>

            {user ? (
              <div className="flex items-center gap-6">
                <NotificationBell />
                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold text-slate-900">
                    {user.name}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-500">{user.role}</span>
                </div>
                <button 
                  onClick={handleSignOut}
                  className="bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 text-xs font-bold py-2 px-4 rounded-full transition-all"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button 
                onClick={() => handleNavigation('auth')}
                className="bg-indigo-600 text-white hover:bg-indigo-700 font-bold px-6 py-2.5 rounded-full shadow-lg shadow-indigo-100 transition-all transform hover:-translate-y-0.5 active:scale-95"
              >
                Get Started
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            {user && (
              <div className="mr-4">
                <NotificationBell />
              </div>
            )}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 hover:text-indigo-600 focus:outline-none p-2 bg-slate-100 rounded-xl"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-200 shadow-xl z-50 flex flex-col p-4 animate-in slide-in-from-top-2 duration-200 h-[calc(100vh-80px)] overflow-y-auto">
          <button onClick={() => handleNavigation('student')} className={`py-3 px-4 text-left font-bold rounded-xl ${currentPage === 'student' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'}`}>For Students</button>
          <button onClick={() => handleNavigation('company')} className={`py-3 px-4 text-left font-bold rounded-xl ${currentPage === 'company' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'}`}>For Companies</button>
          
          {!user && (
            <button onClick={() => handleNavigation('auth')} className="mt-4 bg-indigo-600 text-white font-bold py-3 rounded-xl">Get Started</button>
          )}

          {user && (
            <>
              <div className="h-px bg-slate-100 my-4"></div>
              <div className="px-4 pb-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{user.role} Menu</p>
              </div>
              
              {user.role === 'Student' && (
                <>
                  <button onClick={() => handleNavigation('dashboard')} className={`py-3 px-4 text-left font-bold rounded-xl flex items-center gap-3 ${currentPage === 'dashboard' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'}`}><span className="text-xl">🏠</span> Dashboard</button>
                  <button onClick={() => handleNavigation('internships')} className={`py-3 px-4 text-left font-bold rounded-xl flex items-center gap-3 ${currentPage === 'internships' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'}`}><span className="text-xl">💼</span> Internships</button>
                  <button onClick={() => handleNavigation('tasks')} className={`py-3 px-4 text-left font-bold rounded-xl flex items-center gap-3 ${currentPage === 'tasks' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'}`}><span className="text-xl">📋</span> Browse Tasks</button>
                  <button onClick={() => handleNavigation('ai')} className={`py-3 px-4 text-left font-bold rounded-xl flex items-center gap-3 ${currentPage === 'ai' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'}`}><span className="text-xl">🤖</span> AI Assistant</button>
                  <button onClick={() => handleNavigation('earnings')} className={`py-3 px-4 text-left font-bold rounded-xl flex items-center gap-3 ${currentPage === 'earnings' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'}`}><span className="text-xl">💰</span> Earnings</button>
                  <button onClick={() => handleNavigation('portfolio')} className={`py-3 px-4 text-left font-bold rounded-xl flex items-center gap-3 ${currentPage === 'portfolio' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'}`}><span className="text-xl">👤</span> Portfolio</button>
                </>
              )}
              
              {user.role === 'Admin' && (
                <>
                  <button onClick={() => handleNavigation('admin')} className={`py-3 px-4 text-left font-bold rounded-xl flex items-center gap-3 ${currentPage === 'admin' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'}`}><span className="text-xl">📊</span> Admin Panel</button>
                  <button onClick={() => handleNavigation('tasks')} className={`py-3 px-4 text-left font-bold rounded-xl flex items-center gap-3 ${currentPage === 'tasks' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'}`}><span className="text-xl">📋</span> Manage Tasks</button>
                </>
              )}
              
              {user.role === 'Company' && (
                <>
                  <button onClick={() => handleNavigation('company')} className={`py-3 px-4 text-left font-bold rounded-xl flex items-center gap-3 ${currentPage === 'company' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'}`}><span className="text-xl">➕</span> Post a Task</button>
                </>
              )}
              
              <button onClick={() => handleNavigation('settings')} className={`py-3 px-4 text-left font-bold rounded-xl flex items-center gap-3 ${currentPage === 'settings' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'}`}><span className="text-xl">⚙️</span> Settings</button>

              <div className="h-px bg-slate-100 my-4"></div>
              <div className="px-4 flex justify-between items-center pb-8 pt-2">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-900">{user.name}</span>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-500">{user.role}</span>
                </div>
                <button onClick={handleSignOut} className="bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold py-2.5 px-5 rounded-xl transition-colors">Sign Out</button>
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
