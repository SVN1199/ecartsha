import React from 'react';

const Services = ({ services }) => {
  return (
    <div className="bg-gradient-to-r from-blue-100 via-purple-50 to-pink-100 py-12 px-5">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Our <span className="text-primary">Services</span>
          </h1>
          <p className="text-gray-600 mt-4 text-base md:text-lg leading-relaxed">
            {services || `We specialize in eCommerce solutions for men’s and women’s wear. 
            Whether you're shopping for ready-to-wear fashion or need custom 
            products tailored to your specific needs, we've got you covered. 
            Explore quality and style with us, where bespoke customization 
            meets seamless shopping.`}
          </p>
        </div>

        <div className="md:w-1/2 flex justify-center">
              <img src="/images/services.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Services;
