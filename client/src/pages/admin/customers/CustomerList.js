import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../actions/admin/adminUsersAction';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { FaSearch } from 'react-icons/fa';
import TableContainers from '../../../components/admin/TableContainers';

const columns = [
  { id: 'sino', label: 'SI No.', minWidth: 100 },
  { id: 'userId', label: 'User ID', minWidth: 100 },
  { id: 'avatar', label: 'Avatar', minWidth: 100 },
  { id: 'name', label: 'Name', minWidth: 200 },
  { id: 'email', label: 'Email', minWidth: 200 },
  { id: 'role', label: 'Role', minWidth: 100 },
  { id: 'isVerifiedEmail', label: 'Verified Email', minWidth: 150 },
  { id: 'isActive', label: 'Active', minWidth: 100 },
  { id: 'createdAt', label: 'Joined', minWidth: 200 },
  { id: 'updatedAt', label: 'Modified', minWidth: 200 },
];

const CustomerList = () => {
  const dispatch = useDispatch();
  const { users, totalUsers = 0, loading } = useSelector((state) => state.adminUsersState); // Default totalUsers to 0 if undefined

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  const rows = users.map((user, index) => ({
    sino: index + 1 + page * rowsPerPage,
    avatar: (
      <div className="h-12 w-12">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-full h-full object-cover rounded-full border-2 border-gray-300"
        />
      </div>
    ),
    userId: <div className='capitalize'>{user._id}</div>,
    name: <div className='capitalize'>{user.name}</div>,
    email: user.email,
    role: <div className='capitalize'>{user.role}</div>,
    isVerifiedEmail: user.isVerifiedEmail ? 'Yes' : 'No',
    isActive: user.isActive ? 'Yes' : 'No',
    createdAt: new Date(user.createdAt).toLocaleString(),
    updatedAt: new Date(user.updatedAt).toLocaleString(),
  }));

  useEffect(() => {
    dispatch(getAllUsers(page + 1, rowsPerPage, searchQuery));
  }, [dispatch, page, rowsPerPage, searchQuery]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-green-600 tracking-tight">
          Users Management
        </h1>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search User By Id, Name"
            className="flex-1 p-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ease-in-out"
            value={searchQuery} // Bind input to searchQuery state
            onChange={handleSearchChange} // Handle input change
          />
          <button
            className="px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition transform hover:scale-105 duration-300 shadow-lg"
            onClick={() => dispatch(getAllUsers(page + 1, rowsPerPage, searchQuery))} // Trigger search action
          >
            <FaSearch />
          </button>
        </div>
      </div>

      <Paper elevation={3} className="rounded-lg overflow-hidden shadow-lg">
        <TableContainer
          sx={{
            maxHeight: {
              xs: '450px',
              sm: '550px',
              md: '700px',
              lg: '480px',
              xl: '80%',
            },
            overflowY: 'auto',
          }}
        >
          <Table stickyHeader aria-label="responsive table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{
                      minWidth: column.minWidth,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      backgroundColor: '#029e12',
                      color: '#ffffff',
                      borderBottom: '2px solid #ddd',
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableContainers
                loading={loading}
                rowsPerPage={rowsPerPage}
                columns={columns}
                rows={rows}
                message="No User Found"
              />
            </TableBody>
          </Table>
        </TableContainer>

        <div className="bg-gray-50 p-4">
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={totalUsers} // Ensure that totalUsers is defined
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            className="text-sm text-gray-700"
          />
        </div>
      </Paper>
    </div>
  );
};

export default CustomerList;
