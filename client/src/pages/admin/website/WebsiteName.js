import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateWebsiteName } from '../../../actions/homeAction';
import { toast } from 'react-toastify';
import { clearMessage } from '../../../slices/homeSlice';

const WebsiteName = () => {
    const [websiteName, setWebsiteName] = useState('');
    const dispatch = useDispatch();

    const { websiteName: currentWebsiteName ={}, isUpdated, loading, error } = useSelector((state) => state.homeState);

    useEffect(() => {
        if (currentWebsiteName?.name) {
            setWebsiteName(currentWebsiteName?.name);
        }
    }, [currentWebsiteName]);

    useEffect(() => {
        if (isUpdated) {
            toast.success('Website Name Updated Successfully', {
                position: 'bottom-center',
                onOpen: () => dispatch(clearMessage()),
            });
        }

        if (error) {
            toast.error(error, {
                position: 'bottom-center',
                onOpen: () => dispatch(clearMessage()),
            });
        }
    }, [dispatch, isUpdated, error]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!websiteName.trim()) {
            return toast.warn('Website name cannot be empty.', {
                position: 'bottom-center',
            });
        }
        const formData = new FormData();
        formData.append('name', websiteName);
        dispatch(updateWebsiteName(formData));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-50 to-green-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <div className="mb-6 text-center">
                    <h1 className="text-4xl font-extrabold text-green-600 tracking-tight">
                        Update Website Name
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Change the name of your website easily and quickly.
                    </p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label
                            htmlFor="websiteName"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Website Name
                        </label>
                        <input
                            type="text"
                            id="websiteName"
                            name="websiteName"
                            value={websiteName}
                            onChange={(e) => setWebsiteName(e.target.value)}
                            className="block w-full px-4 py-2 outline-none focus:ring-2 ring-green-500 border border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 text-gray-700 sm:text-sm"
                            placeholder="Enter new website name"
                        />
                    </div>
                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-2 px-4 text-white rounded-md shadow focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                                loading
                                    ? 'bg-green-400 cursor-not-allowed'
                                    : 'bg-green-600 hover:bg-green-700'
                            }`}
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WebsiteName;