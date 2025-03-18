import React, { useEffect, useState } from 'react';
import { Search, Plus, X } from 'lucide-react';
import { useDressStore } from '../store/useDressStore';

const AddItemModal = ({ isOpen, onClose }) => {
  const { addItem, isLoading } = useDressStore();
  const [formData, setFormData] = useState({
    type: '',
    material: '',
    colour: '#000000',
    image: null
  });
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await addItem(formData);
    if (success) {
      onClose();
      setFormData({
        type: '',
        material: '',
        colour: '#000000',
        image: null
      });
      setPreviewUrl(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Item</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Type
            </label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., t-shirt, jeans, dress"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Material
            </label>
            <input
              type="text"
              name="material"
              value={formData.material}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., cotton, silk, denim"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Color
            </label>
            <div className="flex items-center">
              <input
                type="color"
                name="colour"
                value={formData.colour}
                onChange={handleInputChange}
                className="h-10 w-10 mr-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="colour"
                value={formData.colour}
                onChange={handleInputChange}
                className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="#000000"
                required
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {previewUrl && (
              <div className="mt-2 h-40 bg-gray-100 flex items-center justify-center rounded">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            )}
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded mr-2 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 flex items-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin h-4 w-4 mr-2 border-t-2 border-b-2 border-white rounded-full"></div>
                  Saving...
                </>
              ) : (
                'Add Item'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Wardrobe = () => {
  const { items, isLoading, getItems } = useDressStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Fetch all dress items when component mounts
  useEffect(() => {
    getItems();
  }, [getItems]);

  // Filter items based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredItems(items);
    } else {
      const filtered = items.filter(item => 
        item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.colour.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [searchTerm, items]);

  // Get unique categories from items
  const getCategories = () => {
    const types = [...new Set(items.map(item => item.type))];
    return types.map(type => ({
      name: type,
      count: items.filter(item => item.type === type).length
    }));
  };

  // Only show categories with items
  const categories = getCategories().filter(category => category.count > 0);

  // Get the base URL for image paths
  const getImageUrl = (imagePath) => {
    // Check if the image path is already a full URL
    if (imagePath && imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // Otherwise, prepend the base URL
    const baseUrl = window.location.origin;
    return `${baseUrl}${imagePath}`;
  };

  // Get recently added items (last 4)
  const recentItems = [...items].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  ).slice(0, 4);

  // In a real app, you'd track most worn items separately
  // This is just a placeholder implementation
  const mostWornItems = [...items].slice(0, 4);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">My Wardrobe</h1>

      <div className="mb-6">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search items..." 
            className="w-full p-4 rounded-xl border border-gray-200 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute left-4 top-4 text-gray-400">
            <Search className="h-5 w-5" />
          </div>
        </div>
      </div>

      {categories.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 mb-8">
          {categories.map(category => (
            <div key={category.name} className="bg-white shadow-sm rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-all cursor-pointer">
              <span className="font-medium text-gray-800">{category.name}</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">{category.count}</span>
            </div>
          ))}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 shadow-sm rounded-xl p-4 flex items-center justify-center hover:shadow-md transition-all cursor-pointer"
               onClick={() => setShowAddModal(true)}>
            <Plus className="h-5 w-5 mr-2" />
            <span className="font-medium">New Item</span>
          </div>
        </div>
      ) : (
        <div className="mb-8">
          <div className="bg-white shadow-sm rounded-xl p-8 text-center">
            <p className="text-gray-500 mb-4">No items in your wardrobe yet.</p>
            <button 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center mx-auto hover:bg-blue-700 transition-colors"
              onClick={() => setShowAddModal(true)}
            >
              <Plus className="h-5 w-5 mr-2" />
              <span>Add Your First Item</span>
            </button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center p-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Recently Added</h2>
            {recentItems.length === 0 ? (
              <p className="text-gray-500">No items added yet.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {recentItems.map(item => (
                  <div key={item._id} className="bg-white shadow-sm rounded-xl hover:shadow-md transition-all overflow-hidden flex flex-col">
                    <div className="h-32 bg-gray-200 relative">
                      <img 
                        src={getImageUrl(item.image)} 
                        alt={`${item.type} - ${item.colour}`}
                        className="w-full h-full object-cover" 
                        
                      />
                    </div>
                    <div className="p-2">
                      <div className="text-sm font-medium text-gray-800">{item.type}</div>
                      <div className="text-xs text-gray-500">{item.material}</div>
                      <div className="flex items-center mt-1">
                        <div 
                          className="w-4 h-4 rounded-full mr-1" 
                          style={{ backgroundColor: item.colour }}
                        ></div>
                        <span className="text-xs text-gray-500">{item.colour}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">All Items</h2>
            {filteredItems.length === 0 ? (
              <p className="text-gray-500">
                {searchTerm ? "No items match your search." : "No items yet."}
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {filteredItems.map(item => (
                  <div key={item._id} className="bg-white shadow-sm rounded-xl hover:shadow-md transition-all overflow-hidden flex flex-col">
                    <div className="h-32 bg-gray-200 relative">
                      <img 
                        src={getImageUrl(item.image)} 
                        alt={`${item.type} - ${item.colour}`}
                        className="w-full h-full object-cover" 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                        }}
                      />
                    </div>
                    <div className="p-2">
                      <div className="text-sm font-medium text-gray-800">{item.type}</div>
                      <div className="text-xs text-gray-500">{item.material}</div>
                      <div className="flex items-center mt-1">
                        <div 
                          className="w-4 h-4 rounded-full mr-1" 
                          style={{ backgroundColor: item.colour }}
                        ></div>
                        <span className="text-xs text-gray-500">{item.colour}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Add New Item Button */}
      <div className="fixed bottom-6 right-6">
        <button 
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>

      {/* Add Item Modal */}
      <AddItemModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)} 
      />
    </div>
  );
};

export default Wardrobe;