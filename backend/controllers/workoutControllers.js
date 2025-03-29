const mongoose  = require('mongoose');
const Workout = require('../models/modelWorkouts');

//get all worlouts

const getAllWorkouts = async (req, res) => {
    try{
        const gettingAll = await Workout.find({}).sort({createdAt: -1})
        res.status(200).json(gettingAll)

    }catch(error){
        res.status(400).json({error: error.message})

    }
}
//get one workout

const getOne = async (req, res) => {
    const { id } = req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error:'no such workout'})
        }

        const gettingOne = await Workout.findById(id)

        if(!Workout) {
            return res.status(200).json({error: 'no such workout'})
        }

        res.status(200).json(gettingOne)

       
    
}

//create a workout

const createWorkout = async (req, res) => {
    const {title, reps, load} = req.body

    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }
    if(!load) {
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields})
    }

    try{
        const Createing = await Workout.create({title, reps, load})
        res.status(200).json(Createing)

    }catch(error){
        res.status(400).json({error: error.message})

    }
}

//delete a workout

const deleteWorkout = async (req, res) => {

    const { id } = req.params

    if ( !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such workout'})
    }
    const deleteOne = await Workout.findOneAndDelete({_id:id})

    if(!deleteOne) {
        return res.status(400).json({error:' no such workout'})
    }
    res.status(200).json(deleteOne)

}
//update a workout

const updateWorkout = async(req, res) => {

    const { id } = req.params

    if ( !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such workout'})
    }

    const updatedOne = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!updatedOne){
        return res.status(400).json({ error: 'no such workout'})
    }
    res.status(200).json({ updatedOne})

}



module.exports = { createWorkout, getAllWorkouts, getOne, deleteWorkout, updateWorkout}



  