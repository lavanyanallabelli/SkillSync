
const express = require('express');
const router = express.Router();
// const User = require('../models/User');
const { 
    getAllUsers, getUserById, createUser} = require('../controllers/userController');

//GET all users
router.get('/', getAllUsers);
 
//get user by ID
router.get('/:userId', getUserById);

//create
router.post('/', createUser);

// Get a user profile by ID
// router.get('/:userId', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching user data' });
//   }
// });

module.exports = router;
