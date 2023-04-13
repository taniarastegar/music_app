import { LoginForm } from "@/components/Login/Loginform";
import Box from "@mui/material/Box";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";

const Login = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);
  const logginHandler = () => {
    setLoggedIn(true);
  };
  return (
    <Box className={styles.main}>
      <LoginForm />
      <Button variant="primary" onClick={() => logginHandler()}>
        click
      </Button>
    </Box>
  );
};
export default Login;
