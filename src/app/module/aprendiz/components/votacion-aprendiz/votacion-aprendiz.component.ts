import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICandidato } from 'src/app/models/Icandidato';
import { LoginService } from 'src/app/module/login/services/login/login.service';
import { CandidatoService } from 'src/app/services/candidato/candidato.service';
import { VotosService } from 'src/app/services/votos/votos.service';

@Component({
  selector: 'app-votacion-aprendiz',
  templateUrl: './votacion-aprendiz.component.html',
  styleUrls: ['./votacion-aprendiz.component.scss']
})
export class VotacionAprendizComponent implements OnInit {
  candidatos: ICandidato[];
  constructor(
    private _candidatosService: CandidatoService,
    private _votosService: VotosService,
    private _loginService: LoginService,
    private router: Router

  ) {
    this.candidatos = []
  }
  ngOnInit(): void {
    this._candidatosService.candidatosVotacionActual().subscribe((valor: ICandidato[]) => {
      this.candidatos = valor
    }
    )
  }
  votarCandidato(id: number) {
    this._votosService.enviarVoto(id).subscribe(
      {
        next: (value: any) => {
          this.router.navigate(['/login'])
          this._loginService.logout()
        },
        error: (error: any) => {
          console.log(error)
        },
        complete: () => {
          //
        }
      }
    )
  }
}
