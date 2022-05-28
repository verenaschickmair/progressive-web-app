import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api_token = 'https://api.s1910456028.student.kwmhgb.at/wp-json/jwt-auth/v1/token';
  userId = new BehaviorSubject<any>(0);
  user = new BehaviorSubject<any>({})

  constructor(private router: Router) {
  }

  getLoggedInUser() {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + window.localStorage.getItem('token'));
    let options = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    // @ts-ignore
    return fetch("https://api.s1910456028.student.kwmhgb.at/wp-json/wp/v2/users/me", options)
      .then(response => response.json())
      .then(response => {
        this.user?.next(response);
        return this.user.getValue();
      })
      .catch(error => console.log('error', error));
  }

  getLoggedInUserId() {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + window.localStorage.getItem('token'));
    let options = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    // @ts-ignore
    return fetch("https://api.s1910456028.student.kwmhgb.at/wp-json/wp/v2/users/me", options)
      .then(response => response.json())
      .then(response => {
        this.userId?.next(response.id);
        return this.userId.getValue();
      })
      .catch(error => console.log('error', error));
  }
}
