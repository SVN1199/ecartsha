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
import { FaEdit, FaRupeeSign } from 'react-icons/fa';
import { getDiscountProducts } from '../../../actions/admin/adminProductsAction';
import TableContainers from '../../../components/admin/TableContainers';

const columns = [
  { id: 'sino', label: 'SI No.', minWidth: 80 },
  { id: 'productId', label: 'Product ID', minWidth: 250 },
  { id: 'name', label: 'Name', minWidth: 250 },
  { id: 'productCode', label: 'Code', minWidth: 150 },
  { id: 'color', label: 'Color', minWidth: 100 },
  { id: 'category', label: 'Category', minWidth: 150 },
  { id: 'image', label: 'Image', minWidth: 120 },
  { id: 'size', label: 'Size', minWidth: 80 },
  { id: 'price', label: 'Price', minWidth: 100 },
  { id: 'discount', label: 'Discount (%)', minWidth: 150 },
  { id: 'finalPrice', label: 'Final Price', minWidth: 120 },
  { id: 'actions', label: 'Actions', minWidth: 100 },
];

const DiscountProducts = () => {
  const dispatch = useDispatch();
  const { discounts = [], totalOffers = 0, loading } = useSelector((state) => state.adminDiscountState);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(getDiscountProducts(page + 1, rowsPerPage));
  }, [dispatch, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows = discounts.map((product, index) => ({
    sino: index + 1 + page * rowsPerPage,
    productId: product.productId,
    name: product.name,
    productCode: product.productCode,
    color: <div className="capitalize">{product.color}</div>,
    category: <div className="capitalize">{product.category}</div>,
    image: (
      <img
        src={product.image}
        alt={product.name}
        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }}
      />
    ),
    size: product.size,
    price: (
      <div className="flex items-center justify-center">
        <FaRupeeSign />
        {product.price}
      </div>
    ),
    discount: `${product.discount}%`,
    finalPrice: (
      <div className="flex items-center">
        <FaRupeeSign />
        {product.finalPrice.toFixed(2)}
      </div>
    ),
    actions: (
      <div className="flex justify-center items-center gap-4 text-primary">
        <Link to={`/admin/productslist/productinventory/${product.productId}`}>
          <FaEdit size={17} />
        </Link>
      </div>
    ),
  }));

  return (
    <div className="p-6 bg-gray-50 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Discount Products</h1>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="discount product table">
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
                      color: '#fff',
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
                message="No Discount Products Found"
              />
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={totalOffers}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default DiscountProducts;
