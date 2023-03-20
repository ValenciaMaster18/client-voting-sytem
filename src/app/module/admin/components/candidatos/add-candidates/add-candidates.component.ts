import { Component } from '@angular/core';
// import { GetAprendizService } from '../../../services/get-aprendiz.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CandidatoService } from '../../../services/admin/candidato/candidato.service';
@Component({
  selector: 'app-add-candidates',
  templateUrl: './add-candidates.component.html',
  styleUrls: ['./add-candidates.component.scss']
})
export class AddCandidatesComponent {
  // Propiedades
  miForm: FormGroup;

  constructor(
    private controles: FormBuilder,
    private _candidatoServices: CandidatoService
   ){
    this.miForm = this.controles.group({
      id: ['', [Validators.required]],
      img:['', [Validators.required]],
      votacion: ['', [Validators.required]],
      propuesta: ['', [Validators.required]]
    })
   }
   onSubmit(): void{
    this._candidatoServices.addCandidato(this.miForm.value);
    console.log(this._candidatoServices.getCandidato());
    this.miForm.reset()
  }
}
