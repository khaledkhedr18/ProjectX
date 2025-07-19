import React from 'react';

import { useNavigate } from 'react-router-dom';
import './home.css';
function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-screen flex flex-col  items-center">
          
      <header className="w-full flex justify-between items-center p-4 bg-gray-950 shadow-sm">
        <a href="/"><img src="/vite.svg" alt="React Logo" className="w-10 h-10" /></a>
        <nav className="flex gap-8">
          <a href="/" className="text-gray-50 font-medium ">Home</a>
          <a href="/about" className="text-gray-50 font-medium ">About</a>
          <a href="/services" className="text-gray-50 font-medium ">Services</a>
          <a href="/contact" className="text-gray-50 font-medium ">Contact</a>
        </nav>
        <button 
          className="px-4 py-2  rounded font-medium"
          onClick={() => navigate('/register')}
        >
          Get Started
        </button>

      </header>
      
      <main className=" text-center w-full h-screen flex flex-col">
        <div className="bg-blue-950 max-w-2xl text-gray-10 min-w-full h-2/3 p-8 justify-center items-center flex flex-col">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
          <p className="text-lg mb-6">
            Discover our services and learn more about what we can do for you.
          </p>
          <button 
            className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 font-medium"
            onClick={() => navigate('/about')}
          >
            Learn More
          </button>
        </div>
      </main>
    </div>
  );
}

export default Home;