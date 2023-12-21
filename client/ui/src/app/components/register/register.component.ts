import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbIconConfig } from '@nebular/theme';
import { HttpService } from 'src/app/services/http.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  name = "";
  password = ""

  showPassword = true;

  constructor(
    private httpService : HttpService,
    private toasterService : ToasterService,
    private router : Router
  ){
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

  doRegister(){
    this.httpService.registerRequest({name:this.name, password: this.password}).subscribe({
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
