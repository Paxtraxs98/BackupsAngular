import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import { global } from '../../services/global';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']  
})
export class InicioComponent implements OnInit {
  public identity;
  public token;
  public url:string;
  
  constructor(
    private _userService:UserService,
    private _router:Router) { 
     this.url=global.url;
  }

  ngOnInit() {
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
  }

}
