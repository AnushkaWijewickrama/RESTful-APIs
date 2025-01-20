import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config(); // Load environment variables

const app: Application = express();
const port: number = parseInt(process.env.PORT || '3000', 10);

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://kushananushka6060:eIQlOhbW31pu93xs@cluster0.hedhj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => console.error(`Could not connect to database server`, err));

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req: Request, res: Response): any => {
  return res.send('Anushka Wijewickrama');
});


// Export the app for testing or other purposes
export default app;
