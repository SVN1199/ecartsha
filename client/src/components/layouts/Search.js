import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProductsName } from '../../actions/productsActions';

const Search = () => {
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState('');
    const [openSearch, setOpenSearch] = useState(false);
    const dispatch = useDispatch();

    const { productsName = [] } = useSelector((state) => state.productsState);

    const handleSearch = (e) => {
        e.preventDefault();
            navigate(`/searchproducts/${searchInput}`);
        setSearchInput('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e); 
        }
    };

    const handleSearchText = (name) => {
        setSearchInput(name);
    };

    const highlightText = (name) => {
        const parts = name.split(new RegExp(`(${searchInput})`, 'gi'));
        return parts.map((part, index) =>
            part.toLowerCase() === searchInput.toLowerCase() ? (
                <span key={index} className="bg-yellow-200 font-semibold">
                    {part}
                </span>
            ) : (
                part
            )
        );
    };

    useEffect(() => {
        if (searchInput !== '' && productsName.length > 0) {
            setOpenSearch(true);
        } else {
            setOpenSearch(false);
        }

        dispatch(getProductsName(searchInput));
    }, [dispatch, searchInput, productsName.length]);

    return (
        <div className="relative rounded-md w-full lg:w-1/3 sm:w-2/3 mx-auto  mt-1 sm:mt-0 sm:mx-0">
             <div className="flex items-center border-2 rounded-md shadow-md" style={{border : '1px solid green'}}>
                <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search products..."
                    className="flex-grow px-4 py-2.5 text-sm outline-none rounded-l-md "
                    onKeyDown={handleKeyDown}
                />
                <button
                    className="bg-primary hover:bg-green-700 text-white p-3 rounded-r-md transition-all duration-200"
                    onClick={handleSearch}
                >
                    <FaSearch className="text-lg" />
                </button>
            </div>
            {openSearch && (
                <div className="absolute z-10 w-full max-h-60 bg-white border border-gray-200 shadow-lg rounded-md mt-1 overflow-y-auto">
                    {productsName.map((product) => (
                        <ul key={product._id} className="divide-y divide-gray-100">
                            <li
                                className="p-2 text-gray-700 text-sm hover:bg-purple-100 cursor-pointer transition-all duration-150"
                                onClick={() => handleSearchText(product.name)}
                            >
                                {highlightText(product.name)}
                            </li>
                        </ul>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Search;
