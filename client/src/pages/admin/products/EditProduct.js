import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  clearProductError,
  clearUpdateProduct,
} from '../../../slices/admin/adminProductSlice';
import {
  getProductUpdate,
  updateProduct,
} from '../../../actions/admin/adminProductsAction';
import { getCategoriesForCreateProduct } from '../../../actions/categoriesActions';

const EditProduct = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();

  const { categories = [] } = useSelector((state) => state.categoriesState);
  const {
    product = { images: [] },
    isProductUpdated,
    error,
  } = useSelector((state) => state.adminProductState);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    images: [],
  });
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: 'bottom-center',
        onOpen: () => dispatch(clearProductError()),
      });
    }
  }, [error, dispatch]);

  useEffect(() => {
    dispatch(getProductUpdate(productId));
    dispatch(getCategoriesForCreateProduct());
  }, [dispatch, productId]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || '',
        images: [],
      });
      setPreviewImages([]);
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const handleImageRemove = (index) => {
    const updatedImages = [...previewImages];
    const updatedFormDataImages = [...formData.images];

    updatedImages.splice(index, 1);
    updatedFormDataImages.splice(index, 1);

    setPreviewImages(updatedImages);
    setFormData({ ...formData, images: updatedFormDataImages });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updateData = new FormData();
    updateData.append('name', formData.name);
    updateData.append('category', formData.category);
    formData.images.forEach((file) => updateData.append('images', file));
    dispatch(updateProduct(productId, updateData));
  };

  useEffect(() => {
    if (isProductUpdated) {
      toast.success('Product Updated Successfully', {
        position: 'bottom-center',
        onOpen: () => dispatch(clearUpdateProduct()),
      });
    }
  }, [isProductUpdated, dispatch]);

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg">
            <div className="mb-6">
                <h1 className="text-3xl font-extrabold text-green-600 tracking-tight">
                Update Product
                </h1>
            </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block font-semibold text-gray-700 mb-2">
            Product Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none border-green-300"
            placeholder="Enter product name"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block font-semibold text-gray-700 mb-2">
            Category:
          </label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg capitalize focus:ring-2 focus:ring-green-500 focus:outline-none border-green-300"
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((cat) => (
              <option key={cat.categoryId} value={cat.categoryId}>
                {cat.categoryName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="font-semibold text-gray-700 mb-2">Existing Images:</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {product?.images?.map((item, index) => (
              <img
                key={index}
                src={item?.image}
                alt={`Existing Image ${index + 1}`}
                className="w-full h-32 object-contain rounded-lg shadow-md"
              />
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="images" className="block font-semibold text-gray-700 mb-2">
            Upload New Images:
          </label>
          <input
            type="file"
            id="images"
            name="images"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none border-green-300"
          />
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {previewImages.map((src, index) => (
              <div key={index} className="relative group">
                <img
                  src={src}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg shadow-md transform group-hover:scale-105 transition duration-200"
                />
                <button
                  type="button"
                  onClick={() => handleImageRemove(index)}
                  className="absolute top-0 right-0 bg-red-600 text-white text-xs p-1 rounded-full shadow"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition duration-200 focus:ring-2 focus:ring-green-500 focus:outline-none"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;