import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import Login from './components/Login';
import ParentRegistration from './components/ParentRegistration';
import AdminDashboard from './components/AdminDashboard';
import ParentDashboard from './components/ParentDashboard';
import ParentHome from './components/ParentHome';
import AddChild from './components/AddChild';
import ViewChildren from './components/ViewChildren';
import DoctorDashboard from './components/DoctorDashboard';
import AddSupplement from './components/AddSupplement';
import AdminSupplement from './components/AdminSupplement';
import ParentProfile from './components/ParentProfile';
import ScheduleForm from './components/ScheduleForm';
import ParentSchedules from './components/ParentSchedules';
import ParentBookings from './components/ParentBookings';
import BookedParents from './components/BookedParents';
import DoctorBookings from './components/DoctorBookings';
import PendingSupplements from './components/PendingSupplements';
import AdminUpcomingSchedules from './components/AdminUpcomingSchedules';
import AshaWorkerRegistration from './components/AshaWorkerRegistration';
import ApproveAshaWorkers from './components/ApproveAshaWorkers';
import AshaWorkerProfile from './components/AshaWorkerProfile';
import AshaWorkerDashboard from './components/AshaWorkerDashboard';
import AshaEligibleChildren from './components/AshaEligibleChildren';
import CaregiverRegistration from './components/CareGiverRegistration';
import CareGiverDashboard from './components/CareGiverDashboard';
import VaccineInfo from './components/VaccineInfo';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<ParentRegistration />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/parentdashboard" element={<ParentDashboard />} />
        <Route path="/parenthome" element={<ParentHome />} />
        <Route path="/add-child" element={<AddChild />} />
        <Route path="/view-child" element={<ViewChildren />} />
        <Route path="/doctordashboard" element={<DoctorDashboard />} />
        <Route path="/addsupplement" element={<AddSupplement />} />
        <Route path="/adminsupplement" element={<AdminSupplement />} />
        <Route path="/profile" element={<ParentProfile />} />
        <Route path="/schedule" element={<ScheduleForm />} />
        <Route path="/booking" element={<ParentSchedules />} />
        <Route path="/view-booking" element={<ParentBookings />} />
        <Route path="/bookedParents" element={<BookedParents />} />
        <Route path="/bookedchild" element={<DoctorBookings />} />
        <Route path="/pendingchild" element={<PendingSupplements />} />
        <Route path="/upcomingschedules" element={<AdminUpcomingSchedules />} />
        <Route path="/register-asha" element={<AshaWorkerRegistration />} />
        <Route path="/ashadashboard" element={<AshaWorkerDashboard />} />
        <Route path="/approveasha" element={<ApproveAshaWorkers />} />
        <Route path="/ashaprofile" element={<AshaWorkerProfile />} />
        <Route path="/asha-eligible-children" element={<AshaEligibleChildren />} />
        <Route path="/reg-caregiver" element={<CaregiverRegistration />} />
        <Route path="/caregiverdashboard" element={<CareGiverDashboard />} />
        <Route path="/info" element={<VaccineInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
