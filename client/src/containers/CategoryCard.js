import React, { useEffect } from "react";
import Slider from "react-slick";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getHomeCategory } from "../actions/homeAction";
import { Link } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa6";

const CategoryCard = ({ cardList = [] }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getHomeCategory());
    }, [dispatch]);

    const { categories = [] } = useSelector((state) => state.homeState);

    const sliderSettings = {
        dots: false,
        infinite: false,
        speed: 800,
        slidesToShow: 5,
        slidesToScroll: 2,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const renderCategorySection = (category, index, isFromAPI) => (
        <div key={index} className="category-section">
            <div className="category-header flex justify-between items-center mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 capitalize relative">
                    {isFromAPI ? `Explore ${category?.categoryName}` : category?.gender?.name}
                    <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-gradient-to-r from-green-500 to-purple-500 rounded-full"></span>
                </h2>
                <Link to={`/productsbycategory/${category?.categoryId}`}>
                    <FaChevronRight className="text-green-600 text-lg sm:text-2xl hover:text-purple-600 transition-colors duration-200" />
                </Link>
            </div>

            <Slider {...sliderSettings} className="slider-container">
                {(isFromAPI ? category.subCatList : category?.gender?.list || []).map((card, i) => (
                    <div key={i} className="category-card">
                        <div className="group relative h-56 sm:h-64 lg:h-44 w-40 sm:w-48 mx-auto bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300">
                                <img
                                    src={isFromAPI ? card?.subCatImg : card?.img || "/images/categories/bottoms.jpg"}
                                    alt={isFromAPI ? card?.subCatName : card?.items}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110 rounded-md"
                                    loading="lazy"
                                />

                            <div className="absolute inset-0 bg-gradient-to-t from-purple-100 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>

                            <div className="absolute bottom-0 left-0 w-full p-2 sm:p-3 bg-gradient-to-r from-green-400 to-green-800 text-white text-center opacity-90 group-hover:opacity-100">
                                <h3 className="text-sm sm:text-lg font-semibold capitalize">
                                    {isFromAPI ? card.subCatName : card.items}
                                </h3>
                            </div>

                            <Link
                                to={`/productsbycategory/${category?.categoryId}`}
                                className="absolute inset-0 bg-gray-600 bg-opacity-0 group-hover:bg-opacity-90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                            >
                                <span className="font-bold text-sm sm:text-lg tracking-wider capitalize">
                                    {isFromAPI ? `Explore ${category?.categoryName}` : category?.gender?.name}
                                </span>
                            </Link>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );

    return (
        <div className="category-container p-3 sm:p-5 space-y-6 sm:space-y-10 bg-gray-50">
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 text-center mt-10 sm:mt-10 lg:mt-0 md:mt-5">
                Our <span className="text-primary">Products</span>
            </h1>
            {categories?.length >= 3
                ? categories.map((category, index) => renderCategorySection(category, index, true))
                : cardList.map((category, index) => renderCategorySection(category, index, false))}
            
            <div className="w-full h-16 p-2 sm:p-4 flex items-center justify-center mt-2">
                <Link to="/products">
                    <button className="px-5 sm:px-7 py-1 bg-gradient-to-r from-green-400 to-green-800 text-white rounded-md text-xs sm:text-sm flex flex-col items-center justify-center">
                        <span>View All</span>
                        <span>
                            <FaCaretDown />
                        </span>
                    </button>
                </Link>
            </div>
        </div>
    );
};

const NextArrow = ({ onClick }) => (
    <div
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-green-100 transition-all duration-200 z-10"
        onClick={onClick}
    >
        <FaChevronRight className="text-green-600 text-sm sm:text-lg" />
    </div>
);

const PrevArrow = ({ onClick }) => (
    <div
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-green-100 transition-all duration-200 z-10"
        onClick={onClick}
    >
        <FaChevronLeft className="text-green-600 text-sm sm:text-lg" />
    </div>
);

export default CategoryCard;