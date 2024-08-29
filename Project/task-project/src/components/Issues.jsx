import React, { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { GetIssuesWithStatus, GetUserRole, UpdateIssueIsDeleted} from "../Api";
import { Snackbar } from '@material-ui/core';
import "../style/issues.css";
import "../style/loading.css";
import IssueModal from './IssueModal';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import UpdateIssueModal from './UpdateIssueModal';
import { useUser } from "../UserContext"; 
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { issueTracing } from '../store/slice/issueSlice';
import { Alert } from '@material-ui/lab';

function Issues() {
  const { user } = useUser();

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [UpdateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]); 
  const [isAdmin, setIsAdmin] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const modalIsGrid = false;
  const changeStatusIsSee = false;

 useEffect(() => {
    const fetchIssues = async () => {
      try {
        const data = await GetIssuesWithStatus();
        setIssues(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
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
    fetchIssues();
  }, []);

  const handleTracing = () => {
    if (selectedRows.length === 1) {
      const issueId = selectedRows[0];  
      dispatch(issueTracing(issueId));  
      navigate('/log-tracing');  
    } else {
      alert("Please select exactly one issue to trace.");
    }
  };

  const openModal = (issue) => {
    setSelectedIssue(issue);
    setModalIsOpen(true); 
  };

  const closeModal = () => {
    setSelectedIssue(null);
    setModalIsOpen(false);
  };
  
  const updateCloseModal = (updatedIssue) => {
    if (updatedIssue) {
      setIssues((prevIssues) =>
        prevIssues.map((issue) =>
          issue.taskId === selectedIssue.taskId ? { ...issue, ...updatedIssue } : issue
        )
      );
    }
    setSelectedIssue(null);
    setUpdateModalIsOpen(false);
  };
  
  const handleDelete = async () => {
    for (let taskId of selectedRows) {
      await UpdateIssueIsDeleted(taskId); 
      try {
        setIssues(prevIssues => prevIssues.filter(issue => issue.taskId !== taskId));
        showSnackbar('The issue was successfully deleted', 'success');
      } catch (error) {
        if (error.response && error.response.status === 400) {
          showSnackbar(error.response.data, 'error');
        } else {
          showSnackbar('Error updating task status.', 'error');
        }
      }
     
    }
    setSelectedRows([]); 
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleUpdate = () => {
    if (selectedRows.length === 1) {
      const issueToUpdate = issues.find(issue => issue.taskId === selectedRows[0]);
      setSelectedIssue(issueToUpdate);
      setUpdateModalIsOpen(true);
    } else {
      alert("Please select exactly one issue to update.");
    }
  };

  if (loading) {
    return (
      <div className='loadingDiv' >
        <p className='loadingP' >Loading...</p>
        <CircularProgress 
        className='loadingIcon'
        />
      </div>
    );
  }
  
  if (error) {
    return (
      <p style={{ backgroundColor: '#F0F0F0', height: '100vh' }}>
        <span style={{
          position: "absolute",
          top: "10vw",
          left: "10vw",
          fontSize: "larger"
        }}>Error:  </span>{error}</p>
    );
  }

  const columns = [
    { field: 'taskId', headerName: 'ID', width: 100 },
    { field: 'taskName', headerName: 'Name', width: 150 },
    { field: 'description', headerName: 'Description', width: 150 },
    { field: 'createdby', headerName: 'Created By', width: 150 },
    { field: 'watcher', headerName: 'Watcher', width: 130 },
    { field: 'assignedto', headerName: 'Assigned To', width: 150 },
    { field: 'firstRecDate', headerName: 'First rec. date', width: 150 },
    { field: 'timestamp', headerName: 'Timestamp', width: 150 },
    { field: 'status', headerName: 'Status', width: 120 },
  ];

  const rows = issues.map((issue, index) => ({
    id: issue.taskId, 
    taskId: issue.taskId,
    taskName: issue.taskName,
    description: issue.description,
    createdby: issue.createdby,
    watcher: issue.watcher,
    firstRecDate: new Date(issue.firstRecDate).toLocaleDateString(),
    timestamp: issue.timestamp,
    status: issue.status,
    assignedto: issue.assignedto,
    begDate: new Date(issue.begDate).toLocaleDateString(),
    endDate: new Date(issue.endDate).toLocaleDateString()
  }));

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div style={{ backgroundColor: '#F0F0F0', height: '100vh' }}>
      <div className="issuesMain">
        <h1 style={{ color: "#14144F" }}>Issues List</h1>
      </div>
      <div style={{ height: 500, width: '97%' }} className="issuesDiv">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={7}
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={(newSelection) => setSelectedRows(newSelection)}
          onRowClick={(params) => openModal(params.row)}
          style={{ backgroundColor: 'white' }}
        />
      </div>
      <div className='issuesBtnDiv'>
        {isAdmin && (
          <div className='issueAdminBtn' >
          <Button
            variant="contained"
            onClick={handleDelete}
            className="btnDelete" 
            >
              Delete Selected
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}   
            className="btnUpdate"
          >
            Update Selected
          </Button>
          </div>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleTracing}    
          className="btnUpdate"
        >
        History
        </Button>
      </div>

      <UpdateIssueModal
        isOpen={UpdateModalIsOpen}
        onRequestClose={updateCloseModal}
        issue={selectedIssue}
      />
      <IssueModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        issue={selectedIssue}
        isGrid={modalIsGrid}
        changeStatus={changeStatusIsSee}
      />
      <Snackbar 
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Issues;
