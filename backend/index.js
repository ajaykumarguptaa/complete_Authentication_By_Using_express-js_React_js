import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import './Models/db.js'; // Ensure the database connection is established
import bodyParser from 'body-parser'; // Middleware for parsing JSON and URL-encoded data
// Import the CORS middleware package
// CORS (Cross-Origin Resource Sharing) allows web applications running at one origin 
// to access resources from a different origin. This is necessary when your frontend 
// and backend are running on different domains/ports
import cors from 'cors';
import Authrouter from './Router/AuthRouter.js'; // Import the authentication router
import ProductRouter from './Router/ProductRouter.js';

const app = express();




app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(bodyParser.json());
app.use(cors());

app.use("/auth", Authrouter);
app.use("/products", ProductRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});
