import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { verifySession } from '../redux/slices';
import { CategoriesPage } from '../pages/Categories';

import PrivateRoute from './PrivateRoute';
import MyProductsPage from '../pages/MyProducts';
import LoginPage from '../pages/Login';
import HomePage from '../pages/Home';
import RegisterPage from '../pages/Register';


const AppRouter = () => {
  const { isLoading, login } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(verifySession())
  }, [login]);

  if (isLoading) return null


  return (
    <BrowserRouter /* basename = {process.env.PUBLIC_URL} */ >

      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

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

        <Route path="/categories" element={
          <PrivateRoute>
            <CategoriesPage />
          </PrivateRoute>}
        />

        <Route path="/user" element={
          <PrivateRoute>
            <CategoriesPage />
          </PrivateRoute>}
        />
      </Routes>

    </BrowserRouter>
  )
}

export default AppRouter