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

  constructor(
    private controles: FormBuilder,
    private _votacionServices: VotacionService
  ){
    this.miForm = this.controles.group({
      name: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      descripcion: ['', [Validators.required]]
    })
  }
  onSubmit(): void{
    this._votacionServices.addVotacion(this.miForm.value);
    this.miForm.reset();
  }
}
