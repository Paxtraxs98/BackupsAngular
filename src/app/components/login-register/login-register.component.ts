import { Component,OnInit,ViewChild,ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user.service';
import {  BarraSuperiorComponent } from '../../components/barra-superior/barra-superior.component'
import { global } from '../../services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css'],
  providers:[BarraSuperiorComponent]
})
export class LoginRegisterComponent implements OnInit {
  FormLogin:FormGroup; 
  FormRegister:FormGroup; 
  public token;
  public identity;
  public url:string;
  public userRegister;
  public spinnerStatus=false;    

  auth2: any;
 
  @ViewChild('loginRef', {static: true }) loginElement: ElementRef;
  
  constructor(
    private _userSevice:UserService,
    private _barraSuperior:BarraSuperiorComponent,
    private _fb:FormBuilder)
  {
    this.url=global.url;
    
  }  

  ngOnInit() {
    this.token = this._userSevice.getToken();
    this.identity = this._userSevice.getIdentity();               
    
    // this.exampleForm = this._fb.group
    this.FormLogin=new FormGroup({
        email:new FormControl('',[Validators.required, Validators.email]),
        password:new FormControl('',[Validators.required])
      });  
    this.FormRegister=new FormGroup({
        name:new FormControl('',[Validators.required]),
        email:new FormControl('',[Validators.required, Validators.email]),
        password:new FormControl('',[Validators.required,Validators.minLength(4)])
      });      
      this.googleSDK();
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
                       Swal.fire({
                          icon: 'error',
                          title: 'Ooops!!',
                          text: error.error.message,
                          timer: 2000,
                        });
                     }
                   }
                 );
             }
          },error =>{            
            if(<any>error)
                 {                   
                  Swal.fire({
                     icon: 'error',
                     title: 'Ooops!!',
                     text: error.error.message,
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
                  title: 'Tu registro fue exitoso!',
                  text: response.message,
                  timer: 2000,
                })    
                this.FormRegister.reset();           
                console.log(response);
                localStorage.setItem('token',JSON.stringify(response.token));                                       
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
  closeModal()
  {   
    document.getElementById('loginContent').style.display = 'none'; 
    document.getElementById('registerContent').style.display = 'none';    
  }
  googleSDK() {
 
    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        this.auth2 = window['gapi'].auth2.init({
          client_id: '1004572504781-hoodv4n6c9ovubrp8n73qv4faeo00kcj.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.prepareLoginButton();
      });
    }
 
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
 
  }
  prepareLoginButton() { 
    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleUser) => { 
        // let profile = googleUser.getBasicProfile();
        // console.log('Token || ' + googleUser.getAuthResponse().id_token);
        // console.log('ID: ' + profile.getId());
        // console.log('Name: ' + profile.getName());
        // console.log('Image URL: ' + profile.getImageUrl());
        // console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE        
        this._userSevice.loginGoogle(googleUser.getAuthResponse().id_token).subscribe(
          (response:any)=>{               
            console.log(response);
            this.identity = response.userSave[0];        
            localStorage.setItem('identity',JSON.stringify(this.identity));                       
            localStorage.setItem('token',JSON.stringify(response.token));                       
            Swal.fire({
              icon: 'success',
              title: 'Bienvenido',
              text: 'Iniciaste sesion correctamente!',
              timer: 2000,
            }).then(function(){ 
              location.reload();
              });
          },error=>{            
            Swal.fire({
              icon: 'error',
              title: 'Ouups',
              text: error.error.message,
              timer: 2000,
            })
          }

        );
 
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      }); 
    }    
}
