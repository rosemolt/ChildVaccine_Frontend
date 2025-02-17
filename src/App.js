import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import Login from './components/Login';
import ParentRegistration from './components/ParentRegistration';
import AdminDashboard from './components/AdminDashboard';
import ParentDashboard from './components/ParentDashboard';
import ParentHome from './components/ParentHome';
import ParentSidebar from './components/ParentSidebar';
import AddChild from './components/AddChild';
import ViewChildren from './components/ViewChildren';

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
          <Route path="/add-child" element={<AddChild/>} />
          <Route path="/view-child" element={<ViewChildren/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;