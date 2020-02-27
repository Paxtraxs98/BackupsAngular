import { ModuleWithProviders } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import {AppComponent} from './app.component';

import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { PaginaInicioComponent } from './components/pagina-inicio/pagina-inicio.component';
import {  updateUserComponent } from './components/users/update-user.component';
import { GetArtistsComponent } from './components/artists/get-artists/get-artists.component';
import { ArtistDetallComponent } from './components/artists/artist-detall/artist-detall.component';
import { GetAlbumsComponent } from './components/albums/get-albums/get-albums.component';
import { AlbumDetallComponent } from './components/albums/album-detall/album-detall.component';
import { GetFavoritosComponent } from './components/favoritos/get-favoritos/get-favoritos.component';
import { GetGeneroComponent } from './components/genero/get-genero/get-genero.component';
import { GetPlayListComponent } from './components/playlists/get-play-list/get-play-list.component';
import { PlaylistDetallComponent } from './components/playlists/playlist-detall/playlist-detall.component';
import { SearchComponent } from './components/buscador/search/search.component';


const appRoutes: Routes = [    
    {path: '',component:PaginaInicioComponent},             
    {path: 'update-user',component:updateUserComponent},
    {path: 'Artists/:page',component:GetArtistsComponent},    
    {path: 'artistDetall/:id',component:ArtistDetallComponent},    
    {path: 'getAlbums',component:GetAlbumsComponent},
    {path: 'albumDetall/:id',component:AlbumDetallComponent},
    {path: 'favoritos/:id',component:GetFavoritosComponent},
    {path: 'generos',component:GetGeneroComponent},            
    {path: 'playlist/:id',component:GetPlayListComponent},            
    {path: 'playlistDetall/:id',component:PlaylistDetallComponent},            
    {path: 'Search',component:SearchComponent},            
    {path: '**',component:PaginaInicioComponent}             
 ];
 
 export const appRoutingProviders: any[] = [];
 export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);