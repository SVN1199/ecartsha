import CategoryCard from "../../containers/CategoryCard";


const HomeCard = () => {

    const categoryList = [
        {
            id: 1,
            gender: {
                name: 'Products',
                list: [
                    { id: 0, img: './images/categories/shirts.jpg', items: "T-Shirts" },
                    { id: 1, img: './images/categories/tops.jpg', items: "Tops" },
                    { id: 2, img: './images/categories/blouse.jpg', items: "Blouses" },
                    { id: 3, img: './images/categories/bottoms.jpg', items: "Bottoms" },
                    { id: 4, img: './images/categories/inner.jpg', items: "Innerwear" },
                    { id: 5, img: './images/categories/outter.jpg', items: "Outerwear" },
                    { id: 6, img: './images/categories/sports.jpg', items: "Activewear" },
                    { id: 7, img: './images/categories/sleep.jpg', items: "Sleepwear" },
                    { id: 8, img: './images/categories/foot.jpg', items: "Footwear" },
                    { id: 9, img: './images/categories/accessories.jpg', items: "Accessories" }
                ]
            }
        },
        /*
        {
            id: 2,
            gender: {
                name: 'For Women',
                list: [
                    { id: 0, img: './images/categories/shirts.jpg', items: "T-Shirts" },
                    { id: 1, img: './images/categories/tops.jpg', items: "Tops" },
                    { id: 2, img: './images/categories/blouse.jpg', items: "Blouses" },
                    { id: 3, img: './images/categories/bottoms.jpg', items: "Bottoms" },
                    { id: 4, img: './images/categories/inner.jpg', items: "Innerwear" },
                    { id: 5, img: './images/categories/outter.jpg', items: "Outerwear" },
                    { id: 6, img: './images/categories/sports.jpg', items: "Activewear" },
                    { id: 7, img: './images/categories/sleep.jpg', items: "Sleepwear" },
                    { id: 8, img: './images/categories/foot.jpg', items: "Footwear" },
                    { id: 9, img: './images/categories/accessories.jpg', items: "Accessories" }
                ]
            }
        },
        {
            id: 3,
            gender: {
                name: 'For Kids',
                list: [
                    { id: 0, img: './images/categories/shirts.jpg', items: "T-Shirts" },
                    { id: 1, img: './images/categories/tops.jpg', items: "Tops" },
                    { id: 2, img: './images/categories/blouse.jpg', items: "Blouses" },
                    { id: 3, img: './images/categories/bottoms.jpg', items: "Bottoms" },
                    { id: 4, img: './images/categories/inner.jpg', items: "Innerwear" },
                    { id: 5, img: './images/categories/outter.jpg', items: "Outerwear" },
                    { id: 6, img: './images/categories/sports.jpg', items: "Activewear" },
                    { id: 7, img: './images/categories/sleep.jpg', items: "Sleepwear" },
                    { id: 8, img: './images/categories/foot.jpg', items: "Footwear" },
                    { id: 9, img: './images/categories/accessories.jpg', items: "Accessories" }
                ]
            }
        }
        */
    ]

    return (
        <div className="min-h-screen w-full">
            <CategoryCard cardList={categoryList} />
        </div>
    )
}

export default HomeCard