import React from 'react';
import landingBg from '../assets/landing-bg.png';

function LandingPage({ setCurrentPage }) {
  return (
    <main className="flex-grow flex flex-col items-center px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 z-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url(${landingBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>

      <div className="max-w-4xl mx-auto pt-24 pb-32 relative z-10">
        <span className="inline-block px-4 py-1.5 mb-8 text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 rounded-full">
          The Future of Early Career Experience
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
          Get Real Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-500">Experience.</span><br />
          Before Your First Job.
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed">
          Connect with high-growth startups to complete 1-5 hour real-world tasks. 
          Build a verified portfolio, prove your skills, and get hired faster.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button 
            onClick={() => setCurrentPage('student')}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-5 px-10 rounded-2xl shadow-xl shadow-indigo-100 hover:shadow-indigo-200 transition-all transform hover:-translate-y-1 text-lg active:scale-95"
          >
            Find a Micro-Internship
          </button>
          <button 
            onClick={() => setCurrentPage('company')}
            className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 font-bold py-5 px-10 rounded-2xl shadow-md border border-slate-200 hover:shadow-lg transition-all text-lg active:scale-95"
          >
            Post a Task (Companies)
          </button>
        </div>
      </div>

      {/* Value Proposition Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-32 text-left">
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-indigo-100 transition-all group">
          <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-sm">⚡</div>
          <h3 className="text-xl font-bold mb-3">Fast & Flexible</h3>
          <p className="text-slate-600 leading-relaxed">Tasks take 1-5 hours. Complete them on your own schedule without a 3-month commitment.</p>
        </div>
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-emerald-100 transition-all group">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:bg-emerald-600 group-hover:text-white transition-colors shadow-sm">💼</div>
          <h3 className="text-xl font-bold mb-3">Verified Portfolio</h3>
          <p className="text-slate-600 leading-relaxed">Every completed task is verified and added to your digital profile as proof of real-world impact.</p>
        </div>
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-purple-100 transition-all group">
          <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:bg-purple-600 group-hover:text-white transition-colors shadow-sm">🚀</div>
          <h3 className="text-xl font-bold mb-3">Direct to Hiring</h3>
          <p className="text-slate-600 leading-relaxed">Skip the line. Companies hire students who consistently deliver excellence on micro-tasks.</p>
        </div>
      </div>
    </main>
  );
}

export default LandingPage;
