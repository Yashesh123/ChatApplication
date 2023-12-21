import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  currentTheme = "dark";
  
  constructor(
      private themeService: NbThemeService,
      private router : Router
    ) {
    themeService.onThemeChange().subscribe((theme:any)=>{
      this.currentTheme = theme.name;
    })
  }

  changeTheme(){
    if(this.currentTheme == "dark"){
      this.themeService.changeTheme('default');
    } else {
      this.themeService.changeTheme('dark');
    }
  }

  logout(){
    sessionStorage.removeItem("name");
    this.redirect()
  }

  redirect = () =>{
    this.router.navigate(['/login']);

  }

  showProfile(){

  }
}
