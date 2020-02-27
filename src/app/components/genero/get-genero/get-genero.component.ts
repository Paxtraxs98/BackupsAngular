import { Component, OnInit, Inject } from '@angular/core';
import { GeneroService } from '../../../services/genero.service';
import { UserService } from '../../../services/user.service' ;
import { AddGeneroComponent } from '../dialog-genero/add-genero.component' ;
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-get-genero',
  templateUrl: './get-genero.component.html',
  styleUrls: ['./get-genero.component.css'],
  providers:[GeneroService,UserService]
})
export class GetGeneroComponent implements OnInit {

  displayedColumns: string[];   
  public generos;
  public identity;
  public token;
  public genero: string;
  public description: string;

  constructor(
    private _generoService:GeneroService,
    private _userService:UserService,
    public dialogGenero:MatDialog    
    ) {}

  ngOnInit() {
    this.getgeneros();    
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
    if(this.identity.role=='ROLE_ADMIN')
    {
      this.displayedColumns= ['name', 'description', 'actions'];
    }
    else
    {
      this.displayedColumns= ['name', 'description'];
    }
  }
  getgeneros()
  {
    this._generoService.getGeneros().subscribe(
      (response:any)=>{        
        this.generos=response.genero;                 
      },error=>{
        console.log(error);
      }
    );
  } 
  openDialogAdd(): void {
    const dialogRef = this.dialogGenero.open(AddGeneroComponent, {
      width: '250px',
      data: {name: this.genero, description: this.description,dialog:"add"}
    });

    dialogRef.afterClosed().subscribe(result => {      
      if(result!=undefined)
      {
        this.saveGenero(result);   
      }      
    });
  }
  saveGenero(data)
  {    
      this._generoService.addGanero(data).subscribe(
        (response:any)=>{
          Swal.fire({
            icon: 'success',
            title: 'Peticion Exitosa',
            text: response.message,
            timer: 2000,
          });           
          this.getgeneros();          
        },error=>{
          console.log(error);
        }
      );
  }
  openDialogEdit(idGenero): void {      
    console.log(idGenero)
    this._generoService.getGenero(idGenero).subscribe(
      (response:any)=>{            
          const dialogRef = this.dialogGenero.open(AddGeneroComponent, {
            width: '250px',
            data: {id:idGenero,name: response.genero.name, description: response.genero.description,dialog:"editar"}
          });      
          dialogRef.afterClosed().subscribe(result => {      
            if(result!=undefined)
            {              
              this.editGenero(idGenero,result);                 
              
            }      
          });
      },error=>{
        console.log(error);
      }
    );
    
  }
  editGenero(id,data)
  {
    this._generoService.updateGenero(id,data).subscribe(
      (response:any)=>{
        if(!response.genero)
        {
          Swal.fire({
            icon: 'error',
            title: 'Error al modificar el Genero',
            text: response.message,
            timer: 2000,
          });           
          this.getgeneros();      
        } 
        else
        {
          Swal.fire({
            icon: 'success',
            title: 'Peticion Exitosa',
            text: response.message,
            timer: 2000,
          });           
          this.getgeneros();      
        }   
      },error=>{
        console.log(error);
      }
    );
  }
  openDialogSongs(idGenero): void {      
    const dialogRef = this.dialogGenero.open(AddGeneroComponent, {
      width: '250px',
      data: {id:idGenero,dialog:"songs"}
    });      
  
  }
  deleteGenero(idGenero)
  {
    Swal.fire({
      title: 'Esta seguro?',
      text: "Eliminará este genero?..",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) 
      {        
        this._generoService.deleteGenero(idGenero).subscribe(
          (response:any)=>
          {           
           this.getgeneros();
          },
          error=>
          {
            console.log(error);
          }  
          );
      }
    })  
  }

}
