import React, { useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

export default function OfficesTableRow(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell></TableCell>
        <TableCell>{row.id}</TableCell>
        <TableCell>{row.city}</TableCell>
        <TableCell>{row.country}</TableCell>
        <TableCell>{row.address}</TableCell>
      </TableRow>
    </React.Fragment>
  );
}
