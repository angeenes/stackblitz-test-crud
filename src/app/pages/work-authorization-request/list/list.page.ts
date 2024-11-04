import { Component, inject, type OnInit } from '@angular/core';
import { WorkAuthorizationRequestService } from '../../../core/services/work-authorization-request.service';
import { WorkAuthorizationRequest } from '../../../core/models/work-authorisation-request.model';
import {
    MatDialog,
  } from '@angular/material/dialog';
import { WorkAuthorizationRequestCreateComponent } from '../../../components/work-authorization-request-create/work-authorization-request-create.component';
import { MatButtonModule } from '@angular/material/button';
import { RequestComponent } from "../../../components/work-authorization-request-item/work-authorization-request-item.component";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    standalone: true,
    imports: [MatButtonModule, MatProgressSpinnerModule, RequestComponent],
    templateUrl: './list.page.html',
    styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

    public workAuthorizationRequests: WorkAuthorizationRequest[] = [];
    readonly dialog = inject(MatDialog);

    constructor(
        private readonly workAutorizationRequests: WorkAuthorizationRequestService,
    ) { }

    ngOnInit() { 
        this.getWorkAuthorizationRequests()
    }

    public openCreateDialog(): void {
        const dialogRef = this.dialog.open(WorkAuthorizationRequestCreateComponent, {
          width: '500px',
          data: { operation: 'add'},
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (result === 'created' || result === 'updated') {
            this.getWorkAuthorizationRequests();
          }
        });
      }

    public getWorkAuthorizationRequests(): void { // On pourrais utiliser un resolver pour charger les données avant le composant de cette page
        this.workAutorizationRequests.getAllRequests().subscribe((response) => {
            this.workAuthorizationRequests = response;
        });
    }

}
