import React from 'react'
import { montera, aneklatin, manjari } from '../fonts.jsx'


const Footer = () => {
    return (
        <div>
            <footer className={`absolute bottom-0 w-full flex items-center ${aneklatin.className} text-white h-[4vh] justify-between z-30 md:text-[1.9vw] lg:text-[1vw] text-[2.5vw]`}>
                <p className='px-5'>Upcoming - Books, Softwares - PC | MAC, &nbsp;Adding Movies, And Much More</p>
                <p>Version: beta-1.0.0</p>
            </footer>
        </div>
    )
}

export default Footer