import { Component } from '@angular/core';
import { GetAprendizService } from 'src/app/services/aprendiz/get-aprendiz.service';

@Component({
  selector: 'app-csv-apprentices',
  templateUrl: './csv-apprentices.component.html',
  styleUrls: ['./csv-apprentices.component.scss']
})
export class CsvApprenticesComponent {
  mensaje: string;
  resultado: boolean;
  estilo: boolean;
  loaders: boolean;
  csvFile!: File;
  isUploading = false;
  constructor(
    private _aprendizServices: GetAprendizService
  ){
    this.mensaje = '';
    this.resultado = false;
    this.estilo = false;
    this.loaders = false;
  }

  onFileSelected(event: any) {
    this.csvFile = event.target.files[0];
  }
  onSubmit() {
    this.loaders = true;
    if(this.csvFile){
      const formData = new FormData();
      formData.append('csvFile', this.csvFile);
      this.isUploading = true;
      this._aprendizServices.enviarAprendizCSV(formData).subscribe(
        {
          next: (value: any) => {
            this.mensaje = 'Archivo CSV cargado correctamente';
            this.resultado = true;
            this.estilo = true;
            this.loaders = false;
            this.isUploading = false;
            setTimeout(() =>{
              this.resultado = true;
            }, 7000)
          },
          error: (error: any) => {
            this.mensaje = 'Archivo csv No cargado correctamente, hay aprendices que ya estan en nuestra base de datos'
            this.resultado = true;
            this.estilo = false;
            this.loaders = false;
            this.isUploading = false;
            setTimeout(() =>{
              this.resultado = false;
            }, 7000)
          }
        }
      )
    }else {
      console.log('Seleccione un archivo CSV antes de enviar la solicitud.');
    }
  }
}
