import React, { useState } from 'react';
import { mockUsers } from '../data/mockData';
import authBg from '../assets/auth-bg.png';


function AuthPage({ setUser, setCurrentPage }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Student'
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const url = isLogin ? `${import.meta.env.VITE_API_URL}/api/login` : `${import.meta.env.VITE_API_URL}/api/register`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          setUser(data.user); // Save the user info
          setCurrentPage('home'); // Send them back to the landing page
        } else {
          // If they just registered, automatically log them in
          setUser({ id: data.userId, name: data.name, role: data.role });
          setCurrentPage('home');
        }
      } else {
        setError(data.error || 'Authentication failed.');
      }
    } catch (err) {
      console.warn("Auth server connection failed, checking mock data:", err);
      
      // Fallback: Check mock data for login
      if (isLogin) {
        const mockUser = mockUsers.find(u => u.email === formData.email && u.password === formData.password);
        if (mockUser) {
          setUser(mockUser);
          setCurrentPage('home');
          return;
        } else {
          setError('Invalid mock credentials. (Try admin@mip.com / password123)');
        }
      } else {
        // Mock registration: Just pretend it worked
        const newUser = { id: Date.now(), name: formData.name, role: formData.role, email: formData.email };
        setUser(newUser);
        setCurrentPage('home');
        return;
      }
      
      setError('Error connecting to the server and no mock user found.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-grow flex justify-center items-center px-4 py-20 bg-slate-50 relative overflow-hidden">
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url(${authBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md border border-slate-200 rounded-3xl p-10 shadow-2xl shadow-indigo-100/50 relative z-10">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <span className="text-white text-3xl font-bold">{isLogin ? '👋' : '🚀'}</span>
          </div>
        </div>
        
        <h2 className="text-3xl font-extrabold text-slate-900 mb-2 text-center">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-slate-500 text-center mb-8">
          {isLogin ? 'Enter your details to access your account' : 'Start your journey with MicroIntern today'}
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-100 rounded-2xl text-sm font-medium flex items-center gap-3">
            <span className="text-lg">⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Account Type</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'Student' })}
                    className={`py-3 rounded-2xl border-2 font-bold text-sm transition-all ${formData.role === 'Student' ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-slate-100 bg-white text-slate-500'}`}
                  >
                    Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'Company' })}
                    className={`py-3 rounded-2xl border-2 font-bold text-sm transition-all ${formData.role === 'Company' ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-slate-100 bg-white text-slate-500'}`}
                  >
                    Company
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'Admin' })}
                    className={`py-3 rounded-2xl border-2 font-bold text-sm transition-all ${formData.role === 'Admin' ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-slate-100 bg-white text-slate-500'}`}
                  >
                    Admin
                  </button>
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="name@company.com"
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full font-bold py-4 px-4 rounded-2xl shadow-xl transition-all mt-4 transform active:scale-95 ${isLoading ? 'bg-slate-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100'}`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (isLogin ? 'Sign In' : 'Create Free Account')}
          </button>
        </form>
        <div className="mt-8 text-center">
          <button
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="text-slate-500 hover:text-indigo-600 font-bold text-sm transition-all"
          >
            {isLogin ? (
              <span>New here? <span className="text-indigo-600">Create an account</span></span>
            ) : (
              <span>Already have an account? <span className="text-indigo-600">Sign in</span></span>
            )}
          </button>
        </div>

        {/* Development Helper: Mock Logins */}
        <div className="mt-12 pt-8 border-t border-slate-100">
          <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Development Mode: Quick Login</p>
          <div className="flex flex-wrap justify-center gap-2">
            <button 
              onClick={() => { setUser(mockUsers[1]); setCurrentPage('home'); }}
              className="px-4 py-2 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-lg border border-emerald-100 hover:bg-emerald-100 transition-all"
            >
              Student Mock
            </button>
            <button 
              onClick={() => { setUser(mockUsers[4]); setCurrentPage('home'); }}
              className="px-4 py-2 bg-purple-50 text-purple-600 text-[10px] font-bold rounded-lg border border-purple-100 hover:bg-purple-100 transition-all"
            >
              Company Mock
            </button>
            <button 
              onClick={() => { setUser(mockUsers[0]); setCurrentPage('home'); }}
              className="px-4 py-2 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-lg border border-indigo-100 hover:bg-indigo-100 transition-all"
            >
              Admin Mock
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
