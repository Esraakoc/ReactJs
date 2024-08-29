import React, { useState, useEffect } from "react";
import "../style/home.css";
import "../style/loading.css";
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { GetIssuesWithStatus } from '../Api';
import { useUser } from '../UserContext';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import IssueModal from "./IssueModal";
import CircularProgress from '@material-ui/core/CircularProgress';

const StyledTableCell = styled(TableCell)(({ theme, color }) => ({
  color: color,
  fontSize: '14px',
  '& div': {
    width: 12,
    height: 12,
    backgroundColor: color,
    display: 'inline-block',
    marginRight: theme.spacing(1),
  }
}));

const columns = [
  { field: 'taskId', headerName: 'ID', width: 90,height:10, headerClassName: 'dark-grey-header'  },
  { field: 'taskName', headerName: 'Name', width: 120, headerClassName: 'dark-grey-header' },
  { field: 'createdby', headerName: 'Created By', width: 140, headerClassName: 'dark-grey-header'  },
  { field: 'assignedto', headerName: 'Assigned To', width: 150, headerClassName: 'dark-grey-header'  },
  { field: 'status', headerName: 'Status', width: 130, headerClassName: 'dark-grey-header'  },
];
 
function Home() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [changeStatusIsSee, setChangeStatusIsSee] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsGrid, setModalIsGrid] = useState(false);
  const [percentages, setPercentages] = useState([]);
  const [issues, setIssues] = useState([]);
  const [assignedtoIssues, setAssignedtoIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useUser();

  const openModal = (issue) => {
    setSelectedIssue(issue);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedIssue(null);
    setModalIsOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const issuesData = await GetIssuesWithStatus();
        const userIssues = issuesData.filter(issue => issue.createdby === user.userId);
        const userAssignedtoIssues = issuesData.filter(issue => issue.assignedto === user.userId);
        const statusCounts = userAssignedtoIssues.reduce((acc, issue) => {
          acc[issue.status] = (acc[issue.status] || 0) + 1;
          return acc; 
        }, {});

        const totalIssues = userAssignedtoIssues.length;
        const calculatedPercentages = Object.values(statusCounts).map(count => ((count / totalIssues) * 100).toFixed(2));

        const data = {
          labels: Object.keys(statusCounts),
          datasets: [
            {
              backgroundColor: ["#EDA122", "#b91d47", "#2b5797"],
              data: Object.values(statusCounts),
            }
          ]
        };

        setChartData(data);
        setPercentages(calculatedPercentages);
        setAssignedtoIssues(userIssues.map(issue => ({ 
          id: issue.taskId,
          taskId: issue.taskId,
          taskName: issue.taskName,
          createdby: issue.createdby,
          assignedto: issue.assignedto,
          status: issue.status,
          description: issue.description,
          watcher: issue.watcher,
          firstRecDate: new Date(issue.firstRecDate).toLocaleDateString(), 
          timestamp: issue.timestamp, 
          begDate:  new Date(issue.begDate).toLocaleDateString(),
          endDate:  new Date(issue.endDate).toLocaleDateString()
        })));
        setIssues(userAssignedtoIssues.map(issue => ({ 
          id: issue.taskId,
          taskId: issue.taskId,
          taskName: issue.taskName,
          createdby: issue.createdby,
          assignedto: issue.assignedto,
          status: issue.status,
          description: issue.description,
          watcher: issue.watcher,
          firstRecDate: new Date(issue.firstRecDate).toLocaleDateString(), 
          timestamp: issue.timestamp, 
          begDate:  new Date(issue.begDate).toLocaleDateString(),
          endDate:  new Date(issue.endDate).toLocaleDateString()
        })));
      } catch (error) {
        console.error("Error fetching issues:", error);
      }finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

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
  
  const options = {
    plugins: {
      title: {
        display: true,
        text: "Issues assigned to me"
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const total = tooltipItem.dataset.data.reduce((acc, value) => acc + value, 0);
            const currentValue = tooltipItem.raw;
            const percentage = ((currentValue / total) * 100).toFixed(2);
            return `${tooltipItem.label}: ${percentage}%`;
          } 
        }
      }
    } 
  };
  const backgroundColors = ["#EDA122", "#b91d47", "#2b5797"];

  return ( 
    <div className="homeDiv">
      <Grid container>
        <Grid item xs={12} md={6} style={{ flexBasis: "40%" }}>
          <div className="home-chart-container">
            <Pie data={chartData} options={options} className="home-chart" />
            <TableContainer component={Paper} className="pie-table">
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Status</StyledTableCell>
                    <StyledTableCell align="right">Percentage</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {chartData.labels.map((label, index) => (
                    <TableRow key={label}>
                      <StyledTableCell color={backgroundColors[index]}>
                        <div></div> 
                        {label}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {percentages[index]}%
                      </StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="issues-container home-page">
            <h2 style={{ marginBottom: '0', color: "#2b5797" }}>Jobs assigned to me</h2>
            <div style={{ height: 250, width: '100%' }}>
              <DataGrid
                rows={issues}
                columns={columns} 
                pageSize={3}
                disableSelectionOnClick
                style={{ backgroundColor: 'white' }}
                onRowClick={(params) => openModal(params.row)}
              /> 
            </div>
          </div>
          <div className="issues-container home-page">
            <h2 style={{ marginBottom: '0', color: "#2b5797" }}>The works and situations I create.</h2>
            <div style={{ height: 250, width: '100%' }}>
              <DataGrid
                rows={assignedtoIssues}
                columns={columns}
                pageSize={3}
                disableSelectionOnClick
                style={{ backgroundColor: 'white' }}
                onRowClick={(params) => openModal(params.row)}
              />
            </div>
          </div>
        </Grid>
      </Grid>
      <IssueModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        issue={selectedIssue}
        isGrid={modalIsGrid}
        changeStatus={changeStatusIsSee}
      />
    </div>
  );
}

export default Home;