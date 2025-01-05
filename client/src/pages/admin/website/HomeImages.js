import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateHomeImages } from '../../../actions/homeAction';
import { toast } from 'react-toastify';
import { clearMessage } from '../../../slices/homeSlice';

const HomeImages = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.homeState);

  const [productImages, setProductImages] = useState([]);
  const [productImagesPreview, setProductImagesPreview] = useState([]);
  const [error, setError] = useState("");

  const onProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + productImages.length > 6) {
      setError("You can only upload a maximum of 6 images.");
      return;
    }

    setError("");
    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setProductImagesPreview((oldArray) => [...oldArray, reader.result]);
            setProductImages((oldArray) => [...oldArray, file]);
          }
        };
        reader.readAsDataURL(file);
      } else {
        setError("Invalid file type. Only images are allowed.");
      }
    });
  };

  const handleRemoveImage = (index) => {
    setProductImages((prev) => prev.filter((_, idx) => idx !== index));
    setProductImagesPreview((prev) => prev.filter((_, idx) => idx !== index));
  };

  const onHandleImageUpload = (e) => {
    e.preventDefault();
    if (productImages.length === 0) {
      setError("Please select images to upload.");
      return;
    }

    const formData = new FormData();
    productImages.forEach((file) => formData.append("images", file));
    dispatch(updateHomeImages(formData));
    setProductImagesPreview([])
    setProductImages([])
  };

  useEffect(() => {
    if (message) {
      toast(message, {
        type: 'success',
        position: 'bottom-center',
        onClose: () => dispatch(clearMessage()),
      });
    }
  }, [dispatch, message]);

  return (
    <div className="min-h-screen flex flex-col items-center py-10 bg-gray-50">
      <form onSubmit={onHandleImageUpload} className="w-full max-w-lg">
        <div className="flex flex-col items-center gap-6">
          {error && (
            <div className="w-full text-red-500 text-center font-semibold">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 w-full">
            {productImagesPreview.map((image, index) => (
              <div
                key={index}
                className="relative w-full h-48 bg-gray-200 rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105"
              >
                <img
                  src={image}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                  onClick={() => handleRemoveImage(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            id="upload-images"
            onChange={onProductImagesChange}
            required
          />
          <label
            htmlFor="upload-images"
            className="w-full py-3 bg-blue-500 text-white font-semibold text-center rounded-lg shadow-lg cursor-pointer hover:bg-blue-600 transition duration-300"
          >
            Select Images
          </label>

          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 transition duration-300 mt-4"
          >
            Upload Images
          </button>
        </div>
      </form>
    </div>
  );
};

export default HomeImages;