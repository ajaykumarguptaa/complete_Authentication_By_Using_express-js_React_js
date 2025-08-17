import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_URI,{
  dbName:"Login_SignUp"
}).then(() => {
  console.log('Database connected successfully');
}).catch((error) => {
  console.error('Database connection error:', error);
});