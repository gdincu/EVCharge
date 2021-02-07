import { Component, OnInit } from '@angular/core';
import { IUser } from '../../shared/models/user';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  users: IUser[];

  constructor(private adminService: AdminService) { }

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
    this.adminService.removeUser(userEmail);
    this.getUsers();
    }
 }
