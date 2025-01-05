import axios from "axios";
import { getAllReviewsFail, getAllReviewsRequest, getAllReviewsSuccess, getReviewsFail, getReviewsRequest, getReviewsSuccess, postReviewsFail, postReviewsRequest, postReviewsSuccess } from "../slices/reviewsSlice";

export const postReviews = (productId, comment, rating) => async (dispatch) => {
    try {
        dispatch(postReviewsRequest());
        const { data } = await axios.put(`/api/v1/products/createreview/${productId}`, {comment, rating});
        dispatch(postReviewsSuccess(data));
    } catch (error) {
        dispatch(postReviewsFail(error.response.data.message));
    }
};

export const getAllReviews = (productId) => async (dispatch) => {
    try {
        dispatch(getAllReviewsRequest());
        const { data } = await axios.get(`/api/v1/products/reviews/${productId}`);
        dispatch(getAllReviewsSuccess(data));
    } catch (error) {
        dispatch(getAllReviewsFail(error.response.data.message));
    }
};
