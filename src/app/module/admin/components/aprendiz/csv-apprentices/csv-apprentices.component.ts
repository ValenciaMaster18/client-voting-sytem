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
  csvFile!: File;
  isUploading = false;
  constructor(
    private _aprendizServices: GetAprendizService
  ){
    this.mensaje = '';
    this.resultado = false;
    this.estilo = false;
  }

  onFileSelected(event: any) {
    this.csvFile = event.target.files[0];
  }
  onSubmit() {
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
            this.isUploading = false;
            setTimeout(() =>{
              this.resultado = true;

            }, 4000)
          },
          error: (error: any) => {
            this.mensaje = error.message
            this.resultado = true;
            this.estilo = false;
            this.isUploading = false;
            setTimeout(() =>{
              this.resultado = true;
            }, 4000)
          }
        }
      )
    }else {
      console.log('Seleccione un archivo CSV antes de enviar la solicitud.');
    }
  }
}
