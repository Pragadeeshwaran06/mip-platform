import React from 'react';
import NotificationBell from './NotificationBell';

function Navbar({ currentPage, setCurrentPage, user, setUser }) {
  const handleSignOut = () => {
    setUser(null);
    setCurrentPage('home');
  };

  return (
    <nav className="sticky top-0 z-50 glass-panel shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer group"
            onClick={() => setCurrentPage('home')}
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center mr-3 shadow-indigo-200 shadow-lg group-hover:scale-110 transition-transform">
              <span className="text-white text-xl font-bold">M</span>
            </div>
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">Micro<span className="text-indigo-600">Intern</span></span>
          </div>
          <div className="flex space-x-6 items-center">
            <button 
              onClick={() => setCurrentPage('student')}
              className={`text-sm font-semibold px-3 py-2 transition-all relative ${currentPage === 'student' ? 'text-indigo-600 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}
            >
              For Students
            </button>

            {user?.role === 'Student' && (
              <button 
                onClick={() => setCurrentPage('dashboard')}
                className={`text-sm font-semibold px-3 py-2 transition-all relative ${currentPage === 'dashboard' ? 'text-indigo-600 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}
              >
                Dashboard
              </button>
            )}
            <button 
              onClick={() => setCurrentPage('company')}
              className={`text-sm font-semibold px-3 py-2 transition-all relative ${currentPage === 'company' ? 'text-indigo-600 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}
            >
              For Companies
            </button>

            {user?.role === 'Admin' && (
              <button 
                onClick={() => setCurrentPage('admin')}
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
                onClick={() => setCurrentPage('auth')}
                className="bg-indigo-600 text-white hover:bg-indigo-700 font-bold px-6 py-2.5 rounded-full shadow-lg shadow-indigo-100 transition-all transform hover:-translate-y-0.5 active:scale-95"
              >
                Get Started
              </button>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

