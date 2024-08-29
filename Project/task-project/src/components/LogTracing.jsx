import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Typography, Card, CardContent, Divider, Button } from "@material-ui/core";
import "../style/logTracing.css";
import { GetTaskLog, GetIssuesWithStatus } from "../Api";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

function LogTracing() {
  const issueId = useSelector((state) => state.issue.issueId);
 
  const [logs, setLogs] = useState([]);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 7; 

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        const issueget = await GetIssuesWithStatus();
        const allLogs = await GetTaskLog();
        const filteredLogs = allLogs.filter(log => log.taskId === issueId);
        const filteredIssue = issueget.filter(log => log.taskId === issueId);
        setLogs(filteredLogs);
        setIssues(filteredIssue);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (issueId) {
      fetchLogs();
    }
  }, [issueId]);

  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(logs.length / logsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>Error: {error}</p>
      </div>
    );
  }
 
  return ( 
    <Container className="log-tracing-container">
      <div className="tracingPageTop">
        <h1 style={{ color: "#14144F" }}> Tracing for Issue: {issues[0]?.taskName}</h1>
        <strong className="tracingUserInfo">
          <AccountCircleIcon />
          <span>Created by: {issues[0]?.createdby}</span>
        </strong>
        <p>Creation date: {new Date(issues[0]?.firstRecDate).toLocaleString()}</p>
      </div>

      {currentLogs.length > 0 ? (
        <div className="log-list">
          {currentLogs.map((log, index) => (
            <div key={log.id}>
              <Card className="log-card">
                <CardContent className="log-card-content">
                  <div className="log-details">
                  {indexOfFirstLog + index > 0 ? (<>
                    <Typography variant="body2" className="log-detail">
                        <strong>Assigned By:</strong> {logs[indexOfFirstLog + index - 1].userId}
                      </Typography>
                       <Typography variant="body2" className="log-detail">
                       <strong>Comment:</strong> {log.comment}
                     </Typography>
                  </>      
                    ):(<> 
                    <Typography variant="body2" className="log-detail">
                      <strong>Assigned By</strong> {issues[0]?.createdby}
                    </Typography>
                    <Typography variant="body2" className="log-detail">
                    <strong>Comment:</strong> {issues[0]?.description}
                    </Typography>
                    </>
                  )}       
                    <Typography variant="body2" className="log-detail">
                      <strong>Assignment Date:</strong> {new Date(log.logDate).toLocaleString()}
                    </Typography>
                    <Typography variant="body2" className="log-detail">
                      <strong>Assigned to:</strong> {log.userId}
                    </Typography> 
                  </div>
                </CardContent>
              </Card>
              {index < currentLogs.length - 1 && <Divider className="log-divider" />}
            </div>
          ))}
        </div>
      ) : (
        <Typography variant="h6">No logs available for this issue.</Typography>
      )}
      <div className="pagination">
        <Typography variant="body2">
          Showing {indexOfFirstLog + 1}-{Math.min(indexOfLastLog, logs.length)} of {logs.length}
        </Typography>
        <div className="pagination-buttons">
          <Button onClick={handlePrevPage} disabled={currentPage === 1}>
            &lt; Prev
          </Button>
          <Button onClick={handleNextPage} disabled={currentPage === Math.ceil(logs.length / logsPerPage)}>
            Next &gt;
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default LogTracing;
