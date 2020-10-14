import { Component, OnInit } from '@angular/core'; 
import {User} from 'src/app/entity/user'
import {UserService} from 'src/app/service/user/user-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user = new User();
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  } 

  logOut():void{ 
    this.userService.logout(Number(localStorage.getItem('id')));
  } 

  tokenIsValid():void{   
    this.userService.tokenIsValid();
  }  
   
  setNewTokens():void{  
    this.userService.setNewTokens();
  }

}
