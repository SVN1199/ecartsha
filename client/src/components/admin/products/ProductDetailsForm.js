import React, { useEffect, useState } from 'react'

const ProductDetailsForm = ({ productInventoryError, setProductForm }) => {

  const [productDetails, setProductDetails] = useState({
    productKey: "",
    productValue: "",
    listSize: [],
  });

  const { productKey, productValue, listSize } = productDetails;

  const onchange = (e) => {
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
  };

  const handleProductDetails = (e) => {
    e.preventDefault();

    const newDetails = {
      id: Date.now(), 
      productKey: productKey.trim(),
      productValue: productValue.trim(),
    };

    if (newDetails.productKey && newDetails.productValue) {
      setProductDetails({
        ...productDetails,
        listSize: [...listSize, newDetails], 
        productKey: "", 
        productValue: "",
      });
    }
  };

  const handleRemoveSize = (id) => {
    setProductDetails({
      ...productDetails,
      listSize: listSize.filter((item) => item.id !== id), 
    });
  };

  useEffect(() => {
    if (productDetails.listSize.length > 0) {
      const joins = productDetails.listSize
        .map(
          (item) => `${item.productKey}-${item.productValue}`
        )
        .join('|');

      setProductForm((prev) => ({
        ...prev,
        details: joins,
      }));

    } else {
      setProductForm((prev) => ({
        ...prev,
        details: '',
      }));
    }
  }, [productDetails.listSize, setProductForm]);

  return (
    <div>
      <div className="p-4 flex flex-col gap-4 rounded-md border productInputBorder">
        <div className="flex flex-row gap-2">
          <div className="w-full flex flex-col">
            <label htmlFor="productKey" className="text-xs font-semibold mb-1 text-gray-700">
              Product Key
            </label>
            <input
              type="text"
              id="productKey"
              name="productKey"
              value={productKey}
              onChange={onchange}
              className="w-full p-2 text-sm  productInputBorder rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="w-full flex flex-col">
            <label htmlFor="productValue" className="text-xs font-semibold mb-1 text-gray-700">
              Product Value
            </label>
            <input
              type="text"
              id="productValue"
              name="productValue"
              value={productValue}
              onChange={onchange}
              className="w-full p-2 text-sm productInputBorder rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="w-full flex flex-col">
          <button
            className="w-full p-2 bg-blue-800 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition duration-200"
            onClick={handleProductDetails}
          >
            Add
          </button>
        </div>

        {productInventoryError && (
          <div className="w-52 text-xs text-left my-1 text-red-600">
            {productInventoryError}
          </div>
        )}
      </div>

      <div className="col-span-3 mt-3">
        <ul className="w-full p-2 grid grid-cols-2 gap-3 min-h-14 productInputBorder rounded-md bg-gray-50">
          {listSize.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center bg-white p-2 rounded-md shadow-sm"
            >
              <span className="text-xs">
                {`${item.productKey} - ${item.productValue}`}
              </span>
              <button
                type="button"
                className="text-xs cursor-pointer text-red-600 font-bold"
                onClick={() => handleRemoveSize(item.id)}
                aria-label={`Remove size ${item.productKey}`}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductDetailsForm;