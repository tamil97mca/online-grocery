import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginDTO } from 'src/class-folder/login-dto';
import { environment } from 'src/environments/environment';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  loginSubject = new BehaviorSubject<any>(this.getUser());

  collectionName = 'grocerystoreapp_users';
  basicAuth =
    'Basic ' + btoa(environment.dbUsername + ':' + environment.dbPassword);

  constructor(private http: HttpClient, private restService: RestService) {}

  userLogin(loginDTO: LoginDTO) {
    const loginObj = {
      selector: {
        email: loginDTO.email,
        password: loginDTO.password,
        role: loginDTO.role,
      },
      fields: ['_id', '_rev', 'name', 'email', 'password', 'role', 'account'],
    };

    //return this.http.post(environment.url + this.collectionName + "/_find", loginObj, { headers: { Authorization: this.basicAuth } })
    // return this.http.post(environment.url + this.collectionName + '/_find',loginObj);
    return this.restService.findByCriteria(this.collectionName, loginObj);
  }

  userRegister(registerObj: any) {
    // return this.http.post(environment.url + this.collectionName, registerObj);
      return this.restService.save(this.collectionName, registerObj);
  }

  userList(userList: any) {
    // return this.http.post(environment.url + this.collectionName + '/_find',userList);
      return this.restService.findByCriteria(this.collectionName, userList);
  }

  getAllUsers() {
   
    let getUserObj = {
      selector: {
        role: "user"
      },
      sort: [{ registerDate: 'desc' }],
    };
    // return this.http.post(environment.url + this.collectionName + '/_find', getUserObj);
      return this.restService.findByCriteria(this.collectionName, getUserObj);
  }

  getUser() {
    let admin = localStorage.getItem('LOGGED_IN_USER');
    if (admin) {
      return JSON.parse(admin);
    }
    return null;
  }


  userAccountStatus(users : any)
  {
    console.log("users", users);
    // return this.http.put(environment.url + this.collectionName+ "/" + users._id + "?rev=" + users._rev, users);
      return this.restService.updateOne(this.collectionName, users._id, users);
  }

  
}
