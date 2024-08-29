import React, { useState } from 'react';
import Modal from 'react-modal';
import { Button, TextField, Grid, FormControl, MenuItem, Select, InputLabel, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import "../style/issues.css";  
import { updateTaskStatus,AddedTaskLog } from '../Api'; 
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useDispatch } from 'react-redux';
Modal.setAppElement('#root');

function IssueModal({ isOpen, onRequestClose, issue, isGrid, changeStatus }) {

  const [status, setStatus] = useState(issue?.status || '');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [newAssignedto, setNewAssignedto] = useState('');
  const [newComment, setNewComment] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const dispatch =useDispatch();

  const handleTaskLogUpdate = async () => { 

    if (issue) {
      
      try { 
        await dispatch(AddedTaskLog(issue.taskId, newAssignedto, newComment));
        console.log("AddedTaskLog")
        await dispatch(updateTaskStatus(issue.taskId, 3,  issue.assignedto));
        console.log("updateTaskStatus")
        showSnackbar('Assignedto updated successfully!', 'success');
        console.log("showSnackbar")
        setNewAssignedto("");
        setNewComment("");
      } catch (error) {
        console.error('Error occurred:', error);

      // Error response kontrolü
      if (error.response && error.response.status === 500) {
        showSnackbar('Task assignment exceeds the allowed limit of 40 hours.', 'error');
      } else if (error.response && error.response.data) {
        showSnackbar(error.response.data || 'An error occurred while updating the task.', 'error');
      } else {
        showSnackbar('An unexpected error occurred.', 'error');
      }
      }
    }
  };
  
  const isCompleted = issue?.status === 'Completed';

  const handleStatusChange = async () => {
  
    const statusMapping = { 
      Continues: 1,
      Completed: 2
    };

    const newStatus = statusMapping[status];
  
    if (issue) {
      try {
        await dispatch(updateTaskStatus(issue.taskId, newStatus, issue.assignedto));
        showSnackbar('Status updated successfully!', 'success');
      } catch (error) {
        showSnackbar('Error updating task status.', 'error');
      }
    }
  };

  const handleClose = () => {
    setSnackbarOpen(false);
    onRequestClose();
    setNewAssignedto(""); 
    setNewComment("");
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
      onRequestClose={handleClose}
      contentLabel="Issue Details"
      className="Modal"
      overlayClassName="Overlay"
    >
    <span onClick={handleClose} className='closeBtn'> <HighlightOffIcon/> </span>
      <h2>Issue Details</h2>
      {issue && (
        <div>
          <p><strong>Task ID:</strong> {issue.taskId}</p>
          <p><strong>Task Name:</strong> {issue.taskName}</p>
          <p><strong>Description:</strong> {issue.description}</p>
          <p><strong>Created By:</strong> {issue.createdby}</p>
          <p><strong>Watcher:</strong> {issue.watcher}</p>
          <p><strong>Assigned To:</strong> {issue.assignedto}</p>
          <p><strong>First Received Date:</strong> {issue.firstRecDate}</p>
          <p><strong>Beg Date:</strong> {issue.begDate === "01.01.1970" ? ("-") : (issue.begDate)}</p>
          <p><strong>End Date:</strong> {issue.endDate === "01.01.1970" ? ("-") : (issue.endDate)}</p>
          <p><strong>Timestamp:</strong> {issue.timestamp}</p>
          <p><strong>Status:</strong> {issue.status}
            {changeStatus && !isCompleted && (
              <div className="statusAndGridContainer">
                <FormControl style={{ width: "20vh", marginRight: "10%" }} variant="outlined">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    label="Status"
                  >
                    {issue.status === "Appointed" && (
                      <MenuItem value="Continues">Continues</MenuItem>
                    )}
                    {issue.status === "Continues" && (
                      <MenuItem value="Completed">Completed</MenuItem>
                    )}
                  </Select> 
                  <Button variant="contained" color="primary" onClick={handleStatusChange} className="updateAssignBtn">Update</Button>
                </FormControl>
                {isGrid && !isCompleted && (
                  <div className="gridContainer">
                    <Grid container> 
                      <Grid item xs={12} style={{marginBottom:"10px"}}>
                        <TextField
                          label="Other Assigned To (UserId)"
                          variant="outlined"
                          fullWidth
                          value={newAssignedto}
                          onChange={(e) => setNewAssignedto(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Comment"
                          variant="outlined"
                          fullWidth
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          onClick={handleTaskLogUpdate} 
                          className="updateAssignBtn"
                        >
                          Assign Task
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                )}
              </div>
            )}
          </p>    
        </div>
      )}
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

export default IssueModal;
