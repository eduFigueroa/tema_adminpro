import { Injectable } from '@angular/core';
import { URL_SERVCIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Injectable()
export class SubirArchivoService {

  constructor(  ) { }

subirArchivo(archivo: File, tipo: string, id: string){

  return new Promise((resolve, reject)=>{
    let formData = new FormData();
    let xhr = new XMLHttpRequest();
  
    formData.append('imagen', archivo, archivo.name);
  
    xhr.onreadystatechange = function(){
  
      if(xhr.readyState === 4){
        if (xhr.status === 200){
          console.log('Imagen subida');
   
          resolve( JSON.parse( xhr.response ));
        }else{
          console.log('Falló la subida');
          reject(xhr.response);
        }
      }
    
  };

  let url = URL_SERVCIOS + '/upload/' + tipo +'/'+ id; 

  xhr.open('PUT', url, true);
  xhr.send(formData);
});
 
}
}
