import Task from '../models/Task.js';
import Project from '../models/Project.js';

export const createTask = async (req, res) => {
  try {
    const { title, description, projectId, assignedTo, dueDate } = req.body;

    // Validation
    if (!title || !projectId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title and projectId'
      });
    }

    // Check if project exists and user is a member
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    if (!project.members.includes(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to create tasks in this project'
      });
    }

    const task = await Task.create({
      title,
      description,
      projectId,
      assignedTo,
      dueDate,
      createdBy: req.user._id
    });

    const populatedTask = await task.populate(['assignedTo', 'createdBy']);

    res.status(201).json({
      success: true,
      task: populatedTask
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    // Check if project exists and user is a member
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    if (!project.members.includes(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view tasks in this project'
      });
    }

    const tasks = await Task.find({ projectId }).populate(['assignedTo', 'createdBy']);

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, assignedTo, dueDate } = req.body;

    let task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Check authorization
    const isTaskCreator = task.createdBy.toString() === req.user._id.toString();
    const isTaskAssignee = task.assignedTo && task.assignedTo.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isTaskCreator && !isAdmin && !isTaskAssignee) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this task'
      });
    }

    // Members can only update their own tasks
    if (req.user.role === 'member' && !isTaskCreator && !isTaskAssignee) {
      return res.status(403).json({
        success: false,
        message: 'Members can only update their assigned tasks'
      });
    }

    task = await Task.findByIdAndUpdate(
      id,
      { title, description, status, assignedTo, dueDate },
      { new: true, runValidators: true }
    ).populate(['assignedTo', 'createdBy']);

    res.status(200).json({
      success: true,
      task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getTaskStats = async (req, res) => {
  try {
    const { projectId } = req.params;

    // Check if project exists and user is a member
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    if (!project.members.includes(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view tasks in this project'
      });
    }

    const tasks = await Task.find({ projectId });
    const now = new Date();

    const stats = {
      total: tasks.length,
      completed: tasks.filter(t => t.status === 'Done').length,
      inProgress: tasks.filter(t => t.status === 'In Progress').length,
      pending: tasks.filter(t => t.status === 'Todo').length,
      overdue: tasks.filter(t => t.dueDate && t.dueDate < now && t.status !== 'Done').length
    };

    res.status(200).json({
      success: true,
      stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    let task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Check authorization - only admin or task creator can delete
    const isTaskCreator = task.createdBy.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isTaskCreator && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this task'
      });
    }

    await Task.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
