import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { Login2Component } from './login2/login2.component';


const routes: Routes = [
  
  { path: 'login', component: Login2Component },  // Direct component loading for the login route
  { path: 'dashboard', component: Dashboard2Component },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
 // { path: '**', redirectTo: 'login' }  // Wildcard route to handle undefined routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export { routes };

