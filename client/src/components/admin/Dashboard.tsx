import React from "react";
import { useState } from "react";
import styled from "@mui/material/styles/styled";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StyledButton = styled(Button)`
  text-transform: none;
  background: black;
  color: #fff;
  height: 38px;
  border-radius: 2px;
  margin: 10px;
`;
// const Wrapper = styled(Box)`

// `;
const Component = styled(Box)`
  width: 15%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin: 5px;
  padding: 10px;
`;
interface User {
  // Define the type for your User object here
  id: number;
  name: string;
  // Add other properties as needed
}

const Dashboard: React.FC = () => {
  const [showUsers, setShowUsers] = useState<Boolean>(false);
  const [users, setUsers] = useState<User[]>([]);

  const navigate = useNavigate();

  const toggleUsers = () => {
    setShowUsers(!showUsers);
  };
  const handleExam = () => {
    navigate("/exam");
  };
  const handleUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/users");
      console.log(response.data);
      setUsers(response.data);

      console.log(users);
    } catch (error) {
      console.log("error in fetching", error);
    }
  };
  return (
    <>
      <h1>Quiz Mania</h1>

      <Component>
        <StyledButton variant="contained" onClick={handleExam}>
          Create Exam
        </StyledButton>
        <StyledButton variant="contained">Results</StyledButton>
        <StyledButton variant="contained">Invite</StyledButton>
        <StyledButton
          variant="contained"
          onClick={() => {
            handleUser();
            toggleUsers();
          }}
        >
          Users
        </StyledButton>
        {showUsers && (
          <>
            
              {users.map((user) => (
                <Box>
                  <p key={user.id}>{user.name}</p>
                  <button>Invite</button>
                </Box>
              ))}
            
          </>
        )}
      </Component>
    </>
  );
};
export default Dashboard;
