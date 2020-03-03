import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {GeneroService} from '../../../services/genero.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {global} from '../../../services/global'

export interface DialogData {
  name: string;
  description: string;
}

@Component({
  selector: 'app-add-genero',
  templateUrl: './add-genero.component.html',
  styleUrls: ['./add-genero.component.css']  
})
export class AddGeneroComponent implements OnInit { 
  public songs;
  public url;
  FormGenero:FormGroup;

  constructor(
    private _generoService:GeneroService,
    public dialogRef: MatDialogRef<AddGeneroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
      this.url=global.url;
    }

    ngOnInit() {      
      this.getSongs(this.data);
      this.FormGenero=new FormGroup({
        name:new FormControl(this.data.name,[Validators.required]),
        description:new FormControl(this.data.description,[Validators.required])        
      });          
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  getSongs(data)
  {    
    if(data.id)
    {    
      this._generoService.getSongs(data.id).subscribe(
        (response:any)=>{        
          this.songs=response.songs                    
        },error=>{
          console.log(error);
        }
      );
    }    
  }
  start(song)
  {           
    song.type='song';
    let song_player = JSON.stringify(song);             
    let file_path = this.url + 'getFileSong/'+song.file;                    
    localStorage.setItem("sound-song",song_player);        
    document.getElementById('mp3-sources').setAttribute("src",file_path);      
    (document.getElementById('player')as any).load();
    (document.getElementById('player')as any).play();

  }
}
