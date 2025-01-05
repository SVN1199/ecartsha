import { MdAssignmentReturn, MdDashboard } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { PiUserListFill } from "react-icons/pi";
import { BiCategoryAlt } from "react-icons/bi";
import { FaCartPlus, FaComments, FaListAlt, FaShippingFast, FaTags, FaUserShield } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { RiAdminFill, RiStockFill } from "react-icons/ri";
import { useState } from "react";

const AdminSideBar = () => {

    const [openSubmenus, setOpenSubmenus] = useState({});

    const toggleSubmenu = (id) => {
        setOpenSubmenus((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };


    const adminPanelLinks = [
        {
            id: 0,
            name: "Dashboard",
            icon: <MdDashboard />,
            link: "dashboard",
        },
        {
            id: 1,
            name: "Products",
            icon: <FaListAlt />,
            sub: [
                { name: 'Add New Product', icon: <IoIosCreate />, link: "createproduct" },
                { name: 'All Products', icon: <FaListAlt />, link: "productslist" },
                { name: 'Products Stocks', icon: <RiStockFill />, link: "productstocks" },
            ]
        },
        {
            id: 2,
            name: "Categories",
            icon: <BiCategoryAlt />,
            sub: [
                { name: 'Add Categories', icon: <IoIosCreate />, link: "addcategories" },
                { name: 'Categories', icon: <BiCategoryAlt />, link: "categories" },
            ]
        },
        {
            id: 3,
            name: "Orders",
            icon: <FaCartPlus />,
            sub: [
                { name: 'All Orders', icon: <FaCartPlus />, link: "orderslist" },
                { name: 'Manage Returns', icon: <MdAssignmentReturn />, link: "returnorders" },
                { name: 'Shipping Prices', icon: <FaShippingFast />, link: "shippingprices" },
            ]
        },
        {
            id: 4,
            name: "Customers",
            icon: <PiUserListFill />,
            sub: [
                { name: 'Customer List', icon: <PiUserListFill />, link: "customerslist" },
                { name: 'Customer Feedback', icon: <FaComments />, link: "feedback" },
            ]
        },
        {
            id: 5,
            name: "Discounts",
            icon: <FaTags />,
            link: 'discounts'
        },
        /*
        {
            id: 6,
            name: "Reports & Analytics",
            icon: <FaChartBar />,
            sub: [
                { name: 'Sales Reports', icon: <FaChartLine />, link: "salesreports" },
                { name: 'Product Performance', icon: <FaChartPie />, link: "productperformance" },
                { name: 'Customer Reports', icon: <FaUserCheck />, link: "customerreports" },
            ]
        },
        */
        {
            id: 8,
            name: "Website Management",
            icon: <FaUserShield />,
            link: 'website',
           /*
            sub: [
                { name: 'Home UI', icon: <FaUserTie />, link: "homeimages" },
                { name: 'Admin Users', icon: <FaUserTie />, link: "adminusers" },
                { name: 'Roles & Permissions', icon: <FaLock />, link: "rolespermissions" },
            ]
        */
        },
    ];

return (
    <div className="text-sm">
        <NavLink to='/admin'>
            <div className="flex flex-row items-center gap-5 w-full p-3 text-lg text-white font-bold shadow-sm">
                <span><RiAdminFill className="text-xl" /></span>
                <span>Admin</span>
            </div>
        </NavLink>
        <div>
            <ul>
                {adminPanelLinks.map((menu) => (
                    <li key={menu.id} className="p-3">
                        <div onClick={() => menu.sub && toggleSubmenu(menu.id)} className="flex  hover:text-yellow-200 items-center gap-2 text-white cursor-pointer w-full">
                            {menu.link ?
                                <NavLink
                                    to={`/admin/${menu.link}`}
                                    className={({ isActive }) => isActive ? "text-yellow-200" : "text-white"}
                                >
                                    <span className="flex items-center gap-2 font-semibold hover:text-yellow-200">
                                        {menu.icon}
                                        {menu.name}
                                    </span>
                                </NavLink>
                                : <div className="text-white hover:text-yellow-200 font-semibold">
                                    <span className="flex items-center gap-2 ">
                                        {menu.icon}
                                        {menu.name}
                                    </span>
                                </div>
                            }
                            {menu.sub && (
                                <span className="ml-auto">
                                    {openSubmenus[menu.id] ? '-' : '+'}
                                </span>
                            )}
                        </div>

                        {menu.sub && openSubmenus[menu.id] && (
                            <ul className="ml-6 mt-2 w-full">
                                {menu.sub.map((subItem, idx) => (
                                    <li key={idx} className="p-1 ">
                                        <NavLink
                                            to={`/admin/${subItem.link}`}
                                            className={({ isActive }) => isActive ? "text-yellow-200" : "text-white"}
                                        >
                                            <span className="flex items-center gap-2 hover:text-yellow-200">
                                                {subItem.icon}
                                                {subItem.name}
                                            </span>
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    </div>

)
}

export default AdminSideBar