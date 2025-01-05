import { TableCell, TableRow } from '@mui/material'
import React from 'react'
import Loaders from './skeletonLoaders/Loaders'

const TableContainers = ({ loading, rowsPerPage, columns, rows, message }) => {
  return (
    <>
      {loading ? (
        <Loaders rowsPerPage={rowsPerPage} columns={columns} />
      ) : rows?.length === 0 ? (
        <TableRow>
          <TableCell colSpan={columns.length} align="center">
            {message}
          </TableCell>
        </TableRow>
      ) : (
        rows.map((row, index) => (
          <TableRow hover role="checkbox" tabIndex={-1} key={index}>
            {columns.map((column) => (
              <TableCell key={column.id} align="center">
                {row[column.id]}
              </TableCell>
            ))}
          </TableRow>
        ))
      )}
    </>
  );
};

export default TableContainers