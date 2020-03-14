import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { global } from './global';
import { User } from '../models/users';
import {Observable,of, from } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
        public url:string;
        public identity;
        public token;        
        constructor(private _http:HttpClient)
        {
            this.url=global.url;

        }        
        saveUser(user)
        {            
             let params = JSON.stringify(user);                
             return this._http.post(this.url+'saveUser',params).pipe(map(res => res));                 
        }
        validacion()
        {             
             return this._http.post(this.url+'preRegister',[]).pipe(map(res => res));                 
        }
        login(user_login, gethash = null){
            if (gethash != null) {
                user_login.gethash = gethash;
            }           
            let params = JSON.stringify(user_login);               
            return this._http.post(this.url+'login',params).pipe(map(res => res));
         }     
         loginGoogle(token){                
             console.log("si entra a laruta");
            let params = JSON.stringify({token:token});                 
            return this._http.post(this.url+'loginGoogle',params).pipe(map(res => res));
         }     
        update_user(user_to_update)
        {
            let params =JSON.stringify(user_to_update);                                    
            return this._http.put(this.url+'updateUser/'+user_to_update._id,params).pipe(map(res=>res));
        }
        update_password(id,password_to_update)
        {               
            let params =JSON.stringify(password_to_update);                       
            return this._http.put(this.url+'updatePassword/'+id,params).pipe(map(res=>res));
        }
        delete(idUser)
        {             
            return this._http.delete(this.url+'deleteUser/'+idUser).pipe(map(res=>res));
        }
        getIdentity()
        {
            let identity=JSON.parse(localStorage.getItem('identity'));
            if(identity != 'undefined')
            {
                this.identity=identity;                
            }
            else{
                this.identity=null;
            }
            return this.identity;
        }
        getToken()
        {
            let token= JSON.parse(localStorage.getItem('token'));
            if(token != 'undefined')
            {
                this.token=token;
            }
            else{
                this.token =null;
            }
            return this.token;
        } 

        
}