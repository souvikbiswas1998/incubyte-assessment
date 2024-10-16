import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./home/home.component').then(component => component.HomeComponent) },
    { path: 'about-me', loadComponent: () => import('./about/about.component').then(component => component.AboutComponent) }
];
