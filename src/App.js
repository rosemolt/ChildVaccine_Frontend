import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import ParentRegistration from './components/ParentRegistration';
import AdminDashboard from './components/AdminDashboard';
import ParentDashboard from './components/ParentDashboard';
import ParentHome from './components/ParentHome';
import ParentSidebar from './components/ParentSidebar';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<ParentRegistration/>} />
          <Route path="/admindashboard" element={<AdminDashboard/>} />
          <Route path="/parentdashboard" element={<ParentDashboard/>} />
          <Route path="/parenthome" element={<ParentHome/>} />
          <Route path="/parentsidebar" element={<ParentSidebar/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;