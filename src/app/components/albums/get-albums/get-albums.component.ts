import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { global } from '../../../services/global';
import { Router,ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { UserService } from '../../../services/user.service';
import {ArtistService} from '../../../services/artist.service';
import {AlbumService} from '../../../services/album.service';
@Component({
  selector: 'app-get-albums',
  templateUrl: './get-albums.component.html',
  styleUrls: ['./get-albums.component.css'],
  providers:[UserService,ArtistService,AlbumService]

})
export class GetAlbumsComponent implements OnInit {
  public title;
  public identity;
  public token;
  public url;    
  public albums;
  
  constructor(private _userService:UserService,private _route:ActivatedRoute,private _router:Router,private _artistService:ArtistService,private _albumService:AlbumService) 
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
}
