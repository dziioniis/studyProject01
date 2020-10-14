import { Injectable } from '@angular/core'; 
import { HttpClient} from '@angular/common/http'; 
import {User} from 'src/app/entity/user'; 
import {Router} from "@angular/router";
import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';

interface MyObj {
  body:Body,
  statusCode:string;
} 
interface Body { 
  message:string
access_token:string
refresh_token: string
}  

@Injectable({
  providedIn: 'root'
}) 


export class UserService{

  constructor( private http: HttpClient,private router: Router) { }  


   
  auntenticate(user:User){   
    let url = new URL('http://142.93.134.108:1111/login'); 
url.searchParams.append('email', user.email); 
url.searchParams.append('password', user.password); 
        axios.post(url.href)
          .then(function(response:AxiosResponse<MyObj>){  
            if (response==null)  { 
            alert ("response is null.") 
            } 
            else{    
              alert(response.data.statusCode)
            localStorage.setItem('token',response.data.body.access_token) 
            localStorage.setItem('refreshToken',response.data.body.refresh_token)
            this.router.navigate(['home']);
        } 

    }) 
    this.router.navigate(['home']); 
  } 

  registrate(user:User){  
   axios.post ('http://142.93.134.108:1111/sign_up',{email:user.email, password: user.password}).then(function(response:AxiosResponse<MyObj>){  
    alert(response.data.statusCode)
  })
    this.router.navigate(['login']); 
  }  

   
  logout(id:Number):void{
          localStorage.removeItem('token');  
          localStorage.removeItem('refreshToken');  
    this.router.navigate(['login']);
  }  

  tokenIsValid(){   
    axios.get('http://142.93.134.108:1111/me',{headers: {'Authorization':'Bearer '+`${localStorage.getItem('token')}`}}).then(function(response:AxiosResponse<MyObj>){  
      alert(response.data.body.message)
    })
      }

setNewTokens(){      
  axios.post('http://142.93.134.108:1111/refresh',null,{headers: {'Authorization':'Bearer '+`${localStorage.getItem('refreshToken')}`}}).
    then(function(response:AxiosResponse<MyObj>){  
      if (response==null)  { 
      alert ("response is null.") 
      } 
      else{    
        alert(response.data.statusCode)
      localStorage.setItem('token',response.data.body.access_token) 
      localStorage.setItem('refreshToken',response.data.body.refresh_token)
      }
  }) 
} 
} 
 
 

   

