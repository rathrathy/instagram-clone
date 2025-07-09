import mongoose from 'mongoose';

const Connection = async (username, password) => {
    const URL = `mongodb+srv://${username}:${password}@cluster0.umoix.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Database connected successfully');
        return true;
    } catch (error) {
        console.log('Error while connecting to the database ', error);
        throw error;
    }
};

export default Connection;