import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';
import { Dashboard } from './features/merchant/dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'merchant/dashboard', component: Dashboard }
];
