import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import "./App.css";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Sidebar from './components/Sidebar';
import WorkFlow_Board from './components/WorkFlow_Board';
import CreateIssue from './components/CreateIssue';
import Issues from './components/Issues';
import Login from './components/Login';
import UserLogin from './components/UserLogin';
import AdminLogin from './components/AdminLogin';
import Register from './components/Register';
import PasswordResetRequest from "./components/PasswordResetRequest";
import PasswordReset from "./components/PasswordReset";
import IssueModal from './components/IssueModal';
import Error from './components/Error';
import UpdateIssueModal from './components/UpdateIssueModal';
import { useUser } from "./UserContext";
import { useState, useEffect } from 'react';
import { GetUserRole } from "./Api";
import { useNavigate } from 'react-router-dom';
import LogTracing from './components/LogTracing';

function App() {
  const navigate = useNavigate();
  const location = useLocation();  
  const { user } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 

  const checkUserRole = async () => {
    setIsLoading(true);  
    setIsAdmin(false);  
    if (user && user.userId) {
      try {
        const roles = await GetUserRole();
        const userRole = roles.find((role) => role.userId === user.userId);
        console.log("role:", userRole);
        if (userRole?.roleName === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        navigate("*");
      }
    }
    setIsLoading(false);  
  };

  useEffect(() => {
    checkUserRole();
  }, [user]);

  const isExcludedRoute = (pathname) => {
    const excludedPaths = ['/login', '/login-user', '/login-admin', '/register', '/password-reset-request'];
    const isPasswordReset = pathname.startsWith('/password-reset/');
    return excludedPaths.includes(pathname) || isPasswordReset;
  };

  const isLoginRoute = isExcludedRoute(location.pathname);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="app-container">
      {!isLoginRoute && <Navbar />} 
      <div className="main-content">
        {!isLoginRoute && <Sidebar />}
        <div className="content">     
          <Routes>
            <Route path="/" element={isAdmin ? <Navigate to="*" /> : <Home />} />
            <Route path="/workflow-board" element={isAdmin ? <Navigate to="*" /> : <WorkFlow_Board />} />
            <Route path="/create_issue" element={<CreateIssue />} />
            <Route path="/issues" element={<Issues />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login-user" element={<UserLogin />} />
            <Route path="/login-admin" element={<AdminLogin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/password-reset-request" element={<PasswordResetRequest />} />
            <Route path="/password-reset/:token" element={<PasswordReset />} />
            <Route path="/issue-modal" element={<IssueModal />} />
            <Route path="*" element={<Error />} />
            <Route path="/update-issue-modal" element={<UpdateIssueModal />} />
            <Route path='/log-tracing' element={<LogTracing/>}/>
          </Routes>
        </div>
      </div>
    </div>
  ); 
}

export default App;
