import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../redux/store";

interface IProps {
  children  : any;
}

export const PrivateRoute = ({children}:IProps) => {
  const {login} = useSelector((state:RootState) => state.auth)
  return login ? <>{children}</>  : <Navigate to={"/login"}/>

}

export default PrivateRoute