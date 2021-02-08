import { Component, OnInit } from '@angular/core';
import { IUser } from '../../shared/models/user';
import { AdminService } from '../admin.service';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from '../../shared/services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  users: IUser[];

  constructor(
    private adminService: AdminService,
    private _alertify: AlertifyService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.adminService.getUsers().subscribe(response => {
      //this.users = [{ username: 'All', email: 'All', password: 'All', token: 'All' }, ...response];
      this.users = response;
    }, error => {
      console.log(error);
    });
  }

  removeUser(userEmail: string) {
    if (this.adminService.removeUser(userEmail))
      this._alertify.error('User removed!');
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['admin/user']));
    }
 }
