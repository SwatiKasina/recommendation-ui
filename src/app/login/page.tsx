"use client";

import { useState } from "react";
import { ChangeEvent, FormEvent } from "react";
import InputTextField from "../components/InputTextField";
import { Box, Button, Paper, Typography } from "@mui/material";

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

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

          <Button type="submit" variant="contained" size="large" fullWidth>
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
