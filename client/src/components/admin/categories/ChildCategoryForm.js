import { FaPlus } from "react-icons/fa";
import { addChildCategory, getCategories } from "../../../actions/categoriesActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {toast}  from 'react-toastify'

const ChildCategoryForm = ({ categories }) => {
  const dispatch = useDispatch();

  const {error} = useSelector((state) => state.categoriesState)

  const [childCategory, setChildCategory] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState('');

  const isValidArray = Array.isArray(categories);

  const handleCategorySelect = (e) => {
    setSelectedCategoryId(e.target.value);
    setSelectedSubCategoryId('');
  };

  const handleSubCategorySelect = (e) => {
    setSelectedSubCategoryId(e.target.value);
    setChildCategory('');
  };

  const handleChildCategory = (e) => {
    e.preventDefault();
    if (childCategory !== '' && selectedCategoryId !== '' && selectedSubCategoryId !== '') {
      const formData = new FormData();
      formData.append('categoryId', selectedCategoryId);
      formData.append('subCategoryId', selectedSubCategoryId);
      formData.append('childcategoryname', childCategory);

      dispatch(addChildCategory(formData)).then(() => {
        dispatch(getCategories());
      });

      setChildCategory('');
      setSelectedCategoryId('');
      setSelectedSubCategoryId('');
    }
  };

  useEffect(() => {

    if (selectedCategoryId && isValidArray) {
      const selectedCategory = categories.find(cat => cat._id === selectedCategoryId);
      if (selectedCategory && selectedCategory.subCategories?.length > 0) {
        setSelectedSubCategoryId(selectedCategory.subCategories[0].subCategory._id);
      } else {
        setSelectedSubCategoryId('');
      }
    }
  }, [selectedCategoryId, categories, isValidArray]);

  useEffect(()=>{
    toast(error, {
      position : 'bottom-center',
      type : 'error'
    })
  },[error])

  return (
    <form 
  onSubmit={handleChildCategory} 
  className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-4 space-y-4"
>
  {/* Category Selection */}
  <div className="flex flex-col">
    <label htmlFor="categorySelect" className="text-sm font-medium text-gray-700 mb-2">
      Select Category
    </label>
    <select
      name="categorySelect"
      id="categorySelect"
      value={selectedCategoryId}
      onChange={handleCategorySelect}
      className="w-full capitalize p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
    >
      {isValidArray && categories.length > 0 ? (
        categories.map(item => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))
      ) : (
        <option value="" disabled>No categories available</option>
      )}
    </select>
  </div>

  {/* Subcategory Selection */}
  <div className="flex flex-col">
    <label htmlFor="subCategorySelect" className="text-sm font-medium text-gray-700 mb-2">
      Select Sub Category
    </label>
    <select
      name="subCategorySelect"
      id="subCategorySelect"
      value={selectedSubCategoryId}
      onChange={handleSubCategorySelect}
      className="w-full capitalize p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
    >
      {selectedCategoryId && isValidArray && categories.find(cat => cat._id === selectedCategoryId)?.subCategories?.length > 0 ? (
        categories.find(cat => cat._id === selectedCategoryId).subCategories.map(sub => (
          <option key={sub.subCategory._id} value={sub.subCategory._id}>
            {sub.subCategory.name}
          </option>
        ))
      ) : (
        <option value="" disabled>No subcategories available</option>
      )}
    </select>
  </div>

  {/* Add Child Category */}
  <div className="flex flex-col">
    <label htmlFor="childcategoryname" className="text-sm font-medium text-gray-700 mb-2">
      Add Child Category
    </label>
    <div className="flex items-center gap-3">
      <input
        type="text"
        id="childcategoryname"
        name="childcategoryname"
        value={childCategory}
        onChange={(e) => setChildCategory(e.target.value)}
        placeholder="Enter child category name"
        className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
      />
      <button
        type="submit"
        className="p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition duration-300"
      >
        <FaPlus className="text-lg" />
      </button>
    </div>
  </div>
</form>

  );
};

export default ChildCategoryForm;
