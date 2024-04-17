import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-around bg-gray-800 p-4">
      <div className="flex items-center">
        <Link to="/">
        <span className="text-white font-semibold text-lg">Ambuj Singh</span>
        </Link>
      </div>
      <div className="flex justify-between items-center gap-14">
        <Link to="/" className="text-white mr-4 hover:text-gray-300">Home</Link>
        <Link to="/about" className="text-white mr-4 hover:text-gray-300">About</Link>
        <Link to="/contact" className="text-white hover:text-gray-300">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;
