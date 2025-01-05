import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Link } from 'react-router-dom';
import { getAllOrders } from '../../../actions/admin/adminOrdersAction';
import { FaRupeeSign } from 'react-icons/fa';
import TableContainers from '../../../components/admin/TableContainers';

const columns = [
  { id: 'sino', label: 'SI No.', minWidth: 80 },
  { id: 'orderId', label: 'Order ID', minWidth: 100 },
  { id: 'userId', label: 'User ID', minWidth: 100 },
  { id: 'orderItems', label: 'Items', minWidth: 50 },
  { id: 'totalPrice', label: 'Price', minWidth: 100 },
  { id: 'orderStatus', label: 'Status', minWidth: 100 },
  { id: 'paidAt', label: 'Paid At', minWidth: 100 },
  { id: 'createdAt', label: 'Order At', minWidth: 100 },
  { id: 'action', label: 'Action', minWidth: 50 },
];

const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const AllOrders = () => {
  const dispatch = useDispatch();
  const { orders = [], orderCount, loading } = useSelector((state) => state.adminOrdersState);

  const [orderStatus, setOrderStatus] = useState('All');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleStatus = (e) => {
    setOrderStatus(e.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(getAllOrders(orderStatus));
  }, [dispatch, orderStatus]);

  const rows = orders.map((order, index) => ({
    id: order._id,
    sino: index + 1 + page * rowsPerPage,
    orderId: <div className="text-xs">{order._id}</div>,
    userId: <div className="text-xs">{order.user}</div>,
    orderItems: (
      <div className="text-xs font-semibold">{order?.orderItems || 0}</div>
    ),
    orderStatus: (
      <div
        className={`text-xs capitalize font-bold ${order.orderStatus.status === 'Delivered'
          ? 'text-green-600'
          : order.orderStatus.status === 'Shipped'
            ? 'text-orange-600'
            : order.orderStatus.status === 'Out Of Delivery'
              ? 'text-green-400'
              : 'text-blue-600'
          }`}
      >
        {order.orderStatus.status}
      </div>
    ),
    totalPrice: (
      <div className="text-xs font-semibold flex items-center">
        <FaRupeeSign /> {` ${order.totalPrice / 100}`}
      </div>
    ),
    paidAt: <div className="text-xs">{formatDate(order.paidAt)}</div>,
    createdAt: <div className="text-xs">{formatDate(order.createdAt)}</div>,
    action: (
      <div className="flex flex-row items-center justify-center gap-5 font-semibold opacity-80 text-blue-800">
        <Link to={`/admin/order/${order._id}`}>View</Link>
      </div>
    ),
  }));

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-green-600 tracking-tight">
          Orders Management
        </h1>
      </div>

      <div className="w-full my-4 flex flex-row justify-between gap-4 items-center">
        <div className="text-sm font-semibold text-gray-600">
          <span>Count:</span> <span className="text-green-600">{orderCount}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Filter by Status:</span>
          <select
            name="status"
            id="status"
            value={orderStatus || 'All'}
            onChange={handleStatus}
            className="px-4 py-2 text-sm bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="All">All</option>
            <option value="Delivered">Delivered</option>
            <option value="Out Of Delivery">Out Of Delivery</option>
            <option value="Shipped">Shipped</option>
            <option value="Processing">Processing</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-md shadow-md">
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer
            sx={{
              maxHeight: { xs: '450px', sm: '550px', md: '700px', lg: '480px', xl: '80%' },
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
                  message="No Orders Found"
                />
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={orderCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            className="bg-gray-50"
          />
        </Paper>
      </div>
    </div>
  );
};

export default AllOrders;