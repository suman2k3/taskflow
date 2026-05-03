import Project from '../models/Project.js';

export const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Validation
    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a project title'
      });
    }

    const project = await Project.create({
      title,
      description,
      createdBy: req.user._id,
      members: [req.user._id]
    });

    const populatedProject = await project.populate(['createdBy', 'members']);

    res.status(201).json({
      success: true,
      project: populatedProject
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    // Admins see all projects, members see only their projects
    const query = req.user.role === 'admin' ? {} : { members: req.user._id };
    const projects = await Project.find(query).populate(['createdBy', 'members']);

    res.status(200).json({
      success: true,
      count: projects.length,
      projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate(['createdBy', 'members']);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check if user is a member
    if (!project.members.some(member => member._id.toString() === req.user._id.toString())) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this project'
      });
    }

    res.status(200).json({
      success: true,
      project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const addMember = async (req, res) => {
  try {
    const { memberId } = req.body;

    if (!memberId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a member ID'
      });
    }

    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check if user is admin or project creator
    if (project.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to add members to this project'
      });
    }

    // Check if member already exists
    if (project.members.includes(memberId)) {
      return res.status(400).json({
        success: false,
        message: 'User is already a member of this project'
      });
    }

    project.members.push(memberId);
    await project.save();

    const populatedProject = await project.populate(['createdBy', 'members']);

    res.status(200).json({
      success: true,
      project: populatedProject
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const removeMember = async (req, res) => {
  try {
    const { memberId } = req.body;

    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check if user is admin or project creator
    if (project.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to remove members from this project'
      });
    }

    project.members = project.members.filter(id => id.toString() !== memberId);
    await project.save();

    const populatedProject = await project.populate(['createdBy', 'members']);

    res.status(200).json({
      success: true,
      project: populatedProject
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check if user is admin or project creator
    if (project.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this project'
      });
    }

    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
