import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Leaf, Info } from 'lucide-react';

const Recommendations = () => {
  const { id } = useParams(); // Get outfit ID from URL

  // Mock data for outfit details with image URLs
  const outfitDetails = [
    {
      id: 1,
      occasion: 'Office',
      items: [
        { name: 'Navy Blazer', image: 'https://via.placeholder.com/150' },
        { name: 'White Button-up', image: 'https://via.placeholder.com/150' },
        { name: 'Khaki Chinos', image: 'https://via.placeholder.com/150' },
        { name: 'Brown Loafers', image: 'https://via.placeholder.com/150' },
      ],
      sustainability: 'All items from sustainable brands',
      description: 'Perfect for a professional setting. Pair with a leather briefcase for a polished look.',
    },
    {
      id: 2,
      occasion: 'Casual Day',
      items: [
        { name: 'Denim Jacket', image: 'https://via.placeholder.com/150' },
        { name: 'Black T-shirt', image: 'https://via.placeholder.com/150' },
        { name: 'Blue Jeans', image: 'https://via.placeholder.com/150' },
        { name: 'White Sneakers', image: 'https://via.placeholder.com/150' },
      ],
      sustainability: '3/4 items can be paired with other outfits',
      description: 'Great for a relaxed day out. Add a cap for a trendy touch.',
    },
  ];

  // Find the outfit based on the ID from the URL
  const outfit = outfitDetails.find((outfit) => outfit.id === parseInt(id));

  if (!outfit) {
    return <div className="p-6 text-center">Outfit not found.</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen pb-24">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          to="/recommendations"
          className="text-blue-600 hover:text-blue-700 flex items-center"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Recommendations
        </Link>
      </div>

      {/* Outfit Title */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        {outfit.occasion} Outfit
      </h1>

      {/* Outfit Items Grid */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
          <Info className="h-5 w-5 mr-2 text-blue-600" />
          Items
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {outfit.items.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded-lg mb-2 shadow-sm"
              />
              <span className="text-sm text-gray-700 text-center">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sustainability Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
          <Leaf className="h-5 w-5 mr-2 text-green-600" />
          Sustainability
        </h2>
        <p className="text-green-600 flex items-center">
          <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
          {outfit.sustainability}
        </p>
      </div>

      {/* Description Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
          <Info className="h-5 w-5 mr-2 text-blue-600" />
          Description
        </h2>
        <p className="text-gray-600">{outfit.description}</p>
      </div>
    </div>
  );
};

export default Recommendations;