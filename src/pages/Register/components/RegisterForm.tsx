import { AccountCircle } from "@mui/icons-material"
import { Box, Button, TextField, Typography } from "@mui/material"
import { ChangeEvent, FormEvent, useState } from "react";
import { IUserAuth, RegisterUser } from "../../../models";
import KeyIcon from '@mui/icons-material/Key';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import useFetchAndLoad from "../../../hooks/useFetch";
import { toast } from "sonner";
import { IApiResponse } from "../../../interfaces";
import { registerService } from "../../../services/api.services";
import { setToken } from "../../../utilities";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { setAuthStore } from "../../../redux/slices";
import { useNavigate } from "react-router-dom";


const RegisterForm = () => {

  const [userState, setUserState] = useState<RegisterUser>({ email: '', password: '', name: '', phone: '' });
  const { loading, callEndpoint } = useFetchAndLoad();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setUserState((state) => ({ ...state, [e.target.name]: e.target.value }))
  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.message('Creando usuario');

    const {data: user} = await callEndpoint<IApiResponse<IUserAuth>>(registerService(userState));

    setToken(user.accessToken)

    toast.success(`Bienvenido ${user.name}`);

    dispatch(setAuthStore(user));

    navigate("/home", {replace: true});
}

  return (
    <>
      <Typography variant="h4" gutterBottom color={"#1976d2"}> Nuevo Usuario </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 5, marginTop: 5 }}>
          <AccessibilityNewIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            label="Nombre"
            name="name"
            variant="standard"
            type="name"
            value={userState.name}
            onChange={handleChange}
            inputProps={{ maxLength: 30, "data-testid": "input-password" }}
            disabled={loading}
            required
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
          <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            name="email"
            label="Email"
            variant="standard"
            type="email"
            value={userState.email}
            onChange={handleChange}
            inputProps={{ maxLength: 60, "data-testid": "input-email" }}
            disabled={loading}
            required
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
          <KeyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            label="Password"
            name="password"
            variant="standard"
            type="password"
            value={userState.password}
            onChange={handleChange}
            inputProps={{ maxLength: 22, "data-testid": "input-password" }}
            disabled={loading}
            required
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
          <PhoneAndroidIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            label="Telefono"
            name="phone"
            variant="standard"
            type="number"
            value={userState.phone}
            onChange={handleChange}
            inputProps={{ maxLength: 10, "data-testid": "input-phone" }}
            disabled={loading}
            required
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 5 }}>
          <Button data-testid="button-submit" type="submit" variant="outlined" disabled={loading}>Register</Button>
          <Button onClick={() => navigate("/login")} >Log in</Button>
        </Box>
      </form>
    </>
  )
}

export default RegisterForm;