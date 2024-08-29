import React, { useState } from 'react';
import { requestPasswordReset } from '../Api';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import '../style/resetpassword.css'; 

const PasswordResetRequest = () => {

    const [email, setEmail] = useState(''); 
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); 

    const handleSubmit = async (e) => { 
        e.preventDefault(); 
        try {
            await requestPasswordReset(email);
            setSnackbarMessage('A password reset link has been sent to your email.');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
        } catch (error) {
            if (error.response && error.response.data) {
                setSnackbarMessage(error.response.data); 
            } else {
                setSnackbarMessage('Failed to send password reset link.');
            }
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };
    
    const handleCloseSnackbar = () => {  
        setOpenSnackbar(false);
      };
    return (
        <div className="passwordDiv">
            <div className='passwordCard'>
                <h2>Request Password Reset</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                    <button type="submit">Send Reset Link</button>
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

export default PasswordResetRequest;
