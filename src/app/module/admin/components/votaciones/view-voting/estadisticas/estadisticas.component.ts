import { Component, OnInit } from '@angular/core';
import { IEstadisticas } from 'src/app/models/iestadisticas';
import { VotacionService } from 'src/app/services/Votacion/votacion.service';
@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasVotingComponent implements OnInit {
  data: any;
  options: any;
  estadisticas!: IEstadisticas;

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
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
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
}
