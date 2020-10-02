import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component'; 
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';



const routes: Routes = [  

  {path:'login', component: LoginPageComponent},   
  {path:'home', component: HomeComponent},  
  {path:'registration', component: RegistrationComponent}, 
   { path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  }, 
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
