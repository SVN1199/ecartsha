import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import store from './store';
import { loadUser } from './actions/userActions';
import Home from './pages/home/Home';
import { HelmetProvider } from 'react-helmet-async'
import ProtectedRoute from './components/route/ProtectedRoute';
import MyProfile from './pages/user/MyProfile';
import Products from './pages/products/Products';
import Admin from './pages/admin/Admin';
import AdminLayout from './components/layouts/AdminLayout';
import MyOrders from './pages/user/MyOrders';
import MyWishlist from './pages/user/MyWishlist';
import MyCart from './pages/user/MyCart';
import Dashboard from './pages/admin/dashboard/Dashboard';
import AllProducts from './pages/admin/products/AllProducts';
import NewProduct from './pages/admin/products/NewProduct';
import Categories from './pages/admin/categories/Categories';
import Reviews from './pages/admin/products/Reviews';
import AllOrders from './pages/admin/orders/AllOrders';
import ManageReturn from './pages/admin/orders/ManageReturn';
import SalesReports from './pages/admin/reportsAnalytics/SalesReports';
import ProductPerformance from './pages/admin/reportsAnalytics/ProductPerformance';
import CustomerReports from './pages/admin/reportsAnalytics/CustomerReports';
import Messages from './pages/admin/messages/Messages';
import CustomerList from './pages/admin/customers/CustomerList';
import CustomerFeedback from './pages/admin/customers/CustomerFeedback';
import SingleProduct from './pages/products/SingleProduct';
import VerifyEmail from './pages/auth/VerifyEmail';
import ChangePassword from './pages/auth/ChangePassword';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import EditProfile from './pages/user/EditProfile';
import SearchProducts from './pages/products/SearchProducts';
import CategoryProducts from './pages/products/CategoryProducts';
import Inventory from './pages/admin/products/Inventory';
import Details from './pages/admin/products/Details';
import DescriptionAndHide from './pages/admin/products/DescriptionAndHide';
import ProductsStocks from './pages/admin/products/ProductsStocks';
import ViewCategories from './pages/admin/categories/ViewCategories';
import Checkout from './pages/user/Checkout';
import Payment from './pages/user/Payment';
import axios from 'axios';
import Shipping from './pages/user/Shipping';
import ProductReviews from './pages/products/ProductReviews';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SingleOrder from './pages/admin/orders/SingleOrder';
import SingleOrderView from './pages/user/SingleOrderView';
import ShippingPriceAllocate from './pages/admin/orders/ShippingPriceAllocate';
import ReturnOrder from './pages/user/ReturnOrder';
import HomeImages from './pages/admin/website/HomeImages';
import SingleReturnOrder from './pages/admin/orders/SingleReturnOrder';
import ProductsByCategory from './pages/products/ProductsByCategory';
import EditProduct from './pages/admin/products/EditProduct';
import DiscountsProducts from './pages/admin/discount/DiscountsProducts';
import WebsiteManagement from './pages/admin/website/WebsiteManagement';
import ContentOptions from './pages/admin/website/ContentOptions';
import Homepage from './pages/admin/website/Homepage';
import OffersAds from './pages/admin/website/OffersAds';
import Header from './components/layouts/Header';
import WebsiteName from './pages/admin/website/WebsiteName';
import { getWebsiteName } from './actions/homeAction';
import OffersProducts from './pages/products/OffersProducts';
import { recentViewedProducts } from './actions/productsActions';
import FooterContent from './pages/admin/website/FooterContent';
import { getFooterContent } from './actions/websiteAction';

store.dispatch(getWebsiteName())
store.dispatch(recentViewedProducts())
store.dispatch(getFooterContent())
function App() {
  const [stripeApiKey, setStripeApiKey] = useState("")
  useEffect(() => {
    store.dispatch(loadUser)


    async function getStripeApiKey() {
      try {
        const response = await axios.get('/api/v1/payment/stripeapi')

        const data = await response.data;

        if (data?.stripeApiKey) {
          setStripeApiKey(data.stripeApiKey);
        } else {
          throw new Error("Stripe API Key not found in the response");
        }
      } catch (error) {
        console.error("Error fetching Stripe API Key:", error);
      }
    }

    getStripeApiKey()
  }, [])

  return (
    <div className=''>
      <BrowserRouter>
        <Header />
        <HelmetProvider >
          <div className='min-h-screen w-full bg-gray-50'>
            <ToastContainer theme='dark' />
            <Routes>
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/verify-email' element={<VerifyEmail />} />
              <Route path='/forgotpassword' element={<ForgotPassword />} />
              <Route path='/password/reset/:token' element={<ResetPassword />} />
              <Route path='/' element={<Home />} />
              <Route path='/products' element={<Products />} />
              <Route path='/offers' element={<OffersProducts />} />
              <Route path='/searchproducts/:keyword' element={<SearchProducts />} />
              <Route path='/categoryproducts/:categoryId' element={<CategoryProducts />} />
              <Route path='/productsbycategory/:categoryId' element={<ProductsByCategory />} />
              <Route path='/product/:productName/:productCode/:productId' element={<SingleProduct />} />
              <Route path='/product/reviews/:productId' element={<ProductReviews />} />
              <Route path='/myprofile' element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
              <Route path='/editprofile/:userId' element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
              <Route path='/changepassword' element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
              <Route path='/myorders' element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
              <Route path='/myorders/orderdetails/:orderId/:singleOrderId' element={<ProtectedRoute><SingleOrderView /></ProtectedRoute>} />
              <Route path='/returnorder/:orderId/:orderItemId' element={<ProtectedRoute><ReturnOrder /></ProtectedRoute>} />
              <Route path='/mywishlist' element={<ProtectedRoute><MyWishlist /></ProtectedRoute>} />
              <Route path='/mycart' element={<ProtectedRoute><MyCart /></ProtectedRoute>} />
              <Route path='/checkout' element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
              <Route path='/shipping' element={<ProtectedRoute><Shipping /></ProtectedRoute>} />
              {
                stripeApiKey && <Route path='/payment' element={<ProtectedRoute><Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements></ProtectedRoute>} />
              }
            </Routes>
            <Routes>
              <Route path='/admin' element={<ProtectedRoute isAdmin={true}><AdminLayout><Admin /></AdminLayout></ProtectedRoute>} />
              <Route path='/admin/dashboard' element={<ProtectedRoute isAdmin={true}><AdminLayout><Dashboard /></AdminLayout></ProtectedRoute>} />

              <Route path='/admin/productslist' element={<ProtectedRoute isAdmin={true}><AdminLayout><AllProducts /></AdminLayout></ProtectedRoute>} />
              <Route path='/admin/createproduct' element={<ProtectedRoute isAdmin={true}><AdminLayout><NewProduct /></AdminLayout></ProtectedRoute>} />
              <Route path='/admin/productslist/productinventory/:productId' element={<ProtectedRoute isAdmin={true}><AdminLayout><Inventory /></AdminLayout></ProtectedRoute>} />
              <Route path='/admin/productslist/productdetails/:productId' element={<ProtectedRoute isAdmin={true}><AdminLayout><Details /></AdminLayout></ProtectedRoute>} />
              <Route path='/admin/productslist/productdescriptionandhide/:productId' element={<ProtectedRoute isAdmin={true}><AdminLayout><DescriptionAndHide /></AdminLayout></ProtectedRoute>} />
              <Route path='/admin/productslist/singleproduct/:productId' element={<ProtectedRoute isAdmin={true}><AdminLayout><EditProduct /></AdminLayout></ProtectedRoute>} />
              <Route path='/admin/productstocks' element={<ProtectedRoute isAdmin={true}><AdminLayout><ProductsStocks /></AdminLayout></ProtectedRoute>} />
              <Route path='/admin/addcategories' element={<ProtectedRoute isAdmin={true}><AdminLayout><Categories /></AdminLayout></ProtectedRoute>} />
              <Route path='/admin/categories' element={<ProtectedRoute isAdmin={true}><AdminLayout><ViewCategories /></AdminLayout></ProtectedRoute>} />
              <Route path='/admin/reviews' element={<ProtectedRoute isAdmin={true}><AdminLayout><Reviews /></AdminLayout></ProtectedRoute>} />

              {/* Order */}
              <Route path='/admin/orderslist' element={<ProtectedRoute isAdmin={true}><AdminLayout><AllOrders /></AdminLayout></ProtectedRoute>} />
              <Route path='/admin/order/:orderid' element={<ProtectedRoute isAdmin={true}><AdminLayout><SingleOrder /></AdminLayout></ProtectedRoute>} />
              <Route path='/admin/returnorders' element={<ProtectedRoute isAdmin={true}><AdminLayout><ManageReturn /></AdminLayout></ProtectedRoute>} />
              <Route path='/admin/returnorders/:orderId/:orderItemId' element={<ProtectedRoute isAdmin={true}><AdminLayout><SingleReturnOrder /></AdminLayout></ProtectedRoute>} />
              <Route path='/admin/shipping' element={<ProtectedRoute isAdmin={true}><AdminLayout><Shipping /></AdminLayout></ProtectedRoute>} />
              <Route path='/admin/shippingprices' element={<ProtectedRoute isAdmin={true}><AdminLayout><ShippingPriceAllocate /></AdminLayout></ProtectedRoute>} />

              {/* Customer */}
              <Route path='/admin/customerslist' element={<ProtectedRoute isAdmin={true}><AdminLayout><CustomerList /></AdminLayout></ProtectedRoute>} />
              <Route path='/admin/feedback' element={<ProtectedRoute isAdmin={true}><AdminLayout><CustomerFeedback /></AdminLayout></ProtectedRoute>} />

              {/* Discount */}
              <Route path='/admin/discounts' element={<ProtectedRoute isAdmin={true}><AdminLayout><DiscountsProducts /></AdminLayout></ProtectedRoute>} />

              {/* Reports and Analytics */}
              <Route path='/admin/salesreports' element={<ProtectedRoute isAdmin={true}><AdminLayout><SalesReports /></AdminLayout></ProtectedRoute>} />
              <Route path='/admin/productperformance' element={<ProtectedRoute isAdmin={true}><AdminLayout><ProductPerformance /></AdminLayout></ProtectedRoute>} />
              <Route path='/admin/customerreports' element={<ProtectedRoute isAdmin={true}><AdminLayout><CustomerReports /></AdminLayout></ProtectedRoute>} />

              {/* Reports and Analytics */}
              <Route path='/admin/messages' element={<ProtectedRoute isAdmin={true}><AdminLayout><Messages /></AdminLayout></ProtectedRoute>} />
              <Route path='/admin/homeimages' element={<ProtectedRoute isAdmin={true}><AdminLayout><HomeImages /></AdminLayout></ProtectedRoute>} />

              <Route path='/admin/website' element={<ProtectedRoute isAdmin={true}><AdminLayout><WebsiteManagement /></AdminLayout></ProtectedRoute>} />
              <Route path='/admin/editcontentoptions' element={<ProtectedRoute isAdmin={true}><AdminLayout><ContentOptions /></AdminLayout></ProtectedRoute>} />
              <Route path='/admin/homepagecontent' element={<ProtectedRoute isAdmin={true}><AdminLayout><Homepage /></AdminLayout></ProtectedRoute>} />
              <Route path='/admin/offersadvertisement' element={<ProtectedRoute isAdmin={true}><AdminLayout><OffersAds /></AdminLayout></ProtectedRoute>} />
              <Route path='/admin/websitename' element={<ProtectedRoute isAdmin={true}><AdminLayout><WebsiteName /></AdminLayout></ProtectedRoute>} />
              <Route path='/admin/footercontent' element={<ProtectedRoute isAdmin={true}><AdminLayout><FooterContent /></AdminLayout></ProtectedRoute>} />
            </Routes>
          </div>
        </HelmetProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;