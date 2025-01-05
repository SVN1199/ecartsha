import { useEffect, useMemo, useState } from "react";
import { isNumeric } from "validator";

const ProductQuantityForm = ({ productInventoryError, setProductForm }) => {
  const [quantityDetails, setQuantityDetails] = useState({
    productSize: "",
    productQuantity: "",
    productPrice: "",
    productDiscount: "",
    productGST: "",
    listSize: [],
  });

  const onchange = (e) => {
    const { name, value } = e.target;
    setQuantityDetails((prev) => ({ ...prev, [name]: value }));
  };

  const calculatingTotalPrice = (discount, price, gst) => {
    const parsedDiscount = discount ? parseFloat(discount) / 100 : 0;
    const parsedGST = gst ? parseFloat(gst) / 100 : 0;
    const basePrice = parseFloat(price || 0);
    const discountedPrice = basePrice * (1 - parsedDiscount);
    return discountedPrice + discountedPrice * parsedGST;
  };

  const handleSizeAndQuantity = (e) => {
    e.preventDefault();
    const { productSize, productQuantity, listSize, productPrice, productGST, productDiscount } =
      quantityDetails;

    if (!productSize || !productQuantity || parseInt(productQuantity, 10) <= 0 || !productPrice || !productGST) {
      return;
    }

    const size = isNumeric(productSize) ? parseInt(productSize, 10) : productSize.toUpperCase();
    const total = calculatingTotalPrice(productDiscount, productPrice, productGST);

    const newItem = {
      id: listSize.length + 1,
      productSize: size,
      productQuantity: parseInt(productQuantity, 10),
      productPrice: parseFloat(productPrice),
      productGST: parseFloat(productGST),
      productDiscount: parseFloat(productDiscount),
      totalPrice: total.toFixed(2),
    };

    setQuantityDetails((prev) => ({
      ...prev,
      productSize: "",
      productQuantity: "",
      productPrice: "",
      productGST: "",
      productDiscount: "",
      listSize: [...prev.listSize, newItem],
    }));
  };

  const totalProductPrice = useMemo(() => {
    const { productDiscount, productPrice, productGST } = quantityDetails;
    return calculatingTotalPrice(productDiscount, productPrice, productGST).toFixed(2);
  }, [quantityDetails]);

  const handleRemoveSize = (id) => {
    setQuantityDetails((prev) => ({
      ...prev,
      listSize: prev.listSize.filter((item) => item.id !== id),
    }));
  };

  useEffect(() => {
    if (quantityDetails.listSize.length > 0) {
      const joins = quantityDetails.listSize
        .map(
          (item) =>
            `${item.productSize}-${item.productQuantity}-${item.productPrice}-${item.productDiscount}-${item.productGST}`
        )
        .join("|");

      setProductForm((prev) => ({ ...prev, productInventory: joins }));
    } else {
      setProductForm((prev) => ({ ...prev, productInventory: "" }));
    }
  }, [quantityDetails.listSize, setProductForm]);

  return (
    <div>
      <div className="p-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-4 rounded-md border productInputBorder">
        <div className="flex flex-col">
          <label htmlFor="productSize" className="text-xs font-semibold mb-1 text-gray-700">
            Product Size
          </label>
          <input
            type="text"
            id="productSize"
            name="productSize"
            className="w-full p-2 text-sm uppercase productInputBorder rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            value={quantityDetails.productSize}
            onChange={onchange}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="productQuantity" className="text-xs font-semibold mb-1 text-gray-700">
            Product Quantity
          </label>
          <input
            type="number"
            placeholder="Enter Quantity"
            id="productQuantity"
            name="productQuantity"
            className="w-full p-2 text-sm productInputBorder rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            value={quantityDetails.productQuantity}
            onChange={onchange}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="productPrice" className="text-xs font-semibold mb-1 text-gray-700">
            Product Price
          </label>
          <input
            type="number"
            placeholder="Enter Price"
            className="w-full p-2 text-sm productInputBorder rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            name="productPrice"
            value={quantityDetails.productPrice}
            onChange={onchange}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="productDiscount" className="text-xs font-semibold mb-1 text-gray-700">
            % Discount
          </label>
          <input
            type="number"
            placeholder="Enter Discount"
            className="w-full p-2 text-sm productInputBorder rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            name="productDiscount"
            value={quantityDetails.productDiscount}
            onChange={onchange}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="productGST" className="text-xs font-semibold mb-1 text-gray-700">
            GST %
          </label>
          <input
            type="number"
            placeholder="Enter GST"
            className="w-full p-2 text-sm productInputBorder rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            name="productGST"
            value={quantityDetails.productGST}
            onChange={onchange}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="totalPrice" className="text-xs font-semibold mb-1 text-gray-700">
            Total Price / Qty
          </label>
          <div className="w-full p-2 text-sm h-9 productInputBorder rounded-md outline-none focus:ring-2 focus:ring-blue-500">
            Rs. {totalProductPrice}
          </div>
        </div>

        <div className="w-full flex flex-col mt-5">
          <button
            onClick={handleSizeAndQuantity}
            className="w-full p-2 bg-blue-800 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition duration-200"
          >
            Add
          </button>
        </div>

        {productInventoryError && (
          <div className="w-52 text-xs text-left my-1 text-red-600">{productInventoryError}</div>
        )}
      </div>

      <div className="col-span-3 mt-3">
        <ul className="w-full p-2 grid grid-cols-2 gap-3 min-h-14 productInputBorder rounded-md bg-gray-50">
          {quantityDetails.listSize.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center bg-white p-2 rounded-md shadow-sm"
            >
              <span className="text-xs">
                {`${item.productSize} - ${item.productQuantity} - ${item.productPrice} - ${item.productDiscount}% - ${item.productGST}%`}
              </span>
              <button
                type="button"
                className="text-xs cursor-pointer text-red-600 font-bold"
                onClick={() => handleRemoveSize(item.id)}
                aria-label={`Remove size ${item.productSize}`}
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

export default ProductQuantityForm;