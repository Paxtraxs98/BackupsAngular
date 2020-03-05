import { Component, OnInit } from '@angular/core';
import { BuscadorService } from '../../../services/buscador.service'
import {  global } from '../../../services/global'
import { FormGroup,FormControl, Form } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

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
  palabra:FormControl;  

  constructor(
    private _buscadorService:BuscadorService
  ) { 
    this.url=global.url
  }

  ngOnInit() {    
     this.palabra=new FormControl('');  
     this.palabra.valueChanges.pipe(debounceTime(200)).subscribe(
       (palabra)=>{
      this.applyFilter(palabra)     ;
       }
     );
  }
  //usar en futuras peticiones
  applyFilter(palabra:string) {        
    this._buscadorService.search(palabra).subscribe(
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
      
      song.type='song';
      let song_player = JSON.stringify(song);             
      let file_path = this.url + 'getFileSong/'+song.file;                    
      localStorage.setItem("sound-song",song_player);        
      document.getElementById('mp3-sources').setAttribute("src",file_path);      
      (document.getElementById('player')as any).load();
      (document.getElementById('player')as any).play();

  }

}
