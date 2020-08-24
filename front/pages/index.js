import React, { useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../styles/Home.module.css';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Grid from '@material-ui/core/Grid';
import Table from '../components/Table';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'


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

  const [state, setState] = useState({
        employees: [],
        offices: [],
        departments: [],
        departments_selected: false,
        offices_selected: false,
        employees_selected: true,
        pageSize: 10,
        page: 0

    });

  useEffect(() => {
    var fetchEmployees = async () => {
      var resp = await fetch('http://localhost:8000/employees/?limit=10&expand=manager');
      var employees = await resp.json();
      return employees;
    }
    var fetchOffices = async () => {
      var resp = await fetch('http://localhost:8000/offices/');
      var offices = await resp.json();
      return offices;
    }
    var fetchDepartments = async () => {
      var resp = await fetch('http://localhost:8000/departments/')
      var departments = await resp.json()
      return departments;
    }

    var loadData = async () => {
      var employees = await fetchEmployees();
      var offices = await fetchOffices();
      var departments = await fetchDepartments();

      await setState((prevState) => {
        return {
          ...prevState,
          employees: employees,
          offices: offices,
          departments: departments
        }
      });

    }

    loadData();

  }, [])

  var updateEmployees = (page, pageSize) => {
    var fetchData = async () => {
      var offset = page * 10;
      var resp = await fetch(`http://localhost:8000/employees/?limit=${pageSize}&offset=${offset}&expand=manager`);
      var employees = await resp.json();

      await setState((prevState) => {
        return {
          ...prevState,
          employees: employees,
          pageSize: pageSize,
          page: page
        }
      });
    }
    fetchData();
  }

  const handleSelectedItem = (item) => {
    var departments_selected = false;
    var offices_selected = false;
    var employees_selected = false;
    if (item === 'employees')
      employees_selected = true;
    if (item === 'offices')
      offices_selected = true;
    if (item === 'departments')
      departments_selected = true;

    setState((prevState) => {
      return {
        ...prevState,
        employees_selected: employees_selected,
        offices_selected: offices_selected,
        departments_selected: departments_selected
      }
    });
  }

  var data = [];
  var selected = '';
  if (state.employees_selected){
    data = state.employees;
    selected = 'employees';
  } else if (state.offices_selected){
    data = state.offices;
    selected = 'offices';
  } else {
    data = state.departments;
    selected = 'departments';
  }

  return (
    <React.Fragment>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Big Corp
        </Typography>
      </Toolbar>
    </AppBar>
    <Container style={{marginTop: "20px"}}>
        <Grid container spacing={3}>
          <Grid item md={3}>
            <List component="nav">
              <ListItem button selected={state.employees_selected} onClick={() => handleSelectedItem('employees')}>
                <ListItemText primary="Employees" />
              </ListItem>
              <ListItem button selected={state.offices_selected} onClick={() => handleSelectedItem('offices')}>
                <ListItemText primary="Offices" />
              </ListItem>
              <ListItem button selected={state.departments_selected} onClick={() => handleSelectedItem('departments')}>
                <ListItemText primary="Departments" />
              </ListItem>
            </List>
          </Grid>
          <Grid item md={9}>
            <Table
              pageSize={state.pageSize}
              page={state.page}
              data={data}
              selected={selected}
              updateEmployees={updateEmployees}
            />
          </Grid>
        </Grid>
    </Container>
    </React.Fragment>
  )
}
