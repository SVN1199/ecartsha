import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReviews, postReviews } from '../../actions/reviewsAction';
import { useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { IoSend } from "react-icons/io5";
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { clearReviews } from '../../slices/reviewsSlice';
import { toast } from 'react-toastify';
import { formatDistanceToNow } from 'date-fns';
import MetaData from '../../components/layouts/MetaData';

const SkeletonLoader = () => (
    <div className="animate-pulse">
        <div className="flex flex-col sm:flex-row gap-6 bg-gray-200 p-5 rounded-lg shadow-md">
            <div className="h-40 w-40 bg-gray-300 rounded-lg"></div>
            <div className="flex-1 space-y-3">
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            </div>
        </div>
        <div className="mt-6 space-y-3">
            {[1, 2, 3].map((_, index) => (
                <div key={index} className="flex items-center space-x-4">
                    <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const ProductReviews = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();

    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [isLoading, setIsLoading] = useState(true); 

    const { reviews = {}, isCommented, error } = useSelector((state) => state.reviewsState);

    const handleRating = (starValue) => {
        setRating(starValue);
    };

    const handleSubmit = () => {
        if (!comment || !rating) {
            toast('Please provide both a comment and rating.', {
                type: 'warning',
                position: 'bottom-center',
            });
            return;
        }

        dispatch(postReviews(productId, comment, rating));
        setComment('');
        setRating(0);
    };

    useEffect(() => {
        if (error) {
            toast(error, {
                type: 'error',
                position: 'bottom-center',
                onOpen: () => dispatch(clearReviews()),
            });
        }

        if (isCommented) {
            toast('Reviewed Successfully', {
                type: 'success',
                position: 'bottom-center',
                onOpen: () => dispatch(clearReviews()),
            });
        }
    }, [dispatch, isCommented, error]);

    useEffect(() => {
        setIsLoading(true);
        dispatch(getAllReviews(productId)).finally(() => setIsLoading(false));
    }, [dispatch, productId, isCommented]);

    return (
      <Fragment>
      <MetaData title="Product Reviews" />
          <div className="min-h-screen w-full px-4 sm:px-6 lg:px-10 bg-gray-50">
            <div className="mt-8 mb-6">
                <div className="flex items-center space-x-2">
                    <span className="font-semibold text-lg text-gray-700">Rate this Product:</span>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            onClick={() => handleRating(star)}
                            className="cursor-pointer"
                        >
                            {star <= rating ? (
                                <AiFillStar className="text-yellow-400 text-xl transition-transform hover:scale-125" />
                            ) : (
                                <AiOutlineStar className="text-yellow-400 text-xl transition-transform hover:scale-125" />
                            )}
                        </span>
                    ))}
                </div>
            </div>

            <div className="w-full lg:w-2/3 mx-auto flex items-center bg-green-50 ring-2 ring-green-500 focus-within:ring-green-600 rounded-lg shadow-md p-1 transition-transform hover:shadow-lg">
                <input
                    type="text"
                    name="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="flex-1 p-3 text-sm text-gray-800 placeholder-gray-500 bg-transparent border-none outline-none rounded-lg"
                    placeholder="Write your comments..."
                />
                <button
                    onClick={handleSubmit}
                    className="ml-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium px-5 py-3 rounded-lg flex items-center gap-2 transition-transform hover:scale-110 focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
                >
                    <IoSend className="text-lg" />
                    Send
                </button>
            </div>


            <div className="mt-8 space-y-6">
                {isLoading ? (
                    <SkeletonLoader />
                ) : (
                    <>
                        {reviews?.image && (
                            <div className="flex flex-col sm:flex-row gap-6 bg-white p-5 rounded-lg shadow-md">
                                <img
                                    src={reviews.image}
                                    alt="Product"
                                    className="h-40 w-40 rounded-lg object-cover mx-auto sm:mx-0"
                                />
                                <div className="flex flex-col justify-between">
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-800 mb-1">{reviews.name}</h2>
                                        <div className="flex items-center space-x-1 text-yellow-400 mb-1">
                                            {[...Array(reviews.ratings)].map((_, index) => (
                                                <FaStar key={index} />
                                            ))}
                                            {[...Array(5 - reviews.ratings)].map((_, index) => (
                                                <FaStar key={index} className="text-gray-300" />
                                            ))}
                                        </div>
                                        <p className="text-gray-500 text-sm">({reviews.noOfReviews || 0} reviews)</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {reviews?.reviews?.length === 0 && (
                            <div className="text-center text-sm font-medium text-red-500">
                                No reviews found
                            </div>
                        )}

                        {reviews?.reviews?.map((review) => (
                            <div
                                key={review._id}
                                className="bg-white p-5 rounded-lg shadow-md transition-transform hover:shadow-lg"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <span className="flex items-center bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                                            {review.rating} <FaStar className="ml-1" />
                                        </span>
                                        <p className="text-gray-700 text-sm">{review.comment}</p>
                                    </div>
                                </div>
                                <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                                    <span>{review?.user?.name}</span>
                                    <span>
                                        {formatDistanceToNow(new Date(review.reviewedAt), {
                                            addSuffix: true,
                                        })}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
      </Fragment>
    );
};

export default ProductReviews;