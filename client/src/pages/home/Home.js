import React, { lazy, Suspense, useEffect } from 'react'
import MetaData from '../../components/layouts/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { getContentOptions, getOffersAdvertisement, getServicesAndAbout } from '../../actions/websiteAction'

const HomeSlider = lazy(() => import('../../components/Home/HomeSlider'))
const ProductOffersCard = lazy(() => import('../../components/Products/ProductOffersCard'))
const OffersAd = lazy(() => import('../../components/Home/OffersAd'))
const About = lazy(() => import('../../components/Home/About'))
const Services = lazy(() => import('../../components/Home/Services'))
const HomeCard = lazy(() => import('../../components/Home/HomeCard'))
const Footer = lazy(() => import('../../components/layouts/Footer'))

const Home = () => {

  const { showcontent = {} } = useSelector((state) => state.showcontentState);
  const { services = {} } = useSelector((state) => state.serviceState);
  const { offersAds = [] } = useSelector((state) => state.offersAdsState);
  const { websiteName: currentWebsiteName = {} } = useSelector((state) => state.homeState);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getContentOptions())
    dispatch(getServicesAndAbout())
    dispatch(getOffersAdvertisement())
  }, [dispatch])


  return (
    <div className='overflow-x-hidden'>
      <MetaData title='Home' />

      <Suspense fallback={
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="flex flex-col items-center">
            <svg className="animate-spin h-12 w-12 text-green-500 mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path d="M4 12a8 8 0 1 0 16 0 8 8 0 1 0-16 0Z" stroke="currentColor" strokeWidth="4" fill="none" />
            </svg>
            <div className="text-xl text-gray-600">Loading...</div>
          </div>
        </div>
      }>
        <HomeSlider />
        {showcontent?.offersAd && <OffersAd offersAds={offersAds} />}
        {showcontent?.offers && <ProductOffersCard />}
        {showcontent?.category && <HomeCard />}
        <About about={services.about} currentWebsiteName={currentWebsiteName}/>
        <Services services={services.services} />
        <Footer />
      </Suspense>
    </div>
  )
}

export default Home