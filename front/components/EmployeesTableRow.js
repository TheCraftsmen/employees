import React, { useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

export default function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          {
            (typeof row.manager === 'object' && row.manager !== null) &&
            (<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>)
          }
        </TableCell>
        <TableCell>{row.id}</TableCell>
        <TableCell>{row.first}</TableCell>
        <TableCell>{row.last}</TableCell>
        <TableCell>{ (typeof row.manager === 'object' && row.manager !== null) ? row.manager.id : '' }</TableCell>
        <TableCell>{row.office}</TableCell>
        <TableCell>{row.department}</TableCell>
      </TableRow>
      <TableRow>
        { (typeof row.manager === 'object' && row.manager !== null) &&
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Manager
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell>First</TableCell>
                      <TableCell>Last</TableCell>
                      <TableCell>Manager</TableCell>
                      <TableCell>Office</TableCell>
                      <TableCell>Department</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow key={row.manager.id}>
                      <TableCell>{row.manager.id}</TableCell>
                      <TableCell>{row.manager.first}</TableCell>
                      <TableCell>{row.manager.last}</TableCell>
                      <TableCell>{row.manager.manager}</TableCell>
                      <TableCell>{row.manager.office}</TableCell>
                      <TableCell>{row.manager.department}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        }
      </TableRow>
    </React.Fragment>
  );
}
