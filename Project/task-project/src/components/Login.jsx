import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button} from '@material-ui/core';
import '../style/login.css'; 
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleAdminClick =()=>{
    navigate("/login-admin");
  };
  const handleUserClick =()=>{
    navigate("/login-user");
  }; 

  return (
    <div className="loginDiv">
      <div className="login-form-div">
        <h2>Welcome to the Login Page</h2>
          <Button
            className="login-form-btn"
            variant="contained" 
            color="primary"
            onClick={handleAdminClick}
          >
           Admin
          </Button>       
          <Button
            className="login-form-btn"
            variant="contained" 
            color="primary"
            onClick={handleUserClick}
          >
           User
          </Button>       
          <Link to="/register" className='registerLink' >
              <span className="line-text">Click here to register!</span> 
          </Link>
      </div>     
    </div>
  );
}

export default Login;
