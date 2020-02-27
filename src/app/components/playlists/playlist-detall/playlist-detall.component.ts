import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../../../services/playlist.service'
import { ActivatedRoute,Router } from '@angular/router'
import { global } from '../../../services/global'

@Component({
  selector: 'app-playlist-detall',
  templateUrl: './playlist-detall.component.html',
  styleUrls: ['./playlist-detall.component.css']
})
export class PlaylistDetallComponent implements OnInit {
  displayedColumns: string[]=['name','actions'];
  public url;

  public playList;
  public namePlayList;
  constructor(
    private _playListService:PlaylistService,
    private _route:ActivatedRoute
  ) {
    this.url=global.url;
   }

  ngOnInit() {
    this.getPlayList()
  }

  getPlayList()
  {
    this._route.params.forEach((params)=>{      
      let idPlaylist=params['id'];
      this._playListService.getPlayList(idPlaylist).subscribe(
        (response:any)=>{          
          // this.playList=response.detallPlay;                    
          for (const key in response.detallPlay) {            
            this.playList=response.detallPlay[key].playlist;
            this.namePlayList=response.detallPlay[key].namePlayList;            
          }
          // console.log(this.playList);
        },error=>{
          console.log(error);
        }
      );
    });
  }
  deleteSongPlayList(idSong)
  {     
    this._route.params.forEach((params)=>{      
      let idPlaylist=params['id'];
      this._playListService.removeSongPlayList(idPlaylist,idSong).subscribe(
        (response:any)=>{
          this.getPlayList();
        },error=>{
          console.log(error);
        }
      );
    });
  }
  start(song)
  {       
      
      let song_player = JSON.stringify(song);       
      let file_path = this.url + 'getFileSong/'+song.file;                    
      localStorage.setItem("sound-song",song_player);        
      document.getElementById('mp3-sources').setAttribute("src",file_path);      
      (document.getElementById('player')as any).load();
      (document.getElementById('player')as any).play();

  }
}
