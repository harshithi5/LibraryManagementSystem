import React from 'react'
import Logo from './assets/logo.svg'


function Navbar01({ onLoginClick , onSignupClick} ) {
    return (
        <div className='flex h-20 bg-white w-full items-center justify-around'>

            {/* logo div */}
            <div className='flex items-end gap-2'>
                <img src={Logo} className='h-12' />
                <div className='text-2xl font-semibold'>Zen's Library</div>
            </div>

            {/* links div */}
            <div className='flex text-md gap-20 h-12 items-end justify-center'>
                <div className='cursor-pointer'>Home</div>
                <div className='cursor-pointer'>About</div>
                <div className='cursor-pointer'>Vision</div>
                <div className='cursor-pointer'>Contact Us</div>
            </div>

            {/* buttons div */}
            <div className='flex h-12 items-end gap-3'>
                <button onClick={onLoginClick} className=" text-[#5352ed] px-4 py-2 rounded font-medium h-10 cursor-pointer">
                    Login
                </button>
                <button onClick={onSignupClick} className="bg-[#ff7f56] text-white px-4 py-2 rounded-lg font-medium h-10 cursor-pointer">
                    Sign Up
                </button>
            </div>
        </div>
    )
}

export default Navbar01
