import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormatDate from "../../components/layouts/FormatDate";
import { logOut, postFeedback } from "../../actions/userActions";
import { toast } from "react-toastify";
import { clearMessages } from "../../slices/feedbackSlice";
import MetaData from "../../components/layouts/MetaData";

const MyProfile = () => {
  const { user } = useSelector((state) => state.authState);
  const { isSubmitted, error } = useSelector((state) => state.feedbackState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [messages, setMessages] = useState("");

  const handleFeedback = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("message", messages);
    dispatch(postFeedback(formData));
    setMessages("");
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      dispatch(logOut());
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      toast("Feedback Submitted Successfully", {
        type: "success",
        position: "bottom-center",
        onOpen: () => dispatch(clearMessages()),
      });
    }

    if (error) {
      toast(error, {
        type: "error",
        position: "bottom-center",
        onOpen: () => dispatch(clearMessages()),
      });
    }
  }, [isSubmitted, error, dispatch]);

  return (
    <Fragment>
      <MetaData title="MyProfile" />
      <div className="w-full flex flex-col items-center bg-gradient-to-b from-gray-50 to-gray-200 p-6 sm:p-10 rounded-lg shadow-2xl">
        <div className="bg-white w-full sm:w-3/4 rounded-2xl p-6 sm:p-10 shadow-lg">
          <div className="relative w-full flex flex-col items-center">
            <div className="relative h-32 w-full rounded-t-lg bg-gradient-to-r from-green-400 to-teal-500"></div>
            <div className="absolute -bottom-12 h-24 w-24 sm:h-28 sm:w-28 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img
                src={user.avatar}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="text-center mt-16">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {user.name}
            </h2>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>

          <div className="mt-8 bg-gray-100 rounded-lg p-6 shadow-inner">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Profile Details
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between text-sm sm:text-base">
                <span className="font-medium text-gray-600">Phone:</span>
                <span className="font-semibold text-gray-800">
                  {user.phone || "Not provided"}
                </span>
              </div>
              <div className="flex justify-between text-sm sm:text-base">
                <span className="font-medium text-gray-600">Address:</span>
                <span className="font-semibold text-gray-800">
                  {user.address || "No address added"}
                </span>
              </div>
              <div className="flex justify-between text-sm sm:text-base">
                <span className="font-medium text-gray-600">Joined:</span>
                <span className="font-semibold text-gray-800">
                  <FormatDate date={user.createdAt} />
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <button
                onClick={() => navigate(`/editprofile/${user._id}`)}
                className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold py-2 rounded-lg shadow-md hover:from-green-600 hover:to-teal-600 transition"
              >
                Edit Profile
              </button>
              <button
                onClick={() => navigate(`/mywishlist`)}
                className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold py-2 rounded-lg shadow-md hover:from-indigo-600 hover:to-blue-600 transition"
              >
                My Wishlist
              </button>
              <button
                onClick={() => navigate(`/myorders`)}
                className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold py-2 rounded-lg shadow-md hover:from-yellow-600 hover:to-orange-600 transition"
              >
                My Orders
              </button>
              <button
                onClick={() => navigate(`/mycart`)}
                className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold py-2 rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600 transition"
              >
                My Cart
              </button>
              <button
                onClick={() => navigate(`/changepassword`)}
                className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold py-2 rounded-lg shadow-md hover:from-red-600 hover:to-pink-600 transition"
              >
                Change Password
              </button>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold py-2 rounded-lg shadow-md hover:from-red-600 hover:to-pink-600 transition"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="mt-8 bg-gray-100 rounded-lg p-6 shadow-inner">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Submit Feedback
            </h3>
            <form onSubmit={handleFeedback} className="flex flex-col gap-4">
              <textarea
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="Write your feedback here..."
                rows="5"
                value={messages}
                onChange={(e) => setMessages(e.target.value)}
                required
              ></textarea>
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold py-2 rounded-lg shadow-md hover:from-green-600 hover:to-teal-600 transition"
              >
                Submit Feedback
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MyProfile;