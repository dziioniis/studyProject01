import { Injectable } from '@angular/core'; 
import { HttpClient} from '@angular/common/http'; 
import {User} from 'src/app/entity/user'; 
import {Observable} from 'rxjs';
import {Router} from "@angular/router";



@Injectable({
  providedIn: 'root'
})
export class UserService{

  constructor( private http: HttpClient,private router: Router) { } 
   
  auntenticate(user:User){   
   
        this.http.post('/api/signin',user).subscribe((data:User)=>{  
        if (data==null)  { 
        alert ("The username or password that you entered not match. please,double-check and try again.") 
        } 
        else{
        localStorage.setItem('username', data.username); 
        localStorage.setItem('id',data.id.toString()) 
        localStorage.setItem('token',data.token); 
        localStorage.setItem('refreshToken',data.refreshToken);
        this.router.navigate(['home']);
        }
    }) 
  } 

  registrate(user:User){  
    const f = fetch ('http://localhost:3000/api/signup',{ 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify({username: user.username, password: user.password, email:user.email})
    })  
    this.router.navigate(['login']);
  }  

   
  logout(id:Number):void{
          localStorage.removeItem('id'); 
          localStorage.removeItem('username');  
          localStorage.removeItem('token');  
          localStorage.removeItem('refreshToken');  
          localStorage.removeItem('describe'); 
    this.router.navigate(['login']);
  }  

  setNewTokens(user:User){   
    user.username=localStorage.getItem('username')
    this.http.post('/api/tokens',user).subscribe((data:User)=>{  
      if (data==null)  { 
      alert ("The username or password that you entered not match. please,double-check and try again.") 
      } 
      else{ 
        localStorage.removeItem('token');  
        localStorage.removeItem('refreshToken');   
      localStorage.setItem('token',data.token); 
      localStorage.setItem('refreshToken',data.refreshToken);
      this.router.navigate(['home']);
      }
  }) 
} 
  }
   

