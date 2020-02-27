import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from './services/user.service';
import { global } from './services/global';
import { Router,ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UserService]
})
export class AppComponent implements OnInit{  

  public identity;
  constructor(private _useService:UserService)
  {
    
  }

  ngOnInit()
  {
      this.identity=this._useService.getIdentity();            
  }

}
