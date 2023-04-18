import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser, IUserAuth } from "../../models";
import { verifyTokenService } from "../../services/api.services";
import { toast } from "sonner";
import { removeToken } from "../../utilities";

export interface IAuthStore {login: boolean, user: IUserAuth | undefined, isLoading: boolean}


const initialState: IAuthStore = {
  login: false,
  isLoading: true,
  user: undefined
}

export const verifySession = createAsyncThunk(
  'auth/verifyToken',
  async () => {
    try {
      const {data: {data: userSession, ok}} = await verifyTokenService()
      if(!ok) return false
      return userSession
    } catch (error: any) {
      return false
    }

  }
)


export const authSlices = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthStore: (_, action:PayloadAction<IUserAuth>) => {
      return {
        login: true,
        user: action.payload,
        isLoading: false
      }
    },

    logOut : () => {
      removeToken()

      return initialState
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(verifySession.fulfilled, (state, action: any) => {
      // Add user to the state array
      const userSession = action.payload
      if (!userSession){
        return {
          login: false,
          user: undefined,
          isLoading: false
        }
      }

      if (userSession){
        return {
          login: true,
          user: action.payload,
          isLoading: false
        }
      }
  
    })
  },
});


export const {setAuthStore, logOut} = authSlices.actions;