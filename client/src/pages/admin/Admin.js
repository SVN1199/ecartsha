import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import MetaData from '../../components/layouts/MetaData';

const Admin = () => {

  const { websiteName: currentWebsiteName = {} } = useSelector((state) => state.homeState);

  return (
    <Fragment>
      <MetaData title='Admin' />
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-teal-500 via-green-500 to-lime-500">
        <div className="flex flex-col items-center bg-white p-4 lg:p-8 sm:p-4  rounded-3xl shadow-2xl transform hover:scale-105 transition duration-500">
          <div className="h-36 w-36 lg:w-44 lg:h-44 sm:h-36 sm:w-36 bg-gradient-to-tr from-green-400 to-teal-500 rounded-full p-2 mb-4 shadow-lg">
            <img
              src="./images/shana-logo.jpeg"
              alt="ShaNa Boutique Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2 tracking-wider">
            {currentWebsiteName !== '' ? currentWebsiteName?.name : 'ShaNa Boutique'}
          </h1>
          <p className="text-lg font-medium text-gray-600 mb-6 italic">
            "Style, Elegance, and More"
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default Admin;