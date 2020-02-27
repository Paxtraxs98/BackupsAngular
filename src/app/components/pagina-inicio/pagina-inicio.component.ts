import { Component, OnInit } from '@angular/core';
import {UserService } from '../../services/user.service';
import {global}from '../../services/global'

@Component({
  selector: 'app-pagina-inicio',
  templateUrl: './pagina-inicio.component.html',
  styleUrls: ['./pagina-inicio.component.css'],
  providers:[UserService]
})
export class PaginaInicioComponent implements OnInit {
  public token;
  public identity;
  public url;

  constructor(private _userService:UserService) { 
    this.url=global.url
  }

  ngOnInit() {
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
  }

}
