const OrderProductsCard = ({isTrue, products, handleAddQty, handleSubQty, quantities, handleRemoveItem, handleShowDeliveryCharge}) => {
  return (
    <div>
     <div className={`p-1 ${isTrue && 'bg-primary'} bg-primary text-white font-bold rounded mb-2 text-sm h-10 w-full flex gap-4 items-center px-2`}>
          { !isTrue && <span className='px-2 rounded bg-white text-black'>3</span>}
         { !isTrue ? <span>Order Summary</span> : <span>Cart Items</span> }
        </div>
           {products.map((item, index) => (
          <div key={index} className='relative flex flex-row bg-white p-3 mb-3 gap-3 shadow-lg rounded text-black'>
            
            <div className='absolute left-1 bottom-1 z-20'>
              <button type='button' onClick={()=>handleShowDeliveryCharge(item.productId)} className='bg-gray-600 px-2 py-1 text-xs text-white cursor-pointer'>
                Delivery Price
              </button>
            </div>

            <div className='w-4/6 sm:w-4/6 lg:w-3/6 h-40 bg-white '>
              <img src={item.image} alt={item.name} className='w-full h-full rounded object-contain text-xs sm:text-xs lg:text-sm' />
            </div>
            <div className='relative w-full flex flex-col gap-2'>
              <div className='text-xs sm:text-xs lg:text-sm font-semibold'>{item.name}</div>
              <div className='text-sm flex flex-col gap-1'>
                <div><span className='font-bold text-gray-800 opacity-90'>Size</span>: <span className='font-bold'>{item.size}</span></div>
                <div><span className='font-bold text-gray-800 opacity-90'>Price</span>: <span className='font-bold'> Rs.{item.price}</span></div>
                <div><span className='font-bold text-gray-800 opacity-90'>Discount</span>: <span className='font-bold'>{item.discount}%</span></div>
                <div><span className='font-bold text-gray-800 opacity-90'>Gst</span>: <span className='font-bold'>{item.gst}%</span></div>
                <div><span className='font-bold text-gray-800 opacity-90'>Total Price</span>: <span className='font-bold'>Rs.{item.finalPrice}</span></div>
              </div>
              {item.qty === 0 ? (
                <div className='text-red-600 font-semibold'>Out Of Stock</div>
              ) : (
                <div className='flex flex-row gap-2 text-sm'>
                  <div onClick={() => handleSubQty(`${item.productId}|${item.size}`)} className='bg-red-500 px-2 rounded text-white cursor-pointer'>-</div>
                  <div>{quantities[`${item.productId}|${item.size}`] || 1}</div>
                  <div onClick={() => handleAddQty(`${item.productId}|${item.size}`, item.qty)} className='bg-green-500 px-2 rounded text-white cursor-pointer'>+</div>
                </div>
              )}
              <div onClick={() => handleRemoveItem(item.productId, item.size)} className='absolute right-0 bottom-1 bg-black p-1.5 sm:p-1.5 lg:p-2 cursor-pointer rounded text-white text-xs sm:text-xs lg:text-sm font-light sm:font-light lg:font-semibold'>
                <span>Remove</span>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default OrderProductsCard