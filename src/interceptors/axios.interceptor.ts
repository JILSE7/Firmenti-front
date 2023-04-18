import axios, { AxiosRequestConfig } from "axios"

const updateHeaders = (req:any) => {
  const token = JSON.parse(localStorage.getItem("js_token") as string)
  const newHeaders = {
      Authorization: `Bearer ${token}`,      
  }
  req.headers = {...req.headers, ...newHeaders}
  return req
}

export const AxiosInterceptor = () => {
  axios.interceptors.request.use(req => {
    return updateHeaders(req);
  })
}