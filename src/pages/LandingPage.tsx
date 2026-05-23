import { useNavigate } from 'react-router-dom';
import { Activity, Shield, Users, Database, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="glass fixed w-full z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="h-8 w-8 text-cyan-500" />
            <span className="text-2xl font-bold text-slate-900 tracking-tight">SANTEX</span>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/login')}
              className="text-slate-600 hover:text-slate-900 font-medium px-4 py-2"
            >
              Log in
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-lg shadow-cyan-500/30"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <div className="absolute top-0 right-0 -z-10 w-full h-full bg-gradient-to-br from-cyan-50/50 to-blue-50/50 rounded-full blur-3xl opacity-70 translate-x-1/3 -translate-y-1/4"></div>
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 tracking-tight mb-8 leading-tight">
            Smart Interoperable <br className="hidden lg:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
              Healthcare Record
            </span> Management
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            A centralized, secure, and modern platform connecting governments, hospitals, doctors, and patients through permission-based medical data sharing.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button 
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold text-lg transition-all shadow-xl shadow-slate-900/20 flex items-center justify-center space-x-2"
            >
              <span>Access Portals</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6 text-cyan-600">
                <Shield className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Secure & Private</h3>
              <p className="text-slate-600 leading-relaxed">
                Role-based access control and strict permission systems ensure that sensitive medical reports are only accessible upon patient approval.
              </p>
            </div>
            
            <div className="glass-card p-8 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                <Database className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Centralized Data</h3>
              <p className="text-slate-600 leading-relaxed">
                Break down data silos. Hospitals and clinics can seamlessly share diagnostic reports and prescriptions through our interoperable infrastructure.
              </p>
            </div>

            <div className="glass-card p-8 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 text-indigo-600">
                <Users className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Unified Portals</h3>
              <p className="text-slate-600 leading-relaxed">
                Dedicated interfaces for Government Admin, Hospitals, Doctors, and Patients, providing everyone with exactly the tools they need.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
