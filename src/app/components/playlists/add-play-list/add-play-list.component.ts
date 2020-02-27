import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { PlaylistService } from '../../../services/playlist.service'
import { global } from '../../../services/global'

export interface DialogData {
  id:string;
  name: string; 
  dialog:string; 
}

@Component({
  selector: 'app-add-play-list',
  templateUrl: './add-play-list.component.html',
  styleUrls: ['./add-play-list.component.css']
})
export class AddPlayListComponent implements OnInit {

  FormplayList:FormGroup;
  public url;

  constructor(
    private _playList:PlaylistService,
    public dialogRef: MatDialogRef<AddPlayListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.url=global.url;
   }

  ngOnInit() {
    this.FormplayList=new FormGroup({
      namePlayList:new FormControl(this.data.name,[Validators.required]),      
    });         
  }
  addPlayList(data)
  {
    this._playList.savePlayList(data).subscribe(
      (response:any)=>{                             
        if(!response.playlistSave)
        {
          Swal.fire({
            icon: 'error',
            title: 'Oupps!!!',
            text: 'Error al guardar PlayList',
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
      },
      error=>{
        console.log(error)
      }
    );
  }
  editPlayList(data)
  {
    this._playList.updatePlayList(this.data.id,data).subscribe(
      (response:any)=>{          
        if(!response.playlist)
        {
          Swal.fire({
            icon: 'error',
            title: 'Oupps!!!',
            text: 'Error al modificar PlayList',
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
      },
      error=>{
        console.log(error)
      }
    );
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
