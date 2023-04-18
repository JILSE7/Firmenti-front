
export const setToken = (token: string) => localStorage.setItem("js_token", JSON.stringify(token))
export const getToken = () => localStorage.getItem("js_token")
export const removeToken = () => localStorage.removeItem("js_token")