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
import { FaEdit, FaRupeeSign, FaSearch, FaTrash } from 'react-icons/fa';
import { deleteProduct, getAllProducts } from '../../../actions/admin/adminProductsAction';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearDeleteError } from '../../../slices/admin/adminProductSlice';
import TableContainers from '../../../components/admin/TableContainers';

const columns = [
    { id: 'sino', label: 'SI No.', minWidth: 80 },
    { id: 'productId', label: 'Product ID', minWidth: 250 },
    { id: 'image', label: 'Image', minWidth: 150 },
    { id: 'name', label: 'Name', minWidth: 250 },
    { id: 'description', label: 'Description', minWidth: 100 },
    { id: 'category', label: 'Category', minWidth: 250 },
    { id: 'color', label: 'Color', minWidth: 100 },
    { id: 'code', label: 'Code', minWidth: 100 },
    { id: 'quantity', label: 'Quantity', minWidth: 100 },
    { id: 'details', label: 'Details', minWidth: 100 },
    { id: 'price', label: 'Price', minWidth: 100 },
    { id: 'ratings', label: 'Ratings', minWidth: 100 },
    { id: 'reviews', label: 'Reviews', minWidth: 100 },
    { id: 'visibility', label: 'Visibility', minWidth: 100 },
    { id: 'actions', label: 'Actions', minWidth: 200 },
];

const AllProducts = () => {
    const dispatch = useDispatch();
    const { products = [], totalProducts = 0, loading } = useSelector((state) => state.adminProductsState);
    const { message, isProductDeleted, error, isUpdated } = useSelector((state) => state.adminProductState);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchInput, setSearchInput] = useState('');
    const [openPopUp, setOpenPopUp] = useState(false);

    const [productId, setProductId] = useState(null)

    useEffect(() => {
        dispatch(getAllProducts(page + 1, rowsPerPage, null));
    }, [dispatch, page, rowsPerPage, isProductDeleted]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSearch = () => {
        setPage(0);
        dispatch(getAllProducts(1, rowsPerPage, searchInput));
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleDelete = (id) => {
        setProductId(id)
        setOpenPopUp(true)
    }


    useEffect(() => {

        if (isUpdated) {
            toast('Content Updated Successfully', {
                type: 'success',
                position: 'bottom-center',
            });
        }

        if (error) {
            toast(error, {
                type: 'error',
                position: 'bottom-center',
            });
        }

    }, [isUpdated, error, dispatch]);


    const rows = products.map(product => ({
        sino: product.sino,
        productId: product._id,
        image: <div className='h-24 w-24'><img src={product.image} alt={product.name} className='w-full h-full object-contain' /></div>,
        name: product.name,
        description: <div className='text-green-500 font-semibold p-1 rounded bg-gray-200 text-xs'><Link to={`/admin/productslist/productdescriptionandhide/${product._id}`}>View</Link></div>,
        category: <div className='capitalize'>{product.category}</div>,
        color: <div className='capitalize'>{product.productColor}</div>,
        code: product.productCode,
        quantity: <div className='text-green-500 font-semibold p-1 rounded bg-gray-200 text-xs'><Link to={`/admin/productslist/productinventory/${product._id}`}>View</Link></div>,
        details: <div className='text-green-500 font-semibold p-1 rounded bg-gray-200 text-xs'><Link to={`/admin/productslist/productdetails/${product._id}`}>View</Link></div>,
        price: <div className='flex flex-row justify-center items-center'><FaRupeeSign className='opacity-70' />{product.price}</div>,
        deliveryCharge: <div className='flex flex-row justify-center items-center'><FaRupeeSign className='opacity-70' />{product.deliveryCharge}</div>,
        ratings: product.ratings,
        reviews: <div className='text-green-500 font-semibold p-1 rounded bg-gray-200 text-xs'><Link to={`/product/reviews/${product._id}`}>View</Link></div>,
        visibility: <div>{product.hide ? 'Hide' : 'Visible'}</div>,
        actions: <div className='flex flex-row items-center justify-center gap-5 text-green-800'>
            <Link to={`/admin/productslist/singleproduct/${product._id}`}><FaEdit size={17} /></Link>
            <button onClick={() => handleDelete(product._id)}><FaTrash size={16} /></button>
        </div>
    }));

    return (
        <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg">
            <div className="mb-6">
                <h1 className="text-3xl font-extrabold text-green-600 tracking-tight">
                    Products Management
                </h1>
            </div>

            <div className="mb-6">
                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        value={searchInput}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search Product Name"
                        className="flex-1 p-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ease-in-out"
                    />
                    <button
                        onClick={handleSearch}
                        className="px-5 py-3 bg-primary text-white rounded-lg hover:bg-green-700 transition transform hover:scale-105 duration-300 shadow-lg"
                    >
                        <FaSearch />
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden mx-auto">
                <Paper
                    sx={{
                        width: '100%',
                        maxWidth: {
                            xs: '100%',
                            sm: '95%',
                            md: '90%',
                            lg: '100%',
                            xl: '80%',
                        },
                        marginX: 'auto',
                    }}
                >
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
                                    message="No Products Found"
                                />
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {!searchInput && (
                        <div className="bg-gray-50 p-4">
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 20, 100]}
                                component="div"
                                count={totalProducts}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                className="text-sm text-gray-700"
                            />
                        </div>
                    )}
                </Paper>
            </div>

            {openPopUp && (
                <PopUp
                    message={message}
                    isProductDeleted={isProductDeleted}
                    dispatch={dispatch}
                    productId={productId}
                    setOpenPopUp={setOpenPopUp}
                    setProductId={setProductId}
                />
            )}

        </div>

    );
}

export default AllProducts;


const PopUp = ({ setOpenPopUp, productId, dispatch, isProductDeleted, message, setProductId }) => {

    useEffect(() => {
        if (isProductDeleted) {
            toast.success(message, {
                position: 'bottom-center',
            });
            dispatch(clearDeleteError());
        }
    }, [dispatch, isProductDeleted, message]);

    const handleDeleteProduct = (id) => {
        console.log(id)
        dispatch(deleteProduct(id));
        setOpenPopUp(false);
        setProductId(null);
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50 px-2">
            <div className="bg-white w-96 h-auto rounded-xl shadow-lg p-6 space-y-4">
                <h2 className="text-2xl font-bold text-center text-gray-800">Delete Product</h2>
                <div className="text-center font-semibold">
                    Are you sure you want to delete this product?
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between gap-4">
                        <button
                            onClick={() => setOpenPopUp(false)}
                            className="w-full py-2 text-center text-sm font-semibold text-white bg-red-600 rounded-lg cursor-pointer hover:bg-red-700 transition-colors"
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            className="w-full py-2 text-center text-sm font-semibold text-white bg-green-600 rounded-lg cursor-pointer hover:bg-green-700 transition-colors"
                            onClick={() => handleDeleteProduct(productId)}
                        >
                            Ok
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};