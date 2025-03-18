import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useDressStore = create((set, get) => ({
  items: [],
  isLoading: false,
  selectedItem: null,
  
  // Fetch all dress items
  getItems: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/dress");
      console.log("data", res.data);
      set({ items: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch wardrobe items");
    } finally {
      set({ isLoading: false });
    }
  },
  
  // Add a new dress item
  addItem: async (itemData) => {
    set({ isLoading: true });
    try {
      // Create form data to send
      const data = new FormData();
      if (itemData.image) {
        data.append('image', itemData.image);
      }
      data.append('type', itemData.type);
      data.append('material', itemData.material);
      data.append('colour', itemData.colour);

      // Send data to backend
      const response = await axiosInstance.post('/dress', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 201) {
        // Add the new item to the items array
        set({ items: [...get().items, response.data] });
        toast.success('Item added successfully!');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error adding item:', error);
      toast.error(error.response?.data?.message || 'Failed to add item. Please try again.');
      return false;
    } finally {
      set({ isLoading: false });
    }
  },
  
  // Get a specific item by ID
  getItemById: async (itemId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/dress/${itemId}`);
      set({ selectedItem: res.data });
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch item");
      return null;
    } finally {
      set({ isLoading: false });
    }
  },
  
  // Update an existing item
  updateItem: async (itemId, itemData) => {
    set({ isLoading: true });
    try {
      const data = new FormData();
      if (itemData.image && itemData.image instanceof File) {
        data.append('image', itemData.image);
      }
      data.append('type', itemData.type);
      data.append('material', itemData.material);
      data.append('colour', itemData.colour);

      const response = await axiosInstance.put(`/dress/${itemId}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Update the item in the items array
      const updatedItems = get().items.map((item) =>
        item._id === itemId ? response.data : item
      );
      
      set({ items: updatedItems });
      toast.success('Item updated successfully!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update item.');
      return false;
    } finally {
      set({ isLoading: false });
    }
  },
  
  // Delete an item
  deleteItem: async (itemId) => {
    try {
      await axiosInstance.delete(`/dress/${itemId}`);
      const updatedItems = get().items.filter((item) => item._id !== itemId);
      set({ items: updatedItems });
      toast.success('Item removed from wardrobe');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete item');
      return false;
    }
  },
  
  // Set selected item (for editing or viewing details)
  setSelectedItem: (item) => set({ selectedItem: item }),
  
  // Clear selected item
  clearSelectedItem: () => set({ selectedItem: null }),
}));