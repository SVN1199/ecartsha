import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOffersAds, deleteOffersAdvertisement, getOffersAdvertisement } from '../../../actions/websiteAction';
import { toast } from 'react-toastify';
import { clearNotify } from '../../../slices/offersSlice';

const OffersAds = () => {
    const { offersAds = [], isDeleted, isCreated, error, loading } = useSelector((state) => state.offersAdsState);

    const [formData, setFormData] = useState({
        image: '',
        heading: '',
        description: ''
    });

    const [imagePreview, setImagePreview] = useState('');

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'image') {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    if (reader.readyState === 2) {
                        setFormData((prev) => ({
                            ...prev,
                            image: file
                        }));
                        setImagePreview(reader.result);
                    }
                };
                reader.readAsDataURL(file);
            }
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.image || !formData.heading || !formData.description) {
            toast('Please fill all the fields', { type: 'error', position: 'bottom-center' });
            return;
        }

        const newFormData = new FormData();
        newFormData.append('heading', formData.heading);
        newFormData.append('description', formData.description);
        newFormData.append('image', formData.image);
        dispatch(createOffersAds(newFormData));
        setFormData({ heading: '', description: '', image: '' })
    };

    const handleDelete = (id) => {
        dispatch(deleteOffersAdvertisement(id));
    };

    useEffect(() => {
        if (isDeleted) {
            toast('Deleted Successfully', {
                type: 'success',
                position: 'bottom-center',
                onOpen: () => dispatch(clearNotify())
            });
        }

        if (isCreated) {
            toast('Created Successfully', {
                type: 'success',
                position: 'bottom-center',
                onOpen: () => dispatch(clearNotify())
            });
        }

        if (error) {
            toast(error, {
                type: 'error',
                position: 'bottom-center',
                onOpen: () => dispatch(clearNotify())
            });
        }

        dispatch(getOffersAdvertisement());
    }, [dispatch, error, isDeleted, isCreated]);

    return (
        <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg w-full mx-auto">
            <div className="mb-6 text-center">
                <h1 className="text-3xl font-extrabold text-green-600 tracking-tight">
                    Offers Advertisement
                </h1>
            </div>

            <div className="w-3/5 mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="image">
                            Upload Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            required
                            onChange={handleChange}
                            className="block w-full text-sm outline-none text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300"
                        />
                    </div>
                    {imagePreview && (
                        <div className="mt-4">
                            <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-md" />
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="heading">
                            Heading
                        </label>
                        <input
                            type="text"
                            id="heading"
                            name="heading"
                            value={formData.heading}
                            onChange={handleChange}
                            className="block w-full px-4 py-3 outline-none focus:ring-2 ring-green-500 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            placeholder="Enter heading"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="description">
                            Description
                        </label>
                        <input
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="block outline-none w-full focus:ring-2 ring-green-500 px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            placeholder="Enter description"
                            rows="4"
                            required
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full px-6 py-3 text-white bg-green-600 rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>

            <div className="mt-14">
                <h2 className="text-2xl font-extrabold text-green-700 mb-6 text-center">Offers Advertisement List</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {offersAds.length === 0 ? (
                        <p className="text-gray-600 text-center col-span-2">No offers available.</p>
                    ) : (
                        offersAds.map((ad) => (
                            <div
                                key={ad._id}
                                className="p-6 bg-white rounded-xl shadow-lg flex flex-col justify-between items-start hover:scale-105 transform transition-all duration-300 ease-in-out"
                            >
                                <img
                                    src={ad.image}
                                    alt={ad.heading}
                                    className="w-full h-48 object-cover rounded-lg mb-4 shadow-md"
                                />
                                <div className="w-full mb-4">
                                    <h3 className="text-xl font-bold text-green-700">{ad.heading}</h3>
                                    <p className="text-sm text-gray-600 mt-2">{ad.description}</p>
                                </div>
                                <button
                                    disabled={loading}
                                    onClick={() => handleDelete(ad._id)}
                                    className="mt-4 text-red-500 hover:text-red-700 font-semibold transition-all duration-200 ease-in-out"
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default OffersAds;
