import { Component,OnInit } from '@angular/core';
import { global } from '../../../services/global';
import { Router,ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { UserService } from '../../../services/user.service';
import {ArtistService} from '../../../services/artist.service';
import {AlbumService} from '../../../services/album.service';
import { AddAlbumComponent } from '../../../components/albums/add-album/add-album.component'
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-artist-detall',
  templateUrl: './artist-detall.component.html',
  styleUrls: ['./artist-detall.component.css'],
  providers:[UserService,ArtistService,AlbumService]
})
export class ArtistDetallComponent implements OnInit {
  public title;
  public identity;
  public token;
  public url;  
  public prev_page;
  public next_page;
  public albums;
  public artist;

  constructor(
    private _userService:UserService,
    private _route:ActivatedRoute,
    private _router:Router,
    private _artistService:ArtistService,
    private _albumService:AlbumService,
    public dialogArtist:MatDialog
    ) 
  {
    this.url=global.url;
    this.next_page=1;
    this.prev_page=1;
  }

  ngOnInit() {
    this.token=this._userService.getToken();
    this.identity=this._userService.getIdentity();
    this.getArtist();
    this.getAlbums();
  }
  getAlbums(){
    this._route.params.forEach((params)=>{
      let page=+params['page'];
      let id=params['id'];     
      if(!page)
      {
         page=1;
      }
      else
      {
          this.next_page=page+1;
          this.prev_page=page-1;
          if(this.prev_page==0)
          {
              this.prev_page=1;
          }
      }     

      this._albumService.getAlbums(id,page).subscribe(
        (response:any)=>{
          if(!response.albums)
          {
              console.log("Este artista no contiene Albums");
          }
          else
          {
              this.albums=response.albums;               
          }
        },
        error=>{
          console.log(error);
        }        
      );
    });
  }
  getArtist()
  {
    this._route.params.forEach((params)=>{      
      let id=params['id'];
      this._artistService.getArtist(id).subscribe(
        (response:any)=>{
          this.artist=response.artist;          
        },
        error=>{
          console.log(error);
        }
      );
    });
  }
  openDialogAdd(): void {
    this._route.params.forEach((params)=>{      
      let id=params['id'];      
      const dialogRef = this.dialogArtist.open(AddAlbumComponent, {
        width: '400px',      
        data: {id:id,dialog:"add"}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.getAlbums();
      });
    });
    
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
  deleteArtist(idArtist)
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
        this._artistService.deleteArtist(idArtist).subscribe(
          (response:any)=>
          {
            if(!response.deleteArtist)
            {
                console.log("no tiene artistas");
            }
            else
            {
                this._router.navigate(['Artists/1']);
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
            this.getAlbums();
          }
          ,error=>{
            console.log(error)
          });
      }
    })   
  }
}
