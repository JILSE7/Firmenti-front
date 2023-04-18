
import { Typography } from "@mui/material"
import { LoginForm } from "./components";

import './styles/styles.css'
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const {isLoading, login} = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate()

  useEffect(() => {
    if(!isLoading && login) navigate("/home")
  }, [])
  

  return (
    <div className="login_container">
      <Typography variant="h2" gutterBottom color={"#1976d2"}> Products App </Typography>
      <LoginForm />
    </div>
  )
}

export default LoginPage