import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { routing,appRoutingProviders } from './app.routing';
import { MaterialModule } from './material/material.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptorService } from './services/token-interceptor.service'

import { updateUserComponent } from './components/users/update-user.component';
import { InicioComponent } from './components/menu/inicio.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { PaginaInicioComponent } from './components/pagina-inicio/pagina-inicio.component';
import { BarraSuperiorComponent } from './components/barra-superior/barra-superior.component';
import { AddArtistComponent } from './components/artists/add-artist/add-artist.component';
import { GetArtistsComponent } from './components/artists/get-artists/get-artists.component';
import { ArtistDetallComponent } from './components/artists/artist-detall/artist-detall.component';
import { AddAlbumComponent } from './components/albums/add-album/add-album.component';
import { GetAlbumsComponent } from './components/albums/get-albums/get-albums.component';
import { AlbumDetallComponent } from './components/albums/album-detall/album-detall.component';
import { GetFavoritosComponent } from './components/favoritos/get-favoritos/get-favoritos.component';
import { GetGeneroComponent } from './components/genero/get-genero/get-genero.component';
import { AddGeneroComponent } from './components/genero/dialog-genero/add-genero.component';
import { DialogSongComponent } from './components/songs/dialog-song/dialog-song.component';
import { GetPlayListComponent } from './components/playlists/get-play-list/get-play-list.component';
import { AddPlayListComponent } from './components/playlists/add-play-list/add-play-list.component';
import { PlaylistDetallComponent } from './components/playlists/playlist-detall/playlist-detall.component';
import { SearchComponent } from './components/buscador/search/search.component';


@NgModule({
  declarations: [
    AppComponent,    
    updateUserComponent,
    InicioComponent, 
    LoginRegisterComponent, 
    PaginaInicioComponent, 
    BarraSuperiorComponent,     
    AddArtistComponent,
    GetArtistsComponent,     
    ArtistDetallComponent, 
    AddAlbumComponent,     
    GetAlbumsComponent, 
    AlbumDetallComponent, 
    GetFavoritosComponent, 
    GetGeneroComponent, 
    AddGeneroComponent, 
    DialogSongComponent, 
    GetPlayListComponent, 
    AddPlayListComponent, 
    PlaylistDetallComponent, 
    SearchComponent
  ],
  entryComponents:[AddGeneroComponent,AddArtistComponent,AddAlbumComponent,DialogSongComponent,AddPlayListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    routing,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
    
  ],
  // providers: [appRoutingProviders],
  providers: [appRoutingProviders,{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
