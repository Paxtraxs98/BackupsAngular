import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 
{ 
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatToolbarModule, 
  MatSidenavModule,
  MatMenuModule,
  MatListModule,
  MatDividerModule,
  MatGridListModule,
  MatExpansionModule,
  MatCardModule,
  MatTabsModule,  
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatTooltipModule 
  
} from '@angular/material';
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
import { MaterialFileInputModule } from 'ngx-material-file-input';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MatBadgeModule } from '@angular/material/badge';
import {MatTableModule,MatTableDataSource} from '@angular/material/table'; 
import {MatDialogModule} from '@angular/material/dialog'; 
import {MatSelectModule} from '@angular/material/select';


import { AppComponent } from '../app.component';

const MaterialComponent = [
    MatButtonModule,//agregar estilo botones
    MatButtonToggleModule,//botones toggle
    MatIconModule,//agregar iconos
    MatBadgeModule, //    notificaciones 
    MatProgressSpinnerModule, //spiners
    MatToolbarModule, //barras de navegacion
    MatSidenavModule, //barras de navegacion laterales
    MatMenuModule ,//boton con mas opciones dentro
    MatListModule,//listas ordenadas
    MatDividerModule,//division entre items de una lista como un hr
    MatGridListModule,//division de pantalla como si fuera boostrap cols y rows
    MatExpansionModule,//crea paneles con infomarcion oculta y bl adespliega
    MatCardModule,//cards como boostrap
    MatTabsModule,//barra de completado  por partes 1,2,3....
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatDialogModule,
    MatTableModule,
    MatSelectModule,
    MatSlideToggleModule
];

@NgModule({  
  imports: [
    MaterialComponent
  ],
  exports:[
    MaterialComponent
  ]
})
export class MaterialModule { }
