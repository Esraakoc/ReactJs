import React from "react";
import { Grid, Card, CardContent, Typography, Button } from "@material-ui/core";
import "../style/workflow.css";

const TaskCard = ({ title, taskList, openModal, currentPage, tasksPerPage, onPageChange }) => {
    const startTaskIndex = (currentPage - 1) * tasksPerPage + 1;
    const endTaskIndex = Math.min(currentPage * tasksPerPage, taskList.length);

    const paginateTasks = () => {
        const startIndex = (currentPage - 1) * tasksPerPage;
        const endIndex = startIndex + tasksPerPage; 
        return taskList.slice(startIndex, endIndex);
    }; 

    const handleNextPage = () => { 
        onPageChange('next');
    };

    const handlePrevPage = () => {
        onPageChange('prev');
    };

    const isPrevDisabled = currentPage === 1;
    const isNextDisabled = taskList.length <= currentPage * tasksPerPage;


    const getCardClassName = (title) => {
        if (title === "Appointed") {
            return "taskCard-back";
        } else if (title === "Continues") {
            return "differentBack";
        } else if (title === "Completed") {
            return "differentBackTask";
        }
        return "taskCard-back"; 
    };

    return (
        <Card className="card">
            <CardContent>
                <Typography variant="h5" component="h2" className="titleCardtype">
                    {title}
                </Typography>
                <Grid container spacing={2} style={{ position: "relative", marginBottom: "3vh" }}>
                    {paginateTasks().map((task, index) => (
                        <Grid item xs={12} key={index}>
                            <Card className={getCardClassName(title)} onClick={() => openModal(task)}>
                                <CardContent>
                                    <Typography variant="body1"><strong>{task.taskName}</strong></Typography>
                                    <Typography variant="body2">{new Date(task.firstRecDate).toLocaleDateString()}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <div className="paginationDiv">
                    <Button
                        variant="contained" 
                        color="primary"
                        onClick={handlePrevPage}
                        disabled={isPrevDisabled}
                    >
                        Prev
                    </Button>
                    <Typography variant="body2" color="textSecondary" className="paginationInfo">
                        {`Showing ${startTaskIndex}-${endTaskIndex} of ${taskList.length}`}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNextPage}
                        disabled={isNextDisabled}
                    >
                        Next
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default TaskCard;
