import React from 'react';

const About = ({ about, currentWebsiteName }) => {
  const websiteName = currentWebsiteName?.name || 'ShaNa Boutique';

  return (
    <div className="bg-gradient-to-b from-purple-50 via-white to-blue-50 py-12 px-6 flex items-center justify-center">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-8">
        <div className="flex-shrink-0 w-80 h-80">
          <img
            src="./images/shana-logo.jpeg"
            alt="ShaNa Boutique Logo"
            className="h-full w-full rounded-full border-4 border-purple-500 shadow-lg"
          />
        </div>

        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            About <span className="text-primary">{websiteName}</span>
          </h1>
          <p className="text-lg text-gray-600 text-justify leading-relaxed">
            Welcome to <b>{websiteName}</b>,
            {about || `
            We specialize in eCommerce solutions for men’s and women’s wear. Whether you're shopping for ready-to-wear fashion or need custom products tailored to your specific needs, we've got you covered. Explore quality and style with us, where bespoke customization meets seamless shopping.
            `}
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;