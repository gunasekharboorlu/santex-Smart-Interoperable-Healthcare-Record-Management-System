import { useState } from 'react';
import { Search, Lock, FileText, Bell } from 'lucide-react';

const DoctorDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Doctor Portal</h1>
        <p className="text-slate-500">Search patients and request access to medical records.</p>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Patient Search</h3>
        <div className="flex space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by Patient ID, Name, or Phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
            />
          </div>
          <button className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-cyan-600/20">
            Search
          </button>
        </div>

        {/* Dummy Search Results */}
        {searchQuery.length > 2 && (
          <div className="mt-6 border border-slate-200 rounded-xl overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-slate-900">John Doe</h4>
                <p className="text-sm text-slate-500">ID: PT-847291 • Blood Group: O+</p>
              </div>
              <button className="px-4 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-medium rounded-lg transition-colors text-sm">
                View History
              </button>
            </div>
            <div className="p-4 bg-white">
              <h5 className="text-sm font-semibold text-slate-700 mb-3">Available Reports</h5>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-slate-100 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="text-slate-400 h-5 w-5" />
                    <div>
                      <p className="text-sm font-medium text-slate-800">Complete Blood Count</p>
                      <p className="text-xs text-slate-500">Non-sensitive • Uploaded 2 days ago</p>
                    </div>
                  </div>
                  <button className="text-cyan-600 hover:text-cyan-700 text-sm font-medium">View</button>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-slate-100 rounded-lg bg-red-50/30">
                  <div className="flex items-center space-x-3">
                    <Lock className="text-red-400 h-5 w-5" />
                    <div>
                      <p className="text-sm font-medium text-slate-800">MRI Scan Results</p>
                      <p className="text-xs text-slate-500">Sensitive • Uploaded 1 week ago</p>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 bg-red-100 text-red-700 hover:bg-red-200 text-sm font-medium rounded-md transition-colors">
                    Request Access
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-800">Active Access Requests</h3>
            <Bell className="text-slate-400 h-5 w-5" />
          </div>
          <div className="space-y-3">
            {[
              { patient: 'Alice Smith', report: 'Psychiatric Eval', status: 'Pending' },
              { patient: 'Bob Johnson', report: 'Oncology Report', status: 'Approved' },
            ].map((req, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded-lg flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-slate-800">{req.patient}</p>
                  <p className="text-xs text-slate-500">{req.report}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-md ${
                  req.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {req.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Patients</h3>
          <div className="space-y-3">
            {['Jane Williams', 'Michael Brown', 'Emma Davis'].map((name, i) => (
              <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-xs font-bold">
                    {name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-slate-700">{name}</span>
                </div>
                <span className="text-xs text-slate-400">View</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
