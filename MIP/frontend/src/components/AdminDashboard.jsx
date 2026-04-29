import React, { useState, useEffect } from 'react';
import { mockTasks, mockUsers } from '../data/mockData';
import adminBg from '../assets/admin-bg.png';


function AdminDashboard() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tasksRes, usersRes, appsRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/api/tasks`),
          fetch(`${import.meta.env.VITE_API_URL}/api/admin/users`),
          fetch(`${import.meta.env.VITE_API_URL}/api/admin/applications`)
        ]);
        
        const tasksData = await tasksRes.json();
        const usersData = await usersRes.json();
        const appsData = await appsRes.json();

        // Merge server data with mock data
        const mockTasksWithIds = mockTasks.map(t => ({ ...t, id: `m-${t.id}` }));
        const mockUsersWithIds = mockUsers.map(u => ({ ...u, id: `u-${u.id}` }));

        const mergedTasks = Array.isArray(tasksData) ? [...tasksData, ...mockTasksWithIds.filter(mt => !tasksData.find(st => st.title === mt.title))] : mockTasksWithIds;
        const mergedUsers = Array.isArray(usersData) ? [...usersData, ...mockUsersWithIds.filter(mu => !usersData.find(su => su.email === mu.email))] : mockUsersWithIds;

        setTasks(mergedTasks);
        setUsers(mergedUsers);
        setApplications(appsData || []);
      } catch (err) {
        console.error("Error fetching admin data, using mock fallbacks:", err);
        setTasks(mockTasks);
        setUsers(mockUsers);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${taskId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setTasks(tasks.filter(t => t.id !== taskId));
      }
    } catch (error) {
      console.error("Delete task error:", error);
      alert("Failed to delete task");
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-96 text-indigo-600 font-bold">Loading Admin Panel...</div>;
  }

  const stats = [
    { label: 'Total Tasks', value: tasks.length, icon: '📋', color: 'bg-indigo-50 text-indigo-600' },
    { label: 'Total Students', value: users.filter(u => u.role === 'Student').length, icon: '🎓', color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Total Companies', value: users.filter(u => u.role === 'Company').length, icon: '🏢', color: 'bg-purple-50 text-purple-600' },
  ];

  return (
    <div className="flex-grow max-w-7xl mx-auto px-4 py-12 relative">
      {/* Background Image Layer */}
      <div 
        className="fixed inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url(${adminBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      
      <div className="relative z-10">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-8">Admin Dashboard</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-slate-500 font-bold text-sm uppercase tracking-wider">{stat.label}</p>
              <p className="text-3xl font-black text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Task Management */}
        <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-xl font-bold">Task Management</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase">Title</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase">Company</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tasks.map(task => (
                  <tr key={task.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-4 font-bold text-slate-900">{task.title}</td>
                    <td className="px-8 py-4 text-slate-600">{task.company}</td>
                    <td className="px-8 py-4">
                      <button 
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-red-500 hover:text-red-700 font-bold text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Management */}
        <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-100">
            <h3 className="text-xl font-bold">User Management</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase">Name</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase">Role</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-4 font-bold text-slate-900">{user.name}</td>
                    <td className="px-8 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        user.role === 'Admin' ? 'bg-indigo-100 text-indigo-700' : 
                        user.role === 'Company' ? 'bg-purple-100 text-purple-700' : 
                        'bg-emerald-100 text-emerald-700'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-slate-500 text-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Application Management */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden mt-8">
          <div className="px-8 py-6 border-b border-slate-100">
            <h3 className="text-xl font-bold">Recent Applications</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase">Applicant</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase">Task</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase">College</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase">Applied On</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-8 py-12 text-center text-slate-400 font-medium italic">No applications found in the database.</td>
                  </tr>
                ) : (
                  applications.map(app => (
                    <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-8 py-4 font-bold text-slate-900">{app.applicantName || app.fullName}</td>
                      <td className="px-8 py-4 text-indigo-600 font-medium">{app.taskTitle}</td>
                      <td className="px-8 py-4 text-slate-600">{app.collegeName}</td>
                      <td className="px-8 py-4 text-slate-500 text-sm">{new Date(app.appliedAt).toLocaleDateString()}</td>
                      <td className="px-8 py-4">
                        <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-wider">
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
