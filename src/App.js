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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
