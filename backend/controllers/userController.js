const mongoose  = require('mongoose');

const User = require('../models/User'); // Import the correct model

const getAllUsers = async (req, res) => {
    try {
        const gettingAll = await User.find({}).sort({ createdAt: -1 }); // ✅ FIXED
        res.status(200).json(gettingAll);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Fetch a single user by ID
const getUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        
        console.log("Received User ID:", userId);

        // Check if the provided ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid user ID format" });
        }

        const user = await User.findById(userId);
        console.log("Found User:", user);
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


//create 

const createUser = async (req, res) => {
    const {name, bio, teachingSkills, learningSkills} = req.body   //profilePicture,

    let emptyFields = []

    if(!name) {
        emptyFields.push('name')
    }
    if(!bio) {
        emptyFields.push('bio')
    }
    if(!teachingSkills){
        emptyFields.push('reps')
    }
    if(!learningSkills){
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields})
    }

    try{
        const Createing = await User.create({name, bio, teachingSkills, learningSkills})
        res.status(200).json(Createing)

    }catch(error){
        res.status(400).json({error: error.message})

    }
}


module.exports = { getAllUsers, getUserById, createUser };

// const getAllUsers = async (req, res) => {
//     try{
//         const gettingAll = await User.find({}).sort({createdAt: -1})
//         res.status(200).json(gettingAll)

//     }catch(error){
//         res.status(400).json({error: error.message})

//     }
// }

// module.exports = { getAllUsers}