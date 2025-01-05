import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { websiteName: currentWebsiteName = {} } = useSelector((state) => state.homeState);
  const { footer = {}, loading } = useSelector((state) => state.footerState);

  const websiteName = currentWebsiteName?.name || 'ShaNa Boutique';
  const address = footer.address || '88 XXX, YYYY Street, ZZZ - 0000';
  const contact = footer.contact || '1002155';
  const copyright = footer.copyright || '© 2025';
  const medias = footer.mediasurl || [];

  return (
    <footer className="w-full bg-gray-900 text-white py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between gap-10 px-6">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Link to="/" className="flex flex-col md:flex-row items-center gap-3">
            {loading ? (
              <div className="w-16 h-16 bg-gray-700 animate-pulse rounded-full"></div>
            ) : (
              <div className="h-16 w-16">
                <img
                  src="/images/shana-logo-hd.png"
                  alt="ShaNa"
                  className="w-full h-full object-cover rounded-full border-2 border-green-500"
                />
              </div>
            )}
            {loading ? (
              <div className="w-32 h-6 bg-gray-700 animate-pulse rounded"></div>
            ) : (
              <span className="text-xl font-semibold text-green-500">{websiteName}</span>
            )}
          </Link>
          <div className="mt-4 text-gray-400 text-sm">
            {loading ? (
              <div className="w-48 h-6 bg-gray-700 animate-pulse rounded"></div>
            ) : (
              'Your one-stop boutique for quality and style.'
            )}
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="text-lg font-bold mb-2">
            {loading ? (
              <div className="w-24 h-6 bg-gray-700 animate-pulse rounded"></div>
            ) : (
              'Address'
            )}
          </h4>
          {loading ? (
            <div className="w-36 h-6 bg-gray-700 animate-pulse rounded"></div>
          ) : (
            <div className="text-sm text-gray-300">{address}</div>
          )}
        </div>

        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="text-lg font-bold mb-2">
            {loading ? (
              <div className="w-24 h-6 bg-gray-700 animate-pulse rounded"></div>
            ) : (
              'Contact'
            )}
          </h4>
          {loading ? (
            <div className="w-36 h-6 bg-gray-700 animate-pulse rounded"></div>
          ) : (
            <div className="text-sm text-gray-300">Phone: {contact}</div>
          )}
        </div>

        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="text-lg font-bold mb-2">
            {loading ? (
              <div className="w-24 h-6 bg-gray-700 animate-pulse rounded"></div>
            ) : (
              'Follow Us'
            )}
          </h4>
          <div className="flex gap-4">
            {loading ? (
              <>
                <div className="w-8 h-8 bg-gray-700 animate-pulse rounded-full"></div>
                <div className="w-8 h-8 bg-gray-700 animate-pulse rounded-full"></div>
                <div className="w-8 h-8 bg-gray-700 animate-pulse rounded-full"></div>
              </>
            ) : (
              medias.length > 0 &&
              medias.map((media) => (
                <a
                  key={media._id}
                  href={media.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={media.name}
                  className="hover:opacity-80 transition-opacity"
                >
                  <img src={media.icon} alt={media.name} className="w-8 h-8" />
                </a>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-400 text-sm">
        {loading ? (
          <div className="w-48 h-6 bg-gray-700 animate-pulse rounded mx-auto"></div>
        ) : (
          `${copyright} ${websiteName}. All rights reserved. Built with ❤️.`
        )}
      </div>
    </footer>
  );
};

export default Footer;