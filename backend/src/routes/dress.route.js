import express from 'express';
import { 
  createDress, 
  getAllDressesByUser, 
  getDressById, 
  updateDress, 
  deleteDress, 
  upload 
} from '../controllers/dress.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';// Assuming you have auth middleware

const router = express.Router();

// Routes
router.post('/', protectRoute, upload.single('image'), createDress);
router.get('/', protectRoute, getAllDressesByUser);
router.get('/:id', protectRoute, getDressById);
router.put('/:id', protectRoute, upload.single('image'), updateDress);
router.delete('/:id', protectRoute, deleteDress);

export default router;