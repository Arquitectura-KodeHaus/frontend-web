import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';
import { Dashboard } from './features/merchant/dashboard/dashboard';
import { Dashboard as CDashboard } from './features/customer/dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'merchant/dashboard', component: Dashboard },
  { path: 'customer/dashboard', component: CDashboard }
];
