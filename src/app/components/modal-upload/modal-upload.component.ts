import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { SubirArchivoService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  // oculto: string = '';
  usuario: Usuario;
  
  imagenSubir: File; //variable que trae lo seleccionado en  imagen del front
  imagenTemp: string;

  constructor(
    public _usuarioService:UsuarioService,
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
  ) { 
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }



  cerrarModal(){
    this.imagenSubir = null;
    this.imagenTemp = null;

    this._modalUploadService.ocultarModal()
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
  subirImagen(){
    this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
        .then(resp =>{
        
    
          this._modalUploadService.notificacion.emit(resp);
          this.cerrarModal();
          
    
        })
        .catch(err =>{
          console.log('Error en la carga');
          
        })
      }
}
