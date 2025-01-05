import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getSingleOrder, OrderStatusModify } from '../../../actions/admin/adminOrdersAction'

const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');

  return `${day}/${month}/${year} | ${hours}:${minutes}:${seconds}`;
};


const SingleOrder = () => {

  const { orderid } = useParams()
  const dispatch = useDispatch()

  const [orderStatus, setOrderStatus] = useState('')

  const { order = {} } = useSelector((state) => state.adminOrderState)

  const handleOrderStatus = (e) => {
    e.preventDefault()
    if (orderStatus !== '') {
      dispatch(OrderStatusModify(orderid, orderStatus))
    } else {
      return
    }
  }

  useEffect(() => {
    dispatch(getSingleOrder(orderid))
  }, [dispatch, orderid])

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg">
    <div className="mb-6">
      <h1 className="text-3xl font-extrabold text-green-600 tracking-tight">
      Order ID ({orderid}) 
      </h1>
    </div>
      <div className='w-full mt-5 mb-3 flex flex-col gap-3'>
        <div className='text-sm p-5 bg-white'>
          <div className='mb-2 font-semibold text-lg'>User Info</div>
          <div className='flex flex-col gap-2 w-3/6'>
            <div className='flex flex-row gap-2 justify-between'>
              <span className='w-2/5  text-gray-700'>Name  </span>
              <span className='w-full text-center'>:</span>
              <span className='w-full  text-gray-700'>{order?.user?.name}</span>
            </div>
            <div className='flex flex-row gap-2 justify-between'>
              <span className='w-2/5 text-gray-700'>Email  </span>
              <span className='w-full text-center'>:</span>
              <span className='w-full  text-gray-700'>{order?.user?.email}</span>
            </div>
            <div className='flex flex-row gap-2 justify-between'>
              <span className='w-2/5  text-gray-700'>Phone No</span>
              <span className='w-full text-center'>:</span>
              <span className='w-full  text-gray-700'>{order?.shippingInfo?.phoneNo}</span>
            </div>
            <div className='flex flex-row gap-2 justify-between'>
              <span className='w-2/5  text-gray-700'>Address</span>
              <span className='w-full text-center'>:</span>
              <span className='w-full  text-gray-700'>{order?.shippingInfo?.address}</span>
            </div>
            <div className='flex flex-row gap-2 justify-between'>
              <span className='w-2/5  text-gray-700'>City</span>
              <span className='w-full text-center'>:</span>
              <span className='w-full  text-gray-700'>{order?.shippingInfo?.city}</span>
            </div>
            <div className='flex flex-row gap-2 justify-between'>
              <span className='w-2/5  text-gray-700'>Country</span>
              <span className='w-full text-center'>:</span>
              <span className='w-full  text-gray-700'>{order?.shippingInfo?.country}</span>
            </div>
            <div className='flex flex-row gap-2 justify-between'>
              <span className='w-2/5  text-gray-700'>Pincode</span>
              <span className='w-full text-center'>:</span>
              <span className='w-full  text-gray-700'>{order?.shippingInfo?.postalCode}</span>
            </div>

          </div>
        </div>

        <div className='text-sm bg-white p-5'>
          <div className='mb-2 font-semibold text-lg'>Order Items</div>
          <div className='mt-3'>
            {
              order?.orderItems?.map((item) => (
                <div key={item?._id} className='flex flex-row bg-white p-2 mb-1 gap-3 rounded text-black'>
                  <div className='bg-white w-4/6 sm:w-4/6 lg:w-2/6 h-36  p-2 rounded'>
                    <img src={item.image} alt={item.name} className='w-full h-full rounded object-contain text-xs sm:text-xs lg:text-sm' />
                  </div>
                  <div className='relative w-full flex flex-col gap-2'>
                    <div className='text-sm sm:text-xs lg:text-sm font-bold text-gray-700'>{item.name}</div>
                    <div className='text-sm flex flex-col gap-2'>
                      <div><span className='font-semibold opacity-80'>ProductId</span>: <span>{item.product}</span></div>
                      <div><span className='font-semibold opacity-80'>Size</span>: <span>{item.size}</span></div>
                      <div><span className='font-semibold opacity-80'>Quantity</span>: <span>{item.quantity}</span></div>
                      <div><span className='font-semibold opacity-80'>Price</span>: <span>{item.price}</span></div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>

        <div className='text-sm bg-white px-5 py-2'>
          <div className='font-semibold text-lg'>
            <span className='font-semibold text-gray-700'>Order Status : </span>
            <span className='text-green-500'>{order?.orderStatus?.status}</span>
          </div>
        </div>

        <div className='text-sm bg-white p-5 w-full'>
        <div className='flex flex-col gap-2 w-3/6'>
        <div className='flex flex-row gap-2 justify-between'>
            <span className='w-full font-semibold text-gray-700'>Shipping Price </span>
            <span className='w-full text-center'>:</span> 
            <span className='w-full font-semibold text-gray-700'>Rs. {order?.shippingPrice}</span></div>
          <div className='flex flex-row gap-2 justify-between'>
            <span className='w-full font-semibold text-gray-700'>Total Price</span> 
            <span className='w-full text-center'>:</span> 
            <span className='w-full font-semibold text-gray-700'>Rs. {order?.totalPrice}</span></div>
          <div className='flex flex-row gap-2 justify-between'>
            <span className='w-full font-semibold text-gray-700'>Paid At</span>
            <span className='w-full text-center'>:</span> 
            <span className='w-full font-semibold text-gray-700'>{formatDate(order?.paidAt)}</span></div>
          <div className='flex flex-row gap-2 justify-between'>
            <span className='w-full font-semibold text-gray-700'>Created At</span>
            <span className='w-full text-center'>:</span> 
            <span className='w-full font-semibold text-gray-700'>{formatDate(order?.createdAt)}</span></div>
        </div>
        </div>
      </div>


      <div className="mb-2 font-semibold text-lg mt-5 w-2/5">
       <form onSubmit={handleOrderStatus}>
       <label htmlFor="status" className="block mb-1">Status</label>
        <div>
          <select 
            name="Status" 
            id="status" 
            onChange={(e) => setOrderStatus(e.target.value)} 
            defaultValue="" 
            className="w-full p-2 productInputBorder rounded text-sm outline-none">
            <option value="" disabled>Select Status</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out Of Delivery">Out Of Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
        <button className="p-2 cursor-pointer bg-primary text-white rounded-md text-sm inline-block mt-2">Action</button>
       </form>
      </div>


    </div>
  )
}

export default SingleOrder