import { verifyTokenService } from "../services/auth.services"


export const useAuth = async() => {
  const isValidToken = await verifyTokenService();
  console.log({isValidToken});
}