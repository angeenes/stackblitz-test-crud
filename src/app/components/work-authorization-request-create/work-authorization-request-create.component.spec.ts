import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WorkAuthorizationRequestCreateComponent } from './work-authorization-request-create.component';
import { WorkAuthorizationRequestService } from '../../core/services/work-authorization-request.service';
import { of, throwError } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WorkAuthorizationRequest } from '../../core/models/work-authorisation-request.model';

describe('WorkAuthorizationRequestCreateComponent', () => {
  let component: WorkAuthorizationRequestCreateComponent;
  let fixture: ComponentFixture<WorkAuthorizationRequestCreateComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<WorkAuthorizationRequestCreateComponent>>;
  let mockRequestService: jasmine.SpyObj<WorkAuthorizationRequestService>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockRequestService = jasmine.createSpyObj('WorkAuthorizationRequestService', ['createRequest', 'updateRequest']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        WorkAuthorizationRequestCreateComponent
      ],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: WorkAuthorizationRequestService, useValue: mockRequestService },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { operation: 'create', item: null }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkAuthorizationRequestCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize form with default values for create operation', () => {
    expect(component.requestForm.get('project')?.value).toBe('');
    expect(component.requestForm.get('contract')?.value).toBe('');
    expect(component.requestForm.get('requesterName')?.value).toBe('');
    expect(component.requestForm.get('status')?.value).toBe('pending');
  });

  it('should patch form values when operation is update', () => {
    const testData = {
      operation: 'update',
      item: {
        _id: '123',
        project: 'Test Project',
        contract: 'Test Contract',
        requesterName: 'John Doe',
        status: 'pending'
      }
    };

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, BrowserAnimationsModule, WorkAuthorizationRequestCreateComponent],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: WorkAuthorizationRequestService, useValue: mockRequestService },
        { provide: MAT_DIALOG_DATA, useValue: testData }
      ]
    });

    fixture = TestBed.createComponent(WorkAuthorizationRequestCreateComponent);
    component = fixture.componentInstance;
    component.ngOnInit();

    expect(component.requestForm.get('project')?.value).toBe('Test Project');
    expect(component.requestForm.get('contract')?.value).toBe('Test Contract');
    expect(component.requestForm.get('requesterName')?.value).toBe('John Doe');
  });

  it('should not submit if form is invalid', () => {
    component.requestForm.controls['project'].setValue('');
    component.requestForm.controls['requesterName'].setValue('');
    
    component.onSubmit();
    
    expect(mockRequestService.createRequest).not.toHaveBeenCalled();
    expect(mockDialogRef.close).not.toHaveBeenCalled();
  });

  it('should create request when form is valid and operation is create', () => {
    const formValue = {
      project: 'New Project',
      contract: 'New Contract',
      requesterName: 'Jane Doe',
      status: 'pending' as 'pending' | 'approved' | 'rejected'
    } as WorkAuthorizationRequest;

    const mockResponse: WorkAuthorizationRequest = {
        ...formValue,
        _id: '123'
    };

    component.requestForm.patchValue(formValue);
    mockRequestService.createRequest.and.returnValue(of(mockResponse));

    component.onSubmit();

    expect(mockRequestService.createRequest).toHaveBeenCalledWith(formValue);
    expect(mockDialogRef.close).toHaveBeenCalledWith('created');
  });

  it('should handle error during request creation', () => {    
    const formValue = {
      project: 'New Project',
      contract: 'New Contract',
      requesterName: 'Jane Doe',
      status: 'pending' as 'pending' | 'approved' | 'rejected'
    } as WorkAuthorizationRequest;

    component.requestForm.patchValue(formValue);
    mockRequestService.createRequest.and.returnValue(throwError(() => new Error('Test error')));
    spyOn(console, 'error');

    component.onSubmit();

    expect(mockRequestService.createRequest).toHaveBeenCalledWith(formValue);
    expect(console.error).toHaveBeenCalled();
    expect(mockDialogRef.close).not.toHaveBeenCalled();
  });

 });
