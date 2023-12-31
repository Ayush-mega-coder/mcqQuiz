import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  TextField,
  Box,
  Button,
  Typography,
  styled,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  createStyles
} from "@mui/material";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled("img")({
  width: 100,
  display: "flex",
  margin: "auto",
  padding: "10px 0 0",
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  overflow: auto;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: black;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;

const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

interface LoginValues {
  username: string;
  password: string;
}

interface SignupValues {
  name: string;
  username: string;
  password: string;
  role: string;
}

const loginInitialValues: LoginValues = {
  username: "",
  password: "",
};

const signupInitialValues: SignupValues = {
  name: "",
  username: "",
  password: "",
  role: "",
  //   role: "",
};

const Login: React.FC = ({}) => {
  const [login, setLogin] = useState<LoginValues>(loginInitialValues);
  const [signup, setSignup] = useState<SignupValues>(signupInitialValues);
  const [error, showError] = useState<string>("");
  const [account, toggleAccount] = useState<"login" | "signup">("login");
  const navigate = useNavigate();

  const imageURL =
    "https://bloggingfornewbloggers.com/wp-content/uploads/2020/08/cropped-Blogging-for-New-Bloggers-logo-nv.png";

  useEffect(() => {
    showError("");
  }, [login]);

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    try {
      // console.log('logged in')
      const loginUser = {
        username: login.username,
        password: login.password,
      };
      let response = await axios.post("http://localhost:8000/login", loginUser);
      let isAdmin = response.data.role;
      console.log("admin is", isAdmin);
      if (response) {
        if (isAdmin === "admin") navigate("/admin");
        else navigate("/user");
      }
      console.log("Signup successful");
    } catch (error) {
      console.error(error);
      showError("An error occurred during user login. Please try again later.");
    }
  };

  const signupUser = async () => {
    try {
      const newUser = {
        name: signup.name,
        username: signup.username,
        password: signup.password,
        role: signup.role,

        // role: signup.role, // Make sure you set the role in the SignupValues state
      };

      // Replace 'YOUR_BACKEND_API_URL/signup' with the actual URL of your backend signup route
      const response = await axios.post(
        "http://localhost:8000/signup",
        newUser
      );

      // If the signup was successful, you can handle the response here
      console.log(response.data.msg); // This will log 'Signup successfull'
      if (response) {
        showError("");
        setSignup(signupInitialValues);
        toggleAccount("login");
      } else {
        showError("Something went wrong! please try again later");
      }
    } catch (error) {
      console.error("Error found in signupUser", error);
      // Handle the error here
    }
  };

  const toggleSignup = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };

  return (
    <Component>
      <Box>
        <Image src={imageURL} alt="blog" />
        {account === "login" ? (
          <Wrapper>
            <TextField
              variant="standard"
              value={login.username}
              onChange={onValueChange}
              name="username"
              label="Enter Username"
            />
            <TextField
              variant="standard"
              value={login.password}
              onChange={onValueChange}
              name="password"
              label="Enter Password"
            />

            {error && <Error>{error}</Error>}

            <LoginButton variant="contained" onClick={loginUser}>
              Login
            </LoginButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <SignupButton onClick={toggleSignup} style={{ marginBottom: 50 }}>
              Create an account
            </SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              variant="standard"
              value={signup.name}
              onChange={onInputChange}
              name="name"
              label={signup.name ? "" : "Enter Name"}
            />
            <TextField
              variant="standard"
              value={signup.username}
              onChange={onInputChange}
              name="username"
              label={signup.username ? "" : "Enter Username"}
            />
            <TextField
              variant="standard"
              value={signup.password}
              onChange={onInputChange}
              name="password"
              label={signup.password ? "" : "Enter Password"}
            />
            <TextField
              variant="standard"
              value={signup.role}
              onChange={onInputChange}
              name="role"
              label={signup.role ? "" : "Enter Role"}
            />

            <SignupButton onClick={signupUser}>Signup</SignupButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <LoginButton variant="contained" onClick={toggleSignup}>
              Already have an account
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;
