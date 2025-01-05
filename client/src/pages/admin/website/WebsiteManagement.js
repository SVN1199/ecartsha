import { Link } from 'react-router-dom';

const WebsiteManagement = () => {
  const features = [
    {
      feature: 'Content Visibility',
      description: 'Configure various payment methods',
      editable: true,
      link: '/editcontentoptions',
    },
    /*
    {
      feature: 'Categories Visibility',
      description: 'Configure various payment methods',
      editable: true,
      link: '/editcontentoptions',
    } 
    */
    {
      feature: 'Home Page Content',
      description: 'Manage the content displayed on the home page (e.g., banners, promotions).',
      editable: true,
      link: '/homepagecontent',
    },
    {
      feature: 'Offers Advertisement',
      description: 'Manage the content for offers and advertisements displayed on the site.',
      editable: true,
      link: '/offersadvertisement',
    },
    {
      feature: 'Website Name',
      description: 'Editable the website name',
      editable: true,
      link: '/websitename',
    },
    {
      feature: 'Footer Content',
      description: 'Editable the Footer Content',
      editable: true,
      link: '/footercontent',
    },
    {
      feature: 'SEO Management',
      description: 'Optimize website for search engines, manage meta tags, keywords, and descriptions.',
      editable: false,
    },
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-green-600 tracking-tight">
          Website Management
        </h1>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md mb-6">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-green-100 text-left">
            <tr>
              <th className="px-4 py-3 text-sm font-bold text-green-700">Feature</th>
              <th className="px-4 py-3 text-sm font-bold text-green-700">Description</th>
              <th className="px-4 py-3 text-sm font-bold text-green-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {features.map((item, index) => (
              <tr key={index} className="border-b hover:bg-green-50 transition-colors">
                <td className="px-4 py-4 text-green-700 font-semibold">{item.feature}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{item.description}</td>
                <td className="px-4 py-4 text-sm">
                  {item.editable ? (
                    <Link
                      to={`/admin${item.link}`}
                      className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all"
                    >
                      Edit
                    </Link>
                  ) : (
                    <button
                      className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
                      disabled
                    >
                      View
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  );
};

export default WebsiteManagement;