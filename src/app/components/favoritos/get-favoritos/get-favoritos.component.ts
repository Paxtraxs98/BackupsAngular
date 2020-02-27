import { Component, OnInit } from '@angular/core';
import { FavoritosService } from '../../../services/favoritos.service';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute,Router } from '@angular/router'
import { global } from '../../../services/global'

@Component({
  selector: 'app-get-favoritos',
  templateUrl: './get-favoritos.component.html',
  styleUrls: ['./get-favoritos.component.css'],
  providers:[UserService,FavoritosService]
})
export class GetFavoritosComponent implements OnInit {
  public identity;
  public token;
  public title;
  public songs;
  public url;

  constructor(private _userService:UserService,private _favoritosService:FavoritosService,private _route:ActivatedRoute) { 
    this.url=global.url;
  }

  ngOnInit() 
  {
      console.log("Favorites");
      this.identity=this._userService.getIdentity();
      this.token=this._userService.getToken();
      this.getFavoritos();
  }
  getFavoritos()
  {
    this._route.params.forEach((params)=> 
    {
        let id = params['id'];
        this._favoritosService.getFavoritos(id).subscribe(
          (response:any)=>{                        
            this.songs=response.favoritos;            
          },error=>{
            console.log(error);
          }
        );
    })
  }
  start(song)
  {       
      
      let song_player = JSON.stringify(song);       
      let file_path = this.url + 'getFileSong/'+song.file;                    
      localStorage.setItem("sound-song",song_player);        
      document.getElementById('mp3-sources').setAttribute("src",file_path);      
      (document.getElementById('player')as any).load();
      (document.getElementById('player')as any).play();

  }

}
