import { Routes } from '@angular/router';
import { Login } from './modules/auth/login/login';
import { VerifyOtp } from './modules/auth/verify-otp/verify-otp';
import { Vault } from './modules/vault/vault/vault';
import { Landing } from './pages/landing/landing';
import { Register } from './modules/auth/register/register';
import { Backup } from './modules/vault/backup/backup';
import { SecurityDashboardComponent } from './services/security-dashboard';
import { RecoverPasswordComponent } from './modules/auth/recover-password/recover-password.component';


export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'verify-otp', component: VerifyOtp },
  { path: 'vault', component: Vault },

  {
    path: 'generator',
    loadChildren: () =>
      import('./modules/generator/generator-module').then(m => m.GeneratorModule)
  },
  { path: 'backup', component: Backup },
  {
  path: 'security-dashboard',
  component: SecurityDashboardComponent
},
{
  path: 'recover-password',
  component: RecoverPasswordComponent
}

];
