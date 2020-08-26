import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { LoginCredentials } from '../models/LoginCredentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginCredentials: LoginCredentials;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.loginCredentials = {
      email: "",
      password: ""
    };
  }

  login(loginForm) {
    if (loginForm.valid) {
      this.apiService.login(loginForm.value.loginCredentials.email, loginForm.value.loginCredentials.password).subscribe(x => {
        console.log(x);
        if (x["token"]) {
          this.router.navigate(["/home"]);
        }
    });
  }
}
}
