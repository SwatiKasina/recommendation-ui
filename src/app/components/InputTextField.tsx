"use client";
import { TextField } from "@mui/material";
import { ChangeEvent } from "react";

interface InputTextFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;

  helperText?: string;
}

export default function InputTextField({
  label,
  name,
  type,
  value,
  onChange,

  helperText,
}: InputTextFieldProps) {
  return (
    <TextField
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      helperText={helperText}
      sx={{
        backgroundColor: "pink",
      }}
    />
  );
}
