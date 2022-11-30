import { v4 as uuidv4 } from 'uuid';
export const getUUID=()=>{
    // uuidv4()
    // 先查看本地存储是否有uuid
    let uuid_token=localStorage.getItem("UUID")
    if(!uuid_token){
        // 如果没有
        uuid_token=uuidv4()
        // 放入localstore
        localStorage.setItem("UUID",uuid_token)
    }
    return uuid_token
}