import { ChangeEvent, FormEvent, useState } from 'react'
import { AccountCircle } from '@mui/icons-material'
import { Box, Button, FormControl, TextField } from '@mui/material'
import useFetchAndLoad from '../../../hooks/useFetch';
import { useDispatch } from 'react-redux';
import { IAuth, IUserAuth } from '../../../models';
import { IApiResponse } from '../../../interfaces';
import { loginService } from '../../../services/auth.services';
import { setAuthStore } from '../../../redux/slices';
import KeyIcon from '@mui/icons-material/Key';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../../utilities';

const LoginForm = () => {
  const [auth, setAuth] = useState<IAuth>({ email: '', password: '' });
  const { loading, callEndpoint } = useFetchAndLoad();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setAuth((state) => ({ ...state, [e.target.name]: e.target.value }))
  

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      toast.message('Iniciando sesión');

      const {data: user} = await callEndpoint<IApiResponse<IUserAuth>>(loginService(auth));

      setToken(user.accessToken)

      toast.success(`Bienvenido ${user.name}`);

      dispatch(setAuthStore(user));
      
      navigate("/home", {replace: true});
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormControl required>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              name="email"
              label="Email"
              variant="standard"
              type="email"
              value={auth.email}
              onChange={handleChange}
              inputProps={{ maxLength: 60 }}
              disabled={loading}
            />
          </Box>
        </FormControl>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
          <KeyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            label="Password"
            name="password"
            variant="standard"
            type="password"
            value={auth.password}
            onChange={handleChange}
            inputProps={{ maxLength: 22 }}
            disabled={loading}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 5 }}>
          <Button type="submit" variant="outlined" disabled={loading}>Log in</Button>
        </Box>
      </form>
    </>
  )
}

export default LoginForm