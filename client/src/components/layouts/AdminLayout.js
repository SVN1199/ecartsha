import React, { useState } from 'react';
import AdminSideBar from '../admin/AdminSideBar';

const AdminLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex flex-col lg:flex-row w-full min-h-screen">
            {/* Hamburger button for mobile */}
            <div className="lg:hidden bg-primary p-4">
                <button
                    onClick={toggleSidebar}
                    className="text-white focus:outline-none"
                >
                    {/* Hamburger Icon */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>

            {/* Sidebar for larger screens */}
            <div className="hidden lg:block w-1/5 bg-primary min-h-screen">
                <AdminSideBar />
            </div>

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-gray-900 bg-opacity-50 transition-opacity duration-300 ease-in-out"
                    onClick={toggleSidebar}
                >
                    <div
                        className="fixed top-0 left-0 h-screen w-4/5 sm:w-2/3 md:w-1/2 lg:w-1/3 bg-gradient-to-b from-green-600 to-green-800 z-40 shadow-xl rounded-tr-lg rounded-br-lg transition-transform transform translate-x-0"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="pt-16 px-6 space-y-4 absolute top-20">
                        <button
                            onClick={toggleSidebar}
                            className="absolute top-4 right-4 text-white text-3xl hover:text-gray-200"
                            aria-label="Close Sidebar"
                        >
                            &times;
                        </button>
                            <AdminSideBar />
                        </div>
                    </div>
                </div>
            )}



            {/* Main content */}
            <div className="bg-green-100 p-4 flex-1 lg:w-4/5">
                {children}
            </div>
        </div>
    );
};

export default AdminLayout;
