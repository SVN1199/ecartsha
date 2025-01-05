import { Table, Paper, TableCell, TableContainer, TableRow, TableHead, TableBody } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addProductDetails, deleteProductDetail, getProductDetails } from '../../../actions/admin/adminProductsAction';
import { useParams } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { clearProductError } from '../../../slices/admin/adminProductSlice';

const Details = () => {

    const dispatch = useDispatch()
    const { productId } = useParams()

    const { product = [], error } = useSelector((state) => state.adminProductState)

    const [detailKey, setDetailKey] = useState('')
    const [detailValue, setDetailValue] = useState('')

    const handleDelete = (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this item?');
        if (isConfirmed) {
            dispatch(deleteProductDetail(productId, id));
        }
    }


    const handleInventorySubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('detailKey', detailKey)
        formData.append('detailValue', detailValue)
        dispatch(addProductDetails(productId, formData))
        setDetailKey('')
        setDetailValue('')
    }


    useEffect(() => {
        toast(error, {
            type: 'error',
            position: 'top-center',
            onOpen: () => dispatch(clearProductError())
        })
    }, [error, dispatch])

    useEffect(() => {
        dispatch(getProductDetails(productId))
    }, [dispatch, productId])



    return (
        <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg">
            <div className="mb-6">
                <h1 className="text-3xl font-extrabold text-green-600 tracking-tight">
                    Products Details
                </h1>
            </div>

            <div className="w-full p-6 bg-white rounded-lg shadow-md">
                <div className="text-sm mb-6">
                    <div className="flex flex-row items-center gap-3">
                        <span className="font-bold text-gray-600">Product ID :</span>
                        <span className="text-gray-900 text-base">{productId}</span>
                    </div>
                </div>

                <div className="w-full bg-gray-50 shadow-sm px-6 py-6 rounded-lg">
                    <form
                        onSubmit={handleInventorySubmit}
                        className="flex flex-col md:flex-row gap-4"
                    >
                        <input
                            type="text"
                            className="p-3 w-full md:w-48 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                            required
                            placeholder="Key"
                            name="detailKey"
                            value={detailKey}
                            onChange={(e) => setDetailKey(e.target.value)}
                        />

                        <input
                            type="text"
                            className="p-3 w-full md:w-48 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                            required
                            placeholder="Value"
                            name="detailValue"
                            value={detailValue}
                            onChange={(e) => setDetailValue(e.target.value)}
                        />

                        <button
                            type="submit"
                            className="px-6 py-3 bg-green-600 text-white text-sm font-semibold rounded-lg shadow hover:bg-green-700 transition-all"
                        >
                            Add
                        </button>
                    </form>
                </div>

                <div className="w-full bg-gray-200 shadow-md rounded-lg mt-6">
                    <div className="overflow-x-auto">
                        <TableContainer
                            component={Paper}
                            className="rounded-lg border border-gray-200 max-h-96 overflow-y-auto"
                        >
                            <Table
                                stickyHeader
                                sx={{ minWidth: 550 }}
                                size="small"
                                aria-label="product details table"
                                className="table-auto w-full"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" className="px-4 py-2 bg-gray-100 sticky top-0 z-10">
                                            <div className="text-emerald-700 font-semibold text-sm lg:text-base">
                                                Key
                                            </div>
                                        </TableCell>
                                        <TableCell align="center" className="px-4 py-2 bg-gray-100 sticky top-0 z-10">
                                            <div className="text-emerald-700 font-semibold text-sm lg:text-base">
                                                Value
                                            </div>
                                        </TableCell>
                                        <TableCell align="center" className="px-4 py-2 bg-gray-100 sticky top-0 z-10">
                                            <div className="text-emerald-700 font-semibold text-sm lg:text-base">
                                                Actions
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {product.length > 0 ? (
                                        product.map((detail) => (
                                            <TableRow
                                                key={detail?._id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                className="hover:bg-gray-100"
                                            >
                                                <TableCell align="center" className="px-4 py-2 capitalize text-gray-700 text-sm lg:text-base">
                                                    {detail?.key}
                                                </TableCell>
                                                <TableCell align="center" className="px-4 py-2 capitalize text-gray-700 text-sm lg:text-base">
                                                    {detail?.value}
                                                </TableCell>
                                                <TableCell align="center" className="px-4 py-2">
                                                    <div className="flex justify-center items-center gap-3">
                                                        <FaTrash
                                                            className="cursor-pointer text-red-500 hover:scale-110 transition-transform"
                                                            onClick={() => handleDelete(detail?._id)}
                                                        />
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={3}
                                                align="center"
                                                className="text-gray-500 py-4 text-sm lg:text-base"
                                            >
                                                No data available.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details;
