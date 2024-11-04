import { Component, EventEmitter, inject, Input, OnDestroy, Output } from "@angular/core";
import { WorkAuthorizationRequest } from "../../core/models/work-authorisation-request.model";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { WorkAuthorizationRequestService } from "../../core/services/work-authorization-request.service";
import { MatDialog } from "@angular/material/dialog";
import { WorkAuthorizationRequestCreateComponent } from "../work-authorization-request-create/work-authorization-request-create.component";
import { Subject, takeUntil } from "rxjs";
import { RequestStatus } from "../../core/models/work-authorisation-request.enum";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-request",
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatMenuModule,
    CommonModule
  ],
  templateUrl: "./work-authorization-request-item.component.html"
})
export class RequestComponent implements OnDestroy {
  @Input() item: WorkAuthorizationRequest | null = null;
  @Output() onDelete = new EventEmitter<boolean>();
  @Output() onUpdated = new EventEmitter<boolean>();

  readonly dialog = inject(MatDialog);
  protected readonly requestStatusEnum = RequestStatus;

  private destroy$ = new Subject<void>();


  constructor(
    private readonly workAutorizationRequests: WorkAuthorizationRequestService
  ) {}

  // NOTE : A plutot créer dans un composant badge ou chip pour une meilleure réutilisation
  public getStatusClasses(status: string) {
    const classes = {
      'h-7 rounded-xl px-3 flex justify-center items-center text-sm mt-2': true,
      'bg-orange-200 text-orange-700': status === this.requestStatusEnum.PENDING,
      'bg-green-200 text-green-700': status === this.requestStatusEnum.APPROVED,
      'bg-red-200 text-red-700': status === this.requestStatusEnum.REJECTED
    };
    return classes;
  }
  

  public onModify(): void {
    if (!this.item) {
      console.warn('Pas de demande à modifier');
      return;
    }
    const dialogRef = this.dialog.open(
      WorkAuthorizationRequestCreateComponent,
      {
        width: "500px",
        data: { operation: "update", item: this.item },
      }
    );

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe((result: 'updated' | undefined) => {
      if (result === 'updated') {
        this.onUpdated.emit(true);
      }
    });    
  }

  public deleteRequest(): void {
    if (this.item) {
      this.workAutorizationRequests
        .deleteRequest(this.item._id)
        .subscribe({
          next: () => this.onDelete.emit(true),
          error: (error) => console.error('erreur de suppression', error)
        });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
}
