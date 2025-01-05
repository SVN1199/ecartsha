import { useState } from "react";

const ProductImagesForm = ({ productImages, setProductImages }) => {
  const [productImagesPreview, setProductImagesPreview] = useState([]);

  const onProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + productImages.length > 6) {
      alert("You can only upload a maximum of 6 images.");
      return;
    }

    if (files.length > 0 && files.length <= 5) {
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setProductImagesPreview((oldArray) => [...oldArray, reader.result]);
            setProductImages((oldArray) => [...oldArray, file]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (id) => {
    const updatedProductImages = productImages.filter((_, index) => index !== id);
    setProductImages(updatedProductImages);
  
    const updatedProductImagesPreview = productImagesPreview.filter((_, index) => index !== id);
    setProductImagesPreview(updatedProductImagesPreview);
  };
  
  return (
    <div className="p-2 rounded-md productInputBorder">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <div id="preview" className="h-auto w-full grid grid-cols-3 productInputBorder overflow-x-scroll overflow-y-hidden imagescontainer">
            {productImagesPreview?.length > 0 ? (
              productImagesPreview?.map((img, index) => (
                <div className="relative h-28 w-28" key={index}>
                  <img
                    src={img}
                    alt={`Preview ${index}`}
                    className="h-full w-full object-contain p-1"
                  />
                  <span 
                    onClick={()=>handleRemoveImage(index)}
                    className="absolute top-1 right-1 opacity-60 cursor-pointer">X</span>
                </div>
              ))
            ) : (
              <img src="./images/userpng.png" alt="Default Preview" className="w-28 h-28 object-contain p-1" />
            )}
          </div>
          <input
            type="file"
            id="fileInput"
            name="file"
            onChange={onProductImagesChange}
            accept="image/*"
            multiple
            className="hidden"
          />
          <label
            htmlFor="fileInput"
            id="dropArea"
            className="h-10 w-full flex justify-center items-center p-2 bg-gray-100 font-light text-xs"
          >
            Drag & Drop or Click to Upload
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProductImagesForm;