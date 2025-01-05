import { formatDistanceToNow } from 'date-fns';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProductComments = ({
    product,
}) => {


    return (
        <div className="flex flex-col my-5 gap-2 sm:gap-2 lg:gap-0">

            <div className='flex flex-row justify-between text-sm font-semibold'>
                <div className="p-1 lg:p-3 sm:p-1">Ratings & Reviews</div>
            </div>

            {
                product && product?.reviews?.length === 0 &&  
                <div className='text-sm text-start mx-3 mt-5 font-semibold text-gray-600'>
                No Reviews posted yet
                </div>
            }

            {
                product && product?.reviews?.map(review => (
                    <div key={review._id} className=" h-auto my-2 flex flex-col gap-3 bg-white p-1 sm:p-1 lg:p-3 mt-2">
                        <div className="w-full flex flex-row justify-between">
                            <div className='flex flex-row gap-3'>
                                <div className='flex flex-row items-center'>
                                    <div className='px-2 py-0.5 flex flex-row items-center gap-2 font-semibold bg-green-500 text-xs text-white rounded' >
                                        <span>{review?.rating}</span>
                                        <span><FaStar /></span>
                                    </div>
                                </div>
                                <div className='text-sm'>
                                    {review?.comment}
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row gap-5 text-xs opacity-80'>
                            <div>
                                {review?.user?.name}
                            </div>
                            <div>
                            {formatDistanceToNow(new Date(review?.reviewedAt), { addSuffix: true})}
                            </div>
                        </div>
                    </div>
                ))
            }

                <div className='productInputBorder mt-3'></div>

            {
                product?.reviews?.length > 5 &&
                <div className='text-sm text-center text-primary hover:text-blue-950 font-semibold w-full cursor-pointer'>
                    <Link to={`/product/reviews/${product?._id}`}>
                        {`<--------  Show all  --------->`}
                    </Link>
                </div>
            }

        </div>
    )
}

export default ProductComments;