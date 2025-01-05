import React, { useEffect, useState } from 'react';
import { cancelReturnOrder, getReturnOrder, returnOrderPost } from '../../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearReturnOrder } from '../../slices/returnOrderSlice';
import { useParams } from 'react-router-dom';

const ReturnOrder = () => {
  const [reason, setReason] = useState('');
  const dispatch = useDispatch();

  const { orderId, orderItemId } = useParams();
  const { returnOrder, isReturnOrderPost } = useSelector((state) => state.returnOrderState);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('reason', reason);
    dispatch(returnOrderPost(formData, orderId, orderItemId));
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel your return request?')) {
      dispatch(cancelReturnOrder(orderId, orderItemId));
    }
  };

  useEffect(() => {
    if (isReturnOrderPost) {
      toast('Request for Return Successful', {
        type: 'success',
        position: 'bottom-center',
        onOpen: () => dispatch(clearReturnOrder()),
      });
    }

    dispatch(getReturnOrder(orderId, orderItemId));
  }, [dispatch, isReturnOrderPost, orderId, orderItemId]);

  const renderReturnForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="reason" className="block text-gray-800 font-medium mb-2">
          Reason for Return
        </label>
        <textarea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Please describe the reason for your return..."
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
          rows="6"
          required
        ></textarea>
      </div>
      <div className="flex justify-center space-x-4">
        <button
          type="submit"
          disabled={!reason}
          className="w-full sm:w-auto bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-200"
        >
          Submit Return Request
        </button>
      </div>
    </form>
  );

  const renderReturnDetails = () => (
    <div className="space-y-4">
      <div className="text-lg text-gray-700">
        <strong>Reason:</strong> <span className="capitalize">{returnOrder?.reason}</span>
      </div>
      <div className="text-lg text-gray-700">
        <strong>Status:</strong> {returnOrder?.status}
      </div>
      {returnOrder?.status === 'Cancelled' && (
        <div>This Order is not eligible for making a return request again</div>
      )}
      {returnOrder.status !== 'Cancelled' && (
        <>
          <div className="text-lg text-gray-700">
            <strong>Requested Date:</strong> {new Date(returnOrder.requestDate).toLocaleString()}
          </div>
          <button
            type="button"
            onClick={handleCancel}
            className="w-full sm:w-auto bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-500 transition duration-200"
          >
            Cancel Return Request
          </button>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6 py-12">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Return Order</h1>
        {returnOrder?.reason ? renderReturnDetails() : renderReturnForm()}
      </div>
    </div>
  );
};

export default ReturnOrder;