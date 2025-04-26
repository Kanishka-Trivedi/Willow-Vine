import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { RiMenu2Fill } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { ImRocket } from "react-icons/im";
import CategoryPanel from './CategoryPanel';


const Navigation = () => {

    const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);

    const openCategoryPanel = () => {
        setIsOpenCatPanel(true);
    }

    return (
        <>
            <nav className='py-2'>
                <div className='container max-w-none flex items-center justify-between gap-6'>
                    <div className='col_1 w-[20%] whitespace-nowrap'>
                        <Button className='!text-black gap-2 font-semibold w-full' onClick={openCategoryPanel}> <RiMenu2Fill className='text-[17px]' />
                            Shop By Categories
                            <FaAngleDown className='text-[18px] ml-auto font-bold' />
                        </Button>
                    </div>


                    <div className='col_2 w-[60%]'>
                        <ul className='flex items-center gap-2 nav'>
                            <li className='list-none'>
                                <Link to="/" className="link transition">
                                    <Button className='nav-button link transition whitespace-nowrap !font-[500] !text-[17px]'>Home</Button>
                                </Link>
                            </li>

                            <li className='list-none relative'>
                                <Link to="/" className="link transition">
                                    <Button className='nav-button link transition whitespace-nowrap !font-[500] !text-[17px]'>Plants
                                    </Button>
                                </Link>

                                <div className='submenu absolute top-[120%] left-[0%] min-w-[150px] bg-white shadow-md opacity-0 transition-all'>
                                    <ul>
                                        <li className='list-none w-full relative'>
                                            <Link to="/" className='link transition w-full'>
                                                <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Indoor Plants</Button>



                                                <div className='submenu absolute top-[0%] left-[100%] min-w-[150px] bg-white shadow-md opacity-0 transition-all'>
                                                    <ul>
                                                        <li className='list-none w-full'>
                                                            <Link to="/" className='link transition w-full'>
                                                                <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Succulents</Button>
                                                            </Link>
                                                        </li>

                                                        <li className='list-none w-full'>
                                                            <Link to="/" className='link w-full'>
                                                                <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Herbal Plants</Button>
                                                            </Link>
                                                        </li>

                                                        <li className='list-none w-full'>
                                                            <Link to="/" className='link w-full'>
                                                                <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Bonsai</Button>
                                                            </Link>
                                                        </li>

                                                        <li className='list-none w-full'>
                                                            <Link to="/" className='link w-full'>
                                                                <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Flowering Plants</Button>
                                                            </Link>
                                                        </li>

                                                        <li className='list-none w-full'>
                                                            <Link to="/" className='link w-full'>
                                                                <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Air Purifying Plants</Button>
                                                            </Link>
                                                        </li>

                                                        <li className='list-none w-full'>
                                                            <Link to="/" className='link w-full'>
                                                                <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Foilage Plants</Button>
                                                            </Link>
                                                        </li>

                                                        <li className='list-none w-full'>
                                                            <Link to="/" className='link w-full'>
                                                                <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Hanging Plants</Button>
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </Link>
                                        </li>

                                        <li className='list-none w-full relative'>
                                            <Link to="/" className='link w-full'>
                                                <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Outdoor Plants</Button>



                                                <div className='submenu absolute top-[0%] left-[100%] min-w-[150px] bg-white shadow-md opacity-0 transition-all'>
                                                    <ul>
                                                        <li className='list-none w-full'>
                                                            <Link to="/" className='link transition w-full'>
                                                                <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Flowering Plants</Button>
                                                            </Link>
                                                        </li>

                                                        <li className='list-none w-full'>
                                                            <Link to="/" className='link w-full'>
                                                                <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Medicinal Plants</Button>
                                                            </Link>
                                                        </li>

                                                        <li className='list-none w-full'>
                                                            <Link to="/" className='link w-full'>
                                                                <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Bonsai</Button>
                                                            </Link>
                                                        </li>

                                                        <li className='list-none w-full'>
                                                            <Link to="/" className='link w-full'>
                                                                <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Fruit Plants</Button>
                                                            </Link>
                                                        </li>

                                                        <li className='list-none w-full'>
                                                            <Link to="/" className='link w-full'>
                                                                <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Vegetable Plants</Button>
                                                            </Link>
                                                        </li>

                                                        <li className='list-none w-full'>
                                                            <Link to="/" className='link w-full'>
                                                                <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Ornamental Plants</Button>
                                                            </Link>
                                                        </li>

                                                        <li className='list-none w-full'>
                                                            <Link to="/" className='link w-full'>
                                                                <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Climbers & Creepers</Button>
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                            </li>

                            <li className='list-none relative'>
                                <Link to="/" className="link transition">
                                    <Button className='nav-button link transition whitespace-nowrap !font-[500] !text-[17px]'>Gardening Tools</Button>


                                    <div className='submenu absolute top-[120%] left-[0%] min-w-[150px] bg-white shadow-md opacity-0 transition-all'>
                                        <ul>
                                            <li className='list-none w-full relative'>
                                                <Link to="/" className='link transition w-full'>
                                                    <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Pruners & Shears</Button>
                                                </Link>
                                            </li>

                                            <li className='list-none w-full relative'>
                                                <Link to="/" className='link w-full'>
                                                    <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Trowels & Spades</Button>
                                                </Link>
                                            </li>

                                            <li className='list-none w-full relative'>
                                                <Link to="/" className='link w-full'>
                                                    <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Rakes & Hoes</Button>
                                                </Link>
                                            </li>

                                            <li className='list-none w-full relative'>
                                                <Link to="/" className='link w-full'>
                                                    <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Gloves</Button>
                                                </Link>
                                            </li>

                                            <li className='list-none w-full relative'>
                                                <Link to="/" className='link w-full'>
                                                    <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Watering Cans</Button>
                                                </Link>
                                            </li>

                                            <li className='list-none w-full relative'>
                                                <Link to="/" className='link w-full'>
                                                    <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Tool Sets</Button>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </Link>
                            </li>

                            <li className='list-none relative'>
                                <Link to="/" className="link transition">
                                    <Button className='nav-button link transition whitespace-nowrap !font-[500] !text-[17px]'>Soils & Fertilizers</Button>


                                    <div className='submenu absolute top-[120%] left-[0%] min-w-[150px] bg-white shadow-md opacity-0 transition-all'>
                                        <ul>
                                            <li className='list-none w-full relative'>
                                                <Link to="/" className='link transition w-full'>
                                                    <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Potting Mix</Button>
                                                </Link>
                                            </li>

                                            <li className='list-none w-full relative'>
                                                <Link to="/" className='link w-full'>
                                                    <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Organic Fertilizers</Button>
                                                </Link>
                                            </li>

                                            <li className='list-none w-full relative'>
                                                <Link to="/" className='link w-full'>
                                                    <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Compost & Manure</Button>
                                                </Link>
                                            </li>

                                            <li className='list-none w-full relative'>
                                                <Link to="/" className='link w-full'>
                                                    <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Cocopeat</Button>
                                                </Link>
                                            </li>

                                            <li className='list-none w-full relative'>
                                                <Link to="/" className='link w-full'>
                                                    <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Vermicompost</Button>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </Link>
                            </li>

                            <li className='list-none relative'>
                                <Link to="/" className="link transition">
                                    <Button className='nav-button link transition whitespace-nowrap !font-[500] !text-[17px]'>Pots & Planters</Button>


                                    <div className='submenu absolute top-[120%] left-[0%] min-w-[150px] bg-white shadow-md opacity-0 transition-all'>
                                        <ul>
                                            <li className='list-none w-full relative'>
                                                <Link to="/" className='link transition w-full'>
                                                    <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Ceramic Planters</Button>
                                                </Link>
                                            </li>

                                            <li className='list-none w-full relative'>
                                                <Link to="/" className='link w-full'>
                                                    <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Terracotta Pots</Button>
                                                </Link>
                                            </li>

                                            <li className='list-none w-full relative'>
                                                <Link to="/" className='link w-full'>
                                                    <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Plastic Pots</Button>
                                                </Link>
                                            </li>

                                            <li className='list-none w-full relative'>
                                                <Link to="/" className='link w-full'>
                                                    <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Hanging Planters</Button>
                                                </Link>
                                            </li>

                                            <li className='list-none w-full relative'>
                                                <Link to="/" className='link w-full'>
                                                    <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Indoor Decorative Pots</Button>
                                                </Link>
                                            </li>

                                            <li className='list-none w-full relative'>
                                                <Link to="/" className='link w-full'>
                                                    <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Raised Garden Beds</Button>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </Link>
                            </li>

                            <li className='list-none relative'>
                                <Link to="/" className="link transition">
                                    <Button className='nav-button link transition whitespace-nowrap !font-[500] !text-[17px]'>Seeds & Bulbs</Button>


                                    <div className='submenu absolute top-[120%] left-[0%] min-w-[150px] bg-white shadow-md opacity-0 transition-all'>
                                        <ul>
                                            <li className='list-none w-full relative'>
                                                <Link to="/" className='link transition w-full'>
                                                    <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Fruit Seeds</Button>
                                                </Link>
                                            </li>

                                            <li className='list-none w-full relative'>
                                                <Link to="/" className='link w-full'>
                                                    <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Vegetable Seeds</Button>
                                                </Link>
                                            </li>

                                            <li className='list-none w-full relative'>
                                                <Link to="/" className='link w-full'>
                                                    <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Flower Seeds</Button>
                                                </Link>
                                            </li>

                                            <li className='list-none w-full relative'>
                                                <Link to="/" className='link w-full'>
                                                    <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Herb Seeds</Button>
                                                </Link>
                                            </li>

                                            <li className='list-none w-full relative'>
                                                <Link to="/" className='link w-full'>
                                                    <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Bulbs</Button>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </Link>
                            </li>

                            <li className='list-none relative'>
                                <Link to="/" className="link transition">
                                    <Button className='nav-button link transition whitespace-nowrap !font-[500] !text-[17px]'>Accessories</Button>


                                    <div className='submenu absolute top-[120%] left-[0%] min-w-[150px] bg-white shadow-md opacity-0 transition-all'>
                                        <ul>
                                            <li className='list-none w-full relative'>
                                                <Link to="/" className='link transition w-full'>
                                                    <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Grow Lights</Button>
                                                </Link>
                                            </li>

                                            <li className='list-none w-full relative'>
                                                <Link to="/" className='link w-full'>
                                                    <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Garden Decor</Button>
                                                </Link>
                                            </li>

                                            <li className='list-none w-full relative'>
                                                <Link to="/" className='link w-full'>
                                                    <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Plant Stands</Button>
                                                </Link>
                                            </li>

                                            <li className='list-none w-full relative'>
                                                <Link to="/" className='link w-full'>
                                                    <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Support Sticks</Button>
                                                </Link>
                                            </li>

                                            <li className='list-none w-full relative'>
                                                <Link to="/" className='link w-full'>
                                                    <Button className='text-[rgba(0, 0, 0, 0.8)] !rounded-none w-full !text-left !justify-start'>Irrigation Kits</Button>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>


                    <div className='col_3 w-[20%]'>
                        <p className='whitespace-nowrap text-[15px] font-[550] flex items-center gap-2 mb-0 mt-0'>
                            <ImRocket className='text-[16px]' />Free International Delivery</p>
                    </div>

                </div>
            </nav>

            <CategoryPanel isOpenCatPanel={isOpenCatPanel} setIsOpenCatPanel={setIsOpenCatPanel} />

        </>
    );
};

export default Navigation;
