import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';

const routes: Routes = [
  { path:"login", component: LoginComponent},
  { path:"register", component: RegisterComponent},
]

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes),ReactiveFormsModule
  ],
  exports: [RouterModule],
  providers:[AuthService]
})
export class AuthModule { }
