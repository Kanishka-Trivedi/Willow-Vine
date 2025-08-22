// import React, { useState } from 'react'
// import Button from '@mui/material/Button';
// import { RiMenu2Fill } from "react-icons/ri";
// import { FaAngleDown } from "react-icons/fa";
// import { Link } from 'react-router-dom';
// import { ImRocket } from "react-icons/im";
// import CategoryPanel from './CategoryPanel';



// const Navigation = () => {

//     const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);

//     const openCategoryPanel = () => {
//         setIsOpenCatPanel(true);
//     }

//     return (
//         <>
//             <nav className='py-2'>
//                 <div className='container max-w-none flex items-center justify-end gap-7'>
//                     <div className='col_1 w-[20%] whitespace-nowrap'>
//                         <Button className='!text-black gap-2 font-semibold w-full' onClick={openCategoryPanel}> <RiMenu2Fill className='text-[17px]' />
//                             Shop By Categories
//                             <FaAngleDown className='text-[18px] ml-auto font-bold' />
//                         </Button>
//                     </div>


//                     <div className='col_2 w-[60%]'>
//                         <ul className='flex items-center gap-2 nav'>
//                             <li className='list-none'>
//                                 <Link to="/" className="link transition">
//                                     <Button className='nav-button link transition whitespace-nowrap !font-[500] !text-[17px]'>Home</Button>
//                                 </Link>
//                             </li>

//                             <li className='list-none relative'>
//                                 <Link to="/" className="link transition">
//                                     <Button className='nav-button link transition whitespace-nowrap !font-[500] !text-[17px]'>Plants
//                                     </Button>
//                                 </Link>

//                                 <div className='submenu absolute top-[120%] left-[0%] min-w-[150px] bg-white shadow-md opacity-0 transition-all'>
//                                     <ul>
//                                         <li className='list-none w-full relative'>
//                                             <Link to="/" className='link transition w-full'>
//                                                 <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Indoor Plants</Button>



//                                                 <div className='submenu absolute top-[0%] left-[100%] min-w-[150px] bg-white shadow-md opacity-0 transition-all whitespace-nowrap'>
//                                                     <ul>
//                                                         <li className='list-none w-full'>
//                                                             <Link to="/succulents" className='link transition w-full'>
//                                                                 <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Succulents</Button>
//                                                             </Link>
//                                                         </li>

//                                                         <li className='list-none w-full'>
//                                                             <Link to="/" className='link w-full'>
//                                                                 <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Herbal Plants</Button>
//                                                             </Link>
//                                                         </li>

//                                                         <li className='list-none w-full'>
//                                                             <Link to="/" className='link w-full'>
//                                                                 <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Bonsai</Button>
//                                                             </Link>
//                                                         </li>

//                                                         <li className='list-none w-full'>
//                                                             <Link to="/" className='link w-full'>
//                                                                 <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Flowering Plants</Button>
//                                                             </Link>
//                                                         </li>

//                                                         <li className='list-none w-full'>
//                                                             <Link to="/" className='link w-full'>
//                                                                 <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Air Purifying Plants</Button>
//                                                             </Link>
//                                                         </li>

//                                                         <li className='list-none w-full'>
//                                                             <Link to="/" className='link w-full'>
//                                                                 <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Foilage Plants</Button>
//                                                             </Link>
//                                                         </li>

//                                                         <li className='list-none w-full'>
//                                                             <Link to="/" className='link w-full'>
//                                                                 <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Hanging Plants</Button>
//                                                             </Link>
//                                                         </li>
//                                                     </ul>
//                                                 </div>
//                                             </Link>
//                                         </li>

//                                         <li className='list-none w-full relative'>
//                                             <Link to="/" className='link w-full'>
//                                                 <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Outdoor Plants</Button>



//                                                 <div className='submenu absolute top-[0%] left-[100%] min-w-[150px] bg-white shadow-md opacity-0 transition-all whitespace-nowrap'>
//                                                     <ul>
//                                                         <li className='list-none w-full'>
//                                                             <Link to="/" className='link transition w-full'>
//                                                                 <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Flowering Plants</Button>
//                                                             </Link>
//                                                         </li>

//                                                         <li className='list-none w-full'>
//                                                             <Link to="/" className='link w-full'>
//                                                                 <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Medicinal Plants</Button>
//                                                             </Link>
//                                                         </li>

//                                                         <li className='list-none w-full'>
//                                                             <Link to="/" className='link w-full'>
//                                                                 <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Bonsai</Button>
//                                                             </Link>
//                                                         </li>

//                                                         <li className='list-none w-full'>
//                                                             <Link to="/" className='link w-full'>
//                                                                 <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Fruit Plants</Button>
//                                                             </Link>
//                                                         </li>

//                                                         <li className='list-none w-full'>
//                                                             <Link to="/" className='link w-full'>
//                                                                 <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Vegetable Plants</Button>
//                                                             </Link>
//                                                         </li>

//                                                         <li className='list-none w-full'>
//                                                             <Link to="/" className='link w-full'>
//                                                                 <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Ornamental Plants</Button>
//                                                             </Link>
//                                                         </li>

//                                                         <li className='list-none w-full'>
//                                                             <Link to="/" className='link w-full'>
//                                                                 <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Climbers & Creepers</Button>
//                                                             </Link>
//                                                         </li>
//                                                     </ul>
//                                                 </div>
//                                             </Link>
//                                         </li>
//                                     </ul>
//                                 </div>

//                             </li>

//                             <li className='list-none relative'>
//                                 <Link to="/" className="link transition">
//                                     <Button className='nav-button link transition whitespace-nowrap !font-[500] !text-[17px]'>Gardening Tools</Button>


//                                     <div className='submenu absolute top-[120%] left-[0%] min-w-[150px] bg-white shadow-md opacity-0 transition-all whitespace-nowrap'>
//                                         <ul>
//                                             <li className='list-none w-full relative'>
//                                                 <Link to="/" className='link transition w-full'>
//                                                     <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Pruners & Shears</Button>
//                                                 </Link>
//                                             </li>

//                                             <li className='list-none w-full relative'>
//                                                 <Link to="/" className='link w-full'>
//                                                     <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Trowels & Spades</Button>
//                                                 </Link>
//                                             </li>

//                                             <li className='list-none w-full relative'>
//                                                 <Link to="/" className='link w-full'>
//                                                     <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Rakes & Hoes</Button>
//                                                 </Link>
//                                             </li>

//                                             <li className='list-none w-full relative'>
//                                                 <Link to="/" className='link w-full'>
//                                                     <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Gloves</Button>
//                                                 </Link>
//                                             </li>

//                                             <li className='list-none w-full relative'>
//                                                 <Link to="/" className='link w-full'>
//                                                     <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Watering Cans</Button>
//                                                 </Link>
//                                             </li>

//                                             <li className='list-none w-full relative'>
//                                                 <Link to="/" className='link w-full'>
//                                                     <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Tool Sets</Button>
//                                                 </Link>
//                                             </li>
//                                         </ul>
//                                     </div>
//                                 </Link>
//                             </li>

//                             <li className='list-none relative'>
//                                 <Link to="/" className="link transition">
//                                     <Button className='nav-button link transition whitespace-nowrap !font-[500] !text-[17px]'>Soils & Fertilizers</Button>


//                                     <div className='submenu absolute top-[120%] left-[0%] min-w-[150px] bg-white shadow-md opacity-0 transition-all whitespace-nowrap'>
//                                         <ul>
//                                             <li className='list-none w-full relative'>
//                                                 <Link to="/" className='link transition w-full'>
//                                                     <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Potting Mix</Button>
//                                                 </Link>
//                                             </li>

//                                             <li className='list-none w-full relative'>
//                                                 <Link to="/" className='link w-full'>
//                                                     <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Organic Fertilizers</Button>
//                                                 </Link>
//                                             </li>

//                                             <li className='list-none w-full relative'>
//                                                 <Link to="/" className='link w-full'>
//                                                     <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Compost & Manure</Button>
//                                                 </Link>
//                                             </li>

//                                             <li className='list-none w-full relative'>
//                                                 <Link to="/" className='link w-full'>
//                                                     <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Cocopeat</Button>
//                                                 </Link>
//                                             </li>

//                                             <li className='list-none w-full relative'>
//                                                 <Link to="/" className='link w-full'>
//                                                     <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Vermicompost</Button>
//                                                 </Link>
//                                             </li>
//                                         </ul>
//                                     </div>
//                                 </Link>
//                             </li>

//                             <li className='list-none relative'>
//                                 <Link to="/" className="link transition">
//                                     <Button className='nav-button link transition whitespace-nowrap !font-[500] !text-[17px]'>Pots & Planters</Button>


//                                     <div className='submenu absolute top-[120%] left-[0%] min-w-[150px] bg-white shadow-md opacity-0 transition-all whitespace-nowrap'>
//                                         <ul>
//                                             <li className='list-none w-full relative'>
//                                                 <Link to="/" className='link transition w-full'>
//                                                     <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Ceramic Planters</Button>
//                                                 </Link>
//                                             </li>

//                                             <li className='list-none w-full relative'>
//                                                 <Link to="/" className='link w-full'>
//                                                     <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Terracotta Pots</Button>
//                                                 </Link>
//                                             </li>

//                                             <li className='list-none w-full relative'>
//                                                 <Link to="/" className='link w-full'>
//                                                     <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Plastic Pots</Button>
//                                                 </Link>
//                                             </li>

//                                             <li className='list-none w-full relative'>
//                                                 <Link to="/" className='link w-full'>
//                                                     <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Hanging Planters</Button>
//                                                 </Link>
//                                             </li>

//                                             <li className='list-none w-full relative'>
//                                                 <Link to="/" className='link w-full'>
//                                                     <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Indoor Decorative Pots</Button>
//                                                 </Link>
//                                             </li>

//                                             <li className='list-none w-full relative'>
//                                                 <Link to="/" className='link w-full'>
//                                                     <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Raised Garden Beds</Button>
//                                                 </Link>
//                                             </li>
//                                         </ul>
//                                     </div>
//                                 </Link>
//                             </li>

//                             <li className='list-none relative'>
//                                 <Link to="/" className="link transition">
//                                     <Button className='nav-button link transition whitespace-nowrap !font-[500] !text-[17px]'>Seeds & Bulbs</Button>


//                                     <div className='submenu absolute top-[120%] left-[0%] min-w-[150px] bg-white shadow-md opacity-0 transition-all whitespace-nowrap'>
//                                         <ul>
//                                             <li className='list-none w-full relative'>
//                                                 <Link to="/" className='link transition w-full'>
//                                                     <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Fruit Seeds</Button>
//                                                 </Link>
//                                             </li>

//                                             <li className='list-none w-full relative'>
//                                                 <Link to="/" className='link w-full'>
//                                                     <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Vegetable Seeds</Button>
//                                                 </Link>
//                                             </li>

//                                             <li className='list-none w-full relative'>
//                                                 <Link to="/" className='link w-full'>
//                                                     <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Flower Seeds</Button>
//                                                 </Link>
//                                             </li>

//                                             <li className='list-none w-full relative'>
//                                                 <Link to="/" className='link w-full'>
//                                                     <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Herb Seeds</Button>
//                                                 </Link>
//                                             </li>

//                                             <li className='list-none w-full relative'>
//                                                 <Link to="/" className='link w-full'>
//                                                     <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Bulbs</Button>
//                                                 </Link>
//                                             </li>
//                                         </ul>
//                                     </div>
//                                 </Link>
//                             </li>

//                             <li className='list-none relative'>
//                                 <Link to="/" className="link transition">
//                                     <Button className='nav-button link transition whitespace-nowrap !font-[500] !text-[17px]'>Accessories</Button>


//                                     <div className='submenu absolute top-[120%] left-[0%] min-w-[150px] bg-white shadow-md opacity-0 transition-all whitespace-nowrap'>
//                                         <ul>
//                                             <li className='list-none w-full relative'>
//                                                 <Link to="/" className='link transition w-full'>
//                                                     <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Grow Lights</Button>
//                                                 </Link>
//                                             </li>

//                                             <li className='list-none w-full relative'>
//                                                 <Link to="/" className='link w-full'>
//                                                     <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Garden Decor</Button>
//                                                 </Link>
//                                             </li>

//                                             <li className='list-none w-full relative'>
//                                                 <Link to="/" className='link w-full'>
//                                                     <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Plant Stands</Button>
//                                                 </Link>
//                                             </li>

//                                             <li className='list-none w-full relative'>
//                                                 <Link to="/" className='link w-full'>
//                                                     <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Support Sticks</Button>
//                                                 </Link>
//                                             </li>

//                                             <li className='list-none w-full relative'>
//                                                 <Link to="/" className='link w-full'>
//                                                     <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Irrigation Kits</Button>
//                                                 </Link>
//                                             </li>
//                                         </ul>
//                                     </div>
//                                 </Link>
//                             </li>
//                         </ul>
//                     </div>


//                     <div className='col_3 w-[20%]'>
//                         <p className='whitespace-nowrap text-[15px] font-[550] flex items-center gap-2 mb-0 mt-0'>
//                             <ImRocket className='text-[16px]' />Free International Delivery</p>
//                     </div>

//                 </div>
//             </nav>

//             <CategoryPanel isOpenCatPanel={isOpenCatPanel} setIsOpenCatPanel={setIsOpenCatPanel} />

//         </>
//     );
// };

// export default Navigation;








import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { RiMenu2Fill } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { ImRocket } from "react-icons/im";
import CategoryPanel from './CategoryPanel';

const Navigation = () => {
    const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);

    const [openMenu, setOpenMenu] = useState(null);
    const [openSubmenu, setOpenSubmenu] = useState(null);

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
        setOpenSubmenu(null);
    };

    const toggleSubmenu = (submenu) => {
        setOpenSubmenu(openSubmenu === submenu ? null : submenu);
    };

    return (
        <>
            <nav className="py-2">
                <div className="container max-w-none flex items-center justify-end gap-7">
                    {/* Categories Button */}
                    <div className="col_1 w-[20%] whitespace-nowrap">
                        <Button
                            className="!text-black gap-2 font-semibold w-full"
                            onClick={() => setIsOpenCatPanel(true)}
                        >
                            <RiMenu2Fill className="text-[17px]" />
                            Shop By Categories
                            <FaAngleDown className="text-[18px] ml-auto font-bold" />
                        </Button>
                    </div>

                    {/* Main Navigation */}
                    <div className="col_2 w-[60%]">
                        <ul className="flex items-center gap-2 nav">

                            {/* Home */}
                            <li>
                                <Link to="/">
                                    <Button className="nav-button whitespace-nowrap !font-[500] !text-[17px]">
                                        Home
                                    </Button>
                                </Link>
                            </li>

                            {/* Plants */}
                            <li className="relative">
                                <Button
                                    onClick={() => toggleMenu("plants")}
                                    className="nav-button whitespace-nowrap !font-[500] !text-[17px]"
                                >
                                    Plants
                                </Button>

                                {openMenu === "plants" && (
                                    <div className="submenu absolute top-[120%] left-0 min-w-[200px] bg-white shadow-md z-50">
                                        <ul>
                                            {/* Indoor Plants */}
                                            <li className="relative">
                                                <Button
                                                    onClick={() => toggleSubmenu("indoor")}
                                                    className="text-[rgba(0,0,0,0.8)] !rounded-none w-full !text-left !justify-start"
                                                >
                                                    Indoor Plants
                                                </Button>

                                                {openSubmenu === "indoor" && (
                                                    <div className="submenu absolute top-0 left-[100%] min-w-[200px] bg-white shadow-md z-50">
                                                        <ul>
                                                            <li><Link to="/succulents"><Button className="text-[rgba(0,0,0,0.8)] !rounded-none w-full !text-left !justify-start">Succulents</Button></Link></li>
                                                            <li><Link to="/herbal"><Button className="text-[rgba(0,0,0,0.8)] !rounded-none w-full !text-left !justify-start">Herbal Plants</Button></Link></li>
                                                            <li><Link to="/bonsai"><Button className="text-[rgba(0,0,0,0.8)] !rounded-none w-full !text-left !justify-start">Bonsai</Button></Link></li>
                                                            <li><Link to="/flowering"><Button className="text-[rgba(0,0,0,0.8)] !rounded-none w-full !text-left !justify-start">Flowering Plants</Button></Link></li>
                                                            <li><Link to="/air-purifying"><Button className="text-[rgba(0,0,0,0.8)] !rounded-none w-full !text-left !justify-start">Air Purifying Plants</Button></Link></li>
                                                            <li><Link to="/cactus"><Button className="text-[rgba(0,0,0,0.8)] !rounded-none w-full !text-left !justify-start">Cactus</Button></Link></li>
                                                            <li><Link to="/hanging"><Button className="text-[rgba(0,0,0,0.8)] !rounded-none w-full !text-left !justify-start">Hanging Plants</Button></Link></li>
                                                        </ul>
                                                    </div>
                                                )}
                                            </li>

                                            {/* Outdoor Plants */}
                                            <li className="relative">
                                                <Button
                                                    onClick={() => toggleSubmenu("outdoor")}
                                                    className="text-[rgba(0,0,0,0.8)] !rounded-none w-full !text-left !justify-start"
                                                >
                                                    Outdoor Plants
                                                </Button>

                                                {openSubmenu === "outdoor" && (
                                                    <div className="submenu absolute top-0 left-[100%] min-w-[200px] bg-white shadow-md z-50">
                                                        <ul>
                                                            <li><Link to="/outdoor-flowering"><Button className="text-[rgba(0,0,0,0.8)] !rounded-none w-full !text-left !justify-start">Flowering Plants</Button></Link></li>
                                                            <li><Link to="/medicinal"><Button className="text-[rgba(0,0,0,0.8)] !rounded-none w-full !text-left !justify-start">Medicinal Plants</Button></Link></li>
                                                            <li><Link to="/outdoor-bonsai"><Button className="text-[rgba(0,0,0,0.8)] !rounded-none w-full !text-left !justify-start">Bonsai</Button></Link></li>
                                                            <li><Link to="/fruit-plants"><Button className="text-[rgba(0,0,0,0.8)] !rounded-none w-full !text-left !justify-start">Fruit Plants</Button></Link></li>
                                                            <li><Link to="/vegetable-plants"><Button className="text-[rgba(0,0,0,0.8)] !rounded-none w-full !text-left !justify-start">Vegetable Plants</Button></Link></li>
                                                            <li><Link to="/ornamental"><Button className="text-[rgba(0,0,0,0.8)] !rounded-none w-full !text-left !justify-start">Ornamental Plants</Button></Link></li>
                                                            <li><Link to="/climbers"><Button className="text-[rgba(0,0,0,0.8)] !rounded-none w-full !text-left !justify-start">Climbers & Creepers</Button></Link></li>
                                                        </ul>
                                                    </div>
                                                )}
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </li>

                            {/* Gardening Tools */}
                            <li className="relative">
                                <Button onClick={() => toggleMenu("tools")} className="nav-button whitespace-nowrap !font-[500] !text-[17px]">
                                    Gardening Tools
                                </Button>
                                {openMenu === "tools" && (
                                    <div className="submenu absolute top-[120%] left-0 min-w-[200px] bg-white shadow-md z-50">
                                        <ul>
                                            <li><Link to="/pruners"><Button className="text-[rgba(0,0,0,0.8)] !rounded-none w-full !text-left !justify-start">Pruners & Shears</Button></Link></li>
                                            <li><Link to="/trowels"><Button className="text-[rgba(0,0,0,0.8)] !rounded-none w-full !text-left !justify-start">Trowels & Spades</Button></Link></li>
                                            <li><Link to="/rakes"><Button className="text-[rgba(0,0,0,0.8)] !rounded-none w-full !text-left !justify-start">Rakes & Hoes</Button></Link></li>
                                            <li><Link to="/gloves"><Button className="text-[rgba(0,0,0,0.8)] !rounded-none w-full !text-left !justify-start">Gloves</Button></Link></li>
                                            <li><Link to="/watering"><Button className="text-[rgba(0,0,0,0.8)] !rounded-none w-full !text-left !justify-start">Watering Cans</Button></Link></li>
                                            <li><Link to="/toolsets"><Button className="text-[rgba(0,0,0,0.8)] !rounded-none w-full !text-left !justify-start">Tool Sets</Button></Link></li>
                                        </ul>
                                    </div>
                                )}
                            </li>

                            {/* Soils & Fertilizers */}
                            <li className="relative">
                                <Button onClick={() => toggleMenu("soils")} className="nav-button whitespace-nowrap !font-[500] !text-[17px]">
                                    Soils & Fertilizers
                                </Button>
                                {openMenu === "soils" && (
                                    <div className="submenu absolute top-[120%] left-0 min-w-[200px] bg-white shadow-md z-50">
                                        <ul>
                                            <li><Link to="/potting"><Button className="text-[rgba(0,0,0,0.8)] !rounded-none w-full !text-left !justify-start">Potting Mix</Button></Link></li>
                                            <li><Link to="/organic"><Button className="text-[rgba(0,0,0,0.8)] !rounded-none w-full !text-left !justify-start">Organic Fertilizers</Button></Link></li>
                                            <li><Link to="/compost"><Button className="text-[rgba(0,0,0,0.8)] !rounded-none w-full !text-left !justify-start">Compost & Manure</Button></Link></li>
                                            <li><Link to="/cocopeat"><Button className="text-[rgba(0,0,0,0.8)] !rounded-none w-full !text-left !justify-start">Cocopeat</Button></Link></li>
                                            <li><Link to="/vermicompost"><Button className="text-[rgba(0,0,0,0.8)] !rounded-none w-full !text-left !justify-start">Vermicompost</Button></Link></li>
                                        </ul>
                                    </div>
                                )}
                            </li>

                            {/* Pots & Planters */}
                            <li className="relative">
                                <Button onClick={() => toggleMenu("pots")} className="nav-button whitespace-nowrap !font-[500] !text-[17px]">
                                    Pots & Planters
                                </Button>
                                {openMenu === "pots" && (
                                    <div className="submenu absolute top-[120%] left-0 min-w-[200px] bg-white shadow-md z-50">
                                        <ul>
                                            <li><Link to="/ceramic"><Button className="text-[rgba(0,0,0,0.8)] !rounded-none w-full !text-left !justify-start">Ceramic Planters</Button></Link></li>
                                            <li><Link to="/terracotta"><Button className="text-[rgba(0,0,0,0.8)] !rounded-none w-full !text-left !justify-start">Terracotta Pots</Button></Link></li>
                                            <li><Link to="/plastic"><Button className="text-[rgba(0,0,0,0.8)] !rounded-none w-full !text-left !justify-start">Plastic Pots</Button></Link></li>
                                            <li><Link to="/hanging-pots"><Button className="text-[rgba(0,0,0,0.8)] !rounded-none w-full !text-left !justify-start">Hanging Planters</Button></Link></li>
                                            <li><Link to="/indoor-decorative"><Button className="text-[rgba(0,0,0,0.8)] !rounded-none w-full !text-left !justify-start">Indoor Decorative</Button></Link></li>
                                        </ul>
                                    </div>
                                )}
                            </li>

                            {/* Seeds & Bulbs */}
                            <li className="relative">
                                <Button onClick={() => toggleMenu("seeds")} className="nav-button whitespace-nowrap !font-[500] !text-[17px]">
                                    Seeds & Bulbs
                                </Button>
                                {openMenu === "seeds" && (
                                    <div className="submenu absolute top-[120%] left-0 min-w-[200px] bg-white shadow-md z-50">
                                        <ul>
                                            <li><Link to="/flower-seeds"><Button className="text-[rgba(0,0,0,0.8)] !rounded-none w-full !text-left !justify-start">Flower Seeds</Button></Link></li>
                                            <li><Link to="/vegetable-seeds"><Button className="text-[rgba(0,0,0,0.8)] !rounded-none w-full !text-left !justify-start">Vegetable Seeds</Button></Link></li>
                                            <li><Link to="/herb-seeds"><Button className="text-[rgba(0,0,0,0.8)] !rounded-none w-full !text-left !justify-start">Herb Seeds</Button></Link></li>
                                            <li><Link to="/bulbs"><Button className="text-[rgba(0,0,0,0.8)] !rounded-none w-full !text-left !justify-start">Flower Bulbs</Button></Link></li>
                                        </ul>
                                    </div>
                                )}
                            </li>

                            {/* Accessories */}
                            <li className="relative">
                                <Button onClick={() => toggleMenu("accessories")} className="nav-button whitespace-nowrap !font-[500] !text-[17px]">
                                    Accessories
                                </Button>
                                {openMenu === "accessories" && (
                                    <div className="submenu absolute top-[120%] left-0 min-w-[200px] bg-white shadow-md z-50">
                                        <ul>
                                            <li><Link to="/decor"><Button className="text-[rgba(0,0,0,0.8)] !rounded-none w-full !text-left !justify-start">Decor Items</Button></Link></li>
                                            <li><Link to="/stands"><Button className="text-[rgba(0,0,0,0.8)] !rounded-none w-full !text-left !justify-start">Plant Stands</Button></Link></li>
                                            <li><Link to="/lights"><Button className="text-[rgba(0,0,0,0.8)] !rounded-none w-full !text-left !justify-start">Grow Lights</Button></Link></li>
                                            <li><Link to="/watering-tools"><Button className="text-[rgba(0,0,0,0.8)] !rounded-none w-full !text-left !justify-start">Watering Tools</Button></Link></li>
                                        </ul>
                                    </div>
                                )}
                            </li>

                        </ul>
                    </div>

                    {/* Right Info */}
                    <div className="col_3 w-[20%]">
                        <p className="whitespace-nowrap text-[15px] font-[550] flex items-center gap-2 mb-0 mt-0">
                            <ImRocket className="text-[16px]" /> Free International Delivery
                        </p>
                    </div>
                </div>
            </nav>

            <CategoryPanel isOpenCatPanel={isOpenCatPanel} setIsOpenCatPanel={setIsOpenCatPanel} />
        </>
    );
};

export default Navigation;
