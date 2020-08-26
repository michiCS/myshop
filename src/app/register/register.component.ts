import { Component, OnInit } from '@angular/core';
import { RegisterCredentials } from '../models/RegisterCredentials';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerCredentials: RegisterCredentials;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  register(registerForm) {
    if (registerForm.valid) {
      console.log(registerForm.value.registerCredentials);
      const creds = registerForm.value.registerCredentials;
      this.apiService.register(creds.username, creds.password, creds.email).subscribe(x => {
        console.log(x);
        this.router.navigate(["login"]);
      }, error => {
        alert("Email already in use!");
      });
    }
  }

}
