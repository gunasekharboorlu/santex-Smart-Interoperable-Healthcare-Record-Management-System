import { useAuth } from '../contexts/AuthContext';
import { LogOut, Activity, Users, Building, ShieldPlus, FileText, Bell } from 'lucide-react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';

const MainLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getNavLinks = () => {
    if (!user) return [];
    switch (user.role) {
      case 'gov_admin':
        return [
          { name: 'Dashboard', path: '/government/dashboard', icon: <Activity size={20} /> },
          { name: 'Hospitals', path: '/government/hospitals', icon: <Building size={20} /> },
          { name: 'Users', path: '/government/users', icon: <Users size={20} /> },
        ];
      case 'hospital_admin':
        return [
          { name: 'Dashboard', path: '/hospital/dashboard', icon: <Activity size={20} /> },
          { name: 'Doctors', path: '/hospital/doctors', icon: <ShieldPlus size={20} /> },
          { name: 'Patients', path: '/hospital/patients', icon: <Users size={20} /> },
          { name: 'Appointments', path: '/hospital/appointments', icon: <Bell size={20} /> },
        ];
      case 'doctor':
        return [
          { name: 'Dashboard', path: '/doctor/dashboard', icon: <Activity size={20} /> },
          { name: 'My Patients', path: '/doctor/patients', icon: <Users size={20} /> },
          { name: 'Access Requests', path: '/doctor/requests', icon: <Bell size={20} /> },
          { name: 'Reports', path: '/doctor/reports', icon: <FileText size={20} /> },
        ];
      case 'patient':
        return [
          { name: 'Dashboard', path: '/patient/dashboard', icon: <Activity size={20} /> },
          { name: 'My Reports', path: '/patient/reports', icon: <FileText size={20} /> },
          { name: 'Access Requests', path: '/patient/requests', icon: <Bell size={20} /> },
          { name: 'Profile', path: '/patient/profile', icon: <Users size={20} /> },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 flex items-center space-x-3">
          <Activity className="text-cyan-400" size={28} />
          <span className="text-2xl font-bold tracking-tight text-white">SANTEX</span>
        </div>
        
        <div className="px-6 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {user?.role.replace('_', ' ')} Portal
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {getNavLinks().map((link) => {
            const isActive = location.pathname.includes(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 glass z-10 flex items-center justify-between px-8">
          <h2 className="text-lg font-semibold text-slate-800">Overview</h2>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-500 hover:text-cyan-600 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold">
                {user?.name.charAt(0)}
              </div>
              <span className="text-sm font-medium text-slate-700">{user?.name}</span>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
