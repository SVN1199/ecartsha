import { Helmet } from "react-helmet-async"
import { useSelector } from "react-redux";

export default function MetaData({title, description}) {
    const { websiteName: currentWebsiteName = {} } = useSelector((state) => state.homeState);

    const websiteName = currentWebsiteName?.name || 'ShaNa Boutique';
  
    return (
        <Helmet>
            <title>{`${title} - ${websiteName}`}</title>
            <meta name="description" content={description || "Discover the best boutique collections at ShaNa Boutique."} />
        </Helmet>
    )
}