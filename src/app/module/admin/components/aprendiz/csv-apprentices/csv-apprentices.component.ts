import { Component } from '@angular/core';
import { GetAprendizService } from 'src/app/services/aprendiz/get-aprendiz.service';

@Component({
  selector: 'app-csv-apprentices',
  templateUrl: './csv-apprentices.component.html',
  styleUrls: ['./csv-apprentices.component.scss']
})
export class CsvApprenticesComponent {
  selectedFile!: File;

  constructor(
    private _aprendizServices: GetAprendizService
  ){}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  onSubmit() {
    const formData = new FormData();
    formData.append('csv', this.selectedFile, this.selectedFile.name);
    
    this._aprendizServices.enviarAprendizCSV(formData).subscribe(
      {
        next: () => {
          console.log('Archivo CSV cargado correctamente')
        },
        error: (error: any) => {
          console.log(error)
        }
      }
    )
  }
}
