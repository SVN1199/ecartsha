const OrderStatus = ({ status }) => {
    const statusColor = 
        status === 'Delivered' ? 'text-green-500' 
        : status === 'Processing' ? 'text-yellow-600'
        : status === 'Shipped' ? 'text-blue-500'
        : 'text-gray-500'; 

    return <span className={`${statusColor} font-semibold`}>{status}</span>;
};

export default OrderStatus;