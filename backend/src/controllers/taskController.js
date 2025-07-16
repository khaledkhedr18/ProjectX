const Task = require('../models/Task');

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  try {
    const { title, description, priority, deadline, duration } = req.body;

    // Use the authenticated user's ID from the JWT token
    const task = await Task.create({
      title,
      description,
      priority,
      deadline,
      duration,
      user: req.user.id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({
      message: 'Error creating task',
      error: error.message,
    });
  }
};

// @desc    Get all tasks for the authenticated user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    // Only get tasks belonging to the authenticated user
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching tasks',
      error: error.message,
    });
  }
};

// @desc    Get a single task
// @route   GET /api/tasks/:id
// @access  Private
const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id, // Ensure user can only access their own tasks
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching task',
      error: error.message,
    });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({
      message: 'Error updating task',
      error: error.message,
    });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting task',
      error: error.message,
    });
  }
};

// @desc    Update task status
// @route   PATCH /api/tasks/:id/status
// @access  Private
const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Validate status
    const validStatuses = ['pending', 'in-progress', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: 'Invalid status. Must be: pending, in-progress, or completed',
      });
    }

    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.status = status;

    // If marking as completed, set completion timestamp
    if (status === 'completed') {
      task.completedAt = new Date();
    } else {
      task.completedAt = undefined;
    }

    await task.save();

    res.json({
      message: `Task marked as ${status}`,
      task,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error updating task status',
      error: error.message,
    });
  }
};

// @desc    Get tasks with filtering and sorting
// @route   GET /api/tasks/filter
// @access  Private
const getFilteredTasks = async (req, res) => {
  try {
    const {
      status,
      priority,
      sortBy = 'createdAt',
      order = 'desc',
      search,
      page = 1,
      limit = 10,
    } = req.query;

    // Build filter object
    const filter = { user: req.user.id };

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = order === 'asc' ? 1 : -1;

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute query
    const tasks = await Task.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Task.countDocuments(filter);

    res.json({
      tasks,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalTasks: total,
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching filtered tasks',
      error: error.message,
    });
  }
};

// @desc    Get task statistics
// @route   GET /api/tasks/stats
// @access  Private
const getTaskStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const stats = await Task.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    const priorityStats = await Task.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 },
        },
      },
    ]);

    const totalTasks = await Task.countDocuments({ user: userId });
    const completedTasks = await Task.countDocuments({
      user: userId,
      status: 'completed',
    });

    const completionRate =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    res.json({
      totalTasks,
      completedTasks,
      completionRate,
      statusBreakdown: stats,
      priorityBreakdown: priorityStats,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching task statistics',
      error: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  updateTaskStatus, // ✅ New
  getFilteredTasks, // ✅ New
  getTaskStats, // ✅ New
};
