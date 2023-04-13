import Box from "@mui/material/Box";
import styles from "@/styles/Home.module.css";
import { LoginForm } from "../components/Form/Loginform";
import { UserList } from "@/components/Form/userList";

const userList = new UserList();
const SignUp = () => {
  return (
    <Box className={styles.main}>
      <LoginForm userList={userList} />
    </Box>
  );
};

export default SignUp;
