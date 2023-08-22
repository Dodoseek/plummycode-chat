import Cookie from 'js-cookie'
import jwt_decode from "jwt-decode";

export const setTokens = (data:string) => {
    deleteTokens(data);
    Cookie.set('token', "Token " + data, {secure: true});
};

export const deleteTokens = (token:string) =>{
    Cookie.get(token) &&
    Cookie.remove(token)
};

export const getToken = (token:string) =>{
    try{
        return Cookie.get(token)
    }
    catch{
        return null
    }
};