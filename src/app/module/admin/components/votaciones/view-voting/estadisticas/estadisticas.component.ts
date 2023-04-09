import { Component, OnInit } from '@angular/core';
import { IEstadisticas } from 'src/app/models/iestadisticas';
import { VotacionService } from 'src/app/services/Votacion/votacion.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';
@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasVotingComponent implements OnInit {
  data: any;
  options: any;
  estadisticas!: IEstadisticas;
  jsonCsv: any[] = [];
  constructor(
    private _votacionService: VotacionService
  ) {
    this._votacionService.votacionEstadisticas.subscribe({
      next: (value: IEstadisticas) => {
        this.estadisticas = value;
      }
    });
  }

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    this.data = {
      labels: Object.keys(this.estadisticas.votosPorCandidato),
      datasets: [
        {
          data: Object.values(this.estadisticas.votosPorCandidato),
        }
      ]
    };

    this.options = {
      cutout: '70%',
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      }
    };

  }
  exportCsv(): void {
    this.estadisticas.candidatos!.forEach((candidato) => {
      this.jsonCsv.push(
        {
          id: this.estadisticas.votacion?.id,
          nombre: this.estadisticas.votacion?.nombre,
          fecha: this.estadisticas.creationDateTime,
          cantidadVotantesHabilitados: this.estadisticas.votantesHabilitados,
          cantidadVotos: this.estadisticas.cantidadVotos,
          documentoCandidato: candidato.documento,
          votosCandidato: this.estadisticas.votosPorCandidato?.[candidato.documento]
        }
      )
    })
    let opciones = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: false,
      showTitle: false,
      title: 'Votaciones detalles',
      useBom: false,
      noDownload: false,
      headers: [
        "ID VOTACION",
        "NOMBRE VOTACION",
        "FECHA VOTACION",
        "VOTANTES HABILITADOS",
        "CANTIDAD VOTOS",
        "NUMERO DOCUMENTO CANDIDATO",
        "CANTIDAD VOTOS CANDIDATO"
      ]
    };

    new ngxCsv(this.jsonCsv, "Report", opciones)
    this.jsonCsv.splice(0, this.jsonCsv.length)
  }
}
