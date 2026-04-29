import React from 'react';
import { mockSkills, mockBadges, mockActivities } from '../data/mockData';
import dashboardBg from '../assets/dashboard-bg.png';


function StudentDashboard({ user }) {
  const [realApplications, setRealApplications] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user || !user.id) return;
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/applications/${user.id}`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setRealApplications(data);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [user]);

  // Derived stats
  const stats = [
    { label: 'Tasks Applied', value: realApplications.length, icon: '📝', color: 'bg-blue-50 text-blue-600' },
    { label: 'Total Earnings', value: '₹0', icon: '💰', color: 'bg-indigo-50 text-indigo-600' },
    { label: 'Skills Added', value: user?.skills?.length || 0, icon: '⚡', color: 'bg-orange-50 text-orange-600' },
    { label: 'Skill Level', value: 'Level 1', icon: '🏆', color: 'bg-purple-50 text-purple-600' },
  ];

  const skills = React.useMemo(() => {
    return user?.skills?.map(s => ({ name: s, level: 40 + (s.length * 5) % 40 })) || mockSkills;
  }, [user?.skills]);
  const badges = mockBadges;
  
  // Merge real applications with mock activities for a full feed
  const activities = [
    ...realApplications.map(app => ({
      id: `real-${app.id}`,
      type: 'applied',
      task: app.title,
      time: new Date(app.appliedAt).toLocaleDateString()
    })),
    ...mockActivities
  ].slice(0, 5);

  if (loading) {
    return <div className="text-center mt-20 text-xl font-bold text-slate-600">Loading Dashboard...</div>;
  }

  return (
    <div className="flex-grow max-w-7xl mx-auto px-4 py-12 relative">
      {/* Background Image Layer */}
      <div 
        className="fixed inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url(${dashboardBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      
      <div className="relative z-10">
      {/* Welcome Header */}
      <div className="mb-12">
        <h2 className="text-4xl font-black text-slate-900 leading-tight">
          Welcome back, <span className="text-indigo-600">{user?.name || 'Explorer'}!</span> 👋
        </h2>
        <p className="text-slate-500 mt-2 text-lg font-medium">You're doing great! Here's your performance snapshot.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 ${stat.color}`}>
              {stat.icon}
            </div>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Skill Progress */}
          <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-8">Skill Growth</h3>
            <div className="space-y-6">
              {skills.map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-slate-700">{skill.name}</span>
                    <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">{skill.level}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-600 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold">Recent Activity</h3>
              <button className="text-xs font-bold text-indigo-600 hover:underline">View All</button>
            </div>
            <div className="space-y-6">
              {activities.map((act) => (
                <div key={act.id} className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                    act.type === 'applied' ? 'bg-blue-50 text-blue-600' :
                    act.type === 'completed' ? 'bg-emerald-50 text-emerald-600' :
                    'bg-purple-50 text-purple-600'
                  }`}>
                    {act.type === 'applied' ? '📝' : act.type === 'completed' ? '✅' : '🏆'}
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-bold text-slate-900">
                      {act.type === 'applied' ? 'Applied for ' : act.type === 'completed' ? 'Completed ' : 'Achievement: '}
                      <span className="text-indigo-600">{act.task}</span>
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium uppercase mt-0.5">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Level Up Progress */}
          <div className="bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-100">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">Next Milestone</h3>
              <p className="text-indigo-100 text-sm mb-8">Complete 3 more tasks to reach Level 5!</p>
              
              <div className="flex justify-center mb-8">
                <div className="w-32 h-32 rounded-full border-8 border-indigo-500 flex items-center justify-center text-4xl font-black relative">
                  <div className="absolute inset-0 border-8 border-white rounded-full border-t-transparent -rotate-45"></div>
                  Lvl 4
                </div>
              </div>

              <button className="w-full bg-white text-indigo-600 font-bold py-4 rounded-2xl hover:bg-indigo-50 transition-colors shadow-lg shadow-indigo-900/20">
                Claim Daily Reward
              </button>
            </div>
            
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-400 rounded-full blur-3xl opacity-30"></div>
          </div>

          {/* Badges Showcase */}
          <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-8">Badges</h3>
            <div className="grid grid-cols-2 gap-4">
              {badges.map((badge) => (
                <div key={badge.id} className="text-center p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-indigo-50 hover:border-indigo-100 transition-all">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{badge.icon}</div>
                  <p className="text-[10px] font-black text-slate-900 uppercase tracking-tighter">{badge.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default StudentDashboard;

