import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './assets/logo.svg';

function SignupModal({ onClose }) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        password: '',
        email: '',
        address: '',
        contact: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token); // Store JWT
                onClose();
                navigate('/dashboard');
            } else {
                alert(data.message || 'Signup failed');
            }
        } catch (err) {
            alert('Error: ' + err.message);
        }
    };

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
                <form onSubmit={handleSubmit}>
                    <h2 className="text-sm mt-5">Username</h2>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Username"
                        className="w-full mb-3 px-3 py-2 border rounded"
                    />
                    <h2 className="text-sm">Password</h2>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full mb-3 px-3 py-2 border rounded"
                    />
                    <h2 className="text-sm">Email ID</h2>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email ID"
                        className="w-full mb-3 px-3 py-2 border rounded"
                    />
                    <h2 className="text-sm">Current Address</h2>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Address"
                        className="w-full mb-3 px-3 py-2 border rounded"
                    />
                    <h2 className="text-sm">Contact Number</h2>
                    <input
                        type="text"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        placeholder="Contact Number"
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
