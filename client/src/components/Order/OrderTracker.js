import React from 'react';
import OrderStatusUpdate from './OrderStatusUpdate';

const OrderTracker = ({ status , date}) => {
    const statuses = ["Processing", "Shipped", "Out of Delivery", "Delivered"];

    const currentStatusIndex = statuses.indexOf(status);

    return (
        <div className="w-full mt-3">
            <div className="relative flex items-center">
                <div className="absolute w-full h-1 bg-gray-300"></div>
                <div
                    className="absolute h-1 bg-green-500 transition-all duration-500 rounded-full"
                    style={{
                        width: `${(currentStatusIndex / (statuses.length - 1)) * 100}%`,
                    }}
                ></div>
            </div>

            <div className="w-full flex flex-row justify-between mt-2">
                {statuses.map((label, index) => (
                    <div
                        key={index}
                        className={`flex flex-col items-center`}
                    >
                        <div
                            className={`w-2 h-2 rounded-full ${
                                index <= currentStatusIndex
                                    ? "bg-green-500"
                                    : "bg-gray-300"
                            }`}
                        ></div>
                        
                        <span
                            className={`mt-1 text-sm ${
                                index <= currentStatusIndex
                                    ? "text-green-500 font-semibold"
                                    : "text-gray-500"
                            }`}
                        >
                            {label}
                        </span>

                    </div>
                ))}
            </div>

            <div className='w-full text-center mt-5'>
                <OrderStatusUpdate status={status} date={date}/>
            </div>
        </div>
    );
};

export default OrderTracker;