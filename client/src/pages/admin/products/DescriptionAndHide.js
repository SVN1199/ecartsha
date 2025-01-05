import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDescriptionAndHide, updateProductDescriptionAndHide } from '../../../actions/admin/adminProductsAction';
import { useParams } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { clearProductError } from '../../../slices/admin/adminProductSlice';

const DescriptionAndHide = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { product = {}, error } = useSelector((state) => state.adminProductState);
  const [openPopUp, setOpenPopUp] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: 'bottom-center',
        onOpen: () => dispatch(clearProductError()),
      });
    }
  }, [error, dispatch]);

  useEffect(() => {
    dispatch(getProductDescriptionAndHide(productId));
  }, [dispatch, productId]);

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-green-600 tracking-tight">
          Product Description and Visibility
        </h1>
      </div>

      <div className="relative bg-green-50 rounded-xl shadow-lg p-6 mt-4">
        <div className="absolute top-3 right-3 cursor-pointer" onClick={() => setOpenPopUp(true)}>
          <FaEdit size={20} className="text-blue-600 hover:text-blue-800 transition duration-300" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-600">Visibility:</span>
            <span className="text-green-700">{product?.hide ? 'Hide' : 'Visible'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-600">Description:</span>
            <span>{product?.description || 'No description available.'}</span>
          </div>
        </div>
      </div>

      {openPopUp && (
        <UpdateDescriptionAndHide
          product={product}
          productId={productId}
          setOpenPopUp={setOpenPopUp}
        />
      )}
    </div>
  );
};

const UpdateDescriptionAndHide = ({ product, productId, setOpenPopUp }) => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [hide, setHide] = useState('false');

  useEffect(() => {
    if (product) {
      setDescription(product.description || '');
      setHide(product.hide ? 'true' : 'false');
    }
  }, [product]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('description', description);
    formData.append('hide', hide);
    dispatch(updateProductDescriptionAndHide(productId, formData));
    setOpenPopUp(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-3">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-6 relative">
        <button
          onClick={() => setOpenPopUp(false)}
          className="absolute top-3 right-3 p-1 bg-red-400 rounded-full text-gray-400 hover:text-red-500 transition duration-300"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold text-green-600 text-center mb-4">
          Edit Description and Visibility
        </h2>
        <form onSubmit={handleUpdate} className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label htmlFor="hide" className="font-semibold text-gray-600 mb-1">
              Visibility
            </label>
            <select
              id="hide"
              value={hide}
              onChange={(e) => setHide(e.target.value)}
              className="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none transition duration-300"
            >
              <option value="false">Visible</option>
              <option value="true">Hide</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="font-semibold text-gray-600 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description..."
              className="p-3 h-32 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none resize-none shadow-inner transition duration-300"
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => setOpenPopUp(false)}
              className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-md transition duration-300"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md transition duration-300"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DescriptionAndHide;