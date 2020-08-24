import React, { useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../styles/Home.module.css';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Grid from '@material-ui/core/Grid';
import Table from '../components/Table';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


export default function Home() {

  const classes = useStyles();

  return (
    <React.Fragment>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Employees
        </Typography>
      </Toolbar>
    </AppBar>
    <Container style={{marginTop: "20px"}}>
        <Grid container spacing={3}>
          <Grid item md={3}>
            <List component="nav" aria-label="secondary mailbox folders">
              <ListItem button>
                <ListItemText primary="Employees" />
              </ListItem>
              <ListItem button selected={true}>
                <ListItemText primary="Offices" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Department" />
              </ListItem>
            </List>
          </Grid>
          <Grid item md={9}>
            <Table />
          </Grid>
        </Grid>
    </Container>
    </React.Fragment>
  )
}
