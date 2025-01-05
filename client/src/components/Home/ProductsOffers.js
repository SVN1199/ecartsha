import { FaCircleArrowRight } from "react-icons/fa6";

const ProductsOffers = () => {

    const list = [
        {
            id: 1,
            heading: "Offers",
            product: [
                { id: 0, img: './images/categories/shirts.jpg', items: "T-Shirts" },
                { id: 1, img: './images/categories/tops.jpg', items: "Tops" },
                { id: 2, img: './images/categories/blouse.jpg', items: "Blouses" },
            ]
        },
        {
            id: 2,
            heading: "Trending",
            product: [
                { id: 0, img: './images/categories/shirts.jpg', items: "T-Shirts" },
                { id: 1, img: './images/categories/tops.jpg', items: "Tops" },
                { id: 2, img: './images/categories/blouse.jpg', items: "Blouses" },
            ]
        }
    ]

    return (
        <div className='min-h-screen w-full flex flex-row items-center justify-center  px-2 gap-3'>
            {
                list.map(product => (
                    <div className='h-auto w-3/5' key={product.id}>
                        <div className="flex flex-row items-center gap-5 w-full h-auto my-1">
                            <div className='font-bold opacity-80 text-primary'>
                                {product.heading}
                            </div>
                            <div>
                                <FaCircleArrowRight className="text-lg text-primary" />
                            </div>
                        </div>
                        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                            {
                                product.product.map(prd => (
                                    <div className='w-full h-60 my-2 bg-white p-2 rounded flex flex-col gap-3' key={prd.id}>
                                        <div className="w-full h-40 rounded">
                                        <img src={prd.img} alt="" className='h-full w-full rounded' />
                                        </div>
                                        <div className='text-sm font-semibold opacity-75 flex flex-col items-center justify-center gap-1'>
                                            <div>T shirts</div>
                                            <div className="text-green-600">Min 20% offer</div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default ProductsOffers