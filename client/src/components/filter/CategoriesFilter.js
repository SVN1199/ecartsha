import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { Link } from "react-router-dom";

const CategoriesFilter = ({ categoryData, handleSelectCategory }) => {
  const [toggledCategories, setToggledCategories] = useState({});
  const [toggledSubcategories, setToggledSubcategories] = useState({});

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

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-2 font-semibold text-xs">
        <span><BiCategory /></span>
        <span>CATEGORIES</span>
      </div>
      <div className="my-1">
        {categoryData?.map((category) => (
          <ul className="my-2 flex flex-col gap-1 capitalize" key={category._id}>
            <li
              className="font-semibold cursor-pointer mt-1 text-sm flex flex-row gap-3 items-center"
              onClick={() => handleCategoryToggle(category._id)}
            >
              <span>
                {toggledCategories[category._id] ? (
                  <MdOutlineKeyboardArrowDown />
                ) : (
                  <MdOutlineKeyboardArrowLeft />
                )}
              </span>
              <span>{category.name}</span>
            </li>
            {toggledCategories[category._id] && (
              category?.subCategories?.map((sub) => (
                <ul className="mx-3 mt-2" key={sub._id}>
                  <li
                    className="font-semibold cursor-pointer text-sm flex flex-row gap-3 items-center"
                    onClick={() => handleSubcategoryToggle(category._id, sub._id)}
                  >
                    <span>
                      {toggledSubcategories[`${category._id}-${sub._id}`] ? (
                        <MdOutlineKeyboardArrowDown />
                      ) : (
                        <MdOutlineKeyboardArrowLeft />
                      )}
                    </span>
                    <span>{sub.subCategory.name}</span>
                  </li>
                  {toggledSubcategories[`${category._id}-${sub._id}`] && (
                    sub?.childCategories?.map((item) => (
                      <ul className="ml-8 mt-1 text-sm flex flex-col gap-1" key={item._id}>
                        <li className="cursor-pointer mt-1 flex flex-row items-center gap-2">
                          <div><input type="checkbox" onClick={(e)=>handleSelectCategory(item.childCategory._id, e.target.checked)} /></div>
                          <div>{item.childCategory.name}</div>
                          <div className="opacity-70">
                            <Link to={`/categoryproducts/${item.childCategory._id}`}>
                              <FaArrowRight />
                            </Link>
                          </div>
                        </li>
                      </ul>
                    ))
                  )}
                </ul>
              ))
            )}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default CategoriesFilter;