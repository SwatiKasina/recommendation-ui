"use client";

import { useRef, useState } from "react";
import { ChangeEvent, FormEvent } from "react";
import InputTextField from "../components/InputTextField";
import { Box, Button, Paper, Typography } from "@mui/material";

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [capcha, setCapcha] = useState("");
  let changeValue = useRef(0);

  let usernameTemp = "";

  const handleUsenrameTempChange = (event: ChangeEvent<HTMLInputElement>) => {
    usernameTemp = event.target.value;
  };

  const handleCapchaChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value?.replace(/[^@$]/g, "");
    setCapcha(value);
    changeValue.current++;
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Username: ${username}\nPassword: ${password}`);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: 350,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h5" textAlign="center">
          Login
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <InputTextField
            label="User Name"
            name="username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />

          <InputTextField
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />

          <InputTextField
            label="capcha"
            name="capcha"
            type="text"
            value={capcha}
            onChange={(e) => {
              handleCapchaChange(e);
            }}
          />

          <Button type="submit" variant="contained" size="large" fullWidth>
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
