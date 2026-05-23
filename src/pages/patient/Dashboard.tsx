import { useState } from 'react';
import { Upload, Lock, Unlock, CheckCircle, XCircle } from 'lucide-react';

const PatientDashboard = () => {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className="space-y-6">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Patient Portal</h1>
          <p className="text-slate-500">Manage your medical records and control who has access.</p>
        </div>
        <button 
          onClick={() => setIsUploading(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-colors shadow-lg shadow-cyan-600/20"
        >
          <Upload size={18} />
          <span>Upload Report</span>
        </button>
      </div>

      {isUploading && (
        <div className="glass-card p-6 border-dashed border-2 border-cyan-300 bg-cyan-50/30">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Upload Medical Report</h3>
          <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-white/50 hover:bg-white/80 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-slate-400" />
                    <p className="mb-2 text-sm text-slate-600"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-slate-500">PDF, PNG, JPG (MAX. 10MB)</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
          <div className="mt-4 flex justify-end space-x-3">
            <button onClick={() => setIsUploading(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900">Cancel</button>
            <button className="px-4 py-2 text-sm font-medium bg-cyan-600 text-white rounded-lg hover:bg-cyan-700">Save Report</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Access Requests */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
            <Lock className="mr-2 h-5 w-5 text-amber-500" />
            Pending Access Requests
          </h3>
          <div className="space-y-4">
            {[
              { doc: 'Dr. Sarah Jenkins', hospital: 'Metro General', report: 'MRI Scan Results', date: '2 hours ago' }
            ].map((req, i) => (
              <div key={i} className="p-4 border border-slate-200 rounded-xl bg-white">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-slate-900">{req.doc}</h4>
                    <p className="text-xs text-slate-500">{req.hospital}</p>
                  </div>
                  <span className="text-xs text-slate-400">{req.date}</span>
                </div>
                <p className="text-sm text-slate-700 mb-4">
                  Requested access to <span className="font-medium">"{req.report}"</span>
                </p>
                <div className="flex space-x-2">
                  <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-sm font-medium transition-colors">
                    <CheckCircle size={16} />
                    <span>Approve</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors">
                    <XCircle size={16} />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            ))}
            {/* If empty state */}
            {/* <p className="text-sm text-slate-500 text-center py-4">No pending requests.</p> */}
          </div>
        </div>

        {/* My Reports */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">My Reports</h3>
          <div className="space-y-3">
            {[
              { title: 'Blood Test Results', type: 'Non-sensitive', date: 'May 12, 2026' },
              { title: 'MRI Scan Results', type: 'Sensitive', date: 'Apr 28, 2026' },
              { title: 'Prescription - Allergies', type: 'Non-sensitive', date: 'Jan 15, 2026' },
            ].map((report, i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="flex items-center space-x-3">
                  {report.type === 'Sensitive' ? (
                    <Lock className="text-red-400 h-5 w-5" />
                  ) : (
                    <Unlock className="text-emerald-400 h-5 w-5" />
                  )}
                  <div>
                    <p className="font-medium text-slate-900 text-sm">{report.title}</p>
                    <p className="text-xs text-slate-500">{report.date}</p>
                  </div>
                </div>
                <button className="text-cyan-600 hover:text-cyan-700 text-sm font-medium">View</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
