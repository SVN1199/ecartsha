import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getServicesAndAbout, updateServicesAndAbout } from '../../../actions/websiteAction';
import { toast } from 'react-toastify';
import { clearService } from '../../../slices/serviceSlice';

const Homepage = () => {

    const { services, isUpdated, error, loading } = useSelector((state) => state.serviceState);

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        services: '',
        about: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append('services', formData.services);
        form.append('about', formData.about);

        dispatch(updateServicesAndAbout(form));
    };

    useEffect(() => {
        if (services) {
            setFormData({
                services: services.services || '',
                about: services.about || '',
            });
        }
        dispatch(getServicesAndAbout());
    }, [services, dispatch]);

    useEffect(() => {

        if (isUpdated) {
            toast('Content Updated Successfully', {
                type: 'success',
                position: 'bottom-center',
                onOpen: () => dispatch(clearService()),
            });
        }

        if (error) {
            toast(error, {
                type: 'error',
                position: 'bottom-center',
                onOpen: () => dispatch(clearService()),
            });
        }

    }, [isUpdated, error, dispatch]);

    return (
        <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg">
            <div className="mb-6">
                <h1 className="text-3xl font-extrabold text-green-600 tracking-tight">Home Page Content</h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="services" className="block text-lg text-gray-700 font-semibold">Services</label>
                    <textarea
                        id="services"
                        name="services"
                        value={formData.services}
                        onChange={handleChange}
                        rows="4"
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter services content here..."
                        required
                    />
                </div>
                <div>
                    <label htmlFor="about" className="block text-lg font-semibold text-gray-700">About</label>
                    <textarea
                        id="about"
                        name="about"
                        value={formData.about}
                        onChange={handleChange}
                        rows="4"
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter about content here..."
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-3 rounded-md mt-4 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Homepage;