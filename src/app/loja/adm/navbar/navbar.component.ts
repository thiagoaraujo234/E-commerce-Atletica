import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/autenticacao/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  possoVer!: boolean;
  roles!: any[];

  constructor(private login: LoginService) { }

  ngOnInit(): void {
    this.login.retornaUsuario().subscribe(data => data['groups'] == 'Admin' ? this.possoVer = true : this.possoVer = false)
    console.log(this.possoVer);
  }
}
