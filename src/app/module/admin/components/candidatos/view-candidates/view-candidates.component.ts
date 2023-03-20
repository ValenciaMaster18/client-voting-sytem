import { Component, OnInit } from '@angular/core';
import { ICandidato } from '../../../models/Icandidato';
import { CandidatoService } from '../../../services/admin/candidato/candidato.service';

@Component({
  selector: 'app-view-candidates',
  templateUrl: './view-candidates.component.html',
  styleUrls: ['./view-candidates.component.scss']
})
export class ViewCandidatesComponent implements OnInit {
  data: ICandidato[];

  constructor(
    private _candidatoServices: CandidatoService
  ){
    this.data = []
  }
  ngOnInit(): void {
    this._candidatoServices.getCandidato().subscribe(
      {
        next: (value: any) => {
          this.data = value
        },
        error: (error: any) => {
          console.error(error)
        },
        complete: () => {
          console.log("Hemos terminado candidato")
        }
      }
    )
  }


}
