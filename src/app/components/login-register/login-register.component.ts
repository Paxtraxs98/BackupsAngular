import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';
import { Router,ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css'],
  providers:[UserService]
})
export class LoginRegisterComponent implements OnInit {
  FormLogin:FormGroup; 
  FormRegister:FormGroup; 
  public token;
  public identity;
  public url:string;
  public userRegister;
  public spinnerStatus=false;
  public MsjerrorLogin;
  public MsjerrorRegister;  

  constructor(private _userSevice:UserService,private _route:ActivatedRoute,private _router:Router)
  {
    this.url=global.url;
  }  

  ngOnInit() {
    this.token = this._userSevice.getToken();
    this.identity = this._userSevice.getIdentity();        
    this.FormLogin=new FormGroup({
        email:new FormControl('',[Validators.required, Validators.email]),
        password:new FormControl('',[Validators.required])
      });  
    this.FormRegister=new FormGroup({
        name:new FormControl('',[Validators.required]),
        email:new FormControl('',[Validators.required, Validators.email]),
        password:new FormControl('',[Validators.required,Validators.minLength(4)])
      });
  }
  onSubmit()
  {
    //console.log(this.FormLogin);      
    this.spinnerStatus=true;
     setTimeout(()=>{
         this.spinnerStatus=false;             
         this._userSevice.login(this.FormLogin.value).subscribe(
          (response:any) => {        
            this.identity = response.user;        
             if(!this.identity._id)
             {
                 alert("El Usuario no esta identificado");
             } 
             else{          
              localStorage.setItem('identity',JSON.stringify(this.identity));          
                 this._userSevice.login(this.FormLogin.value,'true').subscribe(
                  (response:any) => {                 
                     this.token = response.token;
                     if(this.token.lenght <= 0)
                     {
                       alert("El token no se a geneado");
                     }
                     else{          
                       localStorage.setItem('token',JSON.stringify(this.token));                       
                        Swal.fire({
                          icon: 'success',
                          title: 'Bienvenido',
                          text: 'Iniciaste sesion correctamente!',
                          timer: 2000,
                        }).then(function(){ 
                          location.reload();
                          });
                        
                     }
                   },error =>{
                     if(<any>error)
                     {
                       this.MsjerrorLogin=error.error.message;                   
                       Swal.fire({
                          icon: 'error',
                          title: 'Ooops!!',
                          text: this.MsjerrorLogin,
                          timer: 2000,
                        });
                     }
                   }
                 );
             }
          },error =>{
            console.log(error);
            if(<any>error)
                 {
                   
                  this.MsjerrorLogin=error.error.message;                   
                  Swal.fire({
                     icon: 'error',
                     title: 'Ooops!!',
                     text: this.MsjerrorLogin,
                     timer: 2000,
                   });
                 }
          }
        );
    },3000);
    
  }

  onSubmitRegister()
  {
    this.spinnerStatus=true;
    setTimeout(()=>{
        this.spinnerStatus=false;        
        this._userSevice.saveUser(this.FormRegister.value).subscribe(
          (response:any)=>{        
            if(!response.userSave._id)
            {
                console.log("Error al registrar Usuario");
            }
            else
            {                                
                Swal.fire({
                  icon: 'success',
                  title: 'Registro Exitoso',
                  text: 'Tu registro fue exitoso!',
                  timer: 2000,
                })    
                this.FormRegister.reset();           
            }
          },
          error => {
            console.log(error);            
            Swal.fire({
              icon: 'error',
              title: 'Ooops!!',
              text: error.error.message,
              timer: 2000,
            });
          }
        );
   },5000);
      
  }

}
