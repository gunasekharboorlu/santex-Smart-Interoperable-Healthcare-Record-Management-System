import { useAuth } from '../../contexts/AuthContext';
import { Building, Users, Activity, FileText } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', hospitals: 4, users: 400 },
  { name: 'Feb', hospitals: 6, users: 800 },
  { name: 'Mar', hospitals: 8, users: 1200 },
  { name: 'Apr', hospitals: 15, users: 2400 },
  { name: 'May', hospitals: 23, users: 3800 },
  { name: 'Jun', hospitals: 34, users: 5600 },
];

const GovernmentDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Government Administration Portal</h1>
        <p className="text-slate-500">Welcome back, {user?.name}. Here is the system overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 flex items-center space-x-4">
          <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600">
            <Building size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Hospitals</p>
            <p className="text-2xl font-bold text-slate-900">34</p>
          </div>
        </div>

        <div className="glass-card p-6 flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Active Users</p>
            <p className="text-2xl font-bold text-slate-900">5,600</p>
          </div>
        </div>

        <div className="glass-card p-6 flex items-center space-x-4">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Interoperable Requests</p>
            <p className="text-2xl font-bold text-slate-900">1,245</p>
          </div>
        </div>

        <div className="glass-card p-6 flex items-center space-x-4">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Reports</p>
            <p className="text-2xl font-bold text-slate-900">12.4k</p>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="glass-card p-6 mt-8">
        <h3 className="text-lg font-bold text-slate-800 mb-6">System Growth</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Area type="monotone" dataKey="users" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Hospitals Table */}
      <div className="glass-card overflow-hidden mt-8">
        <div className="px-6 py-5 border-b border-slate-200 bg-white/50">
          <h3 className="text-lg font-bold text-slate-800">Recently Registered Hospitals</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Hospital Name</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Location</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Doctors</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { name: 'Metro General Hospital', loc: 'New York', docs: 124, status: 'Active' },
                { name: 'City Care Clinic', loc: 'Chicago', docs: 45, status: 'Active' },
                { name: 'Westside Medical', loc: 'San Francisco', docs: 89, status: 'Pending Review' },
              ].map((hospital, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-900 font-medium">{hospital.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{hospital.loc}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{hospital.docs}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      hospital.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {hospital.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GovernmentDashboard;
