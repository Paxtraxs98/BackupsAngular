import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { global } from './global';
import {Observable,of, from } from 'rxjs';
import {UserService} from './user.service'

@Injectable({
    providedIn: 'root'
})
export class GeneroService {
        public url:string;
        public identity;
        public token;        

        constructor(private _http:HttpClient,public _userService:UserService)
        {
            this.url=global.url;
            this.identity=this._userService.getIdentity();
            this.token=this._userService.getToken();
        }        
        addGanero(data)
        {            
            let params = JSON.stringify(data);                
             return this._http.post(this.url+'saveGenero/',params).pipe(map(res => res));                
        }    
        getGenero(idGenero)
        {             
            return this._http.get(this.url+'getGenero/'+idGenero).pipe(map(res => res)); 
        }    
        getGeneros()
        {              
            return this._http.get(this.url+'getGeneros').pipe(map(res => res)); 
        }
        getSongs(idGenero)
        {              
            return this._http.get(this.url+'getSongsGenero/'+idGenero).pipe(map(res => res)); 
        }
        deleteGenero(idGenero)
        {             
            return this._http.delete(this.url+'deleteGenero/'+idGenero).pipe(map(res => res)); 
        }
        updateGenero(idGenero,dateGenero)
        {
            let params =JSON.stringify(dateGenero);                                     
            return this._http.put(this.url+'updateGenero/'+idGenero,params).pipe(map(res=>res));
        }
     
        
}