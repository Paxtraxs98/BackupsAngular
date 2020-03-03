import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { AlbumService } from '../../../services/album.service';
import { ArtistService } from '../../../services/artist.service';
import { UserService } from '../../../services/user.service';
import { SongService } from '../../../services/song.service';
import { FavoritosService } from '../../../services/favoritos.service';
import { PlaylistService } from '../../../services/playlist.service';
import { global } from '../../../services/global';
import { MatDialog } from '@angular/material';
import { DialogSongComponent } from '../../songs/dialog-song/dialog-song.component';
import { AddPlayListComponent } from '../../playlists/add-play-list/add-play-list.component'

@Component({
  selector: 'app-album-detall',
  templateUrl: './album-detall.component.html',
  styleUrls: ['./album-detall.component.css'],
  providers:[AlbumService,ArtistService,SongService,UserService,FavoritosService]
})
export class AlbumDetallComponent implements OnInit {  
  public album;   
  public songs;
  public url;
  public token;
  public identity;
  public playLists;
  public name;
  public repetidos=0;

  constructor(
    private _route:ActivatedRoute,    
    private _albumService:AlbumService,
    private _playList:PlaylistService,
    private _songService:SongService,
    private _userService:UserService,
    private _favoritosService:FavoritosService,
    public dialogSong:MatDialog,
    public dialogPlayList:MatDialog
    ) { 
      this.url=global.url;
      this.token=this._userService.getToken();
      this.identity=this._userService.getIdentity();
  }

  ngOnInit() {
    console.log("Album detall");
    this.getAlbum();
    this.getsongs();
    this.getPlayList();
  }

  getAlbum()
  {
    this._route.params.forEach((params)=>{      
      let id=params['id'];
      this._albumService.getAlbum(id).subscribe(
        (response:any)=>{
            this.album=response.album;          
        },error=>{
          console.log(error);
        }
      );
    });
  }
  getsongs()
  {
    this._route.params.forEach((params)=>{      
      let id=params['id'];
      this._songService.getSongs(id).subscribe(
        (response:any)=>{
          this.songs=response.resultado;
        },error=>{
          console.log(error);
        }
      );
    });
  }
  getPlayList()
  {
    this._playList.getPlayLists(this.identity._id).subscribe(
      (response:any)=>{        
        this.playLists=response.PlayLists;                
      },error=>{
        console.log(error);
      }      
    );
  }
  openDialogAdd(): void {
    this._route.params.forEach((params)=>{      
      let idAlbum=params['id'];
      const dialogRef = this.dialogSong.open(DialogSongComponent, {
        width: '400px',      
        data: {album:idAlbum,dialog:"add"}
      });
  
      dialogRef.afterClosed().subscribe(result => {      
        this.getsongs();
      });
    });
    
  }
  openDialogEdit(idSong): void {
    
      this._songService.getSong(idSong).subscribe(
        (response:any)=>{          
          const dialogRef = this.dialogSong.open(DialogSongComponent, {
            width: '400px',      
            data: {idSong:idSong,number:response.song.number,name:response.song.name,duration:response.song.duration,genero:response.song.genero,dialog:"editar"}
          });
      
          dialogRef.afterClosed().subscribe(result => {      
            this.getsongs();
          });    
        },error=>{
          console.log(error);
        }
      );
    
  }
  openDialogCreate(): void {
    const dialogRef = this.dialogPlayList.open(AddPlayListComponent, {
      width: '250px',
      data: {name: this.name,dialog:"add"}
    });

    dialogRef.afterClosed().subscribe(result => {      
      this.getPlayList();
    });
  }
  addFavoritos(idSong)
  {    
    this._favoritosService.addFavorites(idSong).subscribe(
      (response:any)=>{
        this.getsongs();
      },error=>{
        console.log(error);
      }
    );
  }
  addSongPlayList(idPlayList,idSong)
  {
    this._playList.getPlayList(idPlayList).subscribe(
      (response:any)=>{
        let canciones=response.detallPlay[0].playlist;
        for (const i in canciones) {                     
            if(canciones[i]._id == idSong)
            {
              this.repetidos++;              
            }            
        }
        if(this.repetidos!=0)
        {
          Swal.fire({
            icon: 'error',
            title: 'Ooupps',
            text: 'Esta cancion ya esta en la PlayList',
            timer: 2000,
          }); 
          this.repetidos=0;
        }
        else
        {
          this._playList.addSongPlayList(idPlayList,idSong).subscribe(
            (response:any)=>{          
              if(!response.saveplay)
              {
                Swal.fire({
                  icon: 'error',
                  title: 'Ouppss!!',
                  text: "Error al guardar cancion en la PlayList",
                  timer: 2000,
                }); 
              }
              else
              {
                Swal.fire({
                  icon: 'success',
                  title: 'Peticion Exitosa',
                  text: response.message,
                  timer: 2000,
                }); 
              }
            },error=>{
              console.log(error);
            }
          );
          this.repetidos=0;
        }
        
      },error=>{
        console.log(error);
      }
    );
      
  }
  removeFavoritos(idSong)
  {
    this._favoritosService.removeFavoritos(idSong).subscribe(
      (response:any)=>{        
        this.getsongs();
      },error=>{
        console.log(error);
      }
    );
  }
  deleteSong(idSong)
  {
    Swal.fire({
      title: 'Esta seguro?',
      text: "Eliminará este artista..",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) 
      {
        this._songService.deleteSong(idSong).subscribe(
          (response:any)=>
          {
            if(!response.deleteSong)
            {
                console.log("no tiene artistas");
            }
            else
            {
                this.getsongs();      
            }
          },
          error=>
          {
            console.log(error);
          }  
          );
      }
    })    
  }
  start(song)
  {       
    console.log(song);
      song.type='song';
      let song_player = JSON.stringify(song);             
      let file_path = this.url + 'getFileSong/'+song.file;                    
      localStorage.setItem("sound-song",song_player);        
      document.getElementById('mp3-sources').setAttribute("src",file_path);      
      (document.getElementById('player')as any).load();
      (document.getElementById('player')as any).play();

  }
 

}
