import express from 'express';
import {
  createTask,
  getTasksByProject,
  updateTask,
  getTaskStats,
  deleteTask
} from '../controllers/taskController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, createTask);
router.get('/project/:projectId', protect, getTasksByProject);
router.put('/:id', protect, updateTask);
router.delete('/:id', protect, deleteTask);
router.get('/stats/:projectId', protect, getTaskStats);

export default router;
