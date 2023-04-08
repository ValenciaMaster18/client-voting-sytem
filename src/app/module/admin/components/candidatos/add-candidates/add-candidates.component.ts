import { Component, OnDestroy, OnInit } from '@angular/core';
// import { GetAprendizService } from '../../../services/get-aprendiz.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { delay, Subscription } from 'rxjs';
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
  imagen: string = '';
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
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagen = reader.result!.toString();
      console.log(this.imagen); // muestra la cadena base64 en la consola
    };
  }

  onSubmit(): void {
    this.votacion = false;
    this.loaders = true;
    const candidato: ICandidato = {
      id: null,
      documento: this.miForm.value.documento,
      imagen: this.imagen,
      idVotacion: this.miForm.value.idVotacion,
      propuestas: this.miForm.value.propuestas,
    }
    console.log(candidato)
    this._candidatoServices.addCandidato(candidato).pipe(
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
            this.resultado = false;
          }, 7000)
        },
        error: (error: any) => {
          this.loaders = false;
          this.mensaje = 'Candidato No Agregado';
          this.resultado = true;
          this.estilo = false;
          setTimeout(() => {
            this.resultado = false;
          }, 7000)
        },
        complete: () => {
          //
        }
      }
    );
  }
}
