import React from 'react';
import { Button, Typography, Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: theme.palette.background.default,
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: 'center',
    maxWidth: 600,
  },
  errorCode: {
    fontSize: '6rem',
    fontWeight: 700,
    color: theme.palette.error.main,
  },
  description: {
    margin: theme.spacing(2, 0),
    color: theme.palette.text.secondary,
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

function ErrorPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography className={classes.errorCode}>404</Typography>
        <Typography variant="h5" className={classes.description}>
          Oops! Page Not Found.
        </Typography>
        <Typography variant="body1" className={classes.description}>
          The page you are looking for does not exist or has been moved. Please return to the home page and continue browsing.
        </Typography>
        <Grid container justifyContent="center" className={classes.button}>
          <Button
            component={Link}
            to="/issues"
            variant="contained"
            color="primary"
          >
            Return to Issues
          </Button>
        </Grid>
      </Paper>
    </div>
  );
}

export default ErrorPage;
