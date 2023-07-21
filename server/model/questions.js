import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },

    option1: {
      
      type: String,
      required: true,
    },
    option2: {
      type: String,
      required: true,
    },
    option3: {
      type: String,
      required: true,
    },
    option4: {
      type: String,
      required: true,
    },
  
  marks: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  answer:{
    type:Number,
    required:true,
  }
});

const Question = mongoose.model('questions', questionSchema);
export default Question;
