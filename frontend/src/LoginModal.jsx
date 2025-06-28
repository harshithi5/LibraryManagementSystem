import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './assets/logo.svg';

function LoginModal({ onClose }) {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        try {
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                onClose();
                navigate('/dashboard');
            } else {
                setErrorMsg(data.message || 'Login failed');
            }
        } catch (err) {
            setErrorMsg('Server error while logging in');
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
                <div className="flex items-center gap-2 w-full justify-center">
                    <img src={Logo} className="h-12" />
                    <div className="text-2xl font-semibold">Zen's Library</div>
                </div>
                <form onSubmit={handleSubmit}>
                    <h2 className="text-sm mt-5">Email</h2>
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mb-3 px-3 py-2 border rounded"
                    />
                    <h2 className="text-sm">Password</h2>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mb-3 px-3 py-2 border rounded"
                    />
                    {errorMsg && (
                        <p className="text-red-500 text-sm mb-3">{errorMsg}</p>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-[#ff7f56] text-white py-2 rounded cursor-pointer"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginModal;
