import { ToasterService } from './../../services/toaster.service';
import { NbIconConfig } from '@nebular/theme';
import { HttpService } from './../../services/http.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  name = ""
  password = ""

  showPassword = true;

  constructor(
    private httpService : HttpService,
    private toasterService : ToasterService,
    private router : Router,
    ) {
      console.log("login comp")
    sessionStorage.clear()
  }

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  doLogin(){
    this.httpService.loginRequest({name:this.name, password: this.password}).subscribe({
      next : (result : any) =>{
        const iconConfig : NbIconConfig = { icon: "checkmark-circle-outline", pack: "eva" };
        console.log(result)
        sessionStorage.setItem("name", this.name);
        this.toasterService.showSuccessToaster(iconConfig, result.text)
        this.router.navigate(["/chat"]);
      },
      error : (error) => {
        const iconConfig : NbIconConfig = { icon: "slash-outline", pack: "eva" };
        this.toasterService.showErrorToaster(iconConfig, error.error.text);
      }
    })
  }
}
