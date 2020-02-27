import { Component,OnInit,Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { global } from '../../../services/global';
import { Router,ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { UserService } from '../../../services/user.service';
import { uploadService } from "../../../services/upload.service";
import {ArtistService} from '../../../services/artist.service';
import {AlbumService} from '../../../services/album.service';

export interface DialogData {
  id:string,  
  name:string,
  ano:string,
  description:string,
  dialog: string;  
}

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.css']
})
export class AddAlbumComponent implements OnInit {
  public title;
  public identity;
  public token;
  public url;
  FormAlbum:FormGroup;
  public filesToUpload: Array<File>

  constructor(
    private _userService:UserService,
    private _route:ActivatedRoute,
    private _router:Router,
    private _uploadService:uploadService,
    private _artistService:ArtistService,
    private _albumService:AlbumService,
    public dialogRef: MatDialogRef<AddAlbumComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) 
  {
      this.title="Agregar Album"
      this.url=global.url;
  }

  ngOnInit() 
  {
    console.log("Album Add");    
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
    this.FormAlbum=new FormGroup({
      name:new FormControl(this.data.name,[Validators.required]),
      description:new FormControl(this.data.description,[Validators.required]),      
      ano:new FormControl(this.data.ano,[Validators.required])      
    });    
  }  

  addAlbum(dataAlbum)
  {          
        this._albumService.saveAlbum(this.data.id,dataAlbum).subscribe(
          (response:any)=>{
            if (this.filesToUpload) 
            {
              this._uploadService.makerFileRequest(this.url+'uploadImageAlbum/'+response.saveAlbum._id,[],this.filesToUpload,this.token,'imagen').then(
               (result:any) =>{
                 Swal.fire({
                   icon: 'success',
                   title: 'Peticion Exitosa',
                   text: response.message,
                   timer: 2000,
                 });                            
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
  }
  editAlbum(dataAlbum)
  {    
    this._albumService.update_Album(this.data.id,dataAlbum).subscribe(
      (response:any)=>{            
        if (!this.filesToUpload) {
          Swal.fire({
            icon: 'success',
            title: 'Modificacion Exitosa',
            text: response.message,
            timer: 2000,
          });           
        }
        else{
            this._uploadService.makerFileRequest(this.url+'uploadImageAlbum/'+this.data.id,[],this.filesToUpload,this.token,'imagen').then(
            (result:any) =>{
              Swal.fire({
                icon: 'success',
                title: 'Modificacion Exitosa',
                text: response.message,
                timer: 2000,
                });                                             
            }
        );
      }
      },error=>{
        console.log(error);
      }
    );      
  }
  fileChangeEvent(fileInput: any)
  {
    this.filesToUpload= <Array<File>>fileInput.target.files;
  }
}
