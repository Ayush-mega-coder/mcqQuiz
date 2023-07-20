import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  solution: {
    option1: {
      type: String,
    //   required: true,
    },
    option2: {
      type: String,
    //   required: true,
    },
    option3: {
      type: String,
    //   required: true,
    },
    option4: {
      type: String,
    //   required: true,
    },
  },
  marks: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
});

const Question = mongoose.model('questions', questionSchema);
export default Question;
