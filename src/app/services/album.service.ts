import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { global } from './global';
import {Observable,of, from } from 'rxjs';
import {UserService} from './user.service'

@Injectable({
    providedIn: 'root'
})
export class AlbumService {
        public url:string;
        public identity;
        public token;        

        constructor(private _http:HttpClient,private _userService:UserService)
        {
            this.url=global.url;
            this.identity=this._userService.getIdentity();
            this.token=this._userService.getToken();
        }        
        saveAlbum(idArtist,album)
        {               
             let params = JSON.stringify(album);                           
             return this._http.post(this.url+'saveAlbum/'+idArtist,params).pipe(map(res => res));                                           
        }        
        getAlbum(idAlbum)
        {             
            return this._http.get(this.url+'getAlbum/'+idAlbum).pipe(map(res => res)); 
        }
        getAlbums(idArtist)
        {              
            if(idArtist)
            {
                return this._http.get(this.url+'getAlbums/'+idArtist).pipe(map(res => res)); 
            }
            else
            {
                return this._http.get(this.url+'getAlbums').pipe(map(res => res)); 
            }            
        }   
        deleteArtist(idAlbum)
        {               
            return this._http.delete(this.url+'deleteAlbum/'+idAlbum).pipe(map(res => res)); 
        }
         update_Album(idAlbum,dateAalbum)
         {
             let params =JSON.stringify(dateAalbum);                                      
             return this._http.put(this.url+'updateAlbum/'+idAlbum,params).pipe(map(res=>res));
         }
        
}