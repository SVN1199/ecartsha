import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFeedbacks } from '../../../actions/admin/adminUsersAction';


const CustomerFeedback = () => {
  const dispatch = useDispatch();
  const {
    feedbacks = [],
    currentPage = 1,
    totalPages = 1,
    loading = false,
  } = useSelector((state) => state.adminFeedBackState);

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    dispatch(getAllFeedbacks(search, page));
  }, [dispatch, search, page]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-md">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-green-600 tracking-tight">
          Customer Feedback
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Insights and feedback from our valuable customers.
        </p>
      </div>

      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search feedback..."
          className="w-full p-4 rounded-md border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-300 focus:outline-none transition-shadow"
        />
      </div>

      <div className="space-y-6">
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="p-5 bg-gray-200 rounded-md animate-pulse"
            >
              <div className="w-14 h-14 bg-gray-300 rounded-full mb-4"></div>
              <div className="h-4 bg-gray-300 w-3/4 rounded mb-2"></div>
              <div className="h-3 bg-gray-300 w-2/4 rounded"></div>
            </div>
          ))
        ) : feedbacks.length > 0 ? (
          feedbacks.map((feedback) => (
            <div
              key={feedback._id}
              className="p-5 bg-white shadow-md rounded-md flex items-start space-x-4 hover:shadow-lg transform transition-transform duration-200"
            >
              <img
                src={feedback.user.avatar}
                alt={feedback.user.name}
                className="w-14 h-14 rounded-full border-2 border-green-500"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {feedback.user.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {feedback.user.email}
                    </p>
                  </div>
                  <span className="text-sm text-gray-400">
                    {new Date(feedback.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-3 text-gray-700 leading-relaxed">
                  {feedback.message}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="p-5 text-center bg-white shadow-md rounded-md">
            <h2 className="text-xl font-bold text-gray-800">
              No Feedback Found
            </h2>
            <p className="text-gray-500 mt-2">
              Be the first to share your thoughts!
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={`px-5 py-2 rounded-md text-sm font-medium ${page === 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-green-500 text-white hover:bg-green-600'
            }`}
        >
          Previous
        </button>
        <span className="text-gray-600">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className={`px-5 py-2 rounded-md text-sm font-medium ${page === totalPages
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-green-500 text-white hover:bg-green-600'
            }`}
        >
          Next
        </button>
      </div>
    </div>

  );
};

export default CustomerFeedback;