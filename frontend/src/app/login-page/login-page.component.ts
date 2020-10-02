import { Component, OnInit } from '@angular/core';  
import {User} from 'src/app/entity/user'
import { from } from 'rxjs'; 
import {UserService} from 'src/app/service/user/user-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  user = new User();

  constructor( private userService: UserService ) { }

  ngOnInit(): void {  
  } 
  
  public login(): void { 
    this.userService.auntenticate(this.user);
   
  }
}
