import React, { useState } from 'react';

function Settings({ user, setUser }) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    skills: user?.skills?.join(', ') || '',
    notificationsEnabled: user?.notificationsEnabled ?? true,
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s !== '');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          bio: formData.bio,
          skills: skillsArray,
          notificationsEnabled: formData.notificationsEnabled
        }),
      });

      if (response.ok) {
        setUser({
          ...user,
          name: formData.name,
          bio: formData.bio,
          skills: skillsArray,
          notificationsEnabled: formData.notificationsEnabled
        });
        setMessage({ type: 'success', text: 'Settings updated successfully!' });
      } else {
        setMessage({ type: 'error', text: 'Failed to update settings.' });
      }
    } catch (error) {
      console.error("Settings update error:", error);
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-grow max-w-4xl mx-auto px-4 py-16 animate-in fade-in duration-500">
      <div className="mb-10">
        <h2 className="text-4xl font-black text-slate-900 mb-2">Settings</h2>
        <p className="text-slate-500 font-medium text-lg">Manage your profile and platform preferences.</p>
      </div>

      {message.text && (
        <div className={`mb-8 p-4 rounded-2xl flex items-center gap-3 animate-in slide-in-from-top-4 duration-300 ${
          message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'
        }`}>
          <span className="text-xl">{message.type === 'success' ? '✅' : '⚠️'}</span>
          <p className="font-bold">{message.text}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Navigation Sidebar */}
        <div className="space-y-2">
          <button className="w-full text-left px-6 py-3 rounded-xl bg-indigo-50 text-indigo-700 font-bold border border-indigo-100 transition-all">
            Profile Details
          </button>
          <button className="w-full text-left px-6 py-3 rounded-xl text-slate-500 font-bold hover:bg-slate-50 transition-all">
            Security & Password
          </button>
          <button className="w-full text-left px-6 py-3 rounded-xl text-slate-500 font-bold hover:bg-slate-50 transition-all">
            Notifications
          </button>
          <button className="w-full text-left px-6 py-3 rounded-xl text-slate-500 font-bold hover:bg-slate-50 transition-all">
            Billing
          </button>
        </div>

        {/* Content Area */}
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <input 
                  type="email" 
                  disabled
                  value={formData.email}
                  className="w-full px-5 py-4 bg-slate-100 border border-slate-200 rounded-2xl cursor-not-allowed font-medium text-slate-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Professional Bio</label>
              <textarea 
                name="bio"
                rows="3"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none font-medium"
              ></textarea>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Skills (comma separated)</label>
              <input 
                type="text" 
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="React, Node.js, Python, Figma..."
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none font-medium"
              />
            </div>

            <div className="pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h4 className="font-bold text-slate-900">Email Notifications</h4>
                  <p className="text-sm text-slate-500">Receive updates about new tasks and applications.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="notificationsEnabled"
                    checked={formData.notificationsEnabled}
                    onChange={handleChange}
                    className="sr-only peer" 
                  />
                  <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <div className="flex justify-end gap-4">
                <button 
                  type="button"
                  className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl transition-all"
                >
                  Discard Changes
                </button>
                <button 
                  type="submit"
                  disabled={saving}
                  className={`px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 transition-all transform active:scale-95 flex items-center gap-3 ${saving ? 'opacity-70 cursor-wait' : ''}`}
                >
                  {saving ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : 'Save Settings'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Settings;
