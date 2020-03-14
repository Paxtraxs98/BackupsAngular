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
  public login;
  public register;
  public contador;
  public account;
  constructor(private _userService:UserService) {
    this.url=global.url;    
    this.contador=0;
    this.login=false;
    this.register=false;
    this.account=true
   }

  ngOnInit() {
      this.identity=this._userService.getIdentity();      
      this.token=this._userService.getToken();
      var URLactual = window.location;
      var dividir= JSON.stringify(URLactual);
      if(dividir.includes('ConfirmAccount'))
      {        
        this.account=false;
      }              
      if(this.identity)
      {
        this.reproducir();
      }      
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
            console.log(song_seleccionada.length);
            if(this.contador>=song_seleccionada.length)
            {
                console.log("la playlist se acabo");
                this.contador=0;                               
                var song=song_seleccionada[this.contador].file           
                document.getElementById('mp3-sources').setAttribute("src",this.url + 'getFileSong/'+song); 
                (audio as any).load();
                (audio as any).pause();
            }
            else{            
              this.song=song_seleccionada[this.contador];            
                document.getElementById('mp3-sources').setAttribute("src",this.url + 'getFileSong/'+this.song.file);      
                (audio as any).load();
                (audio as any).play();
                this.nextSong();                              
            } 
          break;
        case 'album':          
            console.log('album');     
            var long=playlist.song.length;                                    
            if(this.contador==long)
           {              
             this.contador=0;
             console.log("Se acabo el album");
              this.song=playlist.song[this.contador].song;
              var song_seleccionada=playlist.song[this.contador].song.file;                
              document.getElementById('mp3-sources').setAttribute("src",this.url + 'getFileSong/'+song_seleccionada);      
              (audio as any).load();
              (audio as any).pause();              
            }
            else
            {                                 
              var song_seleccionada=playlist.song[this.contador].song.file;                
              this.song=playlist.song[this.contador].song;
              document.getElementById('mp3-sources').setAttribute("src",this.url + 'getFileSong/'+song_seleccionada);      
              (audio as any).load();
              (audio as any).play();
              this.nextSong();                              
            } 
          break;
      }        
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
  openLogin()
  {      
      document.getElementById('registerContent').style.display = 'none';
      document.getElementById('loginContent').style.display = 'block';        
  }
  openRegister()
  {     
      document.getElementById('loginContent').style.display = 'none';
      document.getElementById('registerContent').style.display = 'block';        
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
