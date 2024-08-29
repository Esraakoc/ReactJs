import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { login, GetUserRole } from '../Api';
import { useUser } from '../UserContext';
import '../style/login.css';
import { Button, TextField, Typography } from '@material-ui/core';

function UserLogin() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [userRole, setUserRole] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login: setUser } = useUser();
 
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await GetUserRole();
        setUserRole(data);
      } catch (err) {
        setSnackbarMessage("Error fetching user roles: " + err.message);
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    };
    fetchRoles();
  }, []);

  const handleCloseSnackbar = () => { 
    setOpenSnackbar(false);
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    
    try { 
      const user = userRole.find(role => role.userId === userId);
      
      if (user && user.roleName === 'admin') {
        setSnackbarMessage("This user is not authorized.");
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      } else {
        const userInfo ={userId, password};
        const response = await dispatch(login(userInfo));
        setUser(response);
        navigate("/");
      }
    } catch (error) {
      setSnackbarMessage("Login failed: " + error.message);
      setSnackbarSeverity('error');
      setOpenSnackbar(true); 
    }
  };

  return (
    <div className="loginDiv">
      <div className="login-form-div">
        <form className="login-form" onSubmit={handleSubmit}>
          <Typography variant="h5">User Login</Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="UserName"
            name="userName"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to="/password-reset-request">I forgot my password</Link>
          <Button
            type="submit"
            className="login-form-btn"
            variant="contained"
            color="primary"
          >
            Sign in
          </Button> 
        </form>
      </div> 

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default UserLogin;
