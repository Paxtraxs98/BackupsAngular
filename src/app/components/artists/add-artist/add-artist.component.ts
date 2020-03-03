import { Component,OnInit,Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { global } from '../../../services/global';
import Swal from 'sweetalert2';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { uploadService } from "../../../services/upload.service";
import {ArtistService} from '../../../services/artist.service';

export interface DialogData {
  id:string;
  name: string;
  genero: string;
}

@Component({
  selector: 'app-add-artist',
  templateUrl: './add-artist.component.html',
  styleUrls: ['./add-artist.component.css']
  
})
export class AddArtistComponent implements OnInit {

  public title;
  public identity;
  public token;
  public url;
  FormArtist:FormGroup;
  public filesToUpload: Array<File>


  constructor
  (private _userService:UserService, 
    private _uploadService:uploadService,
    private _artistService:ArtistService,
    public dialogRef: MatDialogRef<AddArtistComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) 
  {      
      this.url=global.url;
  }

  ngOnInit() 
  {
    console.log("Artist Add");
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
    this.FormArtist=new FormGroup({
      name:new FormControl(this.data.name,[Validators.required]),
      genero:new FormControl(this.data.genero,[Validators.required])  
    });          
  }
  addArtist(data)
  {
    this._artistService.saveArtist(data).subscribe(
      (response:any)=>{          
          if(!response.ArtistSave)
          {
            Swal.fire({
              icon: 'error',
              title: 'Ooupps',
              text: 'Error al Agregar Artista',
              timer: 2000,
            });  
          }
          else
          {            
            if (this.filesToUpload) {
              this._uploadService.makerFileRequest(this.url+'uploadImageArtist/'+response.ArtistSave._id,[],this.filesToUpload,this.token,'imagen').then(
               (result:any) =>{
                 Swal.fire({
                   icon: 'success',
                   title: 'Peticion Exitosa',
                   text: response.message,
                   timer: 2000,
                 });                            
               }   
            );          
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
          }          
      },
      error=>{
        console.log(error)
      }
    );
  }
  editArtist(values)
  {
    this._artistService.update_Artist(this.data.id,values).subscribe(
      (response:any)=>
      {
        // console.log(response);
        if (!this.filesToUpload) {
          Swal.fire({
            icon: 'success',
            title: 'Modificacion Exitosa',
            text: response.message,
            timer: 2000,
          });           
        }
        else{
            this._uploadService.makerFileRequest(this.url+'uploadImageArtist/'+this.data.id,[],this.filesToUpload,this.token,'imagen').then(
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
      }
      ,error=>
      {
        console.log(error);
      } 
    );
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  fileChangeEvent(fileInput: any)
  {
    
    this.filesToUpload= <Array<File>>fileInput.target.files;             
  }

 
}
