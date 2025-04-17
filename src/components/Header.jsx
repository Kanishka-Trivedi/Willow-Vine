import React from 'react'
import { Link } from "react-router-dom"
import Search from './Search'
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { IoCartOutline } from "react-icons/io5";
import { IoIosGitCompare } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";



const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
        padding: '0 4px',
    },
}));


function Header() {
    return (
        <header>
            <div className='top-strip py-2 border-t-[1px] border-gray-200 border-b-[2px]'>
                <div className='container'>
                    <div className='flex items-center justify-between'>
                        <div className='col1 w-[50%]'>
                            <p className='text-[15px] font-[500]'>Get up to 50% off new season styles, limited time only</p>
                        </div>

                        <div className='col2 flex items-center justify-end'>
                            <ul className='flex items-center gap-3'>
                                <li className='list-none'>
                                    <Link to="/help-center" className='text-[14px] link font-[500] transition'>Help Center{" "}</Link>
                                </li>

                                <li className='list-none'>
                                    <Link to="/order-tracking" className='text-[14px] link font-[500] transition'>Order Tracking</Link>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>




            <div className='header py-4 border-t-[1px] border-gray-200 border-b-[2px]'>
                <div className='container flex items-center justify-between'>
                    <div className='col1 w-[20%]'>
                        <Link to={"/"}><img src='/logo.png' height={"70px"} width={"150px"} /></Link>
                    </div>

                    <div className='col2 w-[45%]'>
                        <Search />
                    </div>

                    <div className='col3 w-[35%] flex items-center pl-8'>
                        <ul className='flex items-center justify-end gap-4 w-full'>
                            <li className="list-none flex items-center space-x-1">
                                <Link to="/login" className="link transition text-[15px] font-[500]">Login</Link>
                                <span>|</span>
                                <Link to="/register" className="link transition text-[15px] font-[500]">Register</Link>
                            </li>




                            <li>
                                <IconButton aria-label="compare">
                                    <StyledBadge badgeContent={7} color="secondary" className="text-[7px] font">
                                        <IoIosGitCompare style={{ fontSize: '23px' }} />
                                    </StyledBadge>
                                </IconButton>
                            </li>


                            <li>
                                <IconButton aria-label="heart">
                                    <StyledBadge badgeContent={10} color="secondary">
                                        <FaRegHeart style={{ fontSize: '23px' }} />                                   </StyledBadge>
                                </IconButton>
                            </li>


                            <li>
                                <IconButton aria-label="cart">
                                    <StyledBadge badgeContent={4} color="secondary">
                                        <IoCartOutline style={{ fontSize: '23px' }} />                                    </StyledBadge>
                                </IconButton>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
