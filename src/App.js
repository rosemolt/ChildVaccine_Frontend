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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
