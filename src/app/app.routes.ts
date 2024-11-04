import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'work-authorization-request/list', pathMatch: 'full' },
    { path: 'work-authorization-request/list', loadComponent: () => import('./pages/work-authorization-request/list/list.page').then((m) => m.ListPage) }
];
