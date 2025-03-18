import React, { useState } from 'react';
import { Upload, Camera, Plus } from 'lucide-react';
import { useDressStore } from "../store/useDressStore";

const AddItem = () => {
  const [formData, setFormData] = useState({
    type: '',
    material: '',
    colour: '#000000',
  });
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  // Get the addItem function from the dress store
  const addItem = useDressStore(state => state.addItem);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Please select an image');
      return;
    }

    setLoading(true);
    
    try {
      // Create the item data object
      const itemData = {
        ...formData,
        image: selectedFile
      };

      // Use the store's addItem function
      const success = await addItem(itemData);

      if (success) {
        // Reset form
        setFormData({
          type: '',
          material: '',
          colour: '#000000',
        });
        setSelectedFile(null);
        setPreviewUrl(null);
      }
    } catch (error) {
      console.error('Error adding item:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen pb-20">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Add New Item</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white border-2 border-dashed border-blue-200 rounded-xl p-10 mb-8 flex flex-col items-center justify-center shadow-sm">
          {previewUrl ? (
            <div className="mb-4 relative">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="h-64 w-auto object-contain rounded-lg"
              />
              <button 
                type="button"
                onClick={() => {
                  setSelectedFile(null);
                  setPreviewUrl(null);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
              >
                ×
              </button>
            </div>
          ) : (
            <>
              <div className="bg-blue-100 p-5 rounded-full mb-5">
                <Upload className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-gray-600 mb-4 font-medium">Upload photo or use camera</p>
            </>
          )}
          
          <div className="flex space-x-4">
            <label className="bg-blue-600 text-white rounded-lg px-5 py-3 text-sm font-medium hover:bg-blue-700 transition-colors flex items-center cursor-pointer">
              <Camera className="h-4 w-4 mr-2" /> Take Photo
              <input 
                type="file" 
                accept="image/*" 
                capture="environment"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            <label className="bg-gray-200 rounded-lg px-5 py-3 text-sm font-medium hover:bg-gray-300 transition-colors flex items-center cursor-pointer">
              <Upload className="h-4 w-4 mr-2" /> Upload
              <input 
                type="file" 
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="mb-5">
            <label className="block text-sm font-medium mb-2 text-gray-700">Item Type</label>
            <input 
              type="text" 
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              placeholder="Garments type"
              required
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium mb-2 text-gray-700">Color</label>
            <div className="flex items-center space-x-3">
              <input 
                type="color" 
                name="colour"
                value={formData.colour}
                onChange={handleChange}
                className="w-10 h-10 rounded cursor-pointer"
              />
              <input 
                type="text" 
                name="colour"
                value={formData.colour}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="#000000"
                pattern="^#([A-Fa-f0-9]{6})$"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-700">Material</label>
            <input 
              type="text" 
              name="material"
              value={formData.material}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              placeholder="Enter material"
              required
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className={`bg-blue-600 text-white rounded-lg px-4 py-3 font-medium w-full hover:bg-blue-700 transition-colors shadow-sm ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Adding...' : 'Add to Wardrobe'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;