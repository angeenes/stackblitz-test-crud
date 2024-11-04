import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { WorkAuthorizationRequest } from '../models/work-authorisation-request.model';

@Injectable({
  providedIn: 'root'
})
export class WorkAuthorizationRequestService {
  private apiUrl = 'https://edf-crud-back.onrender.com/work-authorization-requests'; // peux venir de la conf de l'environnement

  constructor(private http: HttpClient) {}

  // Créer une nouvelle demande d'autorisation de travaux
  createRequest(request: WorkAuthorizationRequest): Observable<WorkAuthorizationRequest> {
    return this.http.post<WorkAuthorizationRequest>(this.apiUrl, request)
      .pipe(catchError(this.handleError));
  }

  // Obtenir la liste de toutes les demandes d'autorisation de travaux
  getAllRequests(): Observable<WorkAuthorizationRequest[]> {
    return this.http.get<WorkAuthorizationRequest[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  // Obtenir une demande d'autorisation de travaux par son ID
  getRequestById(id: number): Observable<WorkAuthorizationRequest> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<WorkAuthorizationRequest>(url)
      .pipe(catchError(this.handleError));
  }

  // Mettre à jour une demande d'autorisation de travaux existante
  updateRequest(id: string, request: WorkAuthorizationRequest): Observable<WorkAuthorizationRequest> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<WorkAuthorizationRequest>(url, request)
      .pipe(catchError(this.handleError));
  }

  // Supprimer une demande d'autorisation de travaux par son ID
  deleteRequest(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url)
      .pipe(catchError(this.handleError));
  }

  // Gérer les erreurs HTTP
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}