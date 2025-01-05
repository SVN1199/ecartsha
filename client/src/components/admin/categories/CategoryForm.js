import React, { useState } from 'react'
import { addMainCategory, getCategories } from '../../../actions/categoriesActions'
import { FaPlus } from 'react-icons/fa'
import { useDispatch } from 'react-redux'

const CategoryForm = () => {

  const [category, setCategory] = useState('')

  const dispatch = useDispatch()

  const handleCategory = (e) => {
    e.preventDefault()
    if (category !== '') {
      const formData = new FormData()
      formData.append('categoryname', category)
      dispatch(addMainCategory(formData)).then(() => {
        dispatch(getCategories())
      })
      setCategory('')
    }
  }

  return (
    <form onSubmit={handleCategory} className="w-full max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col">

        <label htmlFor="categoryname" className="text-sm font-medium mb-2 text-gray-700">
          Add New Category
        </label>

        <div className="flex items-center gap-2">
          <input
            type="text"
            id="categoryname"
            className="flex-1 p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
            placeholder="Enter category name"
            name="categoryname"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <button
            type="submit"
            className="flex items-center justify-center p-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg shadow transition duration-300"
          >
            <FaPlus className="text-lg" />
          </button>
        </div>
      </div>
    </form>

  )
}

export default CategoryForm