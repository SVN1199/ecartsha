import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleReturnOrder, updateSingleReturnOrderStatus } from '../../../actions/admin/adminOrdersAction';
import { toast } from 'react-toastify';
import { clearSingleReturnOrder } from '../../../slices/admin/adminOrderSlice';

const SingleReturnOrder = () => {
    const dispatch = useDispatch();
    const { orderId, orderItemId } = useParams();

    const { returnOrder = {}, isUpdated, error } = useSelector((state) => state.adminOrderState);
    const {
        user = {},
        orderItem = {},
        returnProductCost = 0,
        shippingPrice = 0,
        shippingInfo = {},
    } = returnOrder;

    const [status, setStatus] = useState('');

    useEffect(() => {
        if (orderId && orderItemId) {
            dispatch(getSingleReturnOrder(orderId, orderItemId));
        }

        if (isUpdated) {
            toast('Status Updated Successfully', {
                type: 'success',
                position: 'bottom-center',
                onOpen: () => dispatch(clearSingleReturnOrder())
            })
        }

        if (error) {
            toast(error, {
                type: 'error',
                position: 'bottom-center',
                onOpen: () => dispatch(clearSingleReturnOrder())
            })
        }

    }, [dispatch, orderId, orderItemId, isUpdated, error]);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updateSingleReturnOrderStatus(orderId, orderItemId, status));
    };

    return (
        <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg">
            <div className="mb-6">
                <h1 className="text-3xl font-extrabold text-green-600 tracking-tight">
                    Return Order Details
                </h1>
            </div>

            <div className="mb-6 p-6 bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">User Information</h3>
                <p><span className="font-medium text-gray-600">Name:</span> {user.name || 'N/A'}</p>
                <p><span className="font-medium text-gray-600">Email:</span> {user.email || 'N/A'}</p>
            </div>

            <div className="mb-6 p-6 bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Order Item Information</h3>
                <p><span className="font-medium text-gray-600">Order Item ID:</span> {orderItem.orderItemsId || 'N/A'}</p>
                <p><span className="font-medium text-gray-600">Reason:</span> {orderItem.reason || 'N/A'}</p>
                <p><span className="font-medium text-gray-600">Status:</span> {orderItem.status || 'N/A'}</p>
                <p>
                    <span className="font-medium text-gray-600">Request Date:</span>
                    {orderItem.requestDate ? new Date(orderItem.requestDate).toLocaleString() : 'N/A'}
                </p>
                <p>
                    <span className="font-medium text-gray-600">Resolution Date:</span>
                    {orderItem.resolutionDate ? new Date(orderItem.resolutionDate).toLocaleString() : 'N/A'}
                </p>
            </div>

            <div className="mb-6 p-6 bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Cost Breakdown</h3>
                <p><span className="font-medium text-gray-600">Return Product Cost:</span> ₹{returnProductCost}</p>
                <p><span className="font-medium text-gray-600">Shipping Price:</span> ₹{shippingPrice}</p>
            </div>

            <div className="mb-6 p-6 bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Shipping Information</h3>
                <p><span className="font-medium text-gray-600">Address:</span> {shippingInfo.address || 'N/A'}</p>
                <p><span className="font-medium text-gray-600">City:</span> {shippingInfo.city || 'N/A'}</p>
                <p><span className="font-medium text-gray-600">Country:</span> {shippingInfo.country || 'N/A'}</p>
                <p><span className="font-medium text-gray-600">Postal Code:</span> {shippingInfo.postalCode || 'N/A'}</p>
                <p><span className="font-medium text-gray-600">Phone:</span> {shippingInfo.phoneNo || 'N/A'}</p>
            </div>

            <div className="mt-6 p-6 bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Change Status</h3>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <label className="font-medium text-gray-600 mb-2" htmlFor="status">Select Status:</label>
                    <select
                        id="status"
                        className="p-3 border-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                    <button
                        type="submit"
                        className="py-3 px-6 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transform transition-all duration-200 ease-in-out"
                    >
                        Update Status
                    </button>
                </form>
            </div>
        </div>

    );
};

export default SingleReturnOrder;
