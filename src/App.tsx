import AppRouter from './router/AppRouter';
import { Provider } from 'react-redux';
import store from './redux/store';
import { AxiosInterceptor } from './interceptors/axios.interceptor';
import { Toaster } from 'sonner';

AxiosInterceptor();

function App() {
  return (
    <>
      <Provider store={store}>
        <Toaster expand richColors position="top-right" />
        <AppRouter />
      </Provider>
    </>
  )
};

export default App;
