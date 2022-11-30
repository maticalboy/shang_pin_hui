export const setToken=(token)=>{
    // 持久化存储
    localStorage.setItem("TOKEN",token)
}
export const getToken=()=>{
    // 获取存储
    return localStorage.getItem("TOKEN")
}
export const clearToken=()=>{
    // 清楚Token
    localStorage.removeItem("TOKEN")
}