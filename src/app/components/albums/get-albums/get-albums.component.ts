import { Component,OnInit } from '@angular/core';
import { global } from '../../../services/global';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material';

import { UserService } from '../../../services/user.service';
import {AlbumService} from '../../../services/album.service';
import {SongService} from '../../../services/song.service';
import { AddAlbumComponent } from '../../../components/albums/add-album/add-album.component'
import { BarraSuperiorComponent } from '../../barra-superior/barra-superior.component'


@Component({
  selector: 'app-get-albums',
  templateUrl: './get-albums.component.html',
  styleUrls: ['./get-albums.component.css']  ,
  providers:[BarraSuperiorComponent]

})
export class GetAlbumsComponent implements OnInit {
  public title;
  public identity;
  public token;
  public url;    
  public albums;
  
  constructor(
    private _userService:UserService,
    private _albumService:AlbumService,
    public _songService:SongService,
    public _repro:BarraSuperiorComponent,
    public dialogArtist:MatDialog) 
  {
    this.url=global.url;
    this.title="Albums";
  }

  ngOnInit() {
    this.token=this._userService.getToken();
    this.identity=this._userService.getIdentity();    
    this.getAlbums();
  }
  getAlbums()
  {
    this._albumService.getAlbums('').subscribe(
      (response:any)=>{
          this.albums=response.albums;          
      }
      ,error=>{
        console.log(error);
      }
    );
  }
  openDialogedit(idAlbum):void
  {   
      this._albumService.getAlbum(idAlbum).subscribe(
        (response:any)=>{            
          
          const dialogRef = this.dialogArtist.open(AddAlbumComponent, {
            width: '400px',
            data: {id:response.album._id,name: response.album.name, ano: response.album.ano,description:response.album.description,dialog:"editar"}
          });      
          dialogRef.afterClosed().subscribe(result => {      
            this.getAlbums();  
          });
        },error=>{
          console.log(error);
        }
      );    
  }
  deleteAlbum(idAlbum){
    Swal.fire({
      title: 'Esta seguro?',
      text: "Eliminará este album..",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) 
      {
        this._albumService.deleteArtist(idAlbum).subscribe(
          (response:any)=>{
            Swal.fire({
              icon: 'success',
              title: 'Peticion Exitosa',
              text: response.message,
              timer: 2000,
            }); 
            this.getAlbums();
          }
          ,error=>{
            console.log(error)
          });
      }
    })   
  }
  startAlbum(idAlbum)
  {
    var playAlbum={};
    this._songService.getSongs(idAlbum).subscribe(
      (response:any)=>{        
        playAlbum={song:response.resultado,type:'album'};              
        var song_player = JSON.stringify(playAlbum);        
        localStorage.setItem("sound-song",song_player); 
        this._repro.reproducir('nueva')
      },error=>{
        console.log(error);
      }
    );
  }
}
