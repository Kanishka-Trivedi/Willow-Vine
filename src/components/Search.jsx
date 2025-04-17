import React from 'react'
import Button from '@mui/material/Button';
import { IoSearchSharp } from "react-icons/io5";



const Search = () => {
  return (
    <div className='searchBox w-[100%] h-[50px] bg-[#e5e5e5] rounded-[5px] relative p-2'>
      <input type='text' placeholder='Search for products...' className='w-full h-[39px] focus:outline-none bg-inherit pb-2 text-[16px] placeholder:text-[#373737]'/>
      <Button className='!absolute top-[6px] right-[5px] z-50 !w-[37px] !min-w-[37px] h-[40px] !rounded-full !text-black'><IoSearchSharp className='text-[#4e4e4e] text-[20px]' /></Button>
    </div>
  )
}

export default Search
