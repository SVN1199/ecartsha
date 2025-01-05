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
import { getProductsStocks } from '../../../actions/admin/adminProductsAction';
import { Link } from 'react-router-dom';
import TableContainers from '../../../components/admin/TableContainers';

const columns = [
    { id: 'sino', label: 'SI No.', minWidth: 80 },
    { id: 'productId', label: 'Product ID.', minWidth: 100 },
    { id: 'image', label: 'Image', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 200 },
    { id: 'color', label: 'Color', minWidth: 50 },
    { id: 'code', label: 'Code', minWidth: 100 },
    { id: 'size', label: 'Size', minWidth: 50 },
    { id: 'quantity', label: 'Quantity', minWidth: 50 },
    { id: 'status', label: 'Status', minWidth: 100 },
    { id: 'actions', label: 'Actions', minWidth: 50 },
];

const ProductsStocks = () => {
    const dispatch = useDispatch();

    const { products = [], totalProducts = 0, loading } = useSelector((state) => state.adminProductsState);

    const [status, setStatus] = useState('all');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const rows = products.map(product => ({
        sino: product.sino,
        productId: <div className='text-xs'>{product.id}</div>,
        image: (
            <div className='h-16 w-16'>
                <img src={product.image} alt={product.name} className='w-full h-full object-contain' />
            </div>
        ),
        name: <div className='text-xs text-left'>{product.name}</div>,
        color: <div className='capitalize text-sm'>{product.productColor}</div>,
        code: <div className='text-sm'>{product.productCode}</div>,
        size: product.size,
        quantity: product.qty,
        status: (
            <div
                className={`text-xs capitalize font-bold ${
                    product.status === 'out of stock'
                        ? 'text-red-600'
                        : product.status === 'min qty avl'
                        ? 'text-orange-600'
                        : 'text-green-600'
                }`}
            >
                {product.status}
            </div>
        ),
        actions: (
            <div className='flex flex-row items-center tracking-wide bg-gray-200 p-1 rounded font-bold justify-center gap-5 text-green-800'>
                <Link to={`/admin/productslist/productinventory/${product.id}`}>View</Link>
            </div>
        ),
    }));

    const handleStatus = (e) => {
        setStatus(e.target.value);
    };

    useEffect(() => {
        dispatch(getProductsStocks(status, page + 1, rowsPerPage)); 
    }, [dispatch, status, page, rowsPerPage]);

    return (
        <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg">
            <div className="mb-6">
                <h1 className="text-3xl font-extrabold text-green-600 tracking-tight">
                    Products Stocks
                </h1>
            </div>

            <div className="w-full my-4 flex justify-end">
                <select
                    name="status"
                    id="status"
                    value={status || 'all'}
                    onChange={handleStatus}
                    className="px-4 py-2 rounded-lg shadow-md cursor-pointer border-gray-300 bg-white focus:ring-2 focus:ring-green-500 transition-all duration-200 text-green-700"
                >
                    <option value="all" className="text-green-700 font-bold cursor-pointer">All</option>
                    <option value="out of stock" className="text-green-700 font-bold cursor-pointer">Out Of Stock</option>
                    <option value="min qty avl" className="text-green-700 font-bold cursor-pointer">Min Qty Avl</option>
                    <option value="available" className="text-green-700 font-bold cursor-pointer">Available</option>
                </select>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                                    message="No Products Stocks Found"
                                />
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 100]}
                        component="div"
                        count={totalProducts} 
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        className="text-sm text-gray-700 bg-gray-50 p-3 rounded-b-lg"
                    />
                </Paper>
            </div>
        </div>
    );
};

export default ProductsStocks;