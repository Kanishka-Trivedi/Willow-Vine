import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { IoClose } from "react-icons/io5";
import { FaRegPlusSquare } from "react-icons/fa";
import { FaRegMinusSquare } from "react-icons/fa";
import { Button, capitalize } from '@mui/material';
import { Link } from 'react-router-dom';


const CategoryPanel = (props) => {

    const toggleDrawer = (newOpen) => () => {
        props.setIsOpenCatPanel(newOpen)
    }

    const [submenuIndex, setSubmenuIndex] = useState(null);

    const openSubmenu = (index) => {
        if (submenuIndex === index) {
            setSubmenuIndex(null);
        } else {
            setSubmenuIndex(index);
        }
    }

    const [innerSubmenuIndex, setInnerSubmenuIndex] = useState(null);

    const openInnerSubmenu = (index) => {
        if (innerSubmenuIndex === index) {
            setInnerSubmenuIndex(null);
        } else {
            setInnerSubmenuIndex(index);
        }
    }

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" className="categoryPanel" >

            <h3 className='p-3 pl-4 text-[18px] font-[500] flex items-center justify-between'>Shop By Categories <IoClose onClick={toggleDrawer(false)} className='text-[20px] cursor-pointer' /></h3>

            <div className='scroll'>
                <ul className='w-full'>
                    <li className='list-none flex items-center relative flex-col'>
                        <Link to="/" className='w-full'>
                            <Button
                                className='w-full !text-left !justify-start !px-4'
                                sx={{
                                    textTransform: 'capitalize',
                                    color: 'rgba(0, 0, 0, 0.8)',
                                }}
                            >
                                Plants
                            </Button>
                        </Link>

                        {
                            submenuIndex === 0 ? (
                                <FaRegMinusSquare className='absolute top-[10px] right-[15px] cursor-pointer' onClick={() => openSubmenu(0)} />
                            ) : (
                                <FaRegPlusSquare className='absolute top-[10px] right-[15px] cursor-pointer' onClick={() => openSubmenu(0)} />
                            )}


                        {
                            submenuIndex === 0 &&
                            <ul className='submenu w-full pl-3'>
                                <li className='list-none relative'>
                                    <Link to="/">
                                        <Button
                                            className='w-full !text-left !justify-start !px-4'
                                            sx={{
                                                textTransform: 'capitalize',
                                                color: 'rgba(0, 0, 0, 0.8)',
                                            }}
                                        >
                                            Indoor Plants
                                        </Button>
                                    </Link>

                                    {
                                        innerSubmenuIndex === 0 ? (
                                            <FaRegMinusSquare className='absolute top-[10px] right-[15px] cursor-pointer' onClick={() => openInnerSubmenu(0)} />
                                        ) : (
                                            <FaRegPlusSquare className='absolute top-[10px] right-[15px] cursor-pointer' onClick={() => openInnerSubmenu(0)} />
                                        )}


                                    {
                                        innerSubmenuIndex === 0 &&
                                        <ul className='inner_submenu w-full pl-3'>
                                            <li className='list-none relative mb-1'>
                                                <Link to="/succulents"
                                                    className='link w-full !text-left !justify-start !px-4 transition text-[14px]'
                                                >
                                                    Succulents
                                                </Link>
                                            </li>

                                            <li className='list-none relative mb-1'>
                                                <Link to="/flowering"
                                                    className='link w-full !text-left !justify-start !px-4 transition text-[14px]'
                                                >
                                                    Flowering Plants
                                                </Link>
                                            </li>

                                            <li className='list-none relative mb-1'>
                                                <Link to="/cactus"
                                                    className='link w-full !text-left !justify-start !px-4 transition text-[14px]'
                                                >
                                                    Cactus
                                                </Link>
                                            </li>

                                            <li className='list-none relative mb-1'>
                                                <Link to="/bonsai"
                                                    className='link w-full !text-left !justify-start !px-4 transition text-[14px]'
                                                >
                                                    Bonsai Plants
                                                </Link>
                                            </li>

                                            <li className='list-none relative mb-1'>
                                                <Link to="/air-purifying"
                                                    className='link w-full !text-left !justify-start !px-4 transition text-[14px]'
                                                >
                                                    Air Purifying Plants
                                                </Link>
                                            </li>

                                            <li className='list-none relative mb-1'>
                                                <Link to="/hanging"
                                                    className='link w-full !text-left !justify-start !px-4 transition text-[14px]'
                                                >
                                                    Hanging Plants
                                                </Link>
                                            </li>

                                            <li className='list-none relative mb-1'>
                                                <Link to="/herbal"
                                                    className='link w-full !text-left !justify-start !px-4 transition text-[14px]'
                                                >
                                                    Herbs
                                                </Link>
                                            </li>
                                        </ul>
                                    }


                                </li>




                                <li className='list-none relative'>
                                    <Link to="/">
                                        <Button
                                            className='w-full !text-left !justify-start !px-4'
                                            sx={{
                                                textTransform: 'capitalize',
                                                color: 'rgba(0, 0, 0, 0.8)',
                                            }}
                                        >
                                            Outdoor Plants
                                        </Button>
                                    </Link>

                                    {
                                        innerSubmenuIndex === 1 ? (
                                            <FaRegMinusSquare className='absolute top-[10px] right-[15px] cursor-pointer' onClick={() => openInnerSubmenu(1)} />
                                        ) : (
                                            <FaRegPlusSquare className='absolute top-[10px] right-[15px] cursor-pointer' onClick={() => openInnerSubmenu(1)} />
                                        )}


                                    {
                                        innerSubmenuIndex === 1 &&
                                        <ul className='inner_submenu w-full pl-3'>
                                            <li className='list-none relative mb-1'>
                                                <Link to="/flowering"
                                                    className='link w-full !text-left !justify-start !px-4 transition text-[14px]'
                                                >
                                                    Flowering Plants
                                                </Link>
                                            </li>

                                            <li className='list-none relative mb-1'>
                                                <Link to="/ornamental"
                                                    className='link w-full !text-left !justify-start !px-4 transition text-[14px]'
                                                >
                                                    Ornamental Plants
                                                </Link>
                                            </li>

                                            <li className='list-none relative mb-1'>
                                                <Link to="/fruit-plants"
                                                    className='link w-full !text-left !justify-start !px-4 transition text-[14px]'
                                                >
                                                    Fruiting Plants
                                                </Link>
                                            </li>

                                            <li className='list-none relative mb-1'>
                                                <Link to="/vegetable-plants"
                                                    className='link w-full !text-left !justify-start !px-4 transition text-[14px]'
                                                >
                                                    Vegetable Plants
                                                </Link>
                                            </li>

                                            <li className='list-none relative mb-1'>
                                                <Link to="/climbers"
                                                    className='link w-full !text-left !justify-start !px-4 transition text-[14px]'
                                                >
                                                    Climbers & Creepers
                                                </Link>
                                            </li>

                                            <li className='list-none relative mb-1'>
                                                <Link to="/herbal"
                                                    className='link w-full !text-left !justify-start !px-4 transition text-[14px]'
                                                >
                                                    Herbs
                                                </Link>
                                            </li>

                                            <li className='list-none relative mb-1'>
                                                <Link to="/bonsai"
                                                    className='link w-full !text-left !justify-start !px-4 transition text-[14px]'
                                                >
                                                    Bonsai
                                                </Link>
                                            </li>
                                        </ul>
                                    }


                                </li>
                            </ul>
                        }

                    </li>




                    <li className='list-none flex items-center relative flex-col'>
                        <Link to="/" className='w-full'>
                            <Button
                                className='w-full !text-left !justify-start !px-4'
                                sx={{
                                    textTransform: 'capitalize',
                                    color: 'rgba(0, 0, 0, 0.8)',
                                }}
                            >
                                Seeds & Bulbs
                            </Button>
                        </Link>

                        {
                            submenuIndex === 1 ? (
                                <FaRegMinusSquare className='absolute top-[10px] right-[15px] cursor-pointer' onClick={() => openSubmenu(1)} />
                            ) : (
                                <FaRegPlusSquare className='absolute top-[10px] right-[15px] cursor-pointer' onClick={() => openSubmenu(1)} />
                            )}


                        {
                            submenuIndex === 1 &&
                            <ul className='submenu w-full pl-3'>
                                <li className='list-none relative'>
                                    <li className='list-none relative mb-1'>
                                        <Link to="/"
                                            className='link w-full !text-left !justify-start !px-4 transition text-[14px]'
                                        >
                                            Flower Seeds
                                        </Link>
                                    </li>

                                    <li className='list-none relative mb-1'>
                                        <Link to="/"
                                            className='link w-full !text-left !justify-start !px-4 transition text-[14px]'
                                        >
                                            Vegetable Seeds
                                        </Link>
                                    </li>

                                    <li className='list-none relative mb-1'>
                                        <Link to="/"
                                            className='link w-full !text-left !justify-start !px-4 transition text-[14px]'
                                        >
                                            Fruits Seeds
                                        </Link>
                                    </li>

                                    <li className='list-none relative mb-1'>
                                        <Link to="/"
                                            className='link w-full !text-left !justify-start !px-4 transition text-[14px]'
                                        >
                                            Herb Seeds
                                        </Link>
                                    </li>

                                    <li className='list-none relative mb-1'>
                                        <Link to="/"
                                            className='link w-full !text-left !justify-start !px-4 transition text-[14px]'
                                        >
                                            Bulbs
                                        </Link>
                                    </li>
                                </li>
                            </ul>
                        }

                    </li>





                    <li className='list-none flex items-center relative flex-col'>
                        <Link to="/" className='w-full'>
                            <Button
                                className='w-full !text-left !justify-start !px-4'
                                sx={{
                                    textTransform: 'capitalize',
                                    color: 'rgba(0, 0, 0, 0.8)',
                                }}
                            >
                                Gardening Tools
                            </Button>
                        </Link>

                        {
                            submenuIndex === 2 ? (
                                <FaRegMinusSquare className='absolute top-[10px] right-[15px] cursor-pointer' onClick={() => openSubmenu(2)} />
                            ) : (
                                <FaRegPlusSquare className='absolute top-[10px] right-[15px] cursor-pointer' onClick={() => openSubmenu(2)} />
                            )}


                        {
                            submenuIndex === 2 &&
                            <ul className='submenu w-full pl-3'>
                                <li className='list-none relative'>
                                    <li className='list-none relative mb-1'>
                                        <Link to="/"
                                            className='link w-full !text-left !justify-start !px-4 transition text-[14px]'
                                        >
                                            Pruners & Shears
                                        </Link>
                                    </li>

                                    <li className='list-none relative mb-1'>
                                        <Link to="/"
                                            className='link w-full !text-left !justify-start !px-4 transition text-[14px]'
                                        >
                                            Trowels & Spades
                                        </Link>
                                    </li>

                                    <li className='list-none relative mb-1'>
                                        <Link to="/"
                                            className='link w-full !text-left !justify-start !px-4 transition text-[14px]'
                                        >
                                            Rakes & Hoes
                                        </Link>
                                    </li>

                                    <li className='list-none relative mb-1'>
                                        <Link to="/"
                                            className='link w-full !text-left !justify-start !px-4 transition text-[14px]'
                                        >
                                            Gloves
                                        </Link>
                                    </li>

                                    <li className='list-none relative mb-1'>
                                        <Link to="/"
                                            className='link w-full !text-left !justify-start !px-4 transition text-[14px]'
                                        >
                                            Watering Cans
                                        </Link>
                                    </li>

                                    <li className='list-none relative mb-1'>
                                        <Link to="/"
                                            className='link w-full !text-left !justify-start !px-4 transition text-[14px]'
                                        >
                                            Tool Sets
                                        </Link>
                                    </li>
                                </li>
                            </ul>
                        }

                    </li>




                    <li className='list-none flex items-center relative flex-col'>
                        <Link to="/" className='w-full'>
                            <Button
                                className='w-full !text-left !justify-start !px-4'
                                sx={{
                                    textTransform: 'capitalize',
                                    color: 'rgba(0, 0, 0, 0.8)',
                                }}
                            >
                                Soils & Fertilizers
                            </Button>
                        </Link>

                        {
                            submenuIndex === 3 ? (
                                <FaRegMinusSquare className='absolute top-[10px] right-[15px] cursor-pointer' onClick={() => openSubmenu(3)} />
                            ) : (
                                <FaRegPlusSquare className='absolute top-[10px] right-[15px] cursor-pointer' onClick={() => openSubmenu(3)} />
                            )}


                        {
                            submenuIndex === 3 &&
                            <ul className='submenu w-full pl-3'>
                                <li className='list-none relative'>
                                    <li className='list-none relative mb-1'>
                                        <Link to="/"
                                            className='link w-full !text-left !justify-start !px-4 transition text-[14px]'
                                        >
                                            Potting Mix
                                        </Link>
                                    </li>

                                    <li className='list-none relative mb-1'>
                                        <Link to="/"
                                            className='link w-full !text-left !justify-start !px-4 transition text-[14px]'
                                        >
                                            Organic Fertilizers
                                        </Link>
                                    </li>

                                    <li className='list-none relative mb-1'>
                                        <Link to="/"
                                            className='link w-full !text-left !justify-start !px-4 transition text-[14px]'
                                        >
                                            Compost & Manure
                                        </Link>
                                    </li>

                                    <li className='list-none relative mb-1'>
                                        <Link to="/"
                                            className='link w-full !text-left !justify-start !px-4 transition text-[14px]'
                                        >
                                            Cocopeat
                                        </Link>
                                    </li>

                                    <li className='list-none relative mb-1'>
                                        <Link to="/"
                                            className='link w-full !text-left !justify-start !px-4 transition text-[14px]'
                                        >
                                            Vermicompost
                                        </Link>
                                    </li>
                                </li>
                            </ul>
                        }

                    </li>





                    <li className='list-none flex items-center relative flex-col'>
                        <Link to="/" className='w-full'>
                            <Button
                                className='w-full !text-left !justify-start !px-4'
                                sx={{
                                    textTransform: 'capitalize',
                                    color: 'rgba(0, 0, 0, 0.8)',
                                }}
                            >
                                Pots & Planters
                            </Button>
                        </Link>

                        {
                            submenuIndex === 4 ? (
                                <FaRegMinusSquare className='absolute top-[10px] right-[15px] cursor-pointer' onClick={() => openSubmenu(4)} />
                            ) : (
                                <FaRegPlusSquare className='absolute top-[10px] right-[15px] cursor-pointer' onClick={() => openSubmenu(4)} />
                            )}


                        {
                            submenuIndex === 4 &&
                            <ul className='submenu w-full pl-3'>
                                <li className='list-none relative'>
                                    <li className='list-none relative mb-1'>
                                        <Link to="/"
                                            className='link w-full !text-left !justify-start !px-4 transition text-[14px]'
                                        >
                                            Ceramic Planters
                                        </Link>
                                    </li>

                                    <li className='list-none relative mb-1'>
                                        <Link to="/"
                                            className='link w-full !text-left !justify-start !px-4 transition text-[14px]'
                                        >
                                            Terracotta Pots
                                        </Link>
                                    </li>

                                    <li className='list-none relative mb-1'>
                                        <Link to="/"
                                            className='link w-full !text-left !justify-start !px-4 transition text-[14px]'
                                        >
                                            Plastic Pots
                                        </Link>
                                    </li>

                                    <li className='list-none relative mb-1'>
                                        <Link to="/"
                                            className='link w-full !text-left !justify-start !px-4 transition text-[14px]'
                                        >
                                            Hanging Planters
                                        </Link>
                                    </li>

                                    <li className='list-none relative mb-1'>
                                        <Link to="/"
                                            className='link w-full !text-left !justify-start !px-4 transition text-[14px]'
                                        >
                                            Indoor Decorative Pots
                                        </Link>
                                    </li>

                                    <li className='list-none relative mb-1'>
                                        <Link to="/"
                                            className='link w-full !text-left !justify-start !px-4 transition text-[14px]'
                                        >
                                            Raised Garden Beds
                                        </Link>
                                    </li>
                                </li>
                            </ul>
                        }
                    </li>





                    <li className='list-none flex items-center relative flex-col'>
                        <Link to="/" className='w-full'>
                            <Button
                                className='w-full !text-left !justify-start !px-4'
                                sx={{
                                    textTransform: 'capitalize',
                                    color: 'rgba(0, 0, 0, 0.8)',
                                }}
                            >
                                Accessories
                            </Button>
                        </Link>

                        {
                            submenuIndex === 5 ? (
                                <FaRegMinusSquare className='absolute top-[10px] right-[15px] cursor-pointer' onClick={() => openSubmenu(5)} />
                            ) : (
                                <FaRegPlusSquare className='absolute top-[10px] right-[15px] cursor-pointer' onClick={() => openSubmenu(5)} />
                            )}


                        {
                            submenuIndex === 5 &&
                            <ul className='submenu w-full pl-3'>
                                <li className='list-none relative'>
                                    <li className='list-none relative mb-1'>
                                        <Link to="/"
                                            className='link w-full !text-left !justify-start !px-4 transition text-[14px]'
                                        >
                                            Grow Lights
                                        </Link>
                                    </li>

                                    <li className='list-none relative mb-1'>
                                        <Link to="/"
                                            className='link w-full !text-left !justify-start !px-4 transition text-[14px]'
                                        >
                                            Garden Decor
                                        </Link>
                                    </li>

                                    <li className='list-none relative mb-1'>
                                        <Link to="/"
                                            className='link w-full !text-left !justify-start !px-4 transition text-[14px]'
                                        >
                                            Plant Stands
                                        </Link>
                                    </li>

                                    <li className='list-none relative mb-1'>
                                        <Link to="/"
                                            className='link w-full !text-left !justify-start !px-4 transition text-[14px]'
                                        >
                                            Support Sticks
                                        </Link>
                                    </li>

                                    <li className='list-none relative mb-1'>
                                        <Link to="/"
                                            className='link w-full !text-left !justify-start !px-4 transition text-[14px]'
                                        >
                                            Irrigation Kits
                                        </Link>
                                    </li>
                                </li>
                            </ul>
                        }
                    </li>
                </ul>
            </div>

        </Box>
    );

    return (
        <div>
            <Drawer open={props.isOpenCatPanel} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    )
}

export default CategoryPanel
