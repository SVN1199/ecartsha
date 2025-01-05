import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDistancePrice, deleteDistancePrice, getDistancePrice, updateDistancePrice } from '../../../actions/ShippingPriceAction';
import { toast } from 'react-toastify';
import { clearError } from '../../../slices/authSlice';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ShippingPriceAllocate = () => {
  const { shippingPrices = [], error } = useSelector((state) => state.shippingPricesState);

  const [fromDistance, setFromDistance] = useState('');
  const [toDistance, setToDistance] = useState('');
  const [distancePrice, setDistancePrice] = useState('');
  const [changeButton, setChangeButton] = useState(false);
  const [distancePriceId, setDistancePriceId] = useState(null);

  const dispatch = useDispatch();

  const setUpdatePrices = (id) => {
    const prices = shippingPrices.find((item) => item._id === id);
    if (prices) {
      setFromDistance(prices.distanceStart);
      setToDistance(prices.distanceEnd);
      setDistancePrice(prices.distancePrice);
      setChangeButton(true);
      setDistancePriceId(id);
    }
  };

  const handleEditPrices = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const formData = new FormData();
    formData.append('distanceStart', fromDistance);
    formData.append('distanceEnd', toDistance);
    formData.append('distancePrice', distancePrice);
    dispatch(updateDistancePrice(formData, distancePriceId));
    resetForm();
  };

  const handleDeletePrices = (id) => {
    dispatch(deleteDistancePrice(id));
  };

  const createData = (from, to, price, action) => {
    return { from, to, price, action };
  };

  const rows = shippingPrices.map((item) =>
    createData(
      item.distanceStart,
      item.distanceEnd,
      item.distancePrice,
      <div className='flex flex-row justify-center items-center gap-4 text-md'>
        <div className='cursor-pointer' onClick={() => setUpdatePrices(item._id)}>
          <FaEdit color='green' />
        </div>
        <div className='cursor-pointer' onClick={() => handleDeletePrices(item._id)}>
          <FaTrash color='red' />
        </div>
      </div>
    )
  );

  const handleShippingPrices = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const formData = new FormData();
    formData.append('distanceStart', fromDistance);
    formData.append('distanceEnd', toDistance);
    formData.append('distancePrice', distancePrice);
    dispatch(createDistancePrice(formData));
    resetForm();
  };

  const validateForm = () => {
    if (!fromDistance || !toDistance || !distancePrice) {
      toast.error('All fields are required.', { position: 'bottom-center' });
      return false;
    }
    if (Number(fromDistance) >= Number(toDistance)) {
      toast.error("'From' distance must be less than 'To' distance.", { position: 'bottom-center' });
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setFromDistance('');
    setToDistance('');
    setDistancePrice('');
    setChangeButton(false);
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: 'bottom-center',
        onClose: () => dispatch(clearError()),
      });
    }
  }, [dispatch, error]);

  useEffect(() => {
    dispatch(getDistancePrice());
  }, [dispatch]);

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-green-600 tracking-tight">
          Shipping Prices
        </h1>
      </div>

      <form
        onSubmit={changeButton ? handleEditPrices : handleShippingPrices}
        className="flex flex-col sm:flex-wrap sm:flex-row items-center justify-center gap-6 sm:gap-8 p-4 sm:p-6 bg-white border border-gray-200 rounded-2xl shadow-lg"
      >
        <div className="flex flex-col items-center w-full sm:w-auto">
          <label
            htmlFor="fromDistance"
            className="text-sm sm:text-base font-semibold text-gray-700 mb-2"
          >
            From (Km)
          </label>
          <input
            type="number"
            id="fromDistance"
            name="fromDistance"
            value={fromDistance}
            onChange={(e) => setFromDistance(e.target.value)}
            className="w-full sm:w-24 text-center border border-gray-300 rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-green-500 hover:border-green-400 transition"
          />
        </div>

        <div className="flex flex-col items-center w-full sm:w-auto">
          <label
            htmlFor="toDistance"
            className="text-sm sm:text-base font-semibold text-gray-700 mb-2"
          >
            To (Km)
          </label>
          <input
            type="number"
            id="toDistance"
            name="toDistance"
            value={toDistance}
            onChange={(e) => setToDistance(e.target.value)}
            className="w-full sm:w-24 text-center border border-gray-300 rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-green-500 hover:border-green-400 transition"
          />
        </div>

        <div className="flex flex-col items-center w-full sm:w-auto">
          <label
            htmlFor="distancePrice"
            className="text-sm sm:text-base font-semibold text-gray-700 mb-2"
          >
            Price (Rs.)
          </label>
          <input
            type="number"
            id="distancePrice"
            name="distancePrice"
            value={distancePrice}
            onChange={(e) => setDistancePrice(e.target.value)}
            className="w-full sm:w-24 text-center border border-gray-300 rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-green-500 hover:border-green-400 transition"
          />
        </div>

        <button
          type="submit"
          className={`w-full sm:w-auto px-6 py-2 sm:py-3 text-white font-bold rounded-lg shadow-md transition-transform transform ${changeButton
            ? "bg-yellow-500 hover:bg-yellow-600"
            : "bg-green-500 hover:bg-green-700"
            } active:scale-95`}
        >
          {changeButton ? "Update" : "Add"}
        </button>
      </form>

      <div className="mt-6 sm:mt-10 overflow-x-auto">
        <TableContainer component={Paper} className="rounded-lg shadow-md">
          <Table className="min-w-full sm:min-w-[600px]" aria-label="shipping prices table">
            <TableHead>
              <TableRow>
                {["From (Km)", "To (Km)", "Price (Rs.)", "Action"].map((header) => (
                  <TableCell
                    key={header}
                    align="center"
                    className="font-bold bg-primary text-white text-sm sm:text-base"
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={index}
                  className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-green-100 transition-all`}
                >
                  <TableCell align="center">{row.from}</TableCell>
                  <TableCell align="center">{row.to}</TableCell>
                  <TableCell align="center">{row.price}</TableCell>
                  <TableCell align="center">
                    <button className="text-sm text-green-700 hover:underline">
                      {row.action}
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ShippingPriceAllocate;