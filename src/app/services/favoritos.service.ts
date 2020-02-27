import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { global } from './global';
import {Observable,of, from } from 'rxjs';
import {UserService} from './user.service'

@Injectable({
    providedIn: 'root'
})
export class FavoritosService {
        public url:string;
        public identity;
        public token;        

        constructor(private _http:HttpClient,private _userService:UserService)
        {
            this.url=global.url;
            this.identity=this._userService.getIdentity();
            this.token=this._userService.getToken();
        }        
        addFavorites(idSong)
        {              
            return this._http.post(this.url+'saveFavo/'+this.identity._id+'/'+idSong,{})
                .pipe(
                    map(res => res)
                );                
        }        
        getFavoritos(idUser)
        {              
            return this._http.get(this.url+'getFavoritos/'+idUser).pipe(map(res => res)); 
        }
       
        removeFavoritos(idSong)
        {              
            return this._http.delete(this.url+'deleteFav/'+this.identity._id+'/'+idSong).pipe(map(res => res)); 
        }    
        
}