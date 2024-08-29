import React from 'react';
import "../style/profileNotf.css";
import { useUser } from "../UserContext";
import { useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const ProfileNotf = ({ open }) => {
  const navigate = useNavigate();
  const { logout } = useUser(); 
  const handleLogout = () => {
    logout(); 
    navigate('/login');
  }; 
 
  if (!open) return null;
  return (
    <div className="profileNContainer">
        <button onClick={handleLogout} className="logout-button">
         <ExitToAppIcon className='logoutIcon'/><span>Log Out</span> 
        </button> 
    </div>
  );
};

export default ProfileNotf;
