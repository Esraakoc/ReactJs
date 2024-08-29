import React, { useState, useEffect } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { GetIssuesWithStatus } from '../Api';
import "../style/notification.css";

const Notification = ({ open, userId, newNotification }) => {
  const [assignedTasks, setAssignedTasks] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await GetIssuesWithStatus();
        const tasks = response.filter(task => task.assignedto === userId && task.status !== "Completed")
        .sort((a, b) => new Date(b.firstRecDate) - new Date(a.firstRecDate));
        setAssignedTasks(tasks);
      } catch (error) {
        console.error('Failed to fetch notifications', error);
      }
    };

    if (open) {
      fetchNotifications();
    } 
  }, [open, userId]);

  if (!open) return null;

  return (
    <div className="notificationContainer">
      <div className="root">
        <h4>New Notifications</h4>
        {assignedTasks.length > 0 ? (
          assignedTasks.map((task, index) => {
            const isNewTask = newNotification.some(notification => notification.taskId === task.taskId);
            return (
              <Accordion key={index} style={isNewTask ? { backgroundColor: '#b91d47', color: 'white' } : { backgroundColor: 'white', color: 'black' }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
                >
                  <Typography className="heading">{task.taskName}</Typography>
                </AccordionSummary>
                <AccordionDetails style={{ display: "block" }}>
                  <Typography>{new Date(task.firstRecDate).toLocaleDateString()}</Typography>
                  <Typography><span>Created by: </span>{task.createdby}</Typography>
                  <Typography>{task.description}</Typography>
                </AccordionDetails>
              </Accordion>
            );
          })
        ) : (
          <Typography>No new notifications</Typography>
        )}
      </div>
    </div>
  );
};

export default Notification;
