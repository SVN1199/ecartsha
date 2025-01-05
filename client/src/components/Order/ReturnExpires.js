import { Link } from "react-router-dom";

const ReturnExpires = ({ created, expiresTo, available, orderId, singleOrderId }) => {
  if (!available) return <span className="font-light text-end italic">This product has no return policy</span>; 

  const createdDate = new Date(created);
  const expiryDate = new Date(createdDate);
  expiryDate.setDate(createdDate.getDate() + Number(expiresTo));

  const currentDate = new Date();

  const formattedExpiryDate = expiryDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const isExpired = currentDate > expiryDate;

  return (
    <div className="p-2 border rounded-lg shadow-sm bg-white text-gray-700 space-y-2">
      <div className="font-semibold text-end">
        {isExpired ? (
          <span className="text-red-600 font-semibold">Return Period Expired</span>
        ) : (
          <span className="text-green-600">Return Expires On:</span>
        )}
      </div>

      {!isExpired && (
        <div className="text-end text-gray-600 text-sm">{formattedExpiryDate}</div>
      )}

      {!isExpired && (
        <div className="flex justify-end">
          <Link
            to={`/returnorder/${orderId}/${singleOrderId}`}
            className="inline-block bg-blue-700 text-white font-bold py-2 px-4 mt-3 rounded hover:bg-blue-800 transition-all"
          >
            Return Product Request
          </Link>
        </div>
      )}
    </div>
  );
};

export default ReturnExpires;