import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  
  imagenSubir: File; //variable que trae lo seleccionado en  imagen del front
  imagenTemp: string;

  constructor(
    public _usuarioService:UsuarioService
  ) { 
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar(usuario:Usuario){

    this.usuario.nombre = usuario.nombre;
    if (!this.usuario.google){ 
    this.usuario.email = usuario.email;
  }
    this._usuarioService.actualizarUsuario(this.usuario)
                    .subscribe();
  }

  seleccionImagen(archivo: File){
    if (!archivo){
      this.imagenSubir = null;
      return
    }

if (archivo.type.indexOf('image') < 0){
  swal('Sólo imágenes', ' El archivo selecionado no es una imágen', 'error')
  this.imagenSubir = null;
  return;
}    
   this.imagenSubir = archivo;

   let reader = new FileReader();
   let urlImagenTemp = reader.readAsDataURL(archivo);

   reader.onloadend = () => this.imagenTemp = reader.result;


  }

  cambiarImagen(){
    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id );
  }

}
