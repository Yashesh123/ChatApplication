import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from './components/root/root.component';
import { RegisterComponent } from './components/register/register.component';
import { loginGuard } from './guards/login-guard.guard';

const routes: Routes = [
  {path: "chat", component : RootComponent, data : {animation : "chatPage"}, canActivate : [loginGuard]},
  {path: "login", component: LoginComponent, data : {animation : "loginPage"}},
  {path: "register", component: RegisterComponent, data : {animation : "registerPage"}},
  {path: "", redirectTo: "/chat", pathMatch: 'full'},
  {
    path : "**", redirectTo : "/chat"
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
