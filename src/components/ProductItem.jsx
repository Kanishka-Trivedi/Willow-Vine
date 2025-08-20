import React from 'react'
import { Link } from 'react-router-dom'
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import { FaRegHeart } from "react-icons/fa";
import { IoIosGitCompare } from "react-icons/io";
import { MdOutlineZoomOutMap } from "react-icons/md";




const ProductItem = () => {
    return (
        <div className='productItem shadow-lg rounded-md overflow-hidden  border-[rgba(0, 0, 0, 0.1)]'>
            <div className='group imgWrapper w-[100%] h-[250px] overflow-hidden rounded-t-md relative'>
                <img src="https://plantorbit.com/cdn/shop/files/image_0Is.webp?v=1710876039&width=713" alt="" className='w-full' />

                <span className='discount flex items-center absolute top-[10px] left-[10px] z-50 bg-[#4CBB17] text-white rounded-lg p-1 text-[12px] font-[500]'> 40% Off </span>

                <div className='actions absolute top-[-200px] right-[5px] z-50 flex items-center gap-2 flex-col w-[50px] group-hover:top-[15px] transition-all duration-700 opacity-0 group-hover:opacity-100'>
                    <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white !text-black hover:!bg-[#4CBB17] hover:text-white group'><FaRegHeart className='text-[18px] !text-black hover:!text-white group-hover:text-white' /></Button>

                    <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white !text-black hover:!bg-[#4CBB17] hover:text-white group'><MdOutlineZoomOutMap className='text-[18px] !text-black hover:!text-white group-hover:text-white' /></Button>

                    <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white !text-black hover:!bg-[#4CBB17] hover:text-white group'><IoIosGitCompare className='text-[18px] !text-black hover:!text-white group-hover:text-white' /></Button>
                </div>
            </div>

            <div className='info p-3 py-5 bg-[#ffeac4]'>
                <h3 className='text-[16px] title mt-1 mb-1 font-[500] text-[#000]'><Link to="/" className="link transition-all">Pachyphytum Oviferum Moonstone  </Link></h3>

                <Rating name="size-small" defaultValue={4} size="small" readOnly />

                <div className='flex items-center gap-4'>
                    <span className='oldPrice line-through text-gray-500 text-[15px] font-[500]'>Rs. 159.00</span>
                    <span className='price text-[#1e975a] text-[15px] font-[600]'>Rs. 99.00</span>
                </div>
            </div>

        </div>
    )
}

export default ProductItem
