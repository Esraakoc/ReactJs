import React, { useState } from "react";
import "../style/createIssue.css";
import { Button, TextField, Grid, Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import { useDispatch } from "react-redux";
import { createIssue } from "../Api"; 
import { useUser } from "../UserContext";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CreateIssue() {

  const dispatch = useDispatch();
  const { user } = useUser();
  const [form, setForm] = useState({
    taskName: "",
    description: "",
    createdby: user.userId || "",
    watcher: user.userId || "",
    assignedto: "",
    timestamp: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.createdby === form.assignedto) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Created By and Assigned To cannot be the same person.");
      setOpenSnackbar(true);
      return;
    }

    try {
      const issueInfo = {
        taskName: form.taskName,
        description: form.description,
        createdby: form.createdby,
        watcher: form.watcher,
        assignedto: form.assignedto,
        timestamp: form.timestamp,
      };  
      await dispatch(createIssue(issueInfo));
      setSnackbarSeverity("success");
      setSnackbarMessage("Issue created successfully!");
      setOpenSnackbar(true);
      setForm({
        taskName: "",
        description: "",
        createdby: user.userId || "",
        watcher: user.userId || "",
        assignedto: "",
        timestamp:"",
      });
    } catch (err) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Creation failed");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="createIssueDiv">
      <div className="createIssueMain">
        <h1 style={{ color: "#14144F" }}>Create Issue</h1>
      </div>
      <form onSubmit={handleSubmit} className="ıssueForm">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="createdby"
              name="createdby"
              label="Created By"
              fullWidth
              autoComplete="createdby"
              value={form.createdby}
              onChange={handleChange}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="watcher"
              name="watcher"
              label="Watcher"
              fullWidth
              autoComplete="watcher"
              value={form.watcher}
              onChange={handleChange}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="assignedto"
              name="assignedto"
              label="Assigned To"
              fullWidth
              autoComplete="assignedTo"
              value={form.assignedto}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="taskName"
              name="taskName"
              label="Issue name"
              fullWidth
              autoComplete="taskName"
              value={form.taskName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="timestamp"
              name="timestamp"
              label="Timestamp"
              fullWidth
              autoComplete="timestamp"
              value={form.timestamp}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="description"
              name="description"
              label="Description"
              multiline
              minRows={4}
              variant="outlined"
              onChange={handleChange}
              value={form.description}
              style={{ width: "100%", minWidth: "300px" }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Create
            </Button>
          </Grid>
        </Grid>
      </form>
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

export default CreateIssue;
