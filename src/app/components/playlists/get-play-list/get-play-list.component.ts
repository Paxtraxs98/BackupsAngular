import { Component, OnInit,ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { PlaylistService } from '../../../services/playlist.service';
import { UserService } from '../../../services/user.service' ;
import { AddPlayListComponent } from '../add-play-list/add-play-list.component'
import { BarraSuperiorComponent } from '../../barra-superior/barra-superior.component'

@Component({
  selector: 'app-get-play-list',
  templateUrl: './get-play-list.component.html',
  styleUrls: ['./get-play-list.component.css'],
  providers:[BarraSuperiorComponent]
})
export class GetPlayListComponent implements OnInit {
  

  displayedColumns: string[]=['namePlayList','actions'];   
  public identity;
  public token;
  public playLists;
  public name: string;
  public id:string;

  constructor(
    public _playListService:PlaylistService,
    public _userService:UserService,    
    public dialogPlayList:MatDialog,
    public _repro:BarraSuperiorComponent
  ) { }

  ngOnInit() {
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
    this.getPlayLists();
  }
  getPlayLists()
  {
    this._playListService.getPlayLists(this.identity._id).subscribe(
      (response:any)=>{        
        this.playLists=response.PlayLists;        
      },error=>{
        console.log(error);
      }      
    );
  }
  openDialogAdd(): void {
    const dialogRef = this.dialogPlayList.open(AddPlayListComponent, {
      width: '250px',
      data: {name: this.name,dialog:"add"}
    });

    dialogRef.afterClosed().subscribe(result => {      
      this.getPlayLists();
    });
  }
  openDialogEdit(id): void {    
    this._playListService.getPlayList(id).subscribe(
      (response:any)=>{        
        for (const play in response.detallPlay) {          
          this.id=response.detallPlay[play]._id;
          this.name=response.detallPlay[play].namePlayList;
        }
        const dialogRef = this.dialogPlayList.open(AddPlayListComponent, {
          width: '250px',
          data: {id:this.id,name: this.name,dialog:"edit"}
        });
    
        dialogRef.afterClosed().subscribe(result => {      
          this.getPlayLists();
        });
        
      },error=>{
        console.log(error);
      }
    );    
  }
  deletePlayList(id){
    Swal.fire({
      title: 'Esta seguro?',
      text: "Eliminará esta playList..",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) 
      {
        this._playListService.deletePlayList(id).subscribe(
          (response:any)=>{
            this.getPlayLists();
          }
          ,error=>{
            console.log(error)
          });
      }
    })   
  }
  startplayList(idPlayList)
  {    
    var playPlay={};
    this._playListService.getPlayList(idPlayList).subscribe(
      (response:any)=>{        
        playPlay={song:response.detallPlay,type:'playlist'};              
        var song_player = JSON.stringify(playPlay);        
        localStorage.setItem("sound-song",song_player);        
        this._repro.reproducir('nueva')
        
      },error=>{
        console.log(error);
      }
    );
  }

}
