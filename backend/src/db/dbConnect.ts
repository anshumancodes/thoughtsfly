import mongoose from 'mongoose';

const connectDb=async () => {

    try {
      
        const connectionInstance= await mongoose.connect(`${process.env.MONGODB_CONNECTION_URI}${process.env.DB_NAME}`);

        console.log(`\n mongodb sucessfully connected! DB Host = ${connectionInstance.connection.host}`)
       
    } catch (error) {
        console.log('Error connecting to MongoDB:[at connectDb]', error);
        process.exit(1);
       
        
    }
    
};

export { connectDb };