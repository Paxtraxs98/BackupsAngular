import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { global } from './global';
import {Observable,of, from } from 'rxjs';
import {UserService} from './user.service'

@Injectable({
    providedIn: 'root'
})
export class ArtistService {
        public url:string;
        public identity;
        public token;        
        constructor(private _http:HttpClient,private _userService:UserService)
        {
            this.url=global.url;
            this.identity=this._userService.getIdentity();
            this.token=this._userService.getToken();
        }        
        saveArtist(artist)
        {              
             let params = JSON.stringify(artist);                
             return this._http.post(this.url+'saveArtist/',params).pipe(map(res => res));                 
        }        
        getArtist(idArtist)
        {      
            return this._http.get(this.url+'getArtist/'+idArtist).pipe(map(res => res)); 
        }
        getArtists(page)
        {              
            return this._http.get(this.url+'getArtists/'+page).pipe(map(res => res)); 
        }
        deleteArtist(idArtist)
        {         
            return this._http.delete(this.url+'deleteArtist/'+idArtist).pipe(map(res => res)); 
        }
         update_Artist(idArtist,DateArtist)
         {
             let params =JSON.stringify(DateArtist);                                      
             return this._http.put(this.url+'updateArtist/'+idArtist,params).pipe(map(res=>res));
         }
        
}