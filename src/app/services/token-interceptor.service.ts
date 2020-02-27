import { Injectable,Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent,HttpClient,HttpHeaders } from '@angular/common/http'
import { UserService } from './user.service'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TokenInterceptorService implements HttpInterceptor {
  public token;

  constructor(private _userService:UserService) { 
    this.token=this._userService.getToken();    
  } 

  // intercept(req,next){  
    
  //   let token=this._userService.getToken();    
  //   let tokenizedReq=req.clone({
  //     setHeaders:{        
  //       Authorization:token
  //     }
  //   });  
  //   return next.handle(tokenizedReq);
  // }
  intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
    console.log("entra al interceptor");   
    if(this.token)
    {
      let headers = new HttpHeaders(
        {'Content-Type':'application/json','Authorization':this.token}
      );
      const cloned=req.clone({
        headers               
      });
      return next.handle(cloned);
    }
    else{
      let headers = new HttpHeaders(
        {'Content-Type':'application/json'}
      );
      const cloned=req.clone({
        headers
      });
      return next.handle(cloned);
    }
  }
}
