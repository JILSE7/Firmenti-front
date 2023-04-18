import { verifyTokenService } from "../services/api.services"


export const useAuth = async() => {
  const isValidToken = await verifyTokenService();
  console.log({isValidToken});
}