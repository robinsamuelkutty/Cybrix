import React from 'react';
import { Heart, Eye, ChevronRight } from 'lucide-react';

const Favorites = () => {
  const favoriteOutfits = [
    {
      id: 1,
      name: 'Work Outfit #1',
      items: ['Gray Blazer', 'White Shirt', 'Navy Pants', 'Black Shoes'],
      occasion: 'Office'
    },
    {
      id: 2,
      name: 'Work Outfit #2',
      items: ['Blue Blazer', 'Light Blue Shirt', 'Gray Pants', 'Brown Shoes'],
      occasion: 'Meeting'
    }
  ];

  const favoriteItems = [
    { id: 1, name: 'Black T-shirt', category: 'Casual', color: 'Black' },
    { id: 2, name: 'Navy Blazer', category: 'Formal', color: 'Navy' },
    { id: 3, name: 'White Sneakers', category: 'Casual', color: 'White' },
    { id: 4, name: 'Leather Watch', category: 'Accessories', color: 'Brown' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Favorites</h1>
        <div className="text-sm text-blue-600 font-medium flex items-center">
          Filter
          <ChevronRight className="h-4 w-4 ml-1" />
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-800">Favorite Outfits</h2>
          <span className="text-sm text-blue-600 font-medium">View All</span>
        </div>
        
        {favoriteOutfits.map(outfit => (
          <div key={outfit.id} className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-gradient-to-r from-red-50 to-pink-50 p-3 flex justify-between items-center border-l-4 border-red-400">
              <div>
                <span className="font-medium text-gray-800">{outfit.name}</span>
                <p className="text-xs text-gray-500">{outfit.occasion}</p>
              </div>
              <Heart className="h-5 w-5 text-red-500 fill-current" />
            </div>
            <div className="p-4">
              <div className="flex flex-wrap gap-2">
                {outfit.items.map((item, index) => (
                  <div key={index} className="bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-700">
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-between items-center">
                <button className="text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  See Details
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2 text-sm font-medium transition-colors">
                  Wear This
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-800">Favorite Items</h2>
          <span className="text-sm text-blue-600 font-medium">View All</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {favoriteItems.map(item => (
            <div key={item.id} className="group hover:scale-105 transition-transform duration-200">
              <div className="bg-white h-40 rounded-xl shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gray-200"></div>
                <div className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-1.5 shadow-sm">
                  <Heart className="h-4 w-4 text-red-500 fill-current" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-xs">View details</p>
                </div>
              </div>
              <div className="mt-2">
                <span className="font-medium text-sm">{item.name}</span>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500">{item.category}</p>
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${item.color === 'Black' ? 'bg-black' : 
                                                           item.color === 'Navy' ? 'bg-blue-900' :
                                                           item.color === 'White' ? 'bg-white border border-gray-300' : 
                                                           item.color === 'Brown' ? 'bg-yellow-800' : 'bg-gray-500'}`}></div>
                    <span className="text-xs text-gray-500 ml-1">{item.color}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-6">
        <p className="text-gray-500 text-sm mb-3">Can't find what you're looking for?</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-2 font-medium transition-colors inline-flex items-center">
          <Eye className="h-4 w-4 mr-2" />
          Browse All Items
        </button>
      </div>
    </div>
  );
};

export default Favorites;