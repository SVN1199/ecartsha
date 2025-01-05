import { useDispatch, useSelector } from "react-redux";
import { Fragment, useState, useEffect } from "react";
import { clearItemsMessage, saveShippingInfo } from "../../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ShippingAddress from "../../components/Order/ShippingAddress";

const Shipping = () => {
    const { shippingInfo = {}, isUpdated } = useSelector(state => state.cartState);

    const [address, setAddress] = useState(shippingInfo.address || '');
    const [city, setCity] = useState(shippingInfo.city || '');
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || '');
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode || '');
    const [state, setState] = useState(shippingInfo.state || '');
    const [country, setCountry] = useState(shippingInfo.country || '');
    const [position, setPosition] = useState([19.076, 72.8777]);
    const [isSearched, setIsSearched] = useState(false)


    const [formError, setFormError] = useState({
        address: '',
        city: '',
        phoneNo: '',
        postalCode: '',
        state: '',
        country: ''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        setFormError({ address: '', city: '', phoneNo: '', postalCode: '', state: '', country: '' });
        let isValid = true;

        if (address.trim() === '') {
            setFormError(prev => ({ ...prev, address: 'Address is required' }));
            isValid = false;
        }

        if (city.trim() === '') {
            setFormError(prev => ({ ...prev, city: 'City is required' }));
            isValid = false;
        }

        if (phoneNo.trim() === '') {
            setFormError(prev => ({ ...prev, phoneNo: 'Phone number is required' }));
            isValid = false;
        }

        if (postalCode.trim() === '') {
            setFormError(prev => ({ ...prev, postalCode: 'Postal code is required' }));
            isValid = false;
        }

        if (state.trim() === '') {
            setFormError(prev => ({ ...prev, state: 'State is required' }));
            isValid = false;
        }

        if (country.trim() === '') {
            setFormError(prev => ({ ...prev, country: 'Country is required' }));
            isValid = false;
        }

        if (!isValid) return;

        if (isSearched) {
            dispatch(saveShippingInfo({ address, city, phoneNo, postalCode, state, country, position }));
        }
    }


    useEffect(() => {
        if (isUpdated) {
            toast('Address has been updated', {
                position: 'bottom-center',
                type: 'success',
                onOpen: () => dispatch(clearItemsMessage())
            })
            navigate('/mycart');
            setIsSearched(false)
        }

    }, [isUpdated, dispatch, navigate])

    return (
        <Fragment>
            <div className="flex justify-center items-center min-h-screen w-full bg-gradient-to-r from-gray-50 to-gray-100 ">
                <div className="w-full max-w-lg shadow-2xl rounded-lg overflow-hidden bg-white">
                    <form onSubmit={submitHandler} className="p-8">
                        <div className="text-3xl font-bold text-center text-gray-800 mb-4">Shipping Info</div>
                        <div className="h-1 bg-gradient-to-r from-green-500 to-green-500 rounded-full mb-6"></div>

                        <div className="mb-5">
                            <label htmlFor="address_field" className="block text-lg font-semibold text-gray-700">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            {formError.address && <div className="text-red-500 text-sm mt-1">{formError.address}</div>}
                        </div>

                        <div className="mb-5">
                            <label htmlFor="city_field" className="block text-lg font-semibold text-gray-700">City</label>
                            <ShippingAddress
                                position={position}
                                setPosition={setPosition}
                                city={city}
                                setCity={setCity}
                                isSearched={isSearched}
                                setIsSearched={setIsSearched}
                            />
                            {formError.city && <div className="text-red-500 text-sm mt-1">{formError.city}</div>}
                        </div>

                        <div className="mb-5">
                            <label htmlFor="phone_field" className="block text-lg font-semibold text-gray-700">Phone No</label>
                            <input
                                type="text"
                                id="phone_field"
                                className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                            />
                            {formError.phoneNo && <div className="text-red-500 text-sm mt-1">{formError.phoneNo}</div>}
                        </div>

                        <div className="mb-5">
                            <label htmlFor="postal_code_field" className="block text-lg font-semibold text-gray-700">Postal Code</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                            />
                            {formError.postalCode && <div className="text-red-500 text-sm mt-1">{formError.postalCode}</div>}
                        </div>

                        <div className="mb-5">
                            <label htmlFor="state_field" className="block text-lg font-semibold text-gray-700">State</label>
                            <input
                                type="text"
                                id="state_field"
                                className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                            {formError.state && <div className="text-red-500 text-sm mt-1">{formError.state}</div>}
                        </div>

                        <div className="mb-5">
                            <label htmlFor="country_field" className="block text-lg font-semibold text-gray-700">Country</label>
                            <input
                                type="text"
                                id="country_field"
                                className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                            {formError.country && <div className="text-red-500 text-sm mt-1">{formError.country}</div>}
                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-green-500 to-green-500 text-white text-lg font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-green-500 hover:to-green-500 transition-all duration-300"
                        >
                            CONTINUE
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}

export default Shipping;
