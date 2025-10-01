import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';
import { Component } from '@angular/core';

@Component({ template: `<h1>Bienvenido Consumidor</h1>` })
export class DashboardConsumidorComponent {}

@Component({ template: `<h1>Bienvenido Comerciante</h1>` })
export class DashboardComercianteComponent {}

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'dashboard-consumidor', component: DashboardConsumidorComponent },
  { path: 'dashboard-comerciante', component: DashboardComercianteComponent },
];
