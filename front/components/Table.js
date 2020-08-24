import React, { useEffect, useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import EmployeesTableRow from './EmployeesTableRow';
import OfficesTableRow from './OfficesTableRow';
import DepartmentsTableRow from './DepartmentsTableRow';


export default function AppTable(props) {
  const handleChangePage = (e, page) => {
    props.updateEmployees(page, props.pageSize);
  }
  const handleChangeRowsPerPage = (e, size) => {
    var pageSize = e.target.value
    props.updateEmployees(props.page, pageSize)
  }

  const getTableRow = () => {
    if (props.selected === 'employees'){
      return (
        props.data && props.data.map((row) => (
          <EmployeesTableRow key={row.id} row={row} />
        ))
      )
    } else if (props.selected === 'departments'){
      return (
        props.data && props.data.map((row) => (
          <DepartmentsTableRow key={row.id} row={row} />
        ))
      )
    } else {
      return (
        props.data && props.data.map((row) => (
          <OfficesTableRow key={row.id} row={row} />
        ))
      )
    }
  }
  var headers = []
  if (props.data.length){
    headers = Object.keys(props.data[0])
  }

  switch (props.selected) {
    case 'employees':
      headers = [
        'Id', 'First',
        'Last', 'Manager',
        'Office','Department'
      ];
      break;
    case 'offices':
      headers = ['Id', 'City', 'Country', 'Address'];
      break;
    case 'departments':
      headers = ['Id', 'Name', 'Superdepartment'];
      break;
  }

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              { headers.map((row) => (<TableCell>{row}</TableCell>)) }
            </TableRow>
          </TableHead>
          <TableBody>
            {getTableRow()}
          </TableBody>
        </Table>
      </TableContainer>
      {
        props.selected === 'employees' && (
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={-1}
            rowsPerPage={props.pageSize}
            page={props.page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )
      }
    </React.Fragment>
  );
}