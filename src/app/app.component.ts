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
  public confirmAccount;
  private token;
  constructor(private _useService:UserService)
  {
    
  }

  ngOnInit()
  {
      this.identity=this._useService.getIdentity();            
      var URLactual = window.location;
      var dividir= JSON.stringify(URLactual);
      if(dividir.includes('ConfirmAccount'))
      {        
        this.confirmAccount=true;
        // this.Validar();
      }      
      else{
        this.confirmAccount=false;
      }      
}


}
