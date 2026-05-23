import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import MainLayout from './layouts/MainLayout';

// Public Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';

// Government Pages
import GovDashboard from './pages/government/Dashboard';
import GovHospitals from './pages/government/Hospitals';
import GovUsers from './pages/government/Users';

// Hospital Pages
import HospitalDashboard from './pages/hospital/Dashboard';
import HospitalDoctors from './pages/hospital/Doctors';
import HospitalPatients from './pages/hospital/Patients';
import HospitalAppointments from './pages/hospital/Appointments';

// Doctor Pages
import DoctorDashboard from './pages/doctor/Dashboard';
import DoctorPatients from './pages/doctor/Patients';
import DoctorRequests from './pages/doctor/Requests';
import DoctorReports from './pages/doctor/Reports';

// Patient Pages
import PatientDashboard from './pages/patient/Dashboard';
import PatientReports from './pages/patient/Reports';
import PatientRequests from './pages/patient/Requests';
import PatientProfile from './pages/patient/Profile';

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading session...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    const roleRoutes: Record<string, string> = {
      'gov_admin': '/government/dashboard',
      'hospital_admin': '/hospital/dashboard',
      'doctor': '/doctor/dashboard',
      'patient': '/patient/dashboard'
    };
    return <Navigate to={roleRoutes[user.role] || '/'} replace />;
  }

  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      
      {/* Government Portal */}
      <Route path="/government" element={
        <ProtectedRoute allowedRoles={['gov_admin']}>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<GovDashboard />} />
        <Route path="hospitals" element={<GovHospitals />} />
        <Route path="users" element={<GovUsers />} />
      </Route>

      {/* Hospital Portal */}
      <Route path="/hospital" element={
        <ProtectedRoute allowedRoles={['hospital_admin']}>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<HospitalDashboard />} />
        <Route path="doctors" element={<HospitalDoctors />} />
        <Route path="patients" element={<HospitalPatients />} />
        <Route path="appointments" element={<HospitalAppointments />} />
      </Route>

      {/* Doctor Portal */}
      <Route path="/doctor" element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DoctorDashboard />} />
        <Route path="patients" element={<DoctorPatients />} />
        <Route path="requests" element={<DoctorRequests />} />
        <Route path="reports" element={<DoctorReports />} />
      </Route>

      {/* Patient Portal */}
      <Route path="/patient" element={
        <ProtectedRoute allowedRoles={['patient']}>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<PatientDashboard />} />
        <Route path="reports" element={<PatientReports />} />
        <Route path="requests" element={<PatientRequests />} />
        <Route path="profile" element={<PatientProfile />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
