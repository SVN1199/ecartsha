import { useEffect } from "react"
import { toast } from 'react-toastify'
import { clearWishList } from '../slices/wishListSlice'
import { addWishList, getWishList, removeWishList } from '../actions/productsActions'
import { useDispatch, useSelector } from 'react-redux'


export const useAddToWishLists = () => {

    const dispatch = useDispatch()

    const { user } = useSelector(state => state.authState)
    const { wishList = [], isAddedToWishList, isRemovedToWishList } = useSelector(state => state.wishListState)

    const handleAddWishList = (id) => {
        dispatch(addWishList(id))
    }

    const handleRemoveWishList = (id) => {
        dispatch(removeWishList(id))
    }


    useEffect(() => {

        if (isAddedToWishList) {
            toast('Product Added To WishList', {
                type: 'success',
                position: 'bottom-center',
                onOpen: () => dispatch(clearWishList())
            })
        }


        if (isRemovedToWishList) {
            toast('Product Removed From WishList', {
                type: 'success',
                position: 'bottom-center',
                onOpen: () => dispatch(clearWishList())
            })
        }

        dispatch(getWishList())
    }, [dispatch, isAddedToWishList, isRemovedToWishList])

    return {
        wishList,
        user,
        handleAddWishList,
        handleRemoveWishList
    }
}
