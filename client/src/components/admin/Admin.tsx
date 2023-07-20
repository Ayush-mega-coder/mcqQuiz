import Dashboard from "./Dashboard"
import React from "react";

import styled from "@mui/material/styles/styled";
import Box from "@mui/material/Box";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  align-content: center;
  display: flex;
  margin-top: 90px;
  margin-bottom: 30px;
  justify-content: center;
  font-size: 40px;
`;

const Admin: React.FC = () => {
  return (
    <>


      <Dashboard />

    </>
  );
};

export default Admin;


