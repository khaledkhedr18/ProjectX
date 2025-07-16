const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  getFilteredTasks,
  getTaskStats,
} = require('../controllers/taskController');

// Apply protect middleware to all routes
router.use(protect);

// Statistics route (must be before /:id routes)
router.get('/stats', getTaskStats);

// Filtered tasks route
router.get('/filter', getFilteredTasks);

// Basic CRUD routes
router.route('/').get(getTasks).post(createTask);
router.route('/:id').get(getTask).put(updateTask).delete(deleteTask);

// Status management
router.patch('/:id/status', updateTaskStatus);

module.exports = router;
