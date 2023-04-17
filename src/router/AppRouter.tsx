import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/Login';
import HomePage from '../pages/Home';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { verifyTokenService } from '../services/auth.services';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { verifySession } from '../redux/slices';
import PrivateRoute from './PrivateRoute';
import MyProductsPage from '../pages/MyProducts';
/* import { AdminPage, Employee, Login } from '../views'; */

/* import PrivateRoute from './PrivateRouter';
import { useAuth } from '../hooks/useAuth'; */


const AppRouter = () => {
  const { isLoading } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(verifySession())
  }, []);

  if (isLoading) return null


  return (
    <BrowserRouter /* basename = {process.env.PUBLIC_URL} */ >

      <Routes>
        <Route path='/login' element={<LoginPage />} />

        <Route path="/home" element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>}
        />

        <Route path="/myProducts" element={
          <PrivateRoute>
            <MyProductsPage />
          </PrivateRoute>}
        />
      </Routes>

    </BrowserRouter>
  )
}

export default AppRouter