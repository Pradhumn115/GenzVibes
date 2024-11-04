import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { montera, aneklatin, manjari } from '../fonts.jsx'
import { CgCoffee } from "react-icons/cg";
import { RiInstagramFill } from "react-icons/ri"
import { BiSolidCoffee } from "react-icons/bi";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { PiBooks } from "react-icons/pi";
import { PiBooksFill } from "react-icons/pi";

const Navbar = () => {
    return (
        
        <nav className='relative px-4 py-2 flex justify-between items-center'>

           <Link href={`/`}>
                <div className='flex items-center gap-[1vw] '>
                    <Image
                        src={`/Images/icon.png`}
                        width={40}
                        height={40}
                        alt={`logo`}
                        className='cursor-pointer w-[30px] sm:w-[40px]'
                    />
                    <h1 className={`${montera.className} text-[5vw] lg:text-[1.3vw] md:text-[2.5vw] pt-2 cursor-pointer`}>GenzVibes</h1>
                    <h2 className={aneklatin.className}>&nbsp;&nbsp;&nbsp;AI POWERED</h2>

                </div>
            </Link>

            <div className='hidden p-2 sm:flex items-center  sm:gap-[2vw] md:gap-[6vw] text-[1.4vw] '>

                <Link href={`/m1`} className={`${aneklatin.className} text-[3vw] md:text-[1.5vw] lg:text-[1vw] items-center flex sm:gap-2 cursor-pointer hover:underline-offset-4 hover:underline`}>
                    <PiBooks className={`text-[8.5vw] sm:text-[4.5vw] lg:text-[1.6vw] md:text-[3vw] hover:scale-110 cursor-pointer  lg:text-red-400 `} />
                    <h3 className='hidden md:inline-block'>Manit Study Material</h3>
                </Link>

                <a target='_blank' href="https://buymeacoffee.com/genzvibes0n">
                    <div className={`flex ${aneklatin.className} text-[3vw] md:text-[1.5vw]  lg:text-[1vw] font-medium items-center gap-[1vw]`}>
                        <BiSolidCoffee className='text-[8.5vw] lg:text-[1.6vw] md:text-[3vw] sm:text-[4.5vw] hover:scale-110 cursor-pointer  lg:text-yellow-300' />
                        <h2 className='hidden md:block  cursor-pointer hover:underline-offset-4 hover:underline '>Support Us</h2>

                    </div>
                </a>

                <div className='sm:flex items-center gap-[2vw] lg:gap-[1.5vw] text-[8vw] sm:text-[4.5vw] md:text-[3vw] md:gap-[1vw] lg:text-[1.4vw]'>
                    <a target='_blank' href={`https://lockupaccede.com/m1nqaan28?key=7ea5086b14e975d18279fa140b27fd87`}><RiInstagramFill className='text-[8.5vw] sm:text-[4.5vw] md:text-[3.3vw] lg:text-[1.6vw] hover:scale-110 cursor-pointer' /></a>
                    <a target='_blank' href={`https://lockupaccede.com/m1nqaan28?key=7ea5086b14e975d18279fa140b27fd87`}><FaSquareFacebook className='hover:scale-110 cursor-pointer' /></a>
                    <a target='_blank' href={`https://lockupaccede.com/m1nqaan28?key=7ea5086b14e975d18279fa140b27fd87`}><FaSquareXTwitter className='hover:scale-110 cursor-pointer' /></a>

                </div>

            </div>


            <div className='absolute top-[60vh] right-0 p-1 sm:hidden items-center gap-[6vw] text-[1.4vw] bg-white text-black z-10'>
                
                 <Link href={`/m1`} className={`${aneklatin.className} text-[3vw] md:text-[1.5vw] lg:text-[1vw] items-center flex sm:gap-2 cursor-pointer hover:underline-offset-4 hover:underline`}><PiBooksFill className={`text-[8.5vw] lg:text-[1.6vw] md:text-[3vw] hover:scale-110 cursor-pointer  lg:text-red-400 `} /></Link>

                <a target='_blank' href="https://buymeacoffee.com/genzvibes0n">
                    <div className={`flex ${aneklatin.className} text-[3vw] sm:text-[1vw] font-medium items-center gap-[1vw]`}>
                        <BiSolidCoffee className='text-[8.5vw] sm:text-[1.6vw] hover:scale-110 cursor-pointer text- sm:text-yellow-300' />
                        <h2 className='hidden sm:block cursor-pointer hover:underline-offset-4 hover:underline '>Support Us</h2>

                    </div>
                </a>

                <div className='sm:flex items-center gap-[2vw] sm:gap-[1.5vw] text-[8vw] sm:text-[1.4vw]'>
                    <a target='_blank' href={`https://lockupaccede.com/m1nqaan28?key=7ea5086b14e975d18279fa140b27fd87`}><RiInstagramFill className='text-[8.5vw] sm:text-[1.6vw] hover:scale-110 cursor-pointer' /></a>
                    <a target='_blank' href={`https://lockupaccede.com/m1nqaan28?key=7ea5086b14e975d18279fa140b27fd87`}><FaSquareFacebook className='hover:scale-110 cursor-pointer' /></a>
                    <a target='_blank' href={`https://lockupaccede.com/m1nqaan28?key=7ea5086b14e975d18279fa140b27fd87`}><FaSquareXTwitter className='hover:scale-110 cursor-pointer' /></a>

                </div>

            </div>

        </nav>

    )
}

export default Navbar