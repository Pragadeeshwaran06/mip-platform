import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import TaskBoard from './components/TaskBoard';
import PostTask from './components/PostTask';
import AuthPage from './components/AuthPage';
import AdminDashboard from './components/AdminDashboard';
import StudentDashboard from './components/StudentDashboard';
import Sidebar from './components/Sidebar';
import AIAssistant from './components/AIAssistant';
import Portfolio from './components/Portfolio';
import Settings from './components/Settings';


function App() {
  const [currentPage, setCurrentPage] = useState('home');
  // State to hold the logged-in user's data (null if not logged in)
  const [user, setUser] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} user={user} setUser={setUser} />

      <div className="flex flex-col lg:flex-row flex-grow">
        {(user?.role === 'Student' || user?.role === 'Admin') && currentPage !== 'home' && currentPage !== 'auth' && (
          <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} user={user} />
        )}

        <div className="flex-grow flex flex-col">
          {currentPage === 'home' && <LandingPage setCurrentPage={setCurrentPage} user={user} />}
          {currentPage === 'board' && <TaskBoard user={user} />}
          {currentPage === 'student' && <TaskBoard user={user} />}
          {currentPage === 'tasks' && <TaskBoard user={user} />}
          
          {currentPage === 'company' && (
            // Only show the PostTask form if they are a logged-in Company
            user?.role === 'Company' ? (
              <PostTask user={user} />
            ) : (
              <div className="flex-grow flex flex-col items-center justify-center text-center px-4 mt-20">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl mb-4">🔒</div>
                <h2 className="text-2xl font-bold mb-2">Company Access Only</h2>
                <p className="text-slate-600 mb-6 max-w-md">You must be logged in as a Company to post a new micro-internship task.</p>
                <button 
                  onClick={() => setCurrentPage('auth')}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md"
                >
                  Sign In / Sign Up
                </button>
              </div>
            )
          )}

          {currentPage === 'auth' && <AuthPage setUser={setUser} setCurrentPage={setCurrentPage} />}
          {currentPage === 'admin' && user?.role === 'Admin' && <AdminDashboard />}
          {currentPage === 'dashboard' && user?.role === 'Student' && <StudentDashboard user={user} />}
          {currentPage === 'portfolio' && user?.role === 'Student' && <Portfolio user={user} />}
          {currentPage === 'ai' && <AIAssistant />}
          
          {currentPage === 'settings' && <Settings user={user} setUser={setUser} />}
          
          {/* Placeholder for new Sidebar pages */}
          {['internships', 'earnings'].includes(currentPage) && (
            <div className="flex-grow flex items-center justify-center p-12">
              <div className="text-center">
                <div className="text-6xl mb-6 opacity-50">✨</div>
                <h2 className="text-4xl font-black text-slate-900 mb-4 capitalize">{currentPage}</h2>
                <p className="text-slate-500 font-medium italic">This section is coming soon in the next version! Stay tuned.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="mt-24 bg-white border-t border-slate-200 py-8 text-center text-slate-500">
        <p>&copy; 2026 MicroIntern Engine. Building the future of experience.</p>
      </footer>
    </div>
  );
}

export default App;

