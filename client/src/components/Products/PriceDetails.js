import { FaRupeeSign } from "react-icons/fa";

const PriceDetails = ({ products, disableButton, priceDetails, handlePlaceOrder, text }) => {
  return (
    <div className='relative sm:relative lg:fixed flex flex-col p-2 gap-4 right-1 h-80  w-full sm:w-full lg:w-1/4 bg-white text-green-800 rounded'>
      <div className='uppercase px-5 rounded p-2 font-bold mb-1 text-center'>
        Price Details
        <div className="productDetailBorder mt-2"></div>
      </div>
      <div className='w-full flex flex-col px-5 gap-5 items-center'>
        {priceDetails.map((item, index) => (
          <div className='w-full flex flex-row justify-between' key={index}>
            <div className='text-right font-bold text-sm '>{item.name}</div>
            <div className={`${item.color} font-semibold text-left w-20 flex flex-row items-center text-sm gap-1`}>
              <span><FaRupeeSign /> </span>
              <span>{item.value}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div
        onClick={products.length > 0 && !disableButton ? handlePlaceOrder : null}  
        className={`absolute bottom-2 cursor-pointer w-full p-2 uppercase justify-center items-center left-1 font-semibold text-center rounded right-0
          ${disableButton || products.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary text-white'}`}
        style={{ pointerEvents: disableButton || products.length === 0 ? 'none' : 'auto' }} 
      >
        {text}
      </div>
    </div>
  );
};

export default PriceDetails;
