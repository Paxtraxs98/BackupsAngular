import { Component, OnInit } from '@angular/core';
import { BuscadorService } from '../../../services/buscador.service'
import {  global } from '../../../services/global'
import { FormGroup,FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public albums;
  public artists;
  public songs;
  public url;
  FormFilter:FormGroup

  constructor(
    private _buscadorService:BuscadorService
  ) { 
    this.url=global.url
  }

  ngOnInit() {    
    this.FormFilter=new FormGroup({
      palabra:new FormControl(''),      
    });        
  }
  applyFilter(event: Event) {
    // const palabra = (event.target as HTMLInputElement).value;        
    this._buscadorService.search(this.FormFilter.value.palabra).subscribe(
      (response:any)=>{        
        this.albums=response.Albums;
        this.artists=response.Artistas;
        this.songs=response.Songs;                        
      },error=>{
        console.log(error);
      }
    );

  }
  start(song)
  {        
      console.log(song);
      let song_player = JSON.stringify(song);       
      let file_path = this.url + 'getFileSong/'+song.file;                    
      localStorage.setItem("sound-song",song_player);        
      document.getElementById('mp3-sources').setAttribute("src",file_path);      
      (document.getElementById('player')as any).load();
      (document.getElementById('player')as any).play();

  }

}
