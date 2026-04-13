"use client";

import { useState } from "react";
import { ChangeEvent, FormEvent } from "react";
import InputTextField from "../components/InputTextField";
import { Box, Button, Paper, Typography } from "@mui/material";

export default function Login() {
  const [capcha, setCapcha] = useState("");
  let changeValue = 0;
  const handleCapchaChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value?.replace(/[^@$]/g, "");
    setCapcha(value);
    changeValue++;
  };

  return (
    <InputTextField
      label="capcha"
      name="capcha"
      type="text"
      value={capcha}
      onChange={handleCapchaChange}
    />
  );
}
