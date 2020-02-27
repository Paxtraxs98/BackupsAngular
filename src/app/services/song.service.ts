import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { global } from './global';
import {Observable,of, from } from 'rxjs';
import {UserService} from './user.service'

@Injectable({
    providedIn: 'root'
})
export class SongService {
        public url:string;
        public identity;
        public token;        
        constructor(private _http:HttpClient,private _userService:UserService)
        {
            this.url=global.url;
            this.identity=this._userService.getIdentity();
            this.token=this._userService.getToken();
        }        
        saveSong(idAlbum,song)
        {              
             let params = JSON.stringify(song);                
             return this._http.post(this.url+'saveSong/'+idAlbum,params).pipe(map(res => res));                 
        }        
        getSong(idSong)
        {              
            return this._http.get(this.url+'getSong/'+idSong).pipe(map(res => res)); 
        }
        getSongs(idAlbum)
        {            
            return this._http.get(this.url+'getsongs/'+this.identity._id+'/'+idAlbum).pipe(map(res => res)); 
        }
        deleteSong(idSong)
        {              
            return this._http.delete(this.url+'deleteSong/'+idSong).pipe(map(res => res)); 
        }
         updateSong(idsong,song)
         {
             let params =JSON.stringify(song);                                      
             return this._http.put(this.url+'updateSong/'+idsong,params).pipe(map(res=>res));
         }
        
}