
import { useEffect, useState } from "react"
import ProductImagesForm from "../../../components/admin/products/ProductImagesForm"
import ProductQuantityForm from "../../../components/admin/products/ProductQuantityForm"
import { useDispatch, useSelector } from "react-redux"
import { postProducts } from "../../../actions/productsActions"
import ProductDetailsForm from "../../../components/admin/products/ProductDetailsForm"
import { getCategoriesForCreateProduct } from "../../../actions/categoriesActions"
import { toast } from "react-toastify"
import { clearProduct } from "../../../slices/productSlice"
import { addMultipleProducts } from "../../../actions/admin/adminProductsAction"
import { clearProductsAdded } from "../../../slices/admin/adminProductsSlice"
import SearchAndNavigateMap from "../../../components/admin/products/SearchAndNavigateMap"
import LocationPicker from "../../../components/admin/products/LocationPicker"

const NewProduct = () => {

  const dispatch = useDispatch()


  const { categories = [] } = useSelector((state) => state.categoriesState)
  const { productCreated, error } = useSelector((state) => state.productState)
  const { isProductsAdded, error: productsError } = useSelector((state) => state.adminProductsState)


  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };


  const uploadFile = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    dispatch(addMultipleProducts(formData));
    setFile(null)
  }


  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    category: '',
    productCode: '',
    productColor: '',
    shippingFrom: '',
    details: '',
    productInventory: '',
    warrantyExpires: '',
    warrantyAvailable: false,
    returnPolicyExpires: '',
    returnPolicyAvailable: false,
  })

  const {
    name,
    description,
    category,
    productCode,
    productColor,
    shippingFrom,
    details,
    productInventory,
    warrantyExpires,
    warrantyAvailable,
    returnPolicyExpires,
    returnPolicyAvailable
  } = productForm

  const [productImages, setProductImages] = useState([])

  const onProductFieldChange = (e) => {
    const { name, type, value, checked } = e.target;

    if (type === "checkbox") {
      setProductForm({
        ...productForm,
        [name]: checked,
        ...(name === "warrantyAvailable" && !checked && { warrantyExpires: "" }),
        ...(name === "returnPolicyAvailable" && !checked && { returnPolicyExpires: "" }),
      });
    } else {
      setProductForm({
        ...productForm,
        [name]: value,
      });
    }
  };


  const [productFormError, setProductFormError] = useState({
    name: '',
    description: '',
    category: '',
    images: '',
    productCode: '',
    productColor: '',
    shippingFrom: '',
    details: '',
    productInventory: '',
    warrantyExpires: '',
    warrantyAvailable: '',
    returnPolicyExpires: '',
    returnPolicyAvailable: '',
  });

  const handleProductForm = (e) => {
    e.preventDefault();

    let isValid = true;
    let errors = {};

    if (name?.trim() === '') {
      errors.name = '* Product name is required';
      isValid = false;
    } else {
      errors.name = '';
    }

    if (description?.trim() === '') {
      errors.description = '* Product description is required';
      isValid = false;
    } else {
      errors.description = '';
    }

    if (productImages?.length === 0) {
      errors.images = '* Product images are required';
      isValid = false;
    } else {
      errors.images = '';
    }

    if (!category) {
      errors.category = '* Product category is required';
      isValid = false;
    } else {
      errors.category = '';
    }

    if (details?.trim() === '') {
      errors.details = '* Product details are required';
      isValid = false;
    } else {
      errors.details = '';
    }

    if (productInventory?.trim() === '') {
      errors.productInventory = '* Product inventory is required';
      isValid = false;
    } else {
      errors.productInventory = '';
    }

    if (productCode?.trim() === '') {
      errors.productCode = '* Product code is required';
      isValid = false;
    } else {
      errors.productCode = '';
    }

    if (!shippingFrom) {
      errors.shippingFrom = '* Product shipping from is required';
      isValid = false;
    } else {
      errors.shippingFrom = '';
    }

    if (productColor?.trim() === '') {
      errors.productColor = '* Product color is required';
      isValid = false;
    } else {
      errors.productColor = '';
    }

    if (warrantyAvailable && warrantyExpires.trim() === '') {
      errors.warrantyExpires = '* Product warranty expiry date is required';
      isValid = false;
    } else {
      errors.warrantyExpires = '';
    }

    if (returnPolicyAvailable && returnPolicyExpires.trim() === '') {
      errors.returnPolicyExpires = '* Product return policy expiry date is required';
      isValid = false;
    } else {
      errors.returnPolicyExpires = '';
    }

    setProductFormError((prev) => ({ ...prev, ...errors }));

    if (!isValid) return;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('category', category);
    productImages.forEach(image => {
      formData.append('images', image);
    })
    formData.append('productColor', productColor);
    formData.append('productCode', productCode);
    formData.append('shippingFrom', shippingFrom);
    formData.append('productInventory', productInventory);
    formData.append('details', details);
    formData.append('warrantyAvailable', warrantyAvailable);
    formData.append('warrantyExpires', warrantyExpires);
    formData.append('returnPolicyAvailable', returnPolicyAvailable);
    formData.append('returnPolicyExpires', returnPolicyExpires);
    dispatch(postProducts(formData));
    setProductForm({
      name: '',
      description: '',
      category: '',
      images: '',
      productCode: '',
      productColor: '',
      shippingFrom: '',
      details: '',
      productInventory: '',
      warrantyExpires: '',
      warrantyAvailable: '',
      returnPolicyExpires: '',
      returnPolicyAvailable: '',
    })
    setProductImages([])
  };

  useEffect(() => {
    if (productCreated) {
      toast('Product Created Successfully', {
        type: 'success',
        position: 'bottom-center',
        onOpen: () => dispatch(clearProduct())
      })
    }

    if (isProductsAdded) {
      toast('Products Added Successfully', {
        type: 'success',
        position: 'bottom-center',
        onOpen: () => dispatch(clearProductsAdded())
      })
    }

    if (productsError) {
      toast(productsError, {
        type: 'error',
        position: 'bottom-center',
        onOpen: () => dispatch(clearProductsAdded())
      })
    }

    if (error) {
      toast(error, {
        type: 'error',
        position: 'bottom-center',
        onOpen: () => dispatch(clearProduct())
      })
    }

  }, [error, productsError, productCreated, isProductsAdded, dispatch])


  useEffect(() => {
    dispatch(getCategoriesForCreateProduct())
  }, [dispatch])

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-green-600 tracking-tight">
          Add New Product
        </h1>
      </div>

      <div className="my-3">
        <div className="flex flex-col gap-5">

          <div className="flex flex-row">

            <div className="w-full ">
              <div className="text-md font-bold my-2">Add Multiple Products</div>
              <form action=""
                className="w-full sm:w-full lg:w-4/6 flex flex-col items-center justify-center p-2 productInputBorder"
                onSubmit={uploadFile}>
                <div
                  id="drop-area"
                  className="w-full p-3 flex flex-col gap-2 items-center justify-center"
                >
                  <p className="text-xs flex">Select a .xls or .xlsx file</p>
                  <input
                    type="file"
                    accept=".xls,.xlsx"
                    onChange={handleFileChange}
                    className="w-11/12 file-input text-sm bg-gray-200 p-2 rounded " />
                </div>
                <div className="w-full flex flex-row justify-center items-center rounded p-2 bg-primary text-white text-sm">
                  <button type="submit" >Upload</button>
                </div>
              </form>
            </div>

            <div className="w-full">
              <LocationPicker />
            </div>

          </div>
          <div>

            <div className="text-md font-bold my-2">Add Single Products</div>
            <div className="productInputBorder p-2">
              <form onSubmit={handleProductForm} className="flex flex-col lg:flex lg:flex-row sm:flex gap-1 lg:gap-3 my-5 sm:my-1">

                <div className="h-auto lg:min-h-screen w-full flex flex-col gap-3">

                  <div>
                    <div className="text-md font-bold my-2">Description</div>
                    <div className="p-2 rounded-md productInputBorder" >
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col">
                          <label
                            htmlFor="productName"
                            className="text-xs font-bold mb-1 text-gray-700">Product Name</label>
                          <input
                            type="text"
                            id="productName"
                            name="name"
                            value={name}
                            className="w-full p-2 text-sm productInputBorder rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={onProductFieldChange}
                          />
                          <div>
                            {productFormError.name &&
                              <div className="text-xs text-left my-1 text-red-600">{productFormError.name}</div>
                            }
                          </div>

                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="productDescription" className="text-xs font-bold mb-1 text-gray-700">Business Description</label>
                          <textarea
                            id="productDescription"
                            name="description"
                            value={description}
                            className="w-full p-2 h-24 text-sm productInputBorder rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={onProductFieldChange}
                          ></textarea>
                          <div>
                            {productFormError.description &&
                              <div className="text-xs text-left my-1 text-red-600">{productFormError.description}</div>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-md font-bold my-2">Category</div>
                    <div className="p-2 rounded-md productInputBorder" >
                      <div className="flex flex-col">
                        <label
                          htmlFor="productCategory"
                          className="text-xs font-semibold mb-1 text-gray-700">Product Category</label>

                        <select
                          name="category"
                          id="category"
                          value={category}
                          onChange={onProductFieldChange}
                          className="p-2 capitalize text-sm outline-none productInputBorder rounded mt-2 focus:ring-2 focus:ring-blue-500">
                          <option value="" disabled>
                            Select Category
                          </option>
                          {categories.map(category => (
                            <option key={category.categoryId} value={category.categoryId}>
                              {category.categoryName}
                            </option>
                          ))}
                        </select>


                        <div>
                          {
                            productFormError.category &&
                            <div className="text-xs text-left my-1 text-red-600">{productFormError.category}</div>
                          }
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-md font-bold my-2">Inventory</div>
                    <div className="p-2 flex flex-row gap-2 justify-between rounded-md productInputBorder" >
                      <div className="flex flex-col">
                        <label
                          htmlFor="productColor"
                          className="text-xs font-semibold mb-1 text-gray-700">Product Color</label>
                        <input
                          type="text"
                          id="productColor"
                          name="productColor"
                          value={productColor}
                          onChange={onProductFieldChange}
                          className="w-full p-2 text-sm productInputBorder rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
                        <div>
                          {productFormError.productColor &&
                            <div className="text-xs text-left my-1 text-red-600">{productFormError.productColor}</div>
                          }
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="productCode" className="text-xs font-semibold mb-1 text-gray-700">Product Code</label>
                        <input
                          type="text"
                          id="productCode"
                          name="productCode"
                          value={productCode}
                          onChange={onProductFieldChange}
                          className="w-full p-2 text-sm productInputBorder rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
                        <div>
                          {productFormError.productCode &&
                            <div className="text-xs text-left my-1 text-red-600">{productFormError.productCode}</div>
                          }
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-md font-bold my-2">Product Images</div>
                    <ProductImagesForm productImages={productImages} setProductImages={setProductImages} />
                    {
                      productFormError.images &&
                      <div className="text-xs text-left my-1 text-red-600">{productFormError.images}</div>
                    }
                  </div>

                  <div>
                    <div className="text-md font-bold my-2">Details</div>
                    <ProductDetailsForm productInventoryError={productFormError.details} setProductForm={setProductForm} />
                  </div>


                </div>

                <div className="h-auto lg:min-h-screen w-full flex flex-col gap-3">

                  <div>
                    <div className="text-md font-bold my-2">Attributes & Variants</div>
                    <ProductQuantityForm productInventoryError={productFormError.productInventory} setProductForm={setProductForm} />
                  </div>

                  {
                    /*
                    
                  
                                      <div>
                                      <div className="text-md font-bold my-2">Delivery Charge (Rs.)</div>
                                      <input
                                        type="number"
                                        id="deliveryCharge"
                                        name="deliveryCharge"
                                        value={deliveryCharge}
                                        onChange={onProductFieldChange}
                                        className="w-20 p-2 text-sm productInputBorder rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
                                      {productFormError.deliveryCharge &&
                                        <div className="text-xs text-left my-1 text-red-600">{productFormError.deliveryCharge}</div>
                                      }
                                    </div>
                  
                     */
                  }
                  <SearchAndNavigateMap productInventoryError={productFormError.shippingFrom} setProductForm={setProductForm} />

                  <div>
                    <div className="text-md font-bold my-2">Legal Information</div>
                    <div className="p-2 flex flex-col gap-1 justify-between rounded-md productInputBorder">

                      <div className="w-full flex flex-row gap-2">
                        <div className="w-full flex flex-row items-center gap-2">
                          <input
                            type="checkbox"
                            id="warrantyAvailable"
                            name="warrantyAvailable"
                            value={warrantyAvailable}
                            checked={warrantyAvailable}
                            onChange={onProductFieldChange}
                          />
                          <div className="text-xs">Warranty/Guarantee</div>
                        </div>

                        {warrantyAvailable && (
                          <div className="w-full">
                            <input
                              type="text"
                              placeholder="In Days"
                              id="warrantyExpires"
                              name="warrantyExpires"
                              value={warrantyExpires}
                              onChange={onProductFieldChange}
                              className="w-full p-1 text-sm productInputBorder rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        )}
                      </div>

                      {productFormError.warrantyExpires && (
                        <div className="text-xs text-left my-1 text-red-600">
                          {productFormError.warrantyExpires}
                        </div>
                      )}

                      {/* Return Policy Section */}
                      <div className="w-full flex flex-row gap-2">
                        <div className="w-full flex flex-row items-center gap-2">
                          <input
                            type="checkbox"
                            className="cursor-pointer"
                            id="returnPolicyAvailable"
                            name="returnPolicyAvailable"
                            value={returnPolicyAvailable}
                            checked={returnPolicyAvailable}
                            onChange={onProductFieldChange}
                          />
                          <div className="text-xs">Return Policy</div>
                        </div>

                        {returnPolicyAvailable && (
                          <div className="w-full">
                            <input
                              type="text"
                              placeholder="In Days"
                              id="returnPolicyExpires"
                              name="returnPolicyExpires"
                              value={returnPolicyExpires}
                              onChange={onProductFieldChange}
                              className="w-full p-1 text-sm productInputBorder rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        )}
                      </div>

                      {productFormError.returnPolicyExpires && (
                        <div className="text-xs text-left my-1 text-red-600">
                          {productFormError.returnPolicyExpires}
                        </div>
                      )}
                    </div>
                  </div>


                  <div className="w-full flex flex-row justify-end">
                    <button className="bg-blue-800 text-white p-2 w-2/4 rounded outline-none">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewProduct