import { RequestStatus } from "./work-authorisation-request.enum";

export interface WorkAuthorizationRequest {
    _id: string;                    // Identifiant unique pour la demande
    requesterName: string;          // Utilisateur associé à la demande
    contract: string;               // Contrat associé à la demande
    project: string;                // Projet associé à la demande
    status: RequestStatus; // Statut de la demande
  }