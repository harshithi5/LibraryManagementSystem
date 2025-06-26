import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './assets/logo.svg';
import Home from './assets/home.svg';
import Search from './assets/search.svg';
import Shelf from './assets/shelflogo.svg';
import History from './assets/history.svg';

function Left() {
    const navigate = useNavigate();

    return (
        <div className='h-full w-full bg-white p-10 flex flex-col items-center gap-20'>
            {/* Logo */}
            <div className='flex items-center gap-2 w-full h-max'>
                <img src={Logo} className='h-12' />
                <div className='text-2xl font-semibold'>Zen's Library</div>
            </div>

            {/* Navigation Items */}
            <div className='w-full flex flex-col gap-6'>
                {/* Home */}
                <div
                    className="flex items-end gap-3 cursor-pointer group w-max"
                    onClick={() => navigate('/dashboard')}
                >
                    <img src={Home} className="h-6 group-hover:brightness-0 group-hover:grayscale transition-all" />
                    <div className="text-zinc-600 text-lg group-hover:text-black transition-all">Home</div>
                </div>

                {/* Search */}
                <div
                    className="flex items-end gap-3 cursor-pointer group w-max"
                    onClick={() => navigate('/dashboard/search')}
                >
                    <img src={Search} className="h-6 group-hover:brightness-0 group-hover:grayscale transition-all" />
                    <div className="text-zinc-600 text-lg group-hover:text-black transition-all">Search</div>
                </div>

                {/* Shelf */}
                <div className="flex items-end gap-3 cursor-pointer group w-max"
                    onClick={() => navigate('/dashboard/shelf')}
                >
                    <img
                        src={Shelf}
                        className="h-6 transition-all group-hover:brightness-0 group-hover:grayscale"
                    />
                    <div className="text-zinc-600 text-lg group-hover:text-black transition-all">
                        My Shelf
                    </div>
                </div>

                {/* History */}
                <div className="flex items-end gap-3 cursor-pointer group w-max"
                    onClick={() => navigate('/dashboard/history')}
                >
                    <img
                        src={History}
                        className="h-6 transition-all group-hover:brightness-0 group-hover:grayscale"
                    />
                    <div className="text-zinc-600 text-lg group-hover:text-black transition-all">
                        History
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Left;
