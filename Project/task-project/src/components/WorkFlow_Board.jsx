import React, { useState, useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import { GetIssuesWithStatus } from "../Api"; 
import "../style/workflow.css";
import "../style/loading.css";
import IssueModal from './IssueModal';
import { useUser } from "../UserContext";
import TaskCard from "./TaskCard";
import CircularProgress from '@material-ui/core/CircularProgress';

function WorkFlow_Board() {
  const { user} = useUser();

  const [tasks, setTasks] = useState({ appointed: [], continues: [], completed: [] });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState({
    appointed: 1,
    continues: 1,
    completed: 1 
  });
  
  const tasksPerPage = 4;
  const changeStatusIsSee = true;
  const modalIsGrid =true;

  const fetchData = async () => {
    try {
      const data = await GetIssuesWithStatus();
      const assignedTasks = data.filter(task => task.assignedto === user.userId);
      const appointed = assignedTasks.filter(task => task.status === "Appointed");
      const continues = assignedTasks.filter(task => task.status === "Continues");
      const completed = assignedTasks.filter(task => task.status === "Completed");
      setTasks({ appointed, continues, completed });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        await fetchData();
      } catch (error) {
        console.error("Error fetching issues:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchDataAsync();
  }, []);
  
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
  const openModal = (issue) => {
    const formattedIssue = {
      ...issue,
      firstRecDate: new Date(issue.firstRecDate).toLocaleDateString(),
      begDate: new Date(issue.begDate).toLocaleDateString(),
      endDate: new Date(issue.endDate).toLocaleDateString()
    };
    setSelectedIssue(formattedIssue);
    setModalIsOpen(true);
  };

  const closeModal = async () => {
    setSelectedIssue(null);
    setModalIsOpen(false);
    fetchData();
  };

  const handlePageChange = (category, direction) => {
    setCurrentPage(prevPage => ({
      ...prevPage,
      [category]: direction === 'next' ? prevPage[category] + 1 : prevPage[category] - 1
    }));
  };

  return (
    <div className="workFlowDiv">
      <div className="workFlowMain"> 
        <h1>WorkFlow Board</h1> 
      </div>
      <Container className="container">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} className="gridtask">
            <TaskCard
              title="Appointed"
              taskList={tasks.appointed} 
              openModal={openModal}
              currentPage={currentPage.appointed}
              tasksPerPage={tasksPerPage}
              onPageChange={(direction) => handlePageChange('appointed', direction)} 
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TaskCard
              title="Continues"
              taskList={tasks.continues}
              openModal={openModal}
              currentPage={currentPage.continues}
              tasksPerPage={tasksPerPage}
              onPageChange={(direction) => handlePageChange('continues', direction)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TaskCard
              title="Completed"
              taskList={tasks.completed}
              openModal={openModal} 
              currentPage={currentPage.completed} 
              tasksPerPage={tasksPerPage}
              onPageChange={(direction) => handlePageChange('completed', direction)}
            />
          </Grid>
        </Grid>
      </Container>
      <IssueModal
        isOpen={modalIsOpen}
        onRequestClose={() => closeModal(1)}
        issue={selectedIssue}
        isGrid={modalIsGrid}
        changeStatus={changeStatusIsSee}
      />
    </div>
  );
}

export default WorkFlow_Board;
