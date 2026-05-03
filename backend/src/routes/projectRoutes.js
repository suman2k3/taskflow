import express from 'express';
import {
  createProject,
  getAllProjects,
  getProjectById,
  addMember,
  removeMember,
  deleteProject
} from '../controllers/projectController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, createProject);
router.get('/', protect, getAllProjects);
router.get('/:id', protect, getProjectById);
router.post('/:id/members', protect, addMember);
router.delete('/:id/members', protect, removeMember);
router.delete('/:id', protect, deleteProject);

export default router;
