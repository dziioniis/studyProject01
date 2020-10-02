import { Component, OnInit } from '@angular/core';
import { UserService} from 'src/app/service/user/user-service'; 
import {User} from 'src/app/entity/user'; 

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
 
  user = new User();
  constructor( private userService:UserService) { }

  ngOnInit(): void {
  } 
   
  public registration(): void {  
    this.userService.registrate(this.user);
    localStorage.setItem('username', this.user.username);
  } 
   

}
