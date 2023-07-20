import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Box,
  Button,
  Typography,
  styled,
} from "@mui/material";

interface QuestionFormValues {
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  marks: string;
  duration: string;
}

const FormWrapper = styled(Box)(({ theme }) => ({
  width: "400px",
  margin: "auto",
  padding: "25px",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
  background: "#f9f9f9",
  display: "flex",
  flexDirection: "column",
  gap: "18px",
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  background: "black",
  color: "#fff",
  height: "48px",
  borderRadius: "8px",
}));

const Text = styled(Typography)(({ theme }) => ({
  color: "#878787",
  fontSize: "12px",
  textAlign: "center",
}));

const QuestionForm: React.FC = () => {
  const [formValues, setFormValues] = useState<QuestionFormValues>({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    marks: "",
    duration: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Client-side validation
      if (
        !formValues.question ||
        !formValues.option1 ||
        !formValues.option2 ||
        !formValues.option3 ||
        !formValues.option4 ||
        !formValues.marks ||
        !formValues.duration
      ) {
        console.error("Please fill all required fields");
        return;
      }

      console.log(formValues);
      const response = await axios.post(
        "http://localhost:8000/api/questions",
        formValues
      );
      console.log("Question saved successfully:", response.data);
      // Add any success message or redirection logic here
    } catch (error) {
      console.error("Error saving question:", error);
      // Handle error here
    }
  };

  return (
    <FormWrapper>
      <TextField
        variant="outlined"
        label="Question"
        name="question"
        value={formValues.question}
        onChange={handleChange}
        required
      />
      <TextField
        variant="outlined"
        label="Option 1"
        name="option1"
        value={formValues.option1}
        onChange={handleChange}
        required
      />
      <TextField
        variant="outlined"
        label="Option 2"
        name="option2"
        value={formValues.option2}
        onChange={handleChange}
        required
      />
      <TextField
        variant="outlined"
        label="Option 3"
        name="option3"
        value={formValues.option3}
        onChange={handleChange}
        required
      />
      <TextField
        variant="outlined"
        label="Option 4"
        name="option4"
        value={formValues.option4}
        onChange={handleChange}
        required
      />
      <TextField
        variant="outlined"
        label="Marks"
        name="marks"
        value={formValues.marks}
        onChange={handleChange}
        required
      />
      <TextField
        variant="outlined"
        label="Duration"
        name="duration"
        value={formValues.duration}
        onChange={handleChange}
        required
      />
      <SubmitButton variant="contained" onClick={handleSubmit}>
        Save Question
      </SubmitButton>
    </FormWrapper>
  );
};

export default QuestionForm;
