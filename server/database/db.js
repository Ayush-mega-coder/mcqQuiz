import mongoose from 'mongoose';

const Connection = async () => {
  const dbName = 'mcqApp'; // Database name (mcqApp) you want to connect to

  const URL = `mongodb+srv://user:ayush75way@blog-app.r4hdy6s.mongodb.net/${dbName}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(URL, { useNewUrlParser: true });
    console.log(`Connected to the database: ${dbName}`);
  } catch (error) {
    console.log('Error while connecting to the database ', error);
  }
};

export default Connection;
