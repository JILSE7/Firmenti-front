import { Typography } from '@mui/material'
import RegisterForm from './components/RegisterForm'

const RegisterPage = () => {
  return (
    <div className="login_container">
      <Typography variant="h2" gutterBottom color={"#1976d2"}> Products App </Typography>
      <RegisterForm />
    </div>
  )
}

export default RegisterPage