const express = require('express');
const {createWorkout, 
    getAllWorkouts, 
    getOne, 
    deleteWorkout, 
    updateWorkout} = require('../controllers/workoutControllers');

const router = express.Router()

//GET all workouts
router.get('/', getAllWorkouts);

//GET single workout
router.get('/:id', getOne)

//POST a new workout
router.post('/', createWorkout )


//DELETE a workout
router.delete('/:id', deleteWorkout)

//UPDATE a workout
router.patch('/:id', updateWorkout)
module.exports = router

// //GET all workouts
// router.get('/', (req, res) => {
//     res.json({message: 'GET all workouts'})

// });

// //GET single workout
// router.get('/:id', (req, res) => {
//     res.json( { message: 'GET one workout'})
// })