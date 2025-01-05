import Slider from "react-slick";

const RecentViews = () => {

    const list = [
        { id: 0, img: '/images/categories/shirts.jpg', items: "T-Shirts" },
        { id: 1, img: '/images/categories/tops.jpg', items: "Tops" },
        { id: 2, img: '/images/categories/blouse.jpg', items: "Blouses" },
        { id: 3, img: '/images/categories/bottoms.jpg', items: "Bottoms" },
        { id: 4, img: '/images/categories/inner.jpg', items: "Innerwear" },
        { id: 5, img: '/images/categories/outter.jpg', items: "Outerwear" },
        { id: 6, img: '/images/categories/sports.jpg', items: "Activewear" },
        { id: 7, img: '/images/categories/sleep.jpg', items: "Sleepwear" },
        { id: 8, img: '/images/categories/foot.jpg', items: "Footwear" },
        { id: 9, img: '/images/categories/accessories.jpg', items: "Accessories" }
    ]

    const settings = {
        dots: true,
        infinite: false,
        speed: 1200,
        slidesToShow: 6,
        slidesToScroll: 4,
        ontouchmove : true,
        responsive: [
            {
                breakpoint: 1024, // for tablet screens and above
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 768, // for mobile screens and below
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    };

  return (
    <div className="h-96 flex flex-col justify-center ">
         <ul className="slider-container p-1">
            <div className="px-2 font-bold text-md p-2 opacity-65">Recent View</div>
                            <Slider {...settings} className="slider-container">
                                {
                                    list.map(card => (
                                        <li  key={card.id}>
                                          <div className="relative h-60 w-40 md:h-56 lg:h-40 mx-2 rounded-2xl bg-white shadow-2xl p-1 cursor-pointer">
                                          <picture>
                                                <img src={card.img} alt={card.items} className="h-full md:h-4/6 rounded-2xl w-full object-cover rounded-sm" loading="lazy" />
                                            </picture>
                                            <div className="w-full flex flex-row justify-center items-center h-10 text-sm">
                                            {card.items}
                                            </div>
                                          </div>
                                        </li>
                                    ))
                                }
                            </Slider>
                        </ul>
    </div>
  )
}

export default RecentViews