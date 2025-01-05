import { FaArrowLeft, FaFilter } from 'react-icons/fa';
import PriceFilter from '../filter/PriceFilter';
import CategoriesFilter from '../filter/CategoriesFilter';

const ProductSideBar = ({ clearFilter, handleSelectCategory, setPrice, submitFilter, handleFilterPage, categories, productPrice, loading }) => {

  const renderSkeleton = () => (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 rounded-md w-full"></div>
      <div className="h-10 bg-gray-200 rounded-md w-full"></div>
      <div className="h-10 bg-gray-200 rounded-md w-full"></div>
      <div className="h-8 bg-gray-200 rounded-md w-full"></div>
    </div>
  );

  //D63dz@pDTC$epRu

  return (
    <div className='flex flex-col bg-white p-4 gap-8 w-full z-30 absolute lg:relative sm:absolute'>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-row gap-3 items-center text-primary'>
          <div onClick={handleFilterPage} className='lg:hidden'>
            <FaArrowLeft />
          </div>
          <div className='flex flex-row items-center gap-2 font-semibold text-sm'>
            <span><FaFilter /></span>
            <span>Filters</span>
          </div>
        </div>
        <div className='capitalize text-xs opacity-70 cursor-pointer' onClick={clearFilter}>
          clear filter
        </div>
      </div>

      {loading ? (
        renderSkeleton()
      ) : (
        <>
          <div className='flex flex-col gap-5'>
            <CategoriesFilter handleSelectCategory={handleSelectCategory} categoryData={categories} />
          </div>

          <div>
            <PriceFilter setPrice={setPrice} productPrice={productPrice} />
          </div>

          <button onClick={submitFilter} className='w-full p-2 bg-primary font-semibold text-sm text-white rounded-md shadow-lg'>
            Apply
          </button>
        </>
      )}
    </div>
  );
};

export default ProductSideBar;
