import { Injectable } from '@angular/core';
import {UserService} from './user.service'
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class BuscadorService {
  public url:string;
  public identity;
  public token;        
  constructor(private _http:HttpClient,private _userService:UserService)
        {
            this.url=global.url;
            this.identity=this._userService.getIdentity();
            this.token=this._userService.getToken();
        }
        
  search(palabra){
    return this._http.get(this.url+'search/'+palabra).pipe(map(res => res)); 
  }
}
