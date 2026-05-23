import { ShieldPlus, Users, Activity } from 'lucide-react';

const HospitalDashboard = () => {

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Hospital Administration Portal</h1>
        <p className="text-slate-500">Manage doctors and monitor patient activities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 flex items-center space-x-4">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
            <ShieldPlus size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Registered Doctors</p>
            <p className="text-2xl font-bold text-slate-900">124</p>
          </div>
        </div>

        <div className="glass-card p-6 flex items-center space-x-4">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Patients</p>
            <p className="text-2xl font-bold text-slate-900">8,450</p>
          </div>
        </div>

        <div className="glass-card p-6 flex items-center space-x-4">
          <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Access Requests</p>
            <p className="text-2xl font-bold text-slate-900">32</p>
          </div>
        </div>
      </div>

      <div className="glass-card mt-8 p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Doctor Verification System</h3>
        <p className="text-sm text-slate-600 mb-4">You have 3 pending doctor approvals. Verify their credentials before granting system access.</p>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-4 py-3 text-sm font-semibold text-slate-600">Name</th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-600">Specialization</th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-600">License No</th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { name: 'Dr. Sarah Jenkins', spec: 'Cardiology', license: 'MD-48593' },
                { name: 'Dr. Robert Chen', spec: 'Neurology', license: 'MD-92841' },
              ].map((doc, i) => (
                <tr key={i} className="hover:bg-slate-50/50">
                  <td className="px-4 py-3 text-sm text-slate-900 font-medium">{doc.name}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{doc.spec}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{doc.license}</td>
                  <td className="px-4 py-3 text-sm">
                    <button className="text-emerald-600 hover:text-emerald-700 font-medium mr-3">Approve</button>
                    <button className="text-red-600 hover:text-red-700 font-medium">Reject</button>
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

export default HospitalDashboard;
