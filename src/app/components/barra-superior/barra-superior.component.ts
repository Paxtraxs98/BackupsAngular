import { Component, OnInit } from '@angular/core';
import  { UserService } from '../../services/user.service';
import { global } from '../../services/global'
import Swal from 'sweetalert2';


@Component({
  selector: 'app-barra-superior',
  templateUrl: './barra-superior.component.html',
  styleUrls: ['./barra-superior.component.css'],  
})
export class BarraSuperiorComponent implements OnInit {
  public identity;
  public token;
  public song;
  public url;  
  
  public contador;
  constructor(private _userService:UserService) {
    this.url=global.url;    
    this.contador=0;
   }

  ngOnInit() {
      this.identity=this._userService.getIdentity();
      this.token=this._userService.getToken();
      this.reproducir();
  }

  reproducir(tipoReproduccion='') {    
    if(tipoReproduccion=='nueva')
    {
      this.contador=0;      
    }    
    var playlist = JSON.parse(localStorage.getItem('sound-song'));                              
    var audio=document.getElementById('player');      
    if(playlist)
    { 
      var tipo= playlist.type;       
      switch(tipo)
      {
        case 'song':
              console.log("es una cancion");        
              this.song=playlist;                
          break;
        case 'playlist':
            var song_seleccionada=playlist.song[0].playlist;                      
            console.log("es una playlist");                            
            this.song=song_seleccionada[this.contador];            
            if(this.contador>=song_seleccionada.length)
            {
                console.log("la playlist se acabo");
                this.song=song_seleccionada[this.contador-1];
                (audio as any).load();
                (audio as any).pause();
            }
            else{            
                document.getElementById('mp3-sources').setAttribute("src",this.url + 'getFileSong/'+this.song.file);      
                (audio as any).load();
                (audio as any).play();
                this.nextSong();                              
            } 
          break;
        case 'album':
            this.song=playlist.song[this.contador].song;
            console.log('album');     
            var long=playlist.song.length-1;            
            if(this.contador>long)
           {              
              this.song=playlist.song[this.contador-1].song.file;
              (audio as any).load();
              (audio as any).pause();
            }
            else
            {                                 
              var song_seleccionada=playlist.song[this.contador].song.file;                
              document.getElementById('mp3-sources').setAttribute("src",this.url + 'getFileSong/'+song_seleccionada);      
              (audio as any).load();
              (audio as any).play();
              this.nextSong();                              
            } 
          break;
      }
      
      // if(tipo=='song')
      // {
      //   // var song_seleccionada=playlist
      //   console.log("es una cancion");        
      //   this.song=playlist;       
                 
      // }
      // else
      // {
      //   if(tipo=='playlist')
      //   {
      //     var song_seleccionada=playlist.song[0].playlist;                      
      //     console.log("es una playlist");
      //     // var songs=song_seleccionada;                    
      //     // this.song=songs[this.contador];                         
      //     this.song=song_seleccionada[this.contador];
      //     // if(this.contador>=songs.length)
      //     if(this.contador>=song_seleccionada.length)
      //     {
      //         console.log("la playlist se acabo");
      //         this.song=song_seleccionada[this.contador-1];
      //         (audio as any).load();
      //         (audio as any).pause();

      //     }
      //     else{            
      //       document.getElementById('mp3-sources').setAttribute("src",this.url + 'getFileSong/'+this.song.file);      
      //       (audio as any).load();
      //       (audio as any).play();
      //       this.nextSong();                              
      //     }          
      //   }
      //   else
      //   {
      //     if(tipo=='album')
      //     {
      //       // this.song=['','','',''];            
      //       this.song=playlist.song[this.contador].song;
      //       console.log('album');     
      //       var long=playlist.song.length-1;            
      //       if(this.contador>long)
      //      {              
      //         this.song=playlist.song[this.contador-1].song.file;
      //         (audio as any).load();
      //         (audio as any).pause();

      //       }
      //       else{                                 
      //         var song_seleccionada=playlist.song[this.contador].song.file;                
      //         document.getElementById('mp3-sources').setAttribute("src",this.url + 'getFileSong/'+song_seleccionada);      
      //         (audio as any).load();
      //         (audio as any).play();
      //         this.nextSong();                              
      //       }   
      //     }
      //   }
      // }      
    }        
    else
    {
      this.song=['','','',''];
      console.log("no hay cancion");
    }
  }
  nextSong()
  {        
    var audio=document.getElementById('player');  
    (audio as any).onended= () => {
      console.log("se acabo la cancion");            
      this.contador++;
      this.reproducir();
      
    };    
    
  }
  openMenu()
  {
    var menuOpen = document.getElementById('menuMusify');
    var btnOpen = document.getElementById('btnOpen');
    var btnClose = document.getElementById('btnClose');
    btnOpen.style.display="none";
    btnClose.style.display="block";
    menuOpen.style.display='block';
  }
  closeMenu()
  {
    var menuOpen = document.getElementById('menuMusify');
    var btnOpen = document.getElementById('btnOpen');
    var btnClose = document.getElementById('btnClose');
    btnOpen.style.display="block";
    btnClose.style.display="none";
    menuOpen.style.display='none';
  }
  logout()
  {   
      localStorage.removeItem('identity');
      localStorage.removeItem('token');
      localStorage.clear();      
      this.identity=null;
      this.token=null;              
      Swal.fire({
        icon: 'success',
        title: 'Sesion Cerrada',        
        timer: 2000,
      }).then(function(){ 
        location.reload();
        });
  }

}
