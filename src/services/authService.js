import { AUTH_KEY } from "../constants/generalConstants";

export default class AuthService {
   static  is_logged_in() {
       let token = AuthService.get_token();
       if (!token)
           return false
       return !AuthService.is_token_expired();
   } 

   // TODO check if token is expired
   static  is_token_expired() {
       let currentTime = (new Date()).getTime() / 1000
       let token = AuthService.get_token();
       let tokenTime = token.ttl + (new Date(token.created)).getTime()/1000
       if (!token)
           return true
       if (currentTime > tokenTime) {
           console.log('token expired');
           return true
       }
       return false
   }

   static  get_token() {
       let token = window.localStorage.getItem(AUTH_KEY);
       if (token)
           return JSON.parse(token);
       return JSON.parse(window.sessionStorage.getItem(AUTH_KEY));
   }

   static remove_token(){
       window.localStorage.removeItem(AUTH_KEY);
       window.sessionStorage.removeItem(AUTH_KEY);
   }

   static get_user() {
       if (AuthService.is_logged_in())
           return AuthService.get_token().user
       return {}
   }

   static  save_token(token, remember=false) {
       token = JSON.stringify(token);
       if (remember)
           window.localStorage.setItem(AUTH_KEY, token);
       else
           window.sessionStorage.setItem(AUTH_KEY, token);
   }
}