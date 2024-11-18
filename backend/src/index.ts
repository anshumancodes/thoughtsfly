import app from "./app.js";
import dotenv from 'dotenv';
dotenv.config(
    {
       path:"./.env"
    }
);

import { connectDb } from './db/dbConnect.js';

try {
    connectDb();
    app.listen(process.env.DEV_PORT||8002, () => {
        console.log(`Server is running on port ${process.env.DEV_PORT||8002}`);
      });
      
      
} catch (error) {
    console.log('Error connectiing to Database', error);
    
}



