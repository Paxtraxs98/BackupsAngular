import { Component, OnInit } from '@angular/core';
import  { UserService } from '../../services/user.service';
import { Router,ActivatedRoute } from '@angular/router';
import { global } from '../../services/global'
import Swal from 'sweetalert2';


@Component({
  selector: 'app-barra-superior',
  templateUrl: './barra-superior.component.html',
  styleUrls: ['./barra-superior.component.css'],
  providers:[UserService]
})
export class BarraSuperiorComponent implements OnInit {
  public identity;
  public token;
  public song;
  public url;

  constructor(private _userService:UserService,private _route:ActivatedRoute,private _router:Router) {
    this.url=global.url;
   }

  ngOnInit() {
      this.identity=this._userService.getIdentity();
      this.token=this._userService.getToken();
      var song_seleccionada = JSON.parse(localStorage.getItem('sound-song'));                
      if(song_seleccionada)
      {
        this.song=song_seleccionada;      
      }        
      else
      {
        this.song=['','','',''];
      }
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
