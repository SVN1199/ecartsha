import { IoIosLogOut } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../actions/userActions";
import { useEffect } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import Search from "./Search";

const Header = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isAuthenticated, user } = useSelector(state => state.authState)
    const { items: cartItems } = useSelector(state => state.cartState)
    const { websiteName: currentWebsiteName = {} } = useSelector((state) => state.homeState);

    const websiteName = currentWebsiteName?.name || 'ShaNa Boutique';

    const handleLogout = () => {
        dispatch(logOut)
    }

    useEffect(() => {

    }, [isAuthenticated, navigate])

    return (
        <header className=" bg-primary border-b-10  z-50 sticky top-0 left-0 w-full px-4 py-4 sm:py-2 lg:py-2 shadow-none sm:shadow-none lg:shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:h-16">
                <div className="flex justify-between items-center w-full sm:w-auto">
                    <Link to='/'>
                        <div className="logo flex flex-row gap-2 items-center cursor-pointer">
                            <div className="h-16 w-16 bg-white rounded-full">
                                <img src="/images/shana-logo-hd.png" alt="shaNa" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-sm hidden sm:hidden lg:block text-white font-bold">
                               {websiteName}
                            </span>
                        </div>
                    </Link>
                    {
                        isAuthenticated ?
                            <div className="visible xs:visible sm:visible md:hidden lg:hidden relative group w-7/12 sm:w-7/12 lg:1/6">
                                <div className="sm:flex items-center gap-2  p-2 bg-white rounded-md w-full myprofile">
                                    <div className="w-full flex flex-row items-center justify-between gap-2">
                                        <img
                                            src={user?.avatar || './images/userpng.png'}
                                            alt="user"
                                            style={{ height: '40px', width: '40px', border: '1px solid white' }}
                                            className="bg-white rounded-full object-cover"
                                        />
                                        <div className="text-green-800 text-sm">{user?.name}</div>
                                        <div className="text-primary cursor-pointer transition-transform duration-200 group-hover:rotate-180">
                                            <TiArrowSortedDown />
                                        </div>
                                    </div>
                                </div>

                                <div className="hidden group-hover:flex myprofile-inner text-green-800 bg-white shadow-md p-3 text-xs flex-col gap-2 rounded-md absolute top-full left-0 transition-all duration-300 opacity-0 group-hover:opacity-100 transform group-hover:translate-y-2 z-50">
                                    {user?.role === 'admin' && (
                                        <Link to="/admin">
                                            <div className="shadow-sm p-2 rounded hover:bg-gray-100 transition-colors">
                                                Admin Panel
                                            </div>
                                        </Link>
                                    )}
                                    <Link to="/myprofile">
                                        <div className="shadow-sm p-2 rounded hover:bg-gray-100 transition-colors">
                                            My Profile
                                        </div>
                                    </Link>
                                    <Link to="/myorders">
                                        <div className="shadow-sm p-2 rounded hover:bg-gray-100 transition-colors">
                                            My Orders
                                        </div>
                                    </Link>
                                    <Link to="/mywishlist">
                                        <div className="shadow-sm p-2 rounded hover:bg-gray-100 transition-colors">
                                            Wishlist
                                        </div>
                                    </Link>
                                    {isAuthenticated && (
                                        <div
                                            onClick={handleLogout}
                                            className="flex items-center justify-between shadow-sm p-2 rounded cursor-pointer hover:bg-gray-100 transition-colors"
                                        >
                                            <span className="text-sm">Logout</span>
                                            <IoIosLogOut className="text-xl text-red-600" />
                                        </div>
                                    )}
                                </div>

                            </div>
                            :
                            <div className="relative visible lg:hidden  group w-1/8">
                                <Link to='/login'>
                                    <div className="sm:flex items-center gap-2 py-4 px-6 bg-white rounded-md w-full myprofile">
                                        <div className="w-full flex flex-row items-center justify-around gap-2">
                                            <div className="text-primary text-sm">Login</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                    }

                    <Link to='/mycart' className="flex items-center gap-2 sm:hidden text-white">
                        <div className="relative">
                            <FaShoppingCart className="text-3xl" />
                            {isAuthenticated && <span className="absolute top-0 right-0 bg-red-600 text-white h-2 w-2 p-2 rounded-full text-xs flex flex-row items-center justify-center">
                                {cartItems.length}
                            </span>}
                        </div>
                    </Link>


                </div>

                <Search />

                {
                    isAuthenticated ?
                        <div className="relative group w-1/6">
                            <div className="hidden sm:flex items-center gap-2 py-6 px-2 bg-white rounded-md w-full h-11 myprofile">
                                <div className="w-full flex flex-row items-center justify-between gap-2">
                                    <img
                                        src={user?.avatar || './images/userpng.png'}
                                        alt="user"
                                        style={{ height: '40px', width: '40px', border: '1px solid white' }}
                                        className="bg-white rounded-full object-cover"
                                    />
                                    <div className="text-green-800 text-sm">{user?.name}</div>
                                    <div className="text-primary cursor-pointer transition-transform duration-200 group-hover:rotate-180">
                                        <TiArrowSortedDown />
                                    </div>
                                </div>
                            </div>

                            <div className="hidden group-hover:flex myprofile-inner text-green-800 bg-white shadow-md p-3 text-xs flex-col gap-2 rounded-md absolute top-full left-0 transition-all duration-300 opacity-0 group-hover:opacity-100 transform group-hover:translate-y-2 z-50">
                                {user?.role === 'admin' && (
                                    <Link to="/admin">
                                        <div className="shadow-sm p-2 rounded hover:bg-gray-100 transition-colors">
                                            Admin Panel
                                        </div>
                                    </Link>
                                )}
                                <Link to="/myprofile">
                                    <div className="shadow-sm p-2 rounded hover:bg-gray-100 transition-colors">
                                        My Profile
                                    </div>
                                </Link>
                                <Link to="/myorders">
                                    <div className="shadow-sm p-2 rounded hover:bg-gray-100 transition-colors">
                                        My Orders
                                    </div>
                                </Link>
                                <Link to="/mywishlist">
                                    <div className="shadow-sm p-2 rounded hover:bg-gray-100 transition-colors">
                                        Wishlist
                                    </div>
                                </Link>
                                {isAuthenticated && (
                                    <div
                                        onClick={handleLogout}
                                        className="flex items-center justify-between shadow-sm p-2 rounded cursor-pointer hover:bg-gray-100 transition-colors"
                                    >
                                        <span className="text-sm">Logout</span>
                                        <IoIosLogOut className="text-xl text-red-600" />
                                    </div>
                                )}
                            </div>

                        </div>
                        :
                        <div className="relative group w-1/8">
                            <Link to='/login'>
                                <div className="hidden sm:flex items-center gap-2 py-4 px-6 bg-white rounded-md w-full h-11 myprofile">
                                    <div className="w-full flex flex-row items-center justify-around gap-2">
                                        <div className="text-primary text-sm">Login</div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                }

                <Link to='/mycart'>
                    <div className="hidden sm:flex items-center gap-2 text-white">
                        <div className="relative">
                            <FaShoppingCart className="text-3xl" />
                            {isAuthenticated && <span className="absolute top-0 right-0 bg-red-600 text-white h-2 w-2 p-2 rounded-full text-xs flex flex-row items-center justify-center">
                                {cartItems.length}
                            </span>}
                        </div>
                    </div>
                </Link>

            </div>
        </header>
    );
}

export default Header;