import React, { useState, useEffect } from 'react';
import "../style/navbar.css";
import gv_icon from "../images/gv-icon.png";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import { useUser } from "../UserContext";
import Notification from './Notification'; 
import ProfileNotf from './ProfileNotf';
import Badge from '@material-ui/core/Badge';
import { updateTaskNotification, GetTaskLog } from '../Api';

function Navbar() {
  const { user } = useUser();
  const [openNotification, setOpenNotification] = useState(false);
  const [openProfileNotification, setOpenProfileNotification] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [newNotification, setNewNotification] = useState([]);
  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        const response = await GetTaskLog();
        const notificationTasks = response.filter(task => task.notification === 0 && task.userId === user.userId);
        setNotificationCount(notificationTasks.length);
        setNewNotification(notificationTasks);
      } catch (error) {
        console.error('Failed to fetch notification count', error);
      }
    };
 
    fetchNotificationCount();
  }, [openNotification,user.userId]);

  const handleNotificationClick = async () => {
    setOpenNotification(!openNotification);
    if (!openNotification) {
      try { 
        const response = await GetTaskLog();
        const notificationTasks = response.filter(task => task.notification === 0 && task.userId === user.userId);
        notificationTasks.forEach(task => {
          updateTaskNotification(task.id, 1);
        });
        setNotificationCount(notificationTasks.length);
      } catch (error) {
        console.error('Failed to update notifications', error);
      } 
    }
  };

  const handleProfileNotificationClick = () => {
    setOpenProfileNotification(!openProfileNotification);
  };

  return (
    <div className="navbarDiv">
      <img src={gv_icon} alt="GV Icon" className="gvIcon" />
      <div className="np-icons"> 
        <Badge color="secondary" badgeContent={notificationCount}   overlap="rectangular" showZero>
          <NotificationsNoneIcon className="notification-icon" onClick={handleNotificationClick} />
        </Badge>
        <div  className='profilIcon' onClick={handleProfileNotificationClick}  >
          <PermIdentityIcon />
          <span className="profil-icon">{user.userId}</span>
        </div> 
      </div>
      <Notification 
        open={openNotification}  
        userId={user.userId} 
        newNotification={newNotification}
      />
      <ProfileNotf 
        open={openProfileNotification} 
      />
    </div>
  );
}

export default Navbar;
