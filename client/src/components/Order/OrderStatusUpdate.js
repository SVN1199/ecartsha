import FormatDate from '../../components/layouts/FormatDate';

const OrderStatusUpdate = ({ status, date }) => {
    const renderStatus = () => {
        if (status === 'Processing') {
            return <>Order is being processed since <br /> <FormatDate date={date} /></>;
        } else if (status === 'Shipped') {
            return <>Order was shipped on <br /> <FormatDate date={date} /></>;
        } else if (status === 'Out For Delivery') {
            return <>Order is out for delivery as of <br /> <FormatDate date={date} /></>;
        } else {
            return 'Your order has been delivered';
        }
    };

    return <span className='font-semibold opacity-65 '>{renderStatus()}</span>;
};

export default OrderStatusUpdate;