import {
  TextField,
  Box,
  Container,
  Button,
  Stack,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Link from "next/link";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { LoginWrapper } from "./loginForm.styled";

export const LoginForm = ({ data }) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [user, setUser] = useState("");
  const AppContext = {
    user: {},
  };

  const onSubmit = (data) => {
    setUser(data);
    sessionStorage.setItem("currentUser", JSON.stringify(data));
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
    AppContext.user = data;
    reset();
  };

  return (
    <LoginWrapper>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}>
            <Stack spacing={3}>
              <h1>Login</h1>
              <Box>
                <Stack spacing={1}>
                  <TextField
                    {...register("email", {
                      required: "Required",
                      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    })}
                    id="e-standard-required"
                    label="email"
                    variant="standard"
                    autocomplete="email"
                    autoFocus
                  />
                  {errors.email?.type === "required" && (
                    <p
                      className="error-style"
                      style={{ color: "#ff9494", fonSize: "12px" }}>
                      This field is required
                    </p>
                  )}
                  {errors.email?.type === "pattern" && (
                    <p
                      className="error-style"
                      style={{ color: "#ff9494", fonSize: "12px" }}>
                      Please enter a valid email address
                    </p>
                  )}
                </Stack>
              </Box>
              <Box>
                <Stack spacing={1}>
                  <TextField
                    {...register("password", { required: "Required" })}
                    type={showPassword ? "text" : "password"}
                    id="p-standard-required"
                    label="password"
                    variant="standard"
                    autocomplete="password"
                    autoFocus
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}>
                            {showPassword ? (
                              <VisibilityIcon fontSize="small" />
                            ) : (
                              <VisibilityOffIcon fontSize="small" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {errors.password?.type === "required" && (
                    <p
                      className="error-style"
                      style={{ color: "#ff9494", fonSize: "12px" }}>
                      This field is required
                    </p>
                  )}
                </Stack>
              </Box>
              <Box className="submit-buttons">
                <Button type="submit">Login</Button>
                <Button type="link">
                  <Link href="/signup">Sign up</Link>
                </Button>
              </Box>
            </Stack>
          </Box>
        </form>
      </Container>
    </LoginWrapper>
  );
};
