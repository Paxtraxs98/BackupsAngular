import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';
import { User } from '../../models/users';
import { Router,ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { FileInput } from 'ngx-material-file-input';
import { uploadService } from "../../services/upload.service";


@Component({
  selector: 'update-user',
  templateUrl: './update-user.html',
   styleUrls: ['./update-user.css'],
  providers:[UserService,uploadService]
})
export class updateUserComponent implements OnInit{  
  public token;
  public identity;
  public url:string;
  public title;
  FormUpdateUser:FormGroup;
  public updateUser:User;
  private encrypt;
  public filesToUpload: Array<File>


  constructor(private _userSevice:UserService,private _route:ActivatedRoute,private _router:Router,private _uploadService:uploadService)
  {
      this.title="Editar Perfil"
      this.url=global.url;                
  }

  ngOnInit()
  {
    this.token = this._userSevice.getToken();    
    this.identity = this._userSevice.getIdentity();            
    this.FormUpdateUser=new FormGroup({
      name:new FormControl(this.identity.name,[Validators.required]),
      email:new FormControl(this.identity.email,[Validators.required, Validators.email]),
      password:new FormControl('',[Validators.minLength(4)]),      
    }); 
    
  } 
  
  onFileComplete(data: any) {
    console.log(data); // We just print out data bubbled up from event emitter.
  }

  onSubmit()
  {       
    
    if(this.FormUpdateUser.value.password)
    { 
      this._userSevice.update_password(this.identity._id,this.FormUpdateUser.value).subscribe(
        (response:any)=>{                    
          this.updateUser = new User (this.identity._id,this.FormUpdateUser.value.name,this.FormUpdateUser.value.email,response.user.password,this.identity.role,this.identity.imagen);             
          this.encrypt=response.user.password;
          this._userSevice.update_user(this.updateUser).subscribe(
            (response:any)=>{
                   if (!this.filesToUpload) {
                    Swal.fire({
                      icon: 'success',
                      title: 'Modificacion Exitosa',
                      text: 'Tu registro fue exitoso!',
                      timer: 2000,
                    });   
                    localStorage.setItem('identity',JSON.stringify(this.updateUser));                                          
                  }
                  else{
                      this._uploadService.makerFileRequest(this.url+'uploadImageUser/'+this.identity._id,[],this.filesToUpload,this.token,'image').then(
                      (result:any) =>{
                        Swal.fire({
                          icon: 'success',
                          title: 'Modificacion Exitosa',
                          text: 'Tu registro fue exitoso!',
                          timer: 2000,
                          });
                          
                          this.updateUser.imagen = result.imagen;                           
                          localStorage.setItem('identity',JSON.stringify(this.updateUser));                         
                          let image_path = this.url + 'imageUser/' + this.updateUser.imagen;                            
                          document.getElementById("identity_image").setAttribute('src',image_path);                                                                     
                      }
                  );
                }
                localStorage.setItem('identity',JSON.stringify(this.updateUser));                
                document.getElementById("identity_name").innerHTML = ""+ this.updateUser.name;                  

            },
            error=>{
              Swal.fire({
                  icon: 'error',
                  title: 'Ooops!!',
                  text:error.error.message,
                  timer: 2000,
                });
            }
          );
        },
        error=>{
          Swal.fire({
            icon: 'error',
            title: 'Ooops!!',
            text:error.error.message,
            timer: 2000,
          });
        }
      )     
    }   
    else
    {
      
      this.updateUser = new User (this.identity._id,this.FormUpdateUser.value.name,this.FormUpdateUser.value.email,this.encrypt,this.identity.role,this.identity.imagen);             
      
          this._userSevice.update_user(this.updateUser).subscribe(
              (response:any)=>{
                  if (!this.filesToUpload) {
                    Swal.fire({
                      icon: 'success',
                      title: 'Modificacion Exitosa',
                      text: 'Tu registro fue exitoso!',
                      timer: 2000,
                    });     
                    localStorage.setItem('identity',JSON.stringify(this.updateUser));                                        
                  }
                  else{                    
                      this._uploadService.makerFileRequest(this.url+'uploadImageUser/'+this.identity._id,[],this.filesToUpload,this.token,'image').then(
                      (result:any) =>{
                          Swal.fire({
                          icon: 'success',
                          title: 'Modificacion Exitosa',
                          text: 'Tu registro fue exitoso!',
                          timer: 2000,
                          });
                          
                          this.updateUser.imagen = result.imagen;                           
                          localStorage.setItem('identity',JSON.stringify(this.updateUser));                         
                          let image_path = this.url + 'imageUser/' + this.updateUser.imagen;                            
                          document.getElementById("identity_image").setAttribute('src',image_path);                                                                       
                      }
                      ,error=>
                      {
                        console.log(error);
                      }
                  );
                }                  
                document.getElementById("identity_name").innerHTML = "" + this.updateUser.name;                        
            },
            error=>{
              Swal.fire({
                  icon: 'error',
                  title: 'Ooops!!',
                  text:error.error.message,
                  timer: 2000,
                });
            }
          );
    }
    
  }
  fileChangeEvent(fileInput: any)
  {
    this.filesToUpload= <Array<File>>fileInput.target.files;
  }
}

