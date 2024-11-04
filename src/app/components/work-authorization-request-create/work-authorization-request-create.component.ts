import { Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { WorkAuthorizationRequestService } from "../../core/services/work-authorization-request.service";
import { MatButtonModule } from "@angular/material/button";
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { WorkAuthorizationRequest } from "../../core/models/work-authorisation-request.model";
import { RequestStatus } from "../../core/models/work-authorisation-request.enum";
import { MatSelectModule } from "@angular/material/select";

@Component({
  selector: "app-work-authorization-request-create",
  templateUrl: "./work-authorization-request-create.component.html",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSelectModule,
  ],
})
export class WorkAuthorizationRequestCreateComponent implements OnInit {
  public requestForm: FormGroup;
  protected readonly requestStatusEnum = RequestStatus;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<WorkAuthorizationRequestCreateComponent>,
    private requestService: WorkAuthorizationRequestService,
    @Inject(MAT_DIALOG_DATA) public data: {operation: string, item: WorkAuthorizationRequest}
  ) {
    this.requestForm = this.fb.group({
      project: ['', Validators.required],
      contract: [''],
      requesterName: ['', Validators.required],
      status: [RequestStatus.PENDING, Validators.required],
    });
  }

  ngOnInit(): void {
    if(this.data.operation === 'update') {
      this.requestForm.patchValue(this.data.item);
    }
  }

  onSubmit() {
    if (this.requestForm.valid) {
      if (this.data.operation === 'update') {
        this.requestService.updateRequest(this.data.item._id, this.requestForm.value).subscribe({
          next: () => {
            this.requestForm.reset();
            this.dialogRef.close('updated');
          },
          error: (error) => {
            console.error("Error updating request", error);
          },
        });
        return;
      }
      this.requestService.createRequest(this.requestForm.value).subscribe({
        next: () => {
          this.requestForm.reset();
          this.dialogRef.close('created');
          
        },
        error: (error) => {
          console.error("Error creating request", error);
        },
      });
    } else {
      console.warn("Form is invalid");
    }
  }
}
