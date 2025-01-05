import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFooterContent, updateFooterMedia } from '../../../actions/websiteAction';
import { toast } from 'react-toastify';
import { clearMessages } from '../../../slices/footerSlice';
import { Link } from 'react-router-dom';

const FooterContent = () => {
  const [form1, setForm1] = useState({ address: '', contact: '', copyright: '' });
  const [form2, setForm2] = useState({ icon: '', link: '', name: '' });
  const [showPopup, setShowPopup] = useState(false);
  const [mediaId, setMediaId] = useState(null);
  const { footer = {}, isUpdated } = useSelector((state) => state.footerState);
  const dispatch = useDispatch();

  const handleForm1Change = (e) => {
    const { name, value } = e.target;
    setForm1({ ...form1, [name]: value });
  };

  const handleForm2Change = (e) => {
    const { name, value } = e.target;
    setForm2({ ...form2, [name]: value });
  };

  const handleForm1Submit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('address', form1.address);
    formData.append('contact', form1.contact);
    formData.append('copyright', form1.copyright);
    dispatch(updateFooterContent(formData));
  };

  const handleForm2Submit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('icon', form2.icon);
    formData.append('link', form2.link);
    formData.append('name', form2.name);
    if(mediaId){
      dispatch(updateFooterMedia(mediaId, formData))
    }else{
      dispatch(updateFooterMedia('',formData))
    };
    setShowPopup(false); 
    setMediaId(null)
  };

  useEffect(() => {
    if (footer) {
      setForm1({
        address: footer.address || '',
        contact: footer.contact || '',
        copyright: footer.copyright || '',
      });
    }
  }, [footer]);

  useEffect(() => {
    if (isUpdated) {
      toast('Footer Content Updated Successfully', {
        type: 'success',
        position: 'bottom-center',
        onOpen: () => dispatch(clearMessages()),
      });
    }
  }, [isUpdated, dispatch]);

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-green-600 tracking-tight">Footer Content</h1>
      </div>

      <form onSubmit={handleForm1Submit} className="mb-6">
        <div className="mb-4">
          <label htmlFor="address" className="block font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={form1.address}
            onChange={handleForm1Change}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 ring-green-500 outline-none"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="contact" className="block font-medium text-gray-700">
            Contact
          </label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={form1.contact}
            onChange={handleForm1Change}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 ring-green-500 outline-none"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="copyright" className="block font-medium text-gray-700">
            Copyright
          </label>
          <input
            type="text"
            id="copyright"
            name="copyright"
            value={form1.copyright}
            onChange={handleForm1Change}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 ring-green-500 outline-none"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
        >
          Save Content
        </button>
      </form>

      <div className="mb-6 mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Footer Media</h2>
        {footer?.mediasurl?.length === 0 ? (
          <div className="text-gray-600">
            <p>No media added yet. Please add footer media.</p>
            <form onSubmit={handleForm2Submit} className="mt-4">
              <div className="mb-4">
                <label htmlFor="icon" className="block font-medium text-gray-700">
                  Icon
                </label>
                <input
                  type="text"
                  id="icon"
                  name="icon"
                  value={form2.icon}
                  onChange={handleForm2Change}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 ring-green-500 outline-none"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="block font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form2.name}
                  onChange={handleForm2Change}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 ring-green-500 outline-none"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="link" className="block font-medium text-gray-700">
                  Link
                </label>
                <input
                  type="text"
                  id="link"
                  name="link"
                  value={form2.link}
                  onChange={handleForm2Change}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 ring-green-500 outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
              >
                Save Media
              </button>
            </form>
          </div>
        ) : (
          <ul className="space-y-4">
            {footer?.mediasurl?.map((media, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={media?.icon}
                    alt={media?.name}
                    className="h-12 w-12 rounded-full border border-gray-200 object-cover"
                  />
                  <div>
                    <p className="text-gray-900 font-semibold text-lg">{media?.name}</p>
                    <p className="text-gray-500 text-sm">
                      <span className="font-medium">Link: </span>
                      <Link
                        href={media?.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {media?.name}
                      </Link>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setForm2(media);
                    setShowPopup(true);
                    setMediaId(media._id)
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-300"
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Update Media</h2>
            <form onSubmit={handleForm2Submit}>
              <div className="mb-4">
                <label htmlFor="icon" className="block font-medium text-gray-700">
                  Icon
                </label>
                <input
                  type="text"
                  id="icon"
                  name="icon"
                  value={form2.icon}
                  onChange={handleForm2Change}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 ring-green-500 outline-none"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="block font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form2.name}
                  onChange={handleForm2Change}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 ring-green-500 outline-none"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="link" className="block font-medium text-gray-700">
                  Link
                </label>
                <input
                  type="text"
                  id="link"
                  name="link"
                  value={form2.link}
                  onChange={handleForm2Change}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 ring-green-500 outline-none"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FooterContent;