import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { ForgotPassword } from './pages/forgot-password/forgot-password';
import { Register } from './pages/register/register';
import { Dashboard } from './pages/dashboard/dashboard';
import { Mediation } from './pages/mediation/mediation';
import { Reports } from './pages/reports/reports';
import { Calendar } from './pages/calendar/calendar';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'login', redirectTo: '' },
  { path: 'olvide-contrasena', component: ForgotPassword },
  { path: 'crear-cuenta', component: Register },
  { path: 'dashboard', component: Dashboard },
  { path: 'mediacion', component: Mediation },
  { path: 'reportes', component: Reports },
  { path: 'calendario', component: Calendar },
];
