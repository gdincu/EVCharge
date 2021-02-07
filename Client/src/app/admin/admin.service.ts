import { Injectable } from '@angular/core';
import { IUser } from '../shared/models/user';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl = 'https://localhost:5001/';
  users: IUser[] = [];

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<IUser[]>(this.baseUrl + 'account/allusers').pipe(
      map(response => {
        this.users = response;
        return response;
      })
    );
  }

  removeUser(userEmail: string) {
    return this.http.delete(this.baseUrl + 'account/deletebyemail?email=' + userEmail).subscribe();
    }

}
