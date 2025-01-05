import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, updateCategory, updateChildCategory, updateSubCategory } from "../../../actions/categoriesActions";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { clearCategory } from "../../../slices/categorySlice";

const ViewCategories = () => {
  const { categories = [], loading } = useSelector((state) => state.categoriesState);
  const { isUpdated } = useSelector((state) => state.categoryState);

  const dispatch = useDispatch();

  const [toggledCategories, setToggledCategories] = useState({});
  const [toggledSubcategories, setToggledSubcategories] = useState({});

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [isCategory, setIsCategory] = useState(false);
  const [isSubCategory, setIsSubCategory] = useState(false);
  const [isChildCategory, setIsChildCategory] = useState(false);

  const handleCategoryToggle = (id) => {
    setToggledCategories((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleSubcategoryToggle = (categoryId, subId) => {
    setToggledSubcategories((prevState) => ({
      ...prevState,
      [`${categoryId}-${subId}`]: !prevState[`${categoryId}-${subId}`],
    }));
  };

  const handleUpdateCategory = (categoryId, categoryName) => {
    setId(categoryId);
    setName(categoryName);
    setOpenPopUp(true);
    setIsCategory(true);
    setIsSubCategory(false);
    setIsChildCategory(false);
  };

  const handleUpdateSubCategory = (subCategoryId, subCategoryName) => {
    setId(subCategoryId);
    setName(subCategoryName);
    setOpenPopUp(true);
    setIsSubCategory(true);
    setIsCategory(false);
    setIsChildCategory(false);
  };

  const handleUpdateChildCategory = (childCategoryId, childCategoryName) => {
    setId(childCategoryId);
    setName(childCategoryName);
    setOpenPopUp(true);
    setIsChildCategory(true);
    setIsCategory(false);
    setIsSubCategory(false);
  };

  useEffect(() => {

    if (isUpdated) {
      toast('Updated Successfully', {
        type: 'success',
        position:'bottom-center',
        onOpen: () => dispatch(clearCategory())
      })
    }

    dispatch(getCategories());
  }, [dispatch, isUpdated]);

  return (
    <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-200 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-600 tracking-tight">Categories</h1>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="border rounded-lg bg-gradient-to-br from-white to-gray-50 shadow-sm p-4 space-y-3">
                  <div className="flex justify-between items-center cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
                      <div className="h-4 w-32 bg-gray-300 rounded"></div>
                    </div>
                    <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
                  </div>

                  <div className="ml-5 border-l-2 border-gray-300 pl-4 space-y-2">
                    <div className="flex justify-between items-center cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
                        <div className="h-4 w-32 bg-gray-300 rounded"></div>
                      </div>
                      <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          categories?.map((category) => (
            <div
              className="border rounded-lg bg-gradient-to-br from-white to-gray-50 shadow-sm p-4 space-y-3 hover:shadow-md transition-shadow duration-300"
              key={category?._id}
            >
              <div className="flex justify-between items-center cursor-pointer">
                <div
                  className="flex items-center gap-3"
                  onClick={() => handleCategoryToggle(category?._id)}
                >
                  <span className="text-gray-500">
                    {toggledCategories[category?._id] ? (
                      <MdOutlineKeyboardArrowDown size={20} />
                    ) : (
                      <MdOutlineKeyboardArrowLeft size={20} />
                    )}
                  </span>
                  <span className="text-gray-900 font-semibold capitalize">
                    {category?.name}
                  </span>
                </div>
                <span
                  className="flex items-center justify-center cursor-pointer text-blue-600 hover:text-blue-700"
                  onClick={() => handleUpdateCategory(category?._id, category?.name)}
                >
                  <FaEdit />
                </span>
              </div>

              {toggledCategories[category?._id] &&
                category?.subCategories?.map((sub) => (
                  <div
                    className="ml-5 border-l-2 border-gray-300 pl-4 space-y-2"
                    key={sub?._id}
                  >
                    <div className="flex justify-between items-center cursor-pointer">
                      <div
                        className="flex items-center gap-3"
                        onClick={() =>
                          handleSubcategoryToggle(category?._id, sub?._id)
                        }
                      >
                        <span className="text-gray-500">
                          {toggledSubcategories[`${category?._id}-${sub?._id}`] ? (
                            <MdOutlineKeyboardArrowDown size={18} />
                          ) : (
                            <MdOutlineKeyboardArrowLeft size={18} />
                          )}
                        </span>
                        <span className="text-gray-800 capitalize">
                          {sub?.subCategory?.name}
                        </span>
                      </div>
                      <span
                        className="flex items-center justify-center cursor-pointer text-blue-600 hover:text-blue-700"
                        onClick={() =>
                          handleUpdateSubCategory(
                            sub?.subCategory?._id,
                            sub?.subCategory?.name
                          )
                        }
                      >
                        <FaEdit />
                      </span>
                    </div>

                    {toggledSubcategories[`${category?._id}-${sub?._id}`] &&
                      sub?.childCategories?.map((item) => (
                        <div
                          className="ml-6 border-l-2 border-gray-200 pl-4 space-y-1"
                          key={item?._id}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 capitalize">
                              {item?.childCategory?.name}
                            </span>
                            <span
                              className="flex items-center justify-center cursor-pointer text-blue-600 hover:text-blue-700"
                              onClick={() =>
                                handleUpdateChildCategory(
                                  item?.childCategory?._id,
                                  item?.childCategory?.name
                                )
                              }
                            >
                              <FaEdit />
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
            </div>
          ))
        )}
      </div>

      {openPopUp && (
        <PopUp
          id={id}
          name={name}
          setId={setId}
          setName={setName}
          setOpenPopUp={setOpenPopUp}
          isCategory={isCategory}
          isSubCategory={isSubCategory}
          isChildCategory={isChildCategory}
        />
      )}
    </div>
  );
};

export default ViewCategories;


const PopUp = ({ id, name, setId, setName, setOpenPopUp, isCategory, isSubCategory, isChildCategory }) => {
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState(name);

  const onUpdateCategory = (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (isCategory) {
      formData.append("categoryId", id);
      formData.append("categoryname", categoryName);
      dispatch(updateCategory(formData));
    }

    if (isSubCategory) {
      formData.append("subCategoryId", id);
      formData.append("subcategoryname", categoryName);
      dispatch(updateSubCategory(formData));
    }

    if (isChildCategory) {
      formData.append("childCategoryId", id);
      formData.append("childcategoryname", categoryName);
      dispatch(updateChildCategory(formData));
    }

    setId("");
    setName("");
    setOpenPopUp(false);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white w-96 h-auto rounded-xl shadow-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center text-gray-800">Update Category</h2>

        <form onSubmit={onUpdateCategory} className="flex flex-col gap-4">
          <input
            type="text"
            name="categoryname"
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
          />

          <div className="flex justify-between gap-4">
            <div
              onClick={() => setOpenPopUp(false)}
              className="w-full py-2 text-center text-sm font-semibold text-white bg-red-600 rounded-lg cursor-pointer hover:bg-red-700 transition-colors"
            >
              Close
            </div>
            <button
              type="submit"
              className="w-full py-2 text-center text-sm font-semibold text-white bg-green-600 rounded-lg cursor-pointer hover:bg-green-700 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};