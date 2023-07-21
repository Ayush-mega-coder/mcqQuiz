import Question from '../model/questions.js';

export const createQuestion = async(req,res)=>{
    try {
        const newQuestion = new Question(req.body);
        await newQuestion.save();
        res.status(201).json({ message: "Question saved successfully" });
        console.log(req.body)
      } catch (error) {
        console.error("Error saving question:", error);
        res.status(500).json({ message: "An error occurred while saving the question" });
      } 
}
