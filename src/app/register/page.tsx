"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Alert, Box, Button, Paper, Typography } from "@mui/material";
import InputTextField from "../components/InputTextField";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const initialErrors: FormErrors = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const formatName = (value: string) => {
  const lettersOnly = value.replace(/[^a-zA-Z]/g, "").slice(0, 15);

  if (!lettersOnly) {
    return "";
  }

  return (
    lettersOnly.charAt(0).toUpperCase() + lettersOnly.slice(1).toLowerCase()
  );
};

const validateName = (value: string, label: string) => {
  if (!value) {
    return `${label} is required`;
  }

  if (!/^[A-Z][a-z]{0,14}$/.test(value)) {
    return `${label} must contain only alphabets, sentence case, max 15 characters`;
  }

  return "";
};

const validateEmail = (value: string) => {
  if (!value) {
    return "Email Id is required";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "Enter a valid email address";
  }

  return "";
};

const validatePassword = (value: string) => {
  if (!value) {
    return "Password is required";
  }

  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(value)) {
    return "Password must include uppercase, lowercase, digit, special character and 8+ characters";
  }

  return "";
};

const validateConfirmPassword = (password: string, confirmPassword: string) => {
  if (!confirmPassword) {
    return "Confirm Password is required";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match";
  }

  return "";
};

export default function RegisterPage() {
  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [formErrors, setFormErrors] = useState<FormErrors>(initialErrors);
  const [successMessage, setSuccessMessage] = useState("");

  const handleNameChange =
    (field: "firstName" | "lastName", label: string) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const formattedValue = formatName(event.target.value);

      setFormValues((prev) => ({
        ...prev,
        [field]: formattedValue,
      }));

      setFormErrors((prev) => ({
        ...prev,
        [field]: formattedValue
          ? validateName(formattedValue, label)
          : `${label} is required`,
      }));
    };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setFormValues((prev) => ({
      ...prev,
      email: value,
    }));

    setFormErrors((prev) => ({
      ...prev,
      email: value ? validateEmail(value) : "Email Id is required",
    }));
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setFormValues((prev) => ({
      ...prev,
      password: value,
    }));

    setFormErrors((prev) => ({
      ...prev,
      password: value ? validatePassword(value) : "Password is required",
      confirmPassword: formValues.confirmPassword
        ? validateConfirmPassword(value, formValues.confirmPassword)
        : prev.confirmPassword,
    }));
  };

  const handleConfirmPasswordChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;

    setFormValues((prev) => ({
      ...prev,
      confirmPassword: value,
    }));

    setFormErrors((prev) => ({
      ...prev,
      confirmPassword: value
        ? validateConfirmPassword(formValues.password, value)
        : "Confirm Password is required",
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: FormErrors = {
      firstName: validateName(formValues.firstName, "Firstname"),
      lastName: validateName(formValues.lastName, "Lastname"),
      email: validateEmail(formValues.email),
      password: validatePassword(formValues.password),
      confirmPassword: validateConfirmPassword(
        formValues.password,
        formValues.confirmPassword,
      ),
    };

    setFormErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      setSuccessMessage("");
      return;
    }

    console.log(
      JSON.stringify(
        {
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          email: formValues.email,
          password: formValues.password,
          confirmPassword: formValues.confirmPassword,
        },
        null,
        2,
      ),
    );

    setSuccessMessage("Registration form submitted successfully.");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: 4,
        backgroundColor: "#f5f7fb",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 520,
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
          Register
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Fill in the details below to create your account.
        </Typography>

        {successMessage ? (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        ) : null}

        <Box
          component="form"
          sx={{ display: "grid", gap: 2 }}
          onSubmit={handleSubmit}
        >
          <InputTextField
            label="Firstname"
            name="firstName"
            type="text"
            value={formValues.firstName}
            onChange={handleNameChange("firstName", "Firstname")}
            helperText={
              formErrors.firstName ||
              "Only alphabets, sentence case, max 15 characters. Example: Swati"
            }
          />

          <InputTextField
            label="Lastname"
            name="lastName"
            type="text"
            value={formValues.lastName}
            onChange={handleNameChange("lastName", "Lastname")}
            helperText={
              formErrors.lastName ||
              "Only alphabets, sentence case, max 15 characters. Example: Sharma"
            }
          />

          <InputTextField
            label="Email Id"
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleEmailChange}
            helperText={formErrors.email || "Email must include @ and ."}
          />

          <InputTextField
            label="Password"
            name="password"
            type="password"
            value={formValues.password}
            onChange={handlePasswordChange}
            helperText={
              formErrors.password ||
              "1 uppercase, 1 lowercase, 1 digit, 1 special character, minimum 8 characters"
            }
          />

          <InputTextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formValues.confirmPassword}
            onChange={handleConfirmPasswordChange}
            helperText={formErrors.confirmPassword || "Must match the password"}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{ mt: 1 }}
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
