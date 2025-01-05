import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const Loaders = ({ rowsPerPage, columns }) => {
  return (
    <>
      {Array.from({ length: rowsPerPage }).map((_, index) => (
        <TableRow key={index}>
          {columns.map((column) => (
            <TableCell key={column.id}>
              <Skeleton variant="text" width="100%" height={30} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default Loaders;
