import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { CreateUser, User } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  localStorageKey = '';

  constructor(private http: HttpClient) {}

  createUser(user: CreateUser) {
    return this.http.post<User>(`${environment.API_URL}/users`, user);
  }

  saveUserToStorage(user: User) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(user));
  }

  getUserFromStorage() {
    const user = localStorage.getItem(this.localStorageKey);
    return user ? (JSON.parse(user) as User) : null;
  }

  removeUserFromStorage() {
    localStorage.removeItem(this.localStorageKey);
  }
}
