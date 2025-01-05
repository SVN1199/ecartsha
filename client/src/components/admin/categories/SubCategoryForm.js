import React, { useEffect, useState } from 'react'
import { addSubCategory, getCategories } from '../../../actions/categoriesActions'
import { FaPlus } from 'react-icons/fa'
import { useDispatch } from 'react-redux'

const SubCategoryForm = ({ categories }) => {

  const dispatch = useDispatch()
  const [subCategory, setSubCategory] = useState('')
  const [selectedCategoryId, setSelectedCategoryId] = useState('')

  const handleCategorySelect = (e) => {
    setSelectedCategoryId(e.target.value)
  }

  const handleSubCategory = (e) => {
    e.preventDefault()
    if (subCategory !== '') {
      const formData = new FormData()
      formData.append('categoryId', selectedCategoryId)
      formData.append('subcategoryname', subCategory)
      dispatch(addSubCategory(formData)).then(() => {
        dispatch(getCategories())
      })
      setSubCategory('')
      setSelectedCategoryId('')
    }
  }

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategoryId(categories[0]._id)
    }
  }, [categories])

  return (
    <form
      onSubmit={handleSubCategory}
      className="w-full max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg space-y-4"
    >
      <div className="flex flex-col">
        <label htmlFor="categorySelect" className="text-sm font-medium text-gray-700 mb-2">
          Select Category
        </label>
        <select
          name="categorySelect"
          id="categorySelect"
          value={selectedCategoryId}
          onChange={handleCategorySelect}
          className="w-full capitalize p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
        >
          {categories.length > 0 ? (
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

      <div className="flex flex-col space-y-2">
        <label htmlFor="subcategoryname" className="text-sm font-medium text-gray-700">
          Add Sub Category
        </label>
        <div className="flex items-center gap-3">
          <input
            type="text"
            id="subcategoryname"
            name="subcategoryname"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            placeholder="Enter subcategory name"
            className="flex-1 p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
          />
          <button
            type="submit"
            className="flex items-center justify-center p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition duration-300"
          >
            <FaPlus className="text-lg" />
          </button>
        </div>
      </div>
    </form>
  )
}

export default SubCategoryForm