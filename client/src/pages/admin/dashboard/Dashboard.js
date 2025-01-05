import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard } from "../../../actions/admin/adminUsersAction";

const Dashboard = () => {
  const { dashboards: dashboardData = {}, loading } = useSelector((state) => state.adminDashboardState);

  const dispatch = useDispatch();

  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("");

  const years = [];
  for (let i = 2020; i <= currentYear; i++) {
    years.push(i);
  }

  const months = Array.from({ length: 12 }, (_, i) => `${i + 1}`);
  const weeks = Array.from({ length: 4 }, (_, i) => `${i + 1}`);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleWeekChange = (e) => {
    setSelectedWeek(e.target.value);
  };

  useEffect(() => {
    dispatch(getDashboard(selectedYear, selectedMonth, selectedWeek));
  }, [selectedYear, selectedMonth, selectedWeek, dispatch]);

  const skeletonLoader = (
    <div className="bg-white p-6 rounded-lg shadow-lg animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-8 bg-gray-200 rounded w-1/2"></div>
    </div>
  );

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-xl">
      <div className="mb-6">
        <h1 className="text-4xl font-extrabold text-green-700 tracking-tight">Dashboard</h1>
      </div>

      <div className="flex justify-between items-center mb-6 space-x-4">
        <div className="p-2 shadow-sm rounded-md">
          <select
            name="years"
            id="year"
            value={selectedYear}
            onChange={handleYearChange}
            className="p-2 rounded-md border-gray-300 outline-none focus:ring-2 ring-green-500"
          >
            {years.map((year) => (
              <option value={year} key={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="flex space-x-4">
          <select
            name="month"
            value={selectedMonth}
            onChange={handleMonthChange}
            className="p-2 rounded-md border-gray-300 focus:ring-2 outline-none ring-green-500"
          >
            <option value="">Month</option>
            {months.map((month) => (
              <option value={month} key={month}>
                {month}
              </option>
            ))}
          </select>

          <select
            name="week"
            value={selectedWeek}
            onChange={handleWeekChange}
            className="p-2 rounded-md border-gray-300 focus:ring-2 outline-none ring-green-500"
          >
            <option value="">Week</option>
            {weeks.map((week) => (
              <option value={week} key={week}>
                {week}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {skeletonLoader}
          {skeletonLoader}
          {skeletonLoader}
          {skeletonLoader}
          {skeletonLoader}
        </div>
      ) : (
        dashboardData && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:bg-green-50 transition duration-300">
              <h3 className="text-lg font-semibold text-gray-800">Total Products</h3>
              <p className="text-2xl font-bold text-green-600">{dashboardData.products}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:bg-green-50 transition duration-300">
              <h3 className="text-lg font-semibold text-gray-800">Total Categories</h3>
              <p className="text-2xl font-bold text-green-600">{dashboardData?.categories}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:bg-green-50 transition duration-300">
              <h3 className="text-lg font-semibold text-gray-800">Total Users</h3>
              <p className="text-2xl font-bold text-green-600">{dashboardData.users}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg text-center shadow-lg hover:bg-green-50 transition duration-300">
              <h3 className="text-lg font-semibold text-gray-800">Total Orders</h3>
              <p className="text-2xl font-bold text text-green-600">{dashboardData.orders}</p>
            </div>
           
            <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:bg-green-50 transition duration-300">
              <h3 className="text-lg font-semibold text-gray-800">Orders Delivered</h3>
              <p className="text-2xl font-bold text-green-600">{dashboardData.orderDelivered}</p>
            </div>
          </div>
        )
      )}

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Manage Orders</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:bg-green-50 transition duration-300">
            <h3 className="text-lg font-semibold text-gray-800">Orders Received</h3>
            <p className="text-2xl font-bold text-green-600">{dashboardData.ordersReceived}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:bg-green-50 transition duration-300">
            <h3 className="text-lg font-semibold text-gray-800">Orders Return Request</h3>
            <p className="text-2xl font-bold text-green-600">{dashboardData.ordersReturnRequest}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
