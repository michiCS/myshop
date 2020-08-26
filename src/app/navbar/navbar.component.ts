import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, public apiService: ApiService) { }

  name: string;

  ngOnInit(): void {
    this.name = this.apiService.getName();
    this.apiService.listen().subscribe(x => {
      console.log(x);
      this.name = x;
    })
  }

  logout() {
    this.apiService.logout();
    this.router.navigate(["login"]);
  }
}
