import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Grid, Heart, PlusCircle, User } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/wardrobe', icon: Grid, label: 'Wardrobe' },
    { path: '/add-item', icon: PlusCircle, label: 'Add' },
    { path: '/favorites', icon: Heart, label: 'Favorites' },
    { path: '/profile', icon: User, label: 'Profile' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-10">
      <div className="max-w-4xl mx-auto flex justify-around items-center">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center py-3 px-4 ${
              isActive(item.path) ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            {item.path === '/add-item' ? (
              <div className="bg-blue-600 rounded-full p-3 -mt-6 shadow-md">
                <item.icon className="h-6 w-6 text-white" />
              </div>
            ) : (
              <item.icon className={`h-6 w-6 ${isActive(item.path) ? 'text-blue-600' : 'text-gray-500'}`} />
            )}
            <span className={`text-xs mt-1 ${item.path === '/add-item' ? 'mt-2' : ''} ${
              isActive(item.path) ? 'font-medium' : ''
            }`}>
              {item.label}
            </span>
            {isActive(item.path) && (
              <div className="h-1 w-6 bg-blue-600 rounded-full mt-1"></div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;