import { Component, OnInit } from '@angular/core';
import { UserService}  from '../../../services/user.service'
import Swal from 'sweetalert2';


@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.css']
})
export class ConfirmAccountComponent implements OnInit {
  public identity;
  public token;
  public token_caducado;
  public msj;
  public spinnerStatus;
  constructor(
    private _userService:UserService
  ) { 
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken()
    this.token_caducado=false;
    this.msj="Espere estamos verificando la cuenta..."
  }

  ngOnInit() {
   var URLactual = window.location;
   var dividir= JSON.stringify(URLactual);
   var cadena1=dividir.split('"');   
   var cadena2=cadena1[3].split('/');
   var idUser=cadena2[4];   
   if(this.token)
   {
    this.verificar(idUser);
   }   
   else
   {
    this.msj="Error ,ya ha verificado su cuenta o el tiempo de verificacion caduco..."          
    this.token_caducado=true;
   }
   
  }
  verificar(idUser){
    this.spinnerStatus=true;        
    setTimeout(()=>{
      this.spinnerStatus=false;        
      this._userService.validacion().subscribe(
        (response:any)=>{
          this.msj="Verificacion exitosa..."          
          localStorage.removeItem('token');
        },error=>{          
          this._userService.delete(idUser).subscribe(
            (response:any)=>{              
              Swal.fire({
                icon: 'error',
                title: 'Ooops!!',
                text:"El tiempo de confirmacion a expirado,Registrarse otra vez",
                timer: 5000,
              });
            },error=>{
              console.log(error);
            }
          );
        }
      );  
    },5000);
  }

}
