import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { global } from './global';
import {Observable,of, from } from 'rxjs';
import {UserService} from './user.service'

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  public url:string;
  public identity;
  public token;        

  constructor(
    private _http:HttpClient,
    private _userService:UserService) 
    { 
        this.url=global.url;
        this.identity=this._userService.getIdentity();
        this.token=this._userService.getToken();
    }
    savePlayList(dataPlayList)
    {
      let params = JSON.stringify(dataPlayList);                    
      return this._http.post(this.url+'createPlaylist/'+this.identity._id,params).pipe(map(res => res));                 
    }
    getPlayList(idPlayList)
    {      
      return this._http.get(this.url+'getPlayList/'+this.identity._id+'/'+idPlayList).pipe(map(res => res)); 
    }
    getPlayLists(idUser)
    {      
      return this._http.get(this.url+'getPlayLists/'+idUser).pipe(map(res => res)); 
    }
    updatePlayList(idPlay,Dataplay)
    {
        let params =JSON.stringify(Dataplay);                         
        return this._http.put(this.url+'editPlayLists/'+idPlay,params).pipe(map(res=>res));
    }
    deletePlayList(id)
     {            
        return this._http.delete(this.url+'deletePlayList/'+id).pipe(map(res => res)); 
    }
    addSongPlayList(idPlayList,idSong)
    {          
      return this._http.post(this.url+'addSongPlaylist/'+this.identity._id+'/'+idPlayList+'/'+idSong,{}).pipe(map(res => res));
    }
    removeSongPlayList(idPlayList,idSong)
    {        
        return this._http.delete(this.url+'deleteSongPlayList/'+this.identity._id+'/'+idPlayList+'/'+idSong).pipe(map(res => res)); 
    }
}
