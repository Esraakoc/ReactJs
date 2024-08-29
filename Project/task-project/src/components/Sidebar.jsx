import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/sidebar.css";
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ListAltIcon from '@material-ui/icons/ListAlt'; 
import AddBoxIcon from '@material-ui/icons/AddBox';
import DehazeIcon from '@material-ui/icons/Dehaze';
import { useUser } from "../UserContext";
import { GetUserRole } from "../Api";

function SideBar() {  
  const [sidebarSee, setSidebarSee] = useState(false); 
  const { user } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkUserRole = async () => {
      if (user && user.userId) {
        try {
          const roles = await GetUserRole();
          const userRole = roles.find((role) => role.userId === user.userId);
          if (userRole?.roleName === "admin") {
            setIsAdmin(true);
          }
        } catch (error) {
          console.error("Failed to fetch user role:", error);
        }
      }
    };

    checkUserRole();
  }, [user]);
 
  const handleClick = () => {
    setSidebarSee(!sidebarSee);
  };  
 
  return ( 
    <div className={`sidebarDiv ${sidebarSee ? 'open' : 'closed'}`}>
      <button variant="contained" className="show-btn" onClick={handleClick}>
        <DehazeIcon className="show-btn-icon" /> 
      </button>
      <nav className="navbarSide"> 
        {isAdmin ? (
          <>
            <Link to="/create_issue" className="link">
              <AddBoxIcon className="icons" /> <span className="line-text">Create Issue</span> 
            </Link>
            <Link to="/issues" className="link">
              <ListAltIcon className="icons" /> <span className="line-text">Issues</span>
            </Link>
          </>
        ) : (
          <>
            <Link to="/" className="link">
              <HomeIcon className="icons" /> <span className="line-text">Home</span> 
            </Link>
            <Link to="/workflow-board" className="link">
              <DashboardIcon className="icons" /><span className="line-text">WorkFlow Board</span>
            </Link>
            <Link to="/issues" className="link">
              <ListAltIcon className="icons" /> <span className="line-text">Issues</span>
            </Link>
            <Link to="/create_issue" className="link">
              <AddBoxIcon className="icons" /> <span className="line-text">Create Issue</span> 
            </Link>
          </>
        )}
      </nav>
    </div>
  );
}

export default SideBar;
