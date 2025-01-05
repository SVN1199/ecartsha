import axios from "axios"
import { getAllUsersFail, getAllUsersRequest, getAllUsersSuccess } from "../../slices/admin/adminUsersSlice"
import { getAllFeedbacksFail, getAllFeedbacksRequest, getAllFeedbacksSuccess } from "../../slices/admin/adminFeedbackSlice"
import { getDashboardsFail, getDashboardsRequest, getDashboardsSuccess } from "../../slices/admin/adminDashboardSlice"

export const getAllUsers = (page, rowsPerPage, searchQuery) => async (dispatch) => {
  try {
    dispatch(getAllUsersRequest())
    const { data } = await axios.get(`/api/v1/admin/getallusers?page=${page}&rowsPerPage=${rowsPerPage}&search=${searchQuery}`)
    dispatch(getAllUsersSuccess(data))
  } catch (error) {
    dispatch(getAllUsersFail(error.response.data.message))
  }
}


export const getAllFeedbacks = (search = '', page = 1, limit = 10) => async (dispatch) => {
  try {
    dispatch(getAllFeedbacksRequest());
    const { data } = await axios.get(
      `/api/v1/admin/feedbacks?search=${search}&page=${page}&limit=${limit}`
    );
    dispatch(getAllFeedbacksSuccess(data));
  } catch (error) {
    dispatch(getAllFeedbacksFail(error.response?.data?.message || 'Error fetching feedbacks'));
  }
};

export const getDashboard = (year, month, week) => async (dispatch) => {
  try {
    dispatch(getDashboardsRequest());

    let queryString = "/api/v1/website/dashboard?";
    
    if (year) queryString += `year=${year}&`;
    if (month) queryString += `month=${month}&`;
    if (week) queryString += `week=${week}`;

    queryString = queryString.endsWith("&") ? queryString.slice(0, -1) : queryString;

    const { data } = await axios.get(queryString);

    dispatch(getDashboardsSuccess(data));
  } catch (error) {
    dispatch(getDashboardsFail(error.response?.data?.message || 'Error fetching dashboard data'));
  }
};
