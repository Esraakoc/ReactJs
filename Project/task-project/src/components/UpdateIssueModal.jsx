import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { updateIssue } from '../Api'; 
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import "../style/issues.css"; 
import { Alert } from '@material-ui/lab';
import { Snackbar } from '@material-ui/core';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)', 
  },
};

function UpdateIssueModal({ isOpen, onRequestClose, issue }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const [formData, setFormData] = useState({
    taskName: '',
    description: '',
    timestamp: '',
  });

  useEffect(() => {
    if (issue) {
      setFormData({
        taskName: issue.taskName || '',
        description: issue.description || '',
        timestamp: issue.timestamp || '',
      });
    }
  }, [issue]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
 
  const handleSubmit = async () => {
    try { 
      const issueData = {
        description: formData.description,
        taskName: formData.taskName,
        timestamp: parseFloat(formData.timestamp),
      };
      await updateIssue(issue.taskId, issueData);
      showSnackbar(' updated successfully!', 'success'); 
      setSnackbarSeverity("success");
      setTimeout(() => {
        onRequestClose(issueData);
        setSnackbarOpen(false);
      }, 5000); 
    } catch  (error) {
      if (error.response && error.response.status === 400) {
        showSnackbar(error.response.data, 'error');
        setSnackbarSeverity("error");
      } else {
        showSnackbar("There was an error updating the issue. Please try again.");
        setSnackbarSeverity("error");
      }
    }
  };
  const handleClose = () => {
    setSnackbarOpen(false);
    onRequestClose();

  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true); 
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Update Issue"
    >
       <span   onClick={handleClose}  className='closeBtn'> <HighlightOffIcon/> </span>
      <h2>Update Issue</h2>
      <form noValidate autoComplete="off">
        <TextField
          label="Task Name"
          name="taskName"
          value={formData.taskName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Timestamp"
          name="timestamp"
          value={formData.timestamp}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <div style={{ marginTop: '20px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Save Changes
          </Button>
        </div>
      </form>
      <Snackbar 
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Modal>
  );
}

export default UpdateIssueModal;
