import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListPage } from './list.page';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { WorkAuthorizationRequestService } from '../../../core/services/work-authorization-request.service';
import { of } from 'rxjs';
import { WorkAuthorizationRequestCreateComponent } from '../../../components/work-authorization-request-create/work-authorization-request-create.component';
import { WorkAuthorizationRequest } from '../../../core/models/work-authorisation-request.model';
import { RequestStatus } from '../../../core/models/work-authorisation-request.enum';

describe('ListPage', () => {
  let component: ListPage;
  let fixture: ComponentFixture<ListPage>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockWorkAuthService: jasmine.SpyObj<WorkAuthorizationRequestService>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<WorkAuthorizationRequestCreateComponent>>;

  beforeEach(async () => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockWorkAuthService = jasmine.createSpyObj('WorkAuthorizationRequestService', ['getAllRequests']);
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);

    await TestBed.configureTestingModule({
      imports: [ListPage],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        { provide: WorkAuthorizationRequestService, useValue: mockWorkAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load work authorization requests on init', () => {
    const mockRequests: WorkAuthorizationRequest[] = [
      {
        _id: '1',
        requesterName: 'John Doe',
        contract: 'Contract1',
        project: 'Project1',
        status: RequestStatus.PENDING
      }
    ];
    mockWorkAuthService.getAllRequests.and.returnValue(of(mockRequests));

    component.ngOnInit();

    expect(mockWorkAuthService.getAllRequests).toHaveBeenCalled();
    expect(component.workAuthorizationRequests).toEqual(mockRequests);
  });

  it('should open create dialog and refresh list when request is created', () => {
    mockDialogRef.afterClosed.and.returnValue(of('created'));
    mockDialog.open.and.returnValue(mockDialogRef);
    const mockRequests: WorkAuthorizationRequest[] = [];
    mockWorkAuthService.getAllRequests.and.returnValue(of(mockRequests));

    component.openCreateDialog();

    expect(mockDialog.open).toHaveBeenCalledWith(
      WorkAuthorizationRequestCreateComponent,
      {
        width: '500px',
        data: { operation: 'add' }
      }
    );
    expect(mockWorkAuthService.getAllRequests).toHaveBeenCalled();
  });

  it('should open create dialog and refresh list when request is updated', () => {
    mockDialogRef.afterClosed.and.returnValue(of('updated'));
    mockDialog.open.and.returnValue(mockDialogRef);
    const mockRequests: WorkAuthorizationRequest[] = [];
    mockWorkAuthService.getAllRequests.and.returnValue(of(mockRequests));

    component.openCreateDialog();

    expect(mockWorkAuthService.getAllRequests).toHaveBeenCalled();
  });

  it('should not refresh list when dialog is closed without result', () => {
    mockDialogRef.afterClosed.and.returnValue(of(undefined));
    mockDialog.open.and.returnValue(mockDialogRef);

    component.openCreateDialog();

    expect(mockWorkAuthService.getAllRequests).not.toHaveBeenCalled();
  });

  it('should get work authorization requests', () => {
    const mockRequests: WorkAuthorizationRequest[] = [
      {
        _id: '1',
        requesterName: 'John Doe',
        contract: 'Contract1',
        project: 'Project1',
        status: RequestStatus.PENDING
      }
    ];
    mockWorkAuthService.getAllRequests.and.returnValue(of(mockRequests));

    component.getWorkAuthorizationRequests();

    expect(mockWorkAuthService.getAllRequests).toHaveBeenCalled();
    expect(component.workAuthorizationRequests).toEqual(mockRequests);
  });
});
