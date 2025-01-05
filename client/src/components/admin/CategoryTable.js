import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';

const customFontFamily = ""

const columns = [
    { id: 'id', label: 'SI No.' , minWidth : 100},
    { id: 'name', label: 'Name' , minWidth : 200},
    { id: 'gender', label: 'Gender' , minWidth : 150},
    { id: 'noofproducts', label: 'No. Of Products' , minWidth : 150},
    { id: 'stock', label: 'Stock' , minWidth : 150},
    { id: 'actions', label: 'Actions' , minWidth : 150},
];

const rows = [
  { id: 0, name: 'Mobiles', gender: 'N/A', stock: 100, 
    actions: <div className='flex flex-row items-center gap-5 text-blue-800'><button><FaEye size={18}/></button><button><FaEdit size={17}/></button><button><FaTrash size={16}/></button></div> }, 
  { id: 1, name: 'Mobiles', gender: 'N/A', stock: 100, 
    actions: <div className='flex flex-row items-center gap-5 text-blue-800'><button><FaEye size={18}/></button><button><FaEdit size={17}/></button><button><FaTrash size={16}/></button></div> }, 
  { id: 2, name: 'Mobiles', gender: 'N/A', stock: 100, 
    actions: <div className='flex flex-row items-center gap-5 text-blue-800'><button><FaEye size={18}/></button><button><FaEdit size={17}/></button><button><FaTrash size={16}/></button></div> }, 
  { id: 3, name: 'Mobiles', gender: 'N/A', stock: 100, 
    actions: <div className='flex flex-row items-center gap-5 text-blue-800'><button><FaEye size={18}/></button><button><FaEdit size={17}/></button><button><FaTrash size={16}/></button></div> }, 
];

export default function CategoryTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden'}} >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table" >
          <TableHead>
            <TableRow >
              {columns.map((column) => (
                <TableCell
                  className='customtable'
                  key={column.id}
                  style={{ minWidth: column.minWidth , fontWeight : 600, textAlign : 'center'}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} style={{textAlign : 'center'}} className='customtable'>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
