import { ICandidato } from "./Icandidato";
import { IVotacion } from "./ivotacion";

export interface IEstadisticas {
  votacion?: IVotacion;
  cantidadVotos?: number;
  votantesHabilitados?: number;
  candidatos?: ICandidato[];
  votosPorCandidato?: any;
  candidatoMasVotado?: ICandidato;
  creationDateTime?: string;
}
