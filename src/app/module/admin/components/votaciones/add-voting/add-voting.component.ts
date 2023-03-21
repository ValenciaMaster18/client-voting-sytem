import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VotacionService } from '../../../services/admin/Votacion/votacion.service';
@Component({
  selector: 'app-add-voting',
  templateUrl: './add-voting.component.html',
  styleUrls: ['./add-voting.component.scss']
})
export class AddVotingComponent {
  miForm: FormGroup;
  loaders: boolean;
  mensaje: string;
  resultado: boolean;
  constructor(
    private controles: FormBuilder,
    private _votacionServices: VotacionService
  ){
    this.mensaje = '';
    this.loaders = false;
    this.resultado = false;
    this.miForm = this.controles.group({
      name: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      descripcion: ['', [Validators.required]]
    })
  }
  onSubmit(): void{
    this.loaders = true;
    setTimeout(() => {
      this.resultado = true;
      this._votacionServices.addVotacion(this.miForm.value);
      this.mensaje = 'Votacion agregada';
      this.loaders = false;
      this.miForm.reset();
      setTimeout(() => {
        this.resultado = false;
      }, 1000)
    }, 300); // Delay of 300 milliseconds
  }
}
