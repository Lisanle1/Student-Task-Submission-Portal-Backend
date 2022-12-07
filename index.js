const express= require('express');
require('dotenv').config();
const cors=require('cors')
const bodyParser = require( 'body-parser' );
const connectDB =require('./config/connect')

//importing all routes
const userRouter=require('./routes/user.routes');
const sessionRouter=require('./routes/session.routes')
const additionalSessionRouter=require('./routes/additionalSession.routes')
const taskRouter=require('./routes/task.routes')
const queryRouter=require('./routes/query.routes')
const webcodeRouter=require('./routes/webcode.routes')
const capstoneRouter=require('./routes/capstoneProject.routes')
const leaveRouter=require('./routes/leave.routes')

//instantiates express.
const app=express();
//cors policy
app.use(cors())

//Establishing DB Connection
connectDB();  

//body-parser middleware
app.use(bodyParser.urlencoded({extended:false})); // to parse URL encoded data
app.use(bodyParser.json()); // to parse json data

//connection success response
app.get('/',(req,res)=>{
    res.send("Hi! Welcome to student-task-portal API....") 
});

//all routes
app.use('/user',userRouter);
app.use('/sessions', sessionRouter)
app.use('/additionalSessions', additionalSessionRouter)
app.use('/tasks', taskRouter)
app.use('/queries', queryRouter)
app.use('/webcodes', webcodeRouter)
app.use('/capstone', capstoneRouter)
app.use('/leaves', leaveRouter)


//set port to listening
const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is listening on the port: ${PORT}`)
})