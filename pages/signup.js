import Box from "@mui/material/Box";
import styles from "@/styles/Home.module.css";
import { SignUpForm } from "../components/SignUp/SignUp";

const SignUp = () => {
  return (
    <Box className={styles.main}>
      <SignUpForm />
    </Box>
  );
};

export default SignUp;
