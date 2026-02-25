import { jwtDecode } from "jwt-decode";


export function getUserFromToken(){
    const token = localStorage.getItem("token")

    if(!token) return null;


    try{
        const decoded:any = jwtDecode(token)
        return{name:decoded.name, email:decoded.sub, id: decoded.id}
    }catch(error){
        return null
    }
}