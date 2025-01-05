import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReturnOrders } from '../../../actions/admin/adminOrdersAction';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import FormatDate from '../../../components/layouts/FormatDate';
import { Link } from 'react-router-dom';
import TableContainers from '../../../components/admin/TableContainers';

const columns = [
    { id: 'sino', label: 'SI No.', minWidth: 80 },
    { id: 'id', label: 'ID', minWidth: 200 },
    { id: 'orderItemId', label: 'OrderItem ID', minWidth: 200 },
    { id: 'orderId', label: 'Order ID', minWidth: 250 },
    { id: 'status', label: 'Status', minWidth: 100 },
    { id: 'requestDate', label: 'Requested On', minWidth: 200 },
    { id: 'actions', label: 'Action', minWidth: 100 },
];

const ManageReturn = () => {
    const dispatch = useDispatch();
    const { returnOrders = [], totalReturnOrders, returnOrderCount, loading } = useSelector((state) => state.adminOrdersState);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [statusFilter, setStatusFilter] = useState('');

    useEffect(() => {
        dispatch(getAllReturnOrders(statusFilter, page + 1, rowsPerPage));
    }, [dispatch, statusFilter, page, rowsPerPage]);

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleStatusChange = (event) => {
        setStatusFilter(event.target.value);
        setPage(0);
    };

    const rows = returnOrders.map((order) => ({
        sino: order.sino,
        orderId: order.orderId,
        orderItemId: order.orderItemsId,
        status: order.status,
        id: order._id,
        requestDate: <FormatDate date={order.requestDate} />,
        actions: (
            <Link to={`/admin/returnorders/${order.orderId}/${order.orderItemsId}`} className="text-green-800 font-semibold hover:underline">
                View
            </Link>
        ),
    }));

    return (
        <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-xl">
            <h1 className="text-3xl font-extrabold text-green-600 mb-6 tracking-tight">
                Return Order Management
            </h1>

            <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
                <select
                    value={statusFilter}
                    onChange={handleStatusChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                >
                    <option value="">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Cancelled">Cancelled</option>
                </select>

                <div className="text-gray-600 font-medium">
                    Total Orders: <span className="text-green-600">{returnOrderCount}</span>
                </div>
            </div>

            <Paper sx={{ width: '100%' }}>
                <TableContainer sx={{ maxHeight: 700 }}>
                    <Table stickyHeader aria-label="return orders table">
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
                                message="No Order Return Request Found"
                            />
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={totalReturnOrders}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    className="bg-green-50 rounded-b-xl"
                />
            </Paper>
        </div>
    );
};

export default ManageReturn;
