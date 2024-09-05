import React from 'react';
import { Link } from '@tanstack/react-router';

export default function Navigation () {
  return (
    <nav className='bg-[#295954] p-5 text-white'>
      <Link className='m-2 font-medium text-lg' to="/">Home</Link>
      <Link className='m-2 font-medium text-lg' to="/about">About</Link>
      <Link className='m-2 font-medium text-lg' to="/login">Log in</Link>
      <Link className='m-2 font-medium text-lg' to="/dashboard">Dashboard</Link>
    </nav>
  );
};