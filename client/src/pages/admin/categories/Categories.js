import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from "../../../actions/categoriesActions";

const CategoryForm = lazy(() => import('../../../components/admin/categories/CategoryForm'));
const SubCategoryForm = lazy(() => import('../../../components/admin/categories/SubCategoryForm'));
const ChildCategoryForm = lazy(() => import('../../../components/admin/categories/ChildCategoryForm'));

const Categories = () => {
  const { categories = [], loading } = useSelector((state) => state.categoriesState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-green-600 tracking-tight">
          Add Categories
        </h1>
      </div>
      <Suspense fallback={<div className="text-center text-gray-600 py-6">Loading...</div>}>
        <div className="w-full px-4 py-6 space-y-8 bg-gradient-to-r from-gray-50 to-gray-100 shadow-lg rounded-lg">

          <div className="w-full">
            <div className="text-lg font-semibold text-emerald-700 mb-3">
              {loading ? (
                <div className="h-6 w-32 bg-gray-300 animate-pulse rounded"></div>
              ) : (
                "Add Category"
              )}
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md">
              {loading ? (
                <div className="h-40 bg-gray-300 animate-pulse rounded"></div>
              ) : (
                <CategoryForm />
              )}
            </div>
          </div>

          <div className="w-full">
            <div className="text-lg font-semibold text-emerald-700 mb-3">
              {loading ? (
                <div className="h-6 w-48 bg-gray-300 animate-pulse rounded"></div>
              ) : (
                "Add Sub Category"
              )}
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md">
              {loading ? (
                <div className="h-40 bg-gray-300 animate-pulse rounded"></div>
              ) : (
                <SubCategoryForm categories={categories} />
              )}
            </div>
          </div>

          <div className="w-full">
            <div className="text-lg font-semibold text-emerald-700 mb-3">
              {loading ? (
                <div className="h-6 w-48 bg-gray-300 animate-pulse rounded"></div>
              ) : (
                "Add Child Category"
              )}
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md">
              {loading ? (
                <div className="h-40 bg-gray-300 animate-pulse rounded"></div>
              ) : (
                <ChildCategoryForm categories={categories} />
              )}
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default Categories;