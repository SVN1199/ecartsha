import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContentOptions, updateContentOptions } from '../../../actions/websiteAction';

const ContentOptions = () => {
  const { showcontent = {}, isUpdated } = useSelector((state) => state.showcontentState);
  const dispatch = useDispatch();

  const optionList = [
    {
      key: 'codOptionDisplay',
      label: 'Cash On Delivery',
      description: 'Enable or disable the Cash on Delivery option.',
    },
    {
      key: 'offers',
      label: 'Offers',
      description: 'Enable or disable displaying special offers.',
    },
    {
      key: 'category',
      label: 'Category Display',
      description: 'Enable or disable the category display on the homepage.',
    },
    {
      key: 'offersAd',
      label: 'Offers Advertisement',
      description: 'Enable or disable advertisement banners for offers.',
    },
  ];

  const [options, setOptions] = useState({
    codOptionDisplay: false,
    offers: false,
    category: false,
    offersAd: false,
  });

  useEffect(() => {
    if (Object.keys(showcontent).length) {
      setOptions({
        codOptionDisplay: showcontent.codOptionDisplay || false,
        offers: showcontent.offers || false,
        category: showcontent.category || false,
        offersAd: showcontent.offersAd || false,
      });
    }
  }, [showcontent]);

  const handleToggle = (key) => {
    const updatedOptions = {
      ...options,
      [key]: !options[key],
    };

    setOptions(updatedOptions);

    dispatch(
      updateContentOptions(
        updatedOptions.codOptionDisplay,
        updatedOptions.category,
        updatedOptions.offersAd,
        updatedOptions.offers
      )
    );
  };

  useEffect(() => {
    dispatch(getContentOptions());
  }, [dispatch, isUpdated]);

  return (
    <div className="p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-green-700 tracking-wide">
          Content Options
        </h1>
        <p className="text-gray-600 text-sm mt-2">
          Manage the visibility of different content features on your site.
        </p>
      </div>

      <div className="overflow-hidden bg-white rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead className="bg-green-100">
            <tr>
              <th className="px-6 py-4 text-left text-lg font-bold text-green-700">Option</th>
              <th className="px-6 py-4 text-left text-lg font-bold text-green-700">Description</th>
              <th className="px-6 py-4 text-center text-lg font-bold text-green-700">Toggle</th>
              <th className="px-6 py-4 text-center text-lg font-bold text-green-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {optionList.map(({ key, label, description }) => (
              <tr key={key} className="hover:bg-green-50 transition-colors">
                <td className="px-6 py-4 text-green-900 font-medium font-semibold">{label}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{description}</td>
                <td className="px-6 py-4 text-center">
                  <div
                    className={`relative inline-flex w-14 h-7 transition-all duration-300 ease-in-out rounded-full cursor-pointer shadow-inner ${
                      options[key] ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                    onClick={() => handleToggle(key)}
                  >
                    <span
                      className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ease-in-out ${
                        options[key] ? 'translate-x-7' : 'translate-x-0'
                      }`}
                    />
                  </div>
                </td>
                <td className="px-6 py-4 text-center font-bold text-gray-700">
                  {options[key] ? 'ON' : 'OFF'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContentOptions;