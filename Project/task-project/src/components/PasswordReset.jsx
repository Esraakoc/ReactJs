import React, { useState } from 'react';
import { resetPassword } from '../Api';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import '../style/resetpassword.css';
import {useNavigate} from "react-router-dom";

const PasswordReset = () => {
    const [resetEmail,setResetEmail ] = useState(''); 
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); 

    const navigate= useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await resetPassword({ email: resetEmail, newPassword:password , confirmPassword });
             setSnackbarMessage('Password has been updated successfully.');
                setSnackbarSeverity('success');//yeşil
                setOpenSnackbar(true);
            setTimeout(()=>{
               
                navigate("/login");
            },5000);
            
            
        } catch (error) {
            if (error.response && error.response.data) {
                setSnackbarMessage(error.response.data); 
            } else {
                setSnackbarMessage('An error occurred while updating the password.');
            }
            setSnackbarSeverity('error'); // kırmızı
            setOpenSnackbar(true);
        }
    };
    const handleCloseSnackbar = () => {  
        setOpenSnackbar(false);
    };
    return (
    <div className="passwordDiv">
        <div className='passwordCard'>
            <h2>Update your password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="your email address"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="new password"
                    required
                />
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your new password"
                    required
                />
                <button type="submit">Update password</button>
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
};

export default PasswordReset;
