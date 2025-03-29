const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');



dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Use the user routes
app.use('/api/users', userRoutes);




mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



// require('dotenv').config()

// const express = require('express')
// const mongoose = require('mongoose')
// const workoutRoutes = require('./routes/workouts')

// //express app
// const app = express();

// //middleware
// app.use(express.json())

// app.use((req, res, next) => {
//     console.log(req.path, req.method)
//     next()
// })

// //routes
// app.use('/api/', workoutRoutes)

// // //routes
// // app.get('/', (req, res) => {
// //     res.json({ message: 'welcome to the app'});
// // });

// //connected to db
// mongoose.connect(process.env.MONGO_URL)
//   .then(() => {
//     //listens to port
//    app.listen(process.env.PORT, () => {
//      console.log(' connected to db and listened to port', process.env.PORT);
// })
// console.log('connected to db');

//   })
//   .catch((error) => {
//     console.log(error)
//   });

// //listens to port
// // app.listen(process.env.PORT, () => {
// //     console.log('listened to port', process.env.PORT);
// // })

           

// //npm run dev  