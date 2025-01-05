import { Table, TableCell, TableContainer, TableRow, TableHead, TableBody } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addProductInventory, deleteProductInventory, getProductInventory, updateProductInventory } from '../../../actions/admin/adminProductsAction';
import { useParams } from 'react-router-dom';
import { FaEdit, FaRupeeSign, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { clearProductError } from '../../../slices/admin/adminProductSlice';

const Inventory = () => {

    const dispatch = useDispatch()
    const { productId } = useParams()

    const { product = [], error } = useSelector((state) => state.adminProductState)

    const [size, setSize] = useState('')
    const [qty, setQty] = useState('')
    const [price, setPrice] = useState('')
    const [discount, setDiscount] = useState('')


    const [openPopUp, setOpenPopUp] = useState(false)
    const [productInventory, setProductInventory] = useState({})
    const [inventoryId, setInventoryId] = useState(null)

    const handlePopUp = (id) => {
        setOpenPopUp(true)
        const productInventory = product.find((item) => item._id === id);
        setInventoryId(productInventory._id)
        setProductInventory(productInventory)
    }

    const handleDelete = (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this item?');

        if (isConfirmed) {
            dispatch(deleteProductInventory(productId, id));
        }
    }


    const handleInventorySubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('size', size)
        formData.append('qty', qty)
        formData.append('price', price)
        formData.append('discount', discount)
        dispatch(addProductInventory(productId, formData))
        setSize('')
        setQty('')
        setPrice('')
        setDiscount('')
    }


    useEffect(() => {
        toast(error, {
            type: 'error',
            position: 'top-center',
            onOpen: () => dispatch(clearProductError())
        })
    }, [error, dispatch])

    useEffect(() => {
        dispatch(getProductInventory(productId))
    }, [dispatch, productId])



    return (
        <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg">
            <div className="mb-6">
                <h1 className="text-3xl font-extrabold text-green-600 tracking-tight">
                Product Inventory
                </h1>
            </div>

            <div className="w-full text-base mb-6">
                <div className="flex items-center gap-2 text-gray-700">
                    <span className="font-semibold text-gray-500">Product ID:</span>
                    <span>{productId}</span>
                </div>
            </div>

            <div className="w-full bg-white border border-green-100 p-5 rounded-xl shadow-md">
                <form
                    onSubmit={handleInventorySubmit}
                    className="flex flex-wrap gap-4 items-center justify-start"
                >
                    <input
                        type="text"
                        className="p-2 w-32 rounded-lg border border-green-300 focus:ring-2 focus:ring-green-500 outline-none"
                        placeholder="Size"
                        name="size"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        className="p-2 w-32 rounded-lg border border-green-300 focus:ring-2 focus:ring-green-500 outline-none"
                        placeholder="Qty"
                        name="qty"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        className="p-2 w-32 rounded-lg border border-green-300 focus:ring-2 focus:ring-green-500 outline-none"
                        placeholder="Price"
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        className="p-2 w-32 rounded-lg border border-green-300 focus:ring-2 focus:ring-green-500 outline-none"
                        placeholder="Discount"
                        name="discount"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out"
                    >
                        Add
                    </button>
                </form>
            </div>

            <div className="w-full bg-white mt-8 rounded-xl shadow-md overflow-x-auto">
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} size="medium">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">
                                    <span className="text-green-700 font-bold">Size</span>
                                </TableCell>
                                <TableCell align="center">
                                    <span className="text-green-700 font-bold">Quantity</span>
                                </TableCell>
                                <TableCell align="center">
                                    <span className="text-green-700 font-bold flex items-center justify-center">
                                        Price (<FaRupeeSign />)
                                    </span>
                                </TableCell>
                                <TableCell align="center">
                                    <span className="text-green-700 font-bold">Discount (%)</span>
                                </TableCell>
                                <TableCell align="center">
                                    <span className="text-green-700 font-bold flex items-center justify-center">
                                        Final Price (<FaRupeeSign />)
                                    </span>
                                </TableCell>
                                <TableCell align="center">
                                    <span className="text-green-700 font-bold">Actions</span>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {product.length > 0 &&
                                product.map((inventory) => (
                                    <TableRow
                                        key={inventory._id}
                                        className="hover:bg-gray-50 transition-all duration-200"
                                    >
                                        <TableCell align="center" className="uppercase">
                                            {inventory.size}
                                        </TableCell>
                                        <TableCell align="center">{inventory.qty}</TableCell>
                                        <TableCell align="center">{inventory.price}</TableCell>
                                        <TableCell align="center">{inventory.discount}</TableCell>
                                        <TableCell align="center">{inventory.finalPrice}</TableCell>
                                        <TableCell align="center">
                                            <div className="flex justify-center gap-4">
                                                <FaEdit
                                                    className="cursor-pointer text-blue-500 hover:text-blue-700 transition duration-200"
                                                    onClick={() => handlePopUp(inventory._id)}
                                                />
                                                <FaTrash
                                                    className="cursor-pointer text-red-500 hover:text-red-700 transition duration-200"
                                                    onClick={() => handleDelete(inventory._id)}
                                                />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            {openPopUp && (
                <PopupCard
                    inventoryId={inventoryId}
                    productId={productId}
                    setOpenPopUp={setOpenPopUp}
                    productInventory={productInventory}
                />
            )}
        </div>
    )
}

export default Inventory;

const PopupCard = ({ productId, inventoryId, setOpenPopUp, productInventory }) => {
    const dispatch = useDispatch();

    const [size, setSize] = useState('');
    const [qty, setQty] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');

    const handleProductInventoryUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('size', size);
        formData.append('qty', qty);
        formData.append('price', price);
        formData.append('discount', discount);
        dispatch(updateProductInventory(productId, inventoryId, formData));
        setOpenPopUp(false);
    };

    useEffect(() => {
        if (productInventory) {
            setSize(productInventory.size);
            setQty(productInventory.qty);
            setPrice(productInventory.price);
            setDiscount(productInventory.discount);
        }
    }, [productInventory]);

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg transform transition-all duration-300 scale-95 p-6 relative">
                <button
                    onClick={() => setOpenPopUp(false)}
                    className="absolute top-3 right-3 bg-red-100 text-red-600 rounded-full p-2 hover:bg-red-200 transition-all"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Edit Inventory</h2>
                <form onSubmit={handleProductInventoryUpdate} className="space-y-6">
                    <div className="flex flex-col">
                        <label htmlFor="size" className="text-sm font-medium text-gray-600 mb-2">
                            Size
                        </label>
                        <input
                            type="text"
                            id="size"
                            placeholder="Enter Size"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="qty" className="text-sm font-medium text-gray-600 mb-2">
                            Quantity
                        </label>
                        <input
                            type="number"
                            id="qty"
                            placeholder="Enter Quantity"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                            className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="price" className="text-sm font-medium text-gray-600 mb-2">
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            placeholder="Enter Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="discount" className="text-sm font-medium text-gray-600 mb-2">
                            Discount
                        </label>
                        <input
                            type="number"
                            id="discount"
                            placeholder="Enter Discount"
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                            className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <button
                            type="button"
                            onClick={() => setOpenPopUp(false)}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};