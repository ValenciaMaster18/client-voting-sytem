import { Component, OnDestroy, OnInit } from '@angular/core';
// import { GetAprendizService } from '../../../services/get-aprendiz.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { delay, Subscription } from 'rxjs';
import { IAprendiz } from '../../../../../models/iaprendiz';
import { IVotacion } from '../../../../../models/ivotacion';
import { GetAprendizService } from '../../../../../services/aprendiz/get-aprendiz.service';
import { CandidatoService } from '../../../../../services/candidato/candidato.service';
import { VotacionService } from '../../../../../services/Votacion/votacion.service';
import { ICandidato } from 'src/app/models/Icandidato';
@Component({
  selector: 'app-add-candidates',
  templateUrl: './add-candidates.component.html',
  styleUrls: ['./add-candidates.component.scss']
})
export class AddCandidatesComponent implements OnInit, OnDestroy {
  miForm: FormGroup;

  mensaje: string;
  resultado: boolean;
  votacion: boolean;
  estilo: boolean;
  loaders: boolean;
  selectedImage!: File;
  votaciones: IVotacion[];

  suscription: Subscription;
  constructor(
    private controles: FormBuilder,
    private _getAprendizService: GetAprendizService,
    private _candidatoServices: CandidatoService,
    private _votacionService: VotacionService
  ) {
    this.mensaje = '';
    this.estilo = false;
    this.resultado = false;
    this.loaders = false;
    this.loaders = false;
    this.votacion = false;
    this.votaciones = [];
    this.suscription = new Subscription();

    this.miForm = this.controles.group({
      documento: ['', [Validators.required]],
      idVotacion: ['', [Validators.required]],
      propuestas: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.suscription = this._votacionService.getVotacion(0,6).subscribe(
      {
        next: (votacion: any) => {
          this.votaciones = votacion.content;
        },
        error: (error: any) => {
          console.error(error);
        },
        complete: () => {
          //
        },
      });
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  onSubmit(): void {
    this.votacion = false;
    this.loaders = true;
    const formData = new FormData();
    formData.append('documento', this.miForm.value.documento);
    formData.append('imagen', this.selectedImage);
    formData.append('idVotacion', this.miForm.value.idVotacion);
    formData.append('propuestas', this.miForm.value.propuestas);
    this._candidatoServices.addCandidato(formData).pipe(
      delay(1000)
    ).subscribe(
      {
        next: () => {
          this.loaders = false;
          this.mensaje = 'Candidato Agregado';
          this.resultado = true;
          this.estilo = true;
          this.miForm.reset()
          setTimeout(() => {
            this.loaders = false;
            this.mensaje = 'Candidato No Agregado';
            this.resultado = true;
            this.estilo = false;
          }, 4000)
        },
        error: (error: any) => {
          console.error(error)
        },
        complete: () => {
          //
        }
      }
    );
  }
}
