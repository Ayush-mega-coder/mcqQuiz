import React from "react";

import styled from "@mui/material/styles/styled";
import { Button, Box } from "@mui/material";

const StyledButton = styled(Button)`
  text-transform: none;
  background: black;
  color: #fff;
  height: 38px;
  border-radius: 2px;
  margin:10px
`;
// const Wrapper = styled(Box)`


// `;
const Component = styled(Box)`
width:15%;
display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin: 5px;
  padding:10px;
`
const UserView: React.FC = () => {
  return (
    <>
      <h1>Quiz Mania</h1>

        <Component>

        <StyledButton variant="contained">Previous Exams</StyledButton>
        <StyledButton variant="contained">Results</StyledButton>
        <StyledButton variant="contained">Invites</StyledButton>

        </Component>
        

    </>
  );
};
export default UserView;
