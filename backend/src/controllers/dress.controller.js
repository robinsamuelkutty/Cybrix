import Dress from '../models/dress.model.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

// Set up file storage configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '../uploads');

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

// Initialize multer upload
export const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
  fileFilter: fileFilter
});

// Controller methods
export const createDress = async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const { type, material, colour } = req.body;
    
    // Create new dress item
    const newDress = new Dress({
      type,
      material,
      colour,
      image: `/uploads/${req.file.filename}`,
      user: req.user._id, // Assuming user is attached by auth middleware
    });

    const savedDress = await newDress.save();
    res.status(201).json(savedDress);
  } catch (error) {
    console.error('Error creating dress:', error);
    
    // Delete uploaded file if there was an error
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }
    
    res.status(500).json({ 
      message: 'Error creating dress item',
      error: error.message 
    });
  }
};

export const getAllDressesByUser = async (req, res) => {
  try {
    const dresses = await Dress.find({ user: req.user._id });
    res.status(200).json(dresses);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching dress items',
      error: error.message 
    });
  }
};

export const getDressById = async (req, res) => {
  try {
    const dress = await Dress.findOne({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!dress) {
      return res.status(404).json({ message: 'Dress item not found' });
    }
    
    res.status(200).json(dress);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching dress item',
      error: error.message 
    });
  }
};

export const updateDress = async (req, res) => {
  try {
    const { type, material, colour } = req.body;
    
    // Find the dress to update
    const dress = await Dress.findOne({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!dress) {
      // If dress doesn't exist or doesn't belong to user
      return res.status(404).json({ message: 'Dress item not found' });
    }
    
    // Update fields
    dress.type = type || dress.type;
    dress.material = material || dress.material;
    dress.colour = colour || dress.colour;
    
    // If new image is uploaded
    if (req.file) {
      // Delete old image if it exists
      const oldImagePath = path.join(__dirname, '..', dress.image);
      try {
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      } catch (err) {
        console.error('Error deleting old image:', err);
      }
      
      // Update with new image path
      dress.image = `/uploads/${req.file.filename}`;
    }
    
    const updatedDress = await dress.save();
    res.status(200).json(updatedDress);
  } catch (error) {
    // Delete uploaded file if there was an error
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }
    
    res.status(500).json({ 
      message: 'Error updating dress item',
      error: error.message 
    });
  }
};

export const deleteDress = async (req, res) => {
  try {
    const dress = await Dress.findOne({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!dress) {
      return res.status(404).json({ message: 'Dress item not found' });
    }
    
    // Delete image file
    const imagePath = path.join(__dirname, '..', dress.image);
    try {
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    } catch (err) {
      console.error('Error deleting image:', err);
    }
    
    // Delete record from database
    await Dress.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Dress item deleted successfully' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error deleting dress item',
      error: error.message 
    });
  }
};