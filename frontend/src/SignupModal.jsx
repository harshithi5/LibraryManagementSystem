import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './assets/logo.svg';

function SignupModal({ onClose }) {
    const navigate = useNavigate();

    return (
        <div className="absolute top-0 left-0 w-screen h-full z-50 flex justify-center bg-black/50">
            <div className="bg-white p-10 rounded-lg shadow-xl w-full h-max max-w-md relative top-[25vh]">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-black cursor-pointer"
                >
                    ✕
                </button>
                <div className='flex items-center gap-2 w-full justify-center'>
                    <img src={Logo} className='h-12' />
                    <div className='text-2xl font-semibold'>Zen's Library</div>
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();    
                        onClose();             
                        navigate('/dashboard');
                    }}
                >
                    <h2 className="text-sm mt-5">Username</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full mb-3 px-3 py-2 border rounded"
                    />
                    <h2 className="text-sm">Password</h2>
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full mb-3 px-3 py-2 border rounded"
                    />
                    <button
                        type="submit"
                        className="w-full bg-[#ff7f56] text-white py-2 rounded cursor-pointer"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignupModal;
