import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute , Params} from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ArtistService } from '../../../services/artist.service';
import { AddArtistComponent } from '../add-artist/add-artist.component'
import {global} from '../../../services/global';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-get-artists',
  templateUrl: './get-artists.component.html',
  styleUrls: ['./get-artists.component.css']
})
export class GetArtistsComponent implements OnInit {
  public url;
  public identity;
  public token;
  public next_page;
  public prev_page;
  public artists=<any>[];  
  public name;
  public genero;

  constructor(
    private _route:ActivatedRoute,    
    private _userService:UserService,    
    private _artistService:ArtistService,
    public dialogArtist:MatDialog
    )
  {
      this.url=global.url;
      this.next_page=1;
      this.prev_page=1;
  }

  ngOnInit() 
  {
      this.identity=this._userService.getIdentity();
      this.token=this._userService.getToken();
      this.getArtists();
  }  
  getArtists()
  {
    this._route.params.forEach((params:Params)=>{
      let page=+params['page'];      
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
      this._artistService.getArtists(page).subscribe(
        (response:any)=>{
          if(!response.artists)
          {
              console.log("no tiene artistas");
          }
          else
          {
              this.artists=response.artists; 
          }
        },
        error=>{
          console.log(error);
        }        
      );
    });
  }
  openDialogAdd(): void {
    const dialogRef = this.dialogArtist.open(AddArtistComponent, {
      width: '350px',      
      data: {dialog:"add"}
    });

    dialogRef.afterClosed().subscribe(result => {      
      this.getArtists();
    });
  }
  openDialogEdit(idArtist): void {
    
    this._artistService.getArtist(idArtist).subscribe(
      (response:any)=>{            
        const dialogRef = this.dialogArtist.open(AddArtistComponent, {
          width: '350px',
          data: {id:response.artist._id,name: response.artist.name, genero: response.artist.genero,dialog:"editar"}
        });      
        dialogRef.afterClosed().subscribe(result => {      
          this.getArtists();  
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
                this.getArtists();      
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
}

