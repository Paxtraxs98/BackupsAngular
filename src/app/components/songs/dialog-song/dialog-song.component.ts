import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { UserService } from '../../../services/user.service';
import { SongService } from '../../../services/song.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneroService } from '../../../services/genero.service'
import { uploadService } from "../../../services/upload.service";
import { global } from '../../../services/global';



export interface DialogData {  
  idSong:string;
  number: string;
  name: string;
  duration: string;
  album: string;
  genero: string;
  dialog:string;
}
export interface Genero {
  _id: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-dialog-song',
  templateUrl: './dialog-song.component.html',
  styleUrls: ['./dialog-song.component.css']
})
export class DialogSongComponent implements OnInit {

  FormSong:FormGroup;
  public generos;
  public filesToUpload: Array<File>
  public url;
  public token;
  public identity;

  constructor(
    private _userService:UserService,
    private _songService:SongService,
    private _generoService:GeneroService,
    private _uploadService:uploadService,    
    public dialogRef: MatDialogRef<DialogSongComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData 
  ) {
    this.url=global.url;
   }

  ngOnInit() {
    console.log("Add Song");
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
    this.FormSong=new FormGroup({
      number:new FormControl(this.data.number,[Validators.required]),
      name:new FormControl(this.data.name,[Validators.required]),  
      duration:new FormControl(this.data.duration,[Validators.required]),  
      genero:new FormControl(this.data.genero,[Validators.required]),  
    }); 
    this.getGeneros();    
  }
  getGeneros()
  {
    this._generoService.getGeneros().subscribe(
      (response:any)=>{
        this.generos=response.genero;                
      },error=>{
          console.log(error);
      }
    );
  }
  addSong(dataSong)
  {
    this._songService.saveSong(this.data.album,dataSong).subscribe(
      (response:any)=>{
        if(!response.saveSong)
        {
          Swal.fire({
            icon: 'error',
            title: 'Ooupps',
            text: 'Error al Agregar Cancion',
            timer: 2000,
          });  
        }
        else
        {            
          if (this.filesToUpload) {
            this._uploadService.makerFileRequest(this.url+'uploadSong/'+response.saveSong._id,[],this.filesToUpload,this.token,'file').then(
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
      },error=>{
        console.log(error);
      }
    );
    
  }
  editSong(songData)
  {
    this._songService.updateSong(this.data.idSong,songData).subscribe(
      (response:any)=>{
        if(!response.updateSong)
        {
          Swal.fire({
            icon: 'error',
            title: 'Ooupps',
            text: 'Error al Agregar Cancion',
            timer: 2000,
          });  
        }
        else
        {            
          if (this.filesToUpload) {
            this._uploadService.makerFileRequest(this.url+'uploadSong/'+response.updateSong._id,[],this.filesToUpload,this.token,'file').then(
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
      },error=>{
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
