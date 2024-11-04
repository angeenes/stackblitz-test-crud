import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WorkAuthorizationRequestService } from './work-authorization-request.service';
import { WorkAuthorizationRequest } from '../models/work-authorisation-request.model';
import { RequestStatus } from '../models/work-authorisation-request.enum';

describe('WorkAuthorizationRequestService', () => {
  let service: WorkAuthorizationRequestService;
  let httpMock: HttpTestingController;
  const apiUrl = 'https://edf-crud-back.onrender.com/work-authorization-requests';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WorkAuthorizationRequestService]
    });
    service = TestBed.inject(WorkAuthorizationRequestService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all requests', () => {
    const mockRequests: WorkAuthorizationRequest[] = [
      { _id: '1', project: 'Project 1', contract: 'Contract 1', requesterName: 'User 1', status: RequestStatus.PENDING },
      { _id: '2', project: 'Project 2', contract: 'Contract 2', requesterName: 'User 2', status: RequestStatus.APPROVED }
    ];

    service.getAllRequests().subscribe(requests => {
      expect(requests).toEqual(mockRequests);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockRequests);
  });
  it('should get request by id', () => {
    const mockRequest: WorkAuthorizationRequest = {
      _id: '1',
      project: 'Project 1',
      contract: 'Contract 1',
      requesterName: 'User 1',
      status: RequestStatus.PENDING
    };

    service.getRequestById(1).subscribe(request => {
      expect(request).toEqual(mockRequest);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRequest);
  });

  it('should delete request', () => {
    service.deleteRequest('1').subscribe();

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should update request', () => {
    const mockRequest: WorkAuthorizationRequest = {
      _id: '1',
      project: 'Updated Project',
      contract: 'Updated Contract',
      requesterName: 'Updated User',
      status: RequestStatus.APPROVED
    };

    service.updateRequest('1', mockRequest).subscribe(request => {
      expect(request).toEqual(mockRequest);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockRequest);
    req.flush(mockRequest);
  });

  it('should handle http errors', () => {
    service.getAllRequests().subscribe({
      error: (error) => {
        expect(error.message).toBe('Something went wrong; please try again later.');
      }
    });

    const req = httpMock.expectOne(apiUrl);
    req.error(new ErrorEvent('Network error'));
  });
});
